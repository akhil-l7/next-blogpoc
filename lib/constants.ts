export const READING_TIME = {
  WORDS_PER_MINUTE: 200,
} as const;

export const TRANSITIONS = {
  LINK_NAVIGATION_MS: 500,
} as const;

export const COMMENTS = {
  TABLE_NAME: 'public.comments',
  DEFAULT_NAME: 'Anonymous',
  ORDER_BY: 'createdAt',
  MAX_MESSAGE_LENGTH: 4000,
  MAX_NAME_LENGTH: 100,
} as const;

export const BLOG = {
  PLACEHOLDER_DATE: '2026-10-28',
  PLACEHOLDER_BADGE: 'generic',
  MAX_TITLE_LENGTH: 40,
  MAX_EXCERPT_LENGTH: 160,
} as const;

export const STORAGE_KEYS = {
  VISITOR_ID: 'visitorId',
  TAG_KEY: 'tag_key',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

