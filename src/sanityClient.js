import sanityClient from '@sanity/client'; // Default import
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: 'fmgu2ejm',
  dataset: 'production',
  apiVersion: '2025-4-29',
  useCdn: true,
  token: "skJF55QFdFsknzUlBRUyxVKeONiITBeBut6M6SnkXBzHqIoehWly3pSmi4W64vN5jC3OJmRfBWprZdDiVfmw0mMxFzaM21JozdOw1OYSORNXfzgaIB2IbjEnqho4gSSwlGZjhcRNXHCnxIOpU0H8HIVCT58CjAO6nVxkfm72EZObePw8MYEc"
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

// Export client as default
export default client;