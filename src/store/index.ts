import user from './module/user';

export default function useStore() {
  return {
    user: user(),
  };
}
