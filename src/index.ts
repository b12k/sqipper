import { Elysia } from 'elysia';

new Elysia()
  .get('/', () => {
    return '🍌';
  })
  .listen(3000, () => console.log('Listening on http://localhost:3000'));
