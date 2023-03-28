CREATE TABLE users (
    id                 SERIAL PRIMARY KEY,
    first_name         VARCHAR(50) NOT NULL,
    username           VARCHAR(50) NOT NULL UNIQUE, 
    password           TEXT NOT NULL,
    email              TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    profile_picture    TEXT,
    pw_reset_token     TEXT,
    pw_reset_token_exp TIMESTAMP,
    created_at         TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
    id                SERIAL PRIMARY KEY,
    post              TEXT NOT NULL,
    user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vote              INTEGER,
    created_at        TIMESTAMP DEFAULT NOW()
);

CREATE TABLE post_replies (
    id                SERIAL PRIMARY KEY,
    post_id           INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    reply_body        TEXT NOT NULL,
    user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at        TIMESTAMP DEFAULT NOW()
);