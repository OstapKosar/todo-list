export type UserState = {
  user: {
    id: string;
    email: string;
    name: string;
    status: 'VERIFIED' | 'UNVERIFIED' | 'PENDING';
  } | null;
  error: string | null;
  loading: boolean;
};
