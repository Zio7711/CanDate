DROP TABLE IF EXISTS message CASCADE;
SET timezone='GMT+7';

CREATE TABLE message (
  id SERIAL PRIMARY KEY NOT NULL,
  to_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  from_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content VARCHAR(255) NOT NULL,
  creates_on TEXT NOT NULL DEFAULT to_char(NOW(), 'DD/MM/YYYY HH24:MI:SS')

);
