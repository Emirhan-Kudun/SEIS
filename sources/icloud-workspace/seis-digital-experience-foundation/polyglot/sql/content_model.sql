CREATE TABLE IF NOT EXISTS content_locale (
  id TEXT PRIMARY KEY,
  locale TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_content_locale_locale
ON content_locale (locale);
