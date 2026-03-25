interface EnvConfig {
  databaseUrl: string;
  prismicWebhookSecret: string;
  repoName: string;
}

function handleMissingEnv(variableName: string) {
  if (process.env.NODE_ENV === 'development') {
    throw new Error(`Missing required environment variable: ${variableName}`);
  } else {
    console.warn('A required environment variable is not configured.');
  }
}

function getEnvConfig(): EnvConfig {
  const databaseUrl = process.env.DATABASE_URL || '';
  const prismicWebhookSecret = process.env.PRISMIC_WEBHOOK_SECRET || '';
  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || '';

  if (!databaseUrl) handleMissingEnv('DATABASE_URL');
  if (!prismicWebhookSecret) handleMissingEnv('PRISMIC_WEBHOOK_SECRET');
  if (!repoName) handleMissingEnv('NEXT_PUBLIC_REPO_NAME');

  return {
    databaseUrl,
    prismicWebhookSecret,
    repoName,
  };
}

export const env = getEnvConfig();

export const isDatabaseUrlConfigured = (): boolean => !!env.databaseUrl;
export const isWebhookSecretConfigured = (): boolean => !!env.prismicWebhookSecret;
export const isRepoNameConfigured = (): boolean => !!env.repoName;