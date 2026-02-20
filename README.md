# Prisma Models Generator

A [Prisma generator](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model#generators) that automatically creates TypeScript model classes for each entity in your Prisma schema. Each generated model provides type-safe CRUD methods, pagination support, and a consistent API for working with your database.

## Features

- **Model classes** – One class per Prisma model with methods for `find`, `findFirst`, `findUnique`, `create`, `update`, `upsert`, `delete`, and more
- **Type-safe** – Uses Prisma's generated types (`WhereInput`, `CreateInput`, `Select`, `Omit`, etc.)
- **Pagination** – Built-in `paginate()` method with configurable page size
- **Prisma version support** – Compatible with Prisma 5.x and 6.x (uses version-specific templates)
- **Base utilities** – Shared `Model` base class and singleton `PrismaClient` wrapper
- **Type exports** – Per-model type definitions in a dedicated `types/` folder

## Installation

```bash
npm install prisma-models-generator
# or
yarn add prisma-models-generator
# or
pnpm add prisma-models-generator
```

## Setup

Add the generator to your `schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

generator prismaModels {
  provider = "prisma-models-generator"
  output   = "./_gen/prisma-models"
}
```

Then run:

```bash
npx prisma generate
```

The generator requires `prisma-client-js` to run first, so ensure it appears before `prisma-models-generator` in your schema (or Prisma will handle the order automatically).

## Configuration

| Option         | Type   | Default              | Description                                                                 |
|----------------|--------|----------------------|-----------------------------------------------------------------------------|
| `output`      | string | `./_gen/prisma-models` | Directory where generated files are written                               |
| `prismaVersion` | string | `auto`             | Prisma version for template selection. Use `"6.0.0"` or `"5.0.0"` to force a specific version |

### Example with custom output and version

```prisma
generator prismaModels {
  provider       = "prisma-models-generator"
  output         = "./src/generated/models"
  prismaVersion  = "6.0.0"
}
```

## Generated Output

For a schema with a `User` model, the generator produces:

```
_gen/prisma-models/
├── PrismaClient.ts    # Singleton Prisma client wrapper
├── Model.ts           # Base model class with pagination helpers
├── types.ts           # Pagination, Sort, and shared types
├── User.ts            # UserModel class
└── types/
    └── User.ts        # User-related type exports
```

### PrismaClient.ts

A singleton wrapper around `@prisma/client`:

```typescript
import PrismaClient from './PrismaClient';

const client = PrismaClient.getClient();
```

### Model.ts

Base class providing:
- `getPaginate()` – Pagination metadata (totalRecords, totalPages, page, take, skip)
- `chooseSelectOrInclude()` – Helper for select/include usage
- Configurable `MIN_TAKE_VALUE` and `MAX_TAKE_VALUE` for pagination limits

### Per-model classes (e.g., User.ts)

Each model class extends `Model` and exposes:

| Method       | Description                                      |
|--------------|--------------------------------------------------|
| `all()`      | `findMany()` with no filters                     |
| `find()`     | `findMany()` with where, select, omit, orderBy, cursor, take, skip |
| `findFirst()`| `findFirst()` with where, select, omit            |
| `findUnique()` | `findUnique()` with where, select, omit        |
| `create()`   | `create()` with data, select, omit                |
| `createMany()` | `createMany()` with data array                  |
| `update()`   | `update()` with where, data, select, omit         |
| `updateMany()` | `updateMany()` with where, data                 |
| `upsert()`   | `upsert()` with where, create, update, select, omit |
| `delete()`   | `delete()` with where, select, omit               |
| `deleteMany()` | `deleteMany()` with where                       |
| `paginate()` | Returns pagination metadata for a given where clause |

### Per-model types (e.g., types/User.ts)

Exports:
- `User` – The Prisma model type
- `NewUser` – `Prisma.UserCreateInput`
- `updateUser` – `Prisma.UserUpdateInput`
- `FindFirstUser` – `Prisma.UserWhereInput`
- `FindUniqueUser` – `Prisma.UserWhereUniqueInput`
- `FindManyUser` – `Prisma.UserWhereInput`

## Usage Example

```typescript
import { UserModel } from './_gen/prisma-models/User';
import type { NewUser } from './_gen/prisma-models/types/User';

const userModel = new UserModel();

// Create a user
const user = await userModel.create({
  data: {
    email: 'user@example.com',
    name: 'Jane Doe',
  },
});

// Find with filters
const users = await userModel.find(
  { email: { contains: '@example.com' } },
  null,
  null,
  { take: 10, orderBy: { createdAt: 'desc' } }
);

// Pagination
const pagination = await userModel.paginate(1, 20, { isActive: true });
// Returns: { totalRecords, totalPages, page, take, skip }
```

## Prisma Version Support

The generator uses different templates for Prisma 5.x and 6.x to match API changes (e.g. `omit` support in Prisma 6). Version detection is automatic based on your installed `@prisma/client`, or you can set `prismaVersion` in the generator config.

## License

MIT
