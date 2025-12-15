import * as prismic from '@prismicio/client';

const endpoint = 'https://<your-repo-name>.prismic.io/api/v2';
const client = prismic.createClient(endpoint);

export default client;
