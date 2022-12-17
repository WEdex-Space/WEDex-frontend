export const layoutGroupedRoutes = {
  'auth/index': ['/auth/login', '/auth/callback/*', '/auth/register/*', '/auth/association'],
  'home/index': ['/']
  // default: ['*']
} as const
