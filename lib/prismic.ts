import * as prismic from '@prismicio/client';

const repoName = process.env.NEXT_PUBLIC_REPO_NAME || ''
const client = prismic.createClient(repoName);

export default client;
