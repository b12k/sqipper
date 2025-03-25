import { Elysia, t } from 'elysia';
import path from 'node:path';
import { sqip } from 'sqip';

import { env } from './env';
import { printBanner } from './print-banner';

new Elysia()
  .get('/', async ({ body }) => {
    const sqipResult = await sqip({
      input: path.resolve(__dirname, './portrait.jpg'),
      plugins: [
        {
          name: 'pixels',
          options: {
            width: 1,
          },
        },
        // {
        //   name: 'blur',
        //   options: {
        //     blur: 24,
        //   },
        // },
        'svgo',
        'data-uri',
      ],
    });
    return sqipResult;
  })
  .listen(env.PORT, () => printBanner(env.IS_PROD, env.PORT));
