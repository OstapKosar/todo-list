import type { UserState } from '@/store/slices/user/types';

export type UserProps = {
  user: NonNullable<UserState['user']>;
};
