import { Elysia } from 'elysia';
import { ApiError } from '../types/apiError';
import { 
  generateNonce,
  verifySignature,
} from '../lib/auth';
import { 
  createLoginAttempt, 
  clearLoginAttempt, 
  validateLoginAttempt, 
  getUser
} from '../db/auth';
import { supabase } from '../db/client';

type NonceRequest = {
  body: {
    address: string;
  }
}

type VerifyRequest = {
  body: {
    address: string;
    nonce: string;
    signature: string;
  }
}

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post('/nonce', async ({ body }: NonceRequest) => {
    const { address } = body;
    
    if (!address) {
      throw new ApiError(400, 'Address is required');
    }

    const nonce = await generateNonce();
    const saved = await createLoginAttempt(address, nonce);
    
    if (!saved) {
      throw new ApiError(500, 'Failed to save login attempt');
    }

    return {
      data: { nonce },
      statusCode: 200
    };
  })
  .post('/verify', async ({ body }: VerifyRequest) => {
    const { address, nonce, signature } = body;

    if (!address || !nonce || !signature) {
      throw new ApiError(400, 'Missing required fields');
    }

    // Validate login attempt
    const isValidAttempt = await validateLoginAttempt(address, nonce);
    if (!isValidAttempt) {
      throw new ApiError(401, 'Invalid or expired nonce');
    }

    // Verify signature
    const isValid = await verifySignature({ 
      address,
      nonce, 
      signature 
    });

    if (!isValid) {
      throw new ApiError(401, 'Invalid signature');
    }

    try {
      const { user, accessToken } = await getUser(address);
      await clearLoginAttempt(address);

      return {
        data: { 
          accessToken, 
          user 
        },
        statusCode: 200
      };
    } catch (error) {
      console.error('Auth error:', error);
      throw new ApiError(500, 'Authentication failed');
    }
  })
  .post('/logout', async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { data: { message: 'Logged out successfully' } };
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout failed');
    }
  });