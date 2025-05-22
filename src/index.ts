import { Elysia } from 'elysia';

import { config } from './config';
import { mainHandler } from './handlers';
import { printBanner } from './utils';

new Elysia()
  .get('/prefetch/*', (request) => {
    mainHandler(request);
  })
  .get('/*', async (request) => {
    return await mainHandler(request);
  })
  .get('/', () => '🍌')
  .listen(config.PORT, () => printBanner(config.IS_PROD, config.PORT));
