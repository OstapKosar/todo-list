import { AxiosError } from 'axios';

export const extractErrorMessage = (e: unknown) => {
  if (e instanceof AxiosError) {
    console.log(e);
    return e.response?.data.message;
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return 'An error occurred';
  }
};
