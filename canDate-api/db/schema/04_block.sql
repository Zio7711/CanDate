DROP TABLE IF EXISTS block CASCADE;
CREATE TABLE block (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  block_user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
