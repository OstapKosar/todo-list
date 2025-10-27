import { AxiosError } from 'axios';

export const extractErrorMessage = (e: unknown) => {
  if (e instanceof AxiosError) {
    const errorData = e.response?.data;
    if (errorData?.message) {
      return errorData.message;
    }

    return e.response?.statusText || e.message || 'An error occurred';
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return 'An error occurred';
  }
};
