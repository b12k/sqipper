import type { Handler } from 'elysia';

import { config } from '../config';

async function fetchImage(url: string) {
  const abortController = new AbortController();
  const abortAndThrow = (message: string) => {
    abortController.abort();
    throw new Error(message);
  };
  const { signal } = abortController;

  let timeoutId;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      abortController.abort();
      reject();
    }, config.FETCH_TIMEOUT_MS);
  });

  try {
    const responce = await Promise.race([fetch(url, { signal }), timeout]);
    clearTimeout(timeoutId);

    if (!responce.ok) abortAndThrow('Image fetching failed');

    const contentType = (
      responce.headers.get('Content-Type') || ''
    ).toLowerCase();
    const isMimeTypeAllowed = config.ALLOWED_MIME_TYPES.some((mimeType) =>
      mimeType.toLowerCase().startsWith(contentType),
    );

    if (!isMimeTypeAllowed) abortAndThrow('Mime type not supported');

    const contentLength = Number.parseInt(
      responce.headers.get('Content-Length') || '',
      10,
    );
    const isContentLengthOk =
      Number.isNaN(contentLength) ||
      contentLength > config.FETCH_MAX_CONTENT_LENGTH;

    if (!isContentLengthOk)
      abortAndThrow('Content-Length exceeds FETCH_MAX_CONTENT_LENGTH');

    const arrayBuffer = await responce.arrayBuffer();
    const isArrayBufferLengthOk =
      arrayBuffer.byteLength > config.FETCH_MAX_CONTENT_LENGTH;

    if (!isArrayBufferLengthOk)
      abortAndThrow('Array buffer length exceeds FETCH_MAX_CONTENT_LENGTH');

    return arrayBuffer;
  } catch {
    //
  }
}

export const mainHandler: Handler = async ({ params, query, set }) => {
  const url = new URL(params['*']);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  const source = url.toString();

  const response = await fetch(source);
  const imageBuffer = await response.arrayBuffer();

  set.headers['Content-Type'] = 'image/svg+xml';
  set.headers['Content-Length'] = String(imageBuffer.byteLength);

  console.log('Content-Length', imageBuffer.byteLength);

  return imageBuffer;
};
