import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: z.string().transform((value) => {
    const port = Number(value);
    if (Number.isNaN(port) || port <= 0)
      throw new Error(`PORT=${port} is not valid port number`);

    return port;
  }),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  IS_PROD: parsedEnv.NODE_ENV === 'production',
};
export type Env = typeof env;
