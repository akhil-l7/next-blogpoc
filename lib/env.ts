import { ENV_KEYS } from './constants';

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

function getEnvVar(name: string): string {
    const value = process.env[name] || '';
    if (!value) handleMissingEnv(name);
    return value;
}

function getEnvConfig(): EnvConfig {
    return {
        databaseUrl: getEnvVar(ENV_KEYS.DATABASE_URL),
        prismicWebhookSecret: getEnvVar(ENV_KEYS.PRISMIC_WEBHOOK_SECRET),
        repoName: getEnvVar(ENV_KEYS.NEXT_PUBLIC_REPO_NAME),
    };
}

export const env = getEnvConfig();

export const isDatabaseUrlConfigured = (): boolean => !!env.databaseUrl;
export const isWebhookSecretConfigured = (): boolean => !!env.prismicWebhookSecret;
export const isRepoNameConfigured = (): boolean => !!env.repoName;