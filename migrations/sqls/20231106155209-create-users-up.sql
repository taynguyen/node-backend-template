CREATE TABLE users (
  id BIGINT NOT NULL PRIMARY KEY,
  name TEXT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  hashed_password TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by BIGINT,
  updated_at TIMESTAMPTZ,
  UNIQUE(name),
  UNIQUE(hashed_password)
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

CREATE TABLE user_roles (
  user_id BIGINT NOT NULL,
  role_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE user_permissions (
  user_id BIGINT NOT NULL,
  permission_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, permission_id),
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (permission_id) REFERENCES permissions (id)
);

CREATE TABLE role_permissions (
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles (id),
  FOREIGN KEY (permission_id) REFERENCES permissions (id)
);
