import { toast } from 'sonner';

const roomCreationSuccessToast = ({ gameId }: { gameId: string }) => {
  console.log('🚀 ~ roomCreationSuccessToast ~ gameId:', gameId);
  toast.success(`Game room created with ID: ${gameId}`, {
    duration: 3000,
  });
};

export default roomCreationSuccessToast;
