export const port = parseInt(process.env.NUXT_PORT ?? '3000') + 1;
export const host = `0.0.0.0:${port}`;
export const enablePlugin = process.env.GRPC_ENABLE_PLUGIN === 'true';
