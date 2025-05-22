import { z } from 'zod/v4';

const zEnvUInt = () =>
  z.string().transform((value) => {
    const number = Number(value);
    if (Number.isNaN(number) || number <= 0)
      throw new Error(`${number} is not valid uInt`);

    return number;
  });

const zEnvBool = () =>
  z.enum(['true', 'false']).transform((value) => value === 'true');

const zEnvCsv = () =>
  z
    .string()
    .transform((csvString) =>
      csvString.split(',').map((value) => value.trim()),
    );

const envSchema = z.object({
  ALLOWED_MIME_TYPES: zEnvCsv().optional(),
  FETCH_MAX_CONTENT_LENGTH: zEnvUInt().optional(),
  FETCH_TIMEOUT_MS: zEnvUInt().optional(),
  IS_PROD: zEnvBool().optional(),
  NODE_ENV: z.enum(['development', 'production']),
  PORT: zEnvUInt(),
});

const parsedEnv = envSchema.parse(process.env);

export const config = {
  ALLOWED_MIME_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml',
  ],
  FETCH_MAX_CONTENT_LENGTH: 1024 * 3,
  FETCH_TIMEOUT_MS: 3000,
  IS_PROD: parsedEnv.NODE_ENV === 'production',
  ...parsedEnv,
};
export type Config = typeof config;
