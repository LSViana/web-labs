import { type FullConfig, request } from '@playwright/test';

export default async function globalSetup(config: FullConfig) {
  const project = config.projects[0]!;

  const requestContext = await request.newContext({
    baseURL: project.use.baseURL,
  });

  await requestContext.post('/api/productivity/auth', {
    data: {
      email: process.env.USER1_EMAIL,
      password: process.env.USER1_PASSWORD,
    },
  });

  await requestContext.storageState({ path: '.playwright/auth/user1.json' });
}
