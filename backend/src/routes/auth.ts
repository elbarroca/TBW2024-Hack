import { Elysia, t } from 'elysia'
import { SignMessage } from '../lib/authAdapter'
import { supabase } from '../db/client'
import { saveLoginAttempt, getLoginAttempt } from '../db/auth'
import { UserRole } from '../types/user';
import { mapDbUserToUser } from '../db/user';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post('/nonce', 
    async ({ body }) => {
      try {
        const nonce = crypto.randomUUID()
        const ttl = new Date(Date.now() + 5 * 60 * 1000).toISOString()
        
        await saveLoginAttempt({
          address: body.publicKey,
          nonce,
          ttl
        })

        return { data: { nonce } }
      } catch (error) {
        console.error('Nonce generation error:', error)
        throw new Error('Failed to generate nonce')
      }
    },
    {
      body: t.Object({
        publicKey: t.String()
      })
    }
  )
  .post('/verify', 
    async ({ body }) => {
      try {
        const { message, signature } = body;

        if (!message || !signature) {
          throw new Error('Message and signature are required');
        }

        const signMessage = new SignMessage(JSON.parse(message));
        const isValid = await signMessage.validate(signature);
        
        if (!isValid) {
          throw new Error('Invalid signature');
        }

        const address = signMessage.getPublicKey();
        const attempt = await getLoginAttempt(address);
        
        if (!attempt || attempt.nonce !== signMessage.getNonce()) {
          throw new Error('Invalid nonce');
        }

        // Try to get existing user
        let { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('address', address)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (!user) {
          // Create new user with correct types
          const { data, error: fetchError } = await supabase
            .from('users')
            .insert({
              id: address,
              address,
              role: 'student' as const,  // Explicitly type as database enum value
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select()
            .single();

          if (fetchError) throw fetchError;
          user = data;
        }

        if (!user) throw new Error('Could not get user on login');

        await supabase
          .from('users')
          .update({
            nonce: null,
            last_auth: new Date().toISOString(),
            last_auth_status: 'success',
          })
          .eq('address', address);

        // Anonymous sign in for session
        const { data: { session }, error: authError } = await supabase.auth.signInAnonymously()
  
        if (authError) throw authError
  
        return { 
          data: { 
            session,
            user: mapDbUserToUser(user)  // Map to our User type with enum
          } 
        }
      } catch (error) {
        console.error('Verification error:', error);
        throw new Error(error instanceof Error ? error.message : 'Verification failed');
      }
    },
    {
      body: t.Object({
        message: t.String(),
        signature: t.String()
      })
    }
  )
  .post('/logout', 
    async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        return { data: { message: 'Logged out successfully' } };
      } catch (error) {
        console.error('Logout error:', error);
        throw new Error('Logout failed');
      }
    }
  );