import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/Switch';
import { FileUploader } from '@/components/shared/FileUploader';
import { motion } from 'framer-motion';
import { useCreateNFTMutation, useSendTransactionMutation } from '@/api/endpoints/metaplex';
import { useToast } from '@/components/ui/use-toast';
import { useSignTransaction } from "@solana/react";
import { UiWallet } from "@wallet-standard/react";
import bs58 from 'bs58';
import { useState } from 'react';

interface CertificationUploaderProps {
  certification: boolean;
  certificationImage: string;
  isCreating: boolean;
  connectedWallet: UiWallet;
  courseTitle: string;
  courseDescription: string;
  onCertificationChange: (checked: boolean) => void;
  onImageUpload: (files: FileList) => void;
  onImageRemove: () => void;
  onCollectionCreated: (collectionMint: string) => void;
}

export function CertificationUploader({ 
  certification,
  certificationImage,
  isCreating,
  connectedWallet,
  courseTitle,
  courseDescription,
  onCertificationChange,
  onImageUpload,
  onImageRemove,
  onCollectionCreated
}: CertificationUploaderProps) {
  const { toast } = useToast();
  const [createNFT] = useCreateNFTMutation();
  const [sendTransaction] = useSendTransactionMutation();
  const signTransaction = useSignTransaction(connectedWallet.accounts[0], 'solana:mainnet');
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleFileSelect = (files: FileList) => {
    const file = files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleConfirmImage = () => {
    if (previewImage) {
      fetch(previewImage)
        .then(res => res.blob())
        .then(blob => {
          const fileList = new DataTransfer();
          fileList.items.add(new File([blob], 'certificate.png', { type: 'image/png' }));
          onImageUpload(fileList.files);
        })
        .catch(error => {
          toast({
            title: "Error",
            description: "Failed to process image",
            variant: "destructive"
          });
        });
    }
  };

  const handleCreateCollection = async () => {
    if (!certificationImage) {
      toast({
        title: "Error",
        description: "Please upload a certificate image first",
        variant: "destructive"
      });
      return;
    }

    try {
        console.log('Creating NFT collection...');
      // Create NFT collection using Metaplex
      const response = await createNFT({
        imageFile: certificationImage,
        name: `${courseTitle} Certificate`,
        description: courseDescription || `Certificate of completion for ${courseTitle}`,
        owner: connectedWallet.accounts[0].address
      }).unwrap();

      if (!response.transaction || !response.collectionMint) {
        throw new Error("Failed to create collection");
      }

      // Sign the transaction
      const { signedTransaction } = await signTransaction({
        transaction: bs58.decode(response.transaction),
      });
      // Send signed transaction for confirmation
      const confirmation = await sendTransaction({
        transaction: bs58.encode(Buffer.from(signedTransaction))
      }).unwrap();

      if (confirmation.status !== 200) {
        throw new Error("Failed to confirm transaction");
      }

      // Notify success and update parent component
      toast({
        title: "Success",
        description: "Certificate collection created successfully",
      });

      onCollectionCreated(response.collectionMint);

    } catch (error: Error | unknown) {
      console.error('Error creating certificate collection:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create certificate collection",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-none">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">Course Certification</h2>
            <p className="text-sm text-gray-500">Enable certification for students who complete this course</p>
          </div>
          <Switch
            checked={certification}
            onCheckedChange={onCertificationChange}
          />
        </div>

        {certification && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 pt-4"
          >
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition-colors duration-300">
              {!certificationImage && !previewImage ? (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="w-full">
                    <FileUploader
                      accept="image/*"
                      onUpload={handleFileSelect}
                    >
                      <Button variant="outline" className="w-full" disabled={isCreating}>
                        {isCreating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Collection...
                          </>
                        ) : (
                          'Choose Certificate Template'
                        )}
                      </Button>
                    </FileUploader>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Upload an image of your certificate template (PNG, JPG)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={previewImage || certificationImage}
                    alt="Certificate preview"
                    className="w-full h-48 object-contain rounded-lg"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      {certificationImage ? 'Certificate template uploaded' : 'Preview certificate template'}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        if (certificationImage) {
                          onImageRemove();
                        }
                        setPreviewImage('');
                      }}
                      disabled={isCreating}
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                  {previewImage && !certificationImage && (
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={handleConfirmImage}
                      disabled={isCreating}
                    >
                      Confirm Certificate Template
                    </Button>
                  )}
                  {certificationImage && (
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={handleCreateCollection}
                      disabled={isCreating}
                    >
                      {isCreating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating NFT Collection...
                        </>
                      ) : (
                        'Create NFT Collection'
                      )}
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-purple-600">
                This certificate will be sent as an NFT to the student's wallet upon course completion. 
                Choose your template wisely as it will be permanently stored on the blockchain.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  );
} 