import { Elysia } from 'elysia';

new Elysia()
  .get('/', () => 'hi')
  .listen(3000, () => console.log('Listening on http://localhost:3000'));
