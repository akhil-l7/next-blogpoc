import * as prismic from '@prismicio/client';

const repoName = process.env.NEXT_PUBLIC_REPO_NAME || ''
// const endpoint = `https://${repoName}.prismic.io/api/v2`;
const client = prismic.createClient(repoName);

export default client;
