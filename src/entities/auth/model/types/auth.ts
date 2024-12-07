export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  errorMessage: string | undefined;
  isLoading: boolean;
}
