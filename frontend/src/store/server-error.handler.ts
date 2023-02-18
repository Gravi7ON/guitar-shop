import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ErrorServerMessage } from 'src/types/error-server-message';

export const serverErrorHandler = (error: AxiosError) => {
  const errorServerMessage = error.response?.data as ErrorServerMessage;
  const errorMessage = errorServerMessage.message;

  toast.error(typeof errorMessage === 'string' ? errorMessage : errorMessage.join(', '));
}
