export const ROUTES = {
  main: '/',
  docs: '/docs',
  newDoc: '/docs/new',
  section: (section: string) => `/docs/${section}` as const,
  article: (section: string, article: string) => `/docs/${section}/${article}` as const,
} as const;
