# Database Migrations

## Migration Framework Setup

### Knex.js Configuration

```bash
npm install knex pg
npx knex init
```

### knexfile.js

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'codex',
      password: 'password',
      database: 'codex',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations',
    },
  },
};
```

## Creating Migrations

### Generate Migration

```bash
npx knex migrate:make create_users_table
```

### Migration Example

```javascript
// src/database/migrations/001_create_users_table.js
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('name').notNullable();
    table.string('password_hash').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
```

### Another Migration

```javascript
// src/database/migrations/002_add_role_to_users.js
exports.up = function(knex) {
  return knex.schema.table('users', table => {
    table.enum('role', ['admin', 'user', 'guest'])
      .defaultTo('user');
  });
};

exports.down = function(knex) {
  return knex.schema.table('users', table => {
    table.dropColumn('role');
  });
};
```

## Running Migrations

```bash
# Run latest migrations
npx knex migrate:latest

# Run in production
NODE_ENV=production npx knex migrate:latest

# Rollback last batch
npx knex migrate:rollback

# Rollback all
npx knex migrate:rollback --all

# Get migration status
npx knex migrate:status

# Run specific migration
npx knex migrate:up 001_create_users_table.js
```

## Seeding Data

### Create Seed File

```bash
npx knex seed:make 01_initial_users
```

### Seed File

```javascript
// src/database/seeds/01_initial_users.js
exports.seed = async function(knex) {
  // Delete existing entries
  await knex('users').del();

  // Insert seed data
  await knex('users').insert([
    {
      email: 'admin@example.com',
      name: 'Admin User',
      password_hash: 'hashed_password',
      role: 'admin',
    },
    {
      email: 'user@example.com',
      name: 'Regular User',
      password_hash: 'hashed_password',
      role: 'user',
    },
  ]);
};
```

### Run Seeds

```bash
npx knex seed:run
```

## Best Practices

✅ One change per migration
✅ Descriptive migration names
✅ Include both up and down
✅ Test migrations locally
✅ Use transactions for safety
✅ Never modify old migrations
✅ Document breaking changes
✅ Backup before production migration
✅ Run migrations before deploy
✅ Verify migration success

## Migration Template

```javascript
exports.up = function(knex) {
  return knex.schema.alterTable('table_name', table => {
    // Changes here
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('table_name', table => {
    // Reverse changes here
  });
};
```

## Troubleshooting

**Migration fails**
```bash
# Check status
npx knex migrate:status

# Rollback and retry
npx knex migrate:rollback
npx knex migrate:latest
```

**Lock file exists**
```bash
# Force unlock (dangerous)
npx knex migrate:unlock
```

See database documentation for more.
