# API — Blog Slow Life CMS

API GraphQL **schema-first** construida con **graphql-yoga** bajo una arquitectura hexagonal (interfaces → application → domain). Sigue el patrón Relay de `Node` (id, createdAt, updatedAt) y usa DataLoaders para evitar problemas N+1.

---

## 1. Conexión

**Endpoint:** `POST /graphql` (raíz por defecto de graphql-yoga)

- **Host/Puerto por defecto:** `0.0.0.0:4000` (configurable vía `HOST` y `PORT`)
- **Content-Type:** `application/json`
- **GraphiQL:** disponible en modo development (`NODE_ENV=development`) en la misma ruta.
- **CORS:** orígenes y métodos configurables (`CORS_ORIGINS`, `CORS_METHODS`).
- **Rate limiting:** por defecto 100 requests / 15 min (`RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`).

### Formato de la petición

```json
{
  "query": "query { health { status } }",
  "variables": {},
  "operationName": null
}
```

```
POST /graphql
Content-Type: application/json
Authorization: Bearer <accessToken>
```

---

## 2. Autenticación

La API usa **JWT Bearer**. El token se envía en el header `Authorization`:

```
Authorization: Bearer <accessToken>
```

- El `accessToken` expira en **15 minutos** (`JWT_EXPIRES_IN`).
- El `refreshToken` expira en **7 días** (`REFRESH_TOKEN_EXPIRES_IN`).
- `@auth` sin `roles` exige solo estar autenticado.
- `@auth(roles: [...])` exige rol específico.

### Roles (`AuthRole`)

| Rol      | Permisos típicos                                  |
|----------|---------------------------------------------------|
| `ADMIN`  | Gestiona usuarios, roles, y todo el contenido     |
| `EDITOR` | Crea/edita contenido del blog                     |
| `VIEWER` | Solo lectura                                      |

> **Nota de implementación:** actualmente solo `login` está implementado. `refreshToken` y `logout` lanzan `"Not implemented yet"`.

### Flujo de inicio de sesión

1. Llamar a `login` con email y contraseña.
2. Recibir `AuthPayload` con `accessToken`, `refreshToken` y `user`.
3. Enviar el `accessToken` en el header `Authorization`.

---

## 3. Modelo de errores

Los errores se enmascaran mediante un plugin de error mask:

- **Errores de dominio (`AppError`)** exponen:
  - `extensions.code` — código interno.
  - `extensions.http.status` — código HTTP.
- **Errores inesperados** se devuelven de forma genérica como `"Unexpected error."` para no filtrar detalles internos.
- En **modo development**, los errores GraphQL también incluyen su mensaje y extensions originales para facilitar la depuración.

Ejemplo de respuesta de error:

```json
{
  "errors": [
    {
      "message": "Authentication required",
      "extensions": {
        "code": "UNAUTHORIZED",
        "http": { "status": 401 }
      }
    }
  ],
  "data": null
}
```

---

## 4. Types base

### Scalars

| Scalar      | Descripción                          |
|-------------|--------------------------------------|
| `DateTime`  | Timestamp (RFC 3339)                 |
| `UUID`      | Identificador universal              |
| `Email`     | Dirección de correo validada         |

### Enum `AuthRole`

`ADMIN` | `EDITOR` | `VIEWER`

### Interface `Node`

| Campo       | Tipo     | Nullable |
|-------------|----------|----------|
| `id`        | `UUID!`  | No       |
| `createdAt` | `DateTime!` | No    |
| `updatedAt` | `DateTime!` | No    |

### Type `HealthResponse`

```graphql
type HealthResponse {
  status: String!
  timestamp: DateTime!
  version: String!
  uptime: Float!
}
```

---

## 5. Domino Blog

### Scalar / enums

**`PostStatus`:** `DRAFT` | `PUBLISHED` | `ARCHIVED`

### Type `Post` (implementa `Node`)

| Campo         | Tipo        | Nullable | Descripción                          |
|---------------|-------------|----------|--------------------------------------|
| `id`          | `UUID!`     | No       |                                      |
| `title`       | `String!`   | No       | Título del post                      |
| `slug`        | `String!`   | No       | Slug único para URL                  |
| `content`     | `String`    | Sí       | Contenido del post                   |
| `excerpt`     | `String`    | Sí       | Resumen                              |
| `coverImage`  | `String`    | Sí       | URL de la imagen de portada          |
| `gallery`     | `[String!]` | Sí       | URLs de imágenes adicionales (galería) |
| `status`      | `PostStatus!` | No     |                                      |
| `author`      | `User!`     | No       | Autor del post                       |
| `category`    | `Category`  | Sí       | Categoría asociada                   |
| `tags`        | `[Tag!]!`   | No       | Etiquetas asociadas                  |
| `publishedAt` | `DateTime`  | Sí       | Fecha de publicación                 |
| `createdAt`   | `DateTime!` | No       |                                      |
| `updatedAt`   | `DateTime!` | No       |                                      |

### Type `Category` (implementa `Node`)

| Campo         | Tipo        | Nullable |
|---------------|-------------|----------|
| `id`          | `UUID!`     | No       |
| `name`        | `String!`   | No       |
| `slug`        | `String!`   | No       |
| `description` | `String`    | Sí       |
| `posts`       | `[Post!]!`  | No       |
| `createdAt`   | `DateTime!` | No       |
| `updatedAt`   | `DateTime!` | No       |

### Type `Tag` (implementa `Node`)

| Campo         | Tipo        | Nullable |
|---------------|-------------|----------|
| `id`          | `UUID!`     | No       |
| `name`        | `String!`   | No       |
| `slug`        | `String!`   | No       |
| `posts`       | `[Post!]!`  | No       |
| `createdAt`   | `DateTime!` | No       |
| `updatedAt`   | `DateTime!` | No       |

### Inputs del dominio Blog

```graphql
input CreatePostInput {
  title: String!
  content: String
  excerpt: String
  coverImage: String
  gallery: [String!]
  status: PostStatus = DRAFT
  categoryId: UUID
  tagIds: [UUID!]
}

input UpdatePostInput {
  title: String
  content: String
  excerpt: String
  coverImage: String
  gallery: [String!]
  status: PostStatus
  categoryId: UUID
  tagIds: [UUID!]
}

input CreateCategoryInput {
  name: String!
  description: String
}

input UpdateCategoryInput {
  name: String
  description: String
}

input CreateTagInput {
  name: String!
}
```

---

## 6. Dominio Administration

### Type `User` (implementa `Node`)

| Campo        | Tipo        | Nullable |
|--------------|-------------|----------|
| `id`         | `UUID!`     | No       |
| `email`      | `Email!`    | No       |
| `firstName`  | `String!`   | No       |
| `lastName`   | `String!`   | No       |
| `fullName`   | `String!`   | No       |
| `avatarUrl`  | `String`    | Sí       |
| `isActive`   | `Boolean!`  | No       |
| `role`       | `Role!`     | No       |
| `createdAt`  | `DateTime!` | No       |
| `updatedAt`  | `DateTime!` | No       |

### Type `Role` (implementa `Node`)

| Campo         | Tipo             | Nullable |
|---------------|------------------|----------|
| `id`          | `UUID!`          | No       |
| `name`        | `String!`        | No       |
| `description` | `String`         | Sí       |
| `permissions` | `[Permission!]!` | No       |
| `createdAt`   | `DateTime!`      | No       |
| `updatedAt`   | `DateTime!`      | No       |

### Type `Permission`

| Campo         | Tipo        | Nullable |
|---------------|-------------|----------|
| `id`          | `UUID!`     | No       |
| `resource`    | `String!`   | No       |
| `action`      | `String!`   | No       |
| `description` | `String`    | Sí       |
| `createdAt`   | `DateTime!` | No       |

### Type `AuthPayload`

| Campo          | Tipo            | Nullable |
|----------------|-----------------|----------|
| `accessToken`  | `String!`       | No       |
| `refreshToken` | `String!`       | No       |
| `user`         | `User!`         | No       |

### Inputs del dominio Administration

```graphql
input LoginInput {
  email: String!
  password: String!
}

input RefreshTokenInput {
  refreshToken: String!
}

input CreateUserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  roleId: UUID!
}

input CreateRoleInput {
  name: String!
  description: String
  permissionIds: [UUID!]
}
```

---

## 7. Queries

### Base

```graphql
health: HealthResponse!
```

**Ejemplo:**
```graphql
query {
  health {
    status
    timestamp
    version
    uptime
  }
}
```

### Blog

```graphql
posts(limit: Int = 10, offset: Int = 0, status: PostStatus): [Post!]!
post(id: UUID): Post
postBySlug(slug: String!): Post
categories: [Category!]!
category(id: UUID): Category
tags: [Tag!]!
tag(id: UUID): Tag
tagBySlug(slug: String!): Tag
```

> `posts` soporta **paginación** con `limit`/`offset` (por defecto `10` y `0`) y filtrado por `status`.

**Ejemplos:**
```graphql
query ListPosts {
  posts(limit: 5, offset: 0, status: PUBLISHED) {
    id
    title
    slug
    status
    publishedAt
    author {
      fullName
    }
    category {
      name
    }
    tags {
      name
    }
  }
}
```

```graphql
query GetPostBySlug {
  postBySlug(slug: "vida-lenta-y-atencion-plena") {
    id
    title
    content
  }
}
```

### Administration

```graphql
users: [User!]!
user(id: UUID): User
me: User!           # requiere autenticación (@auth)
roles: [Role!]!
role(id: UUID): Role
```

**Ejemplos:**
```graphql
query Me {
  me {
    id
    email
    fullName
    role {
      name
    }
  }
}
```

```graphql
query ListRoles {
  roles {
    id
    name
    permissions {
      id
      resource
      action
    }
  }
}
```

---

## 8. Mutations

> Todas las mutations de creación/edición llevan `@auth` con los roles indicados.

### Blog

```graphql
createPost(input: CreatePostInput!): Post!         # @auth(roles: [ADMIN, EDITOR])
updatePost(id: UUID!, input: UpdatePostInput!): Post! # @auth(roles: [ADMIN, EDITOR])
deletePost(id: UUID!): Boolean!                    # @auth(roles: [ADMIN])

createCategory(input: CreateCategoryInput!): Category! # @auth(roles: [ADMIN, EDITOR])
updateCategory(id: UUID!, input: UpdateCategoryInput!): Category! # @auth(roles: [ADMIN, EDITOR])
deleteCategory(id: UUID!): Boolean!                # @auth(roles: [ADMIN])

createTag(input: CreateTagInput!): Tag!            # @auth(roles: [ADMIN, EDITOR])
deleteTag(id: UUID!): Boolean!                     # @auth(roles: [ADMIN])
```

**Ejemplo — crear post:**
```graphql
mutation CreatePost {
  createPost(
    input: {
      title: "El arte de la pausa"
      content: "Contenido del post..."
      status: DRAFT
      categoryId: "uuid-categoria"
      tagIds: ["uuid-tag-1", "uuid-tag-2"]
    }
  ) {
    id
    title
    slug
    status
  }
}
```

### Administration

```graphql
login(input: LoginInput!): AuthPayload!
refreshToken(input: RefreshTokenInput!): AuthPayload!   # No implementado
logout: Boolean!                                        # No implementado

createUser(input: CreateUserInput!): User!              # @auth(roles: [ADMIN])
createRole(input: CreateRoleInput!): Role!              # @auth(roles: [ADMIN])
```

**Ejemplo — login:**
```graphql
mutation Login {
  login(
    input: {
      email: "autor@slowlife.blog"
      password: "supersecreta"
    }
  ) {
    accessToken
    refreshToken
    user {
      id
      fullName
      role {
        name
      }
    }
  }
}
```

---

## 9. Resumen de acceso por rol

| Operación                              | Público | Auth | ADMIN | EDITOR | VIEWER |
|----------------------------------------|:-------:|:----:|:-----:|:------:|:------:|
| `health`                               | ✅      |      |       |        |        |
| `posts`, `post`, `postBySlug`          | ✅      |      |       |        |        |
| `categories`, `category`               | ✅      |      |       |        |        |
| `tags`, `tag`, `tagBySlug`             | ✅      |      |       |        |        |
| `users`, `user`, `roles`, `role`       | ✅      |      |       |        |        |
| `me`                                   |         | ✅   | ✅    | ✅     | ✅     |
| `createPost`, `updatePost`             |         |      | ✅    | ✅     |        |
| `deletePost`                           |         |      | ✅    |        |        |
| `createCategory`, `updateCategory`     |         |      | ✅    | ✅     |        |
| `deleteCategory`                       |         |      | ✅    |        |        |
| `createTag`                            |         |      | ✅    | ✅     |        |
| `deleteTag`                            |         |      | ✅    |        |        |
| `createUser`                           |         |      | ✅    |        |        |
| `createRole`                           |         |      | ✅    |        |        |
| `login`                                | ✅      |      |       |        |        |
| `refreshToken`, `logout`               | ❌      |      |       |        |        |

---

## 10. Referencia rápida de bundles y ejecución

```bash
pnpm dev          # servidor dev (tsx watch, puerto 4000)
pnpm build        # build a dist/
pnpm start        # ejecutar build
```