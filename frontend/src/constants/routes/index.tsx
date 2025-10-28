export const routes = {
  main: '/',
  login: '/login',
  signUp: '/sign-up',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  verifyOtp: '/verify-otp',
  newPassword: '/new-password',
  dashboard: '/dashboard',
  dashboardProjects: '/dashboard/projects/:id',
};

export const optionalAuthenticatedRoutes = [routes.main];
