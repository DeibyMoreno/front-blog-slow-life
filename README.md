# Slow Life Blog

Blog editorial para la marca de moda **Slow Life**. Construido con Next.js 16
(App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI),
Apollo Client y Auth.js v5.

## Marca

**Slow Life** es un estilo de vida que celebra la belleza de lo simple:
desconectar el ritmo acelerado de la ciudad y reconectar con lo que realmente
importa — la naturaleza, los amigos y la familia. Nuestra ropa refleja ese
espíritu, diseñada para que te sientas cómodo y relajado mientras disfrutas de
los momentos que valen la pena. Vivir a tu propio ritmo.

## Stack

| Capa           | Tecnología                                                          |
| -------------- | ------------------------------------------------------------------- |
| Framework      | [Next.js 16](https://nextjs.org) (App Router, Server Components)    |
| Lenguaje       | TypeScript (modo estricto)                                          |
| Estilos/UI     | Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) sobre Base UI  |
| Datos          | Apollo Client + `@apollo/client-integration-nextjs` (RSC y cliente) |
| Tipado GraphQL | GraphQL Codegen (`client` preset) → TypedDocumentNode               |
| Auth           | [Auth.js v5](https://authjs.dev) (`next-auth@beta`), estrategia JWT |
| Contenido      | Markdown vía `react-markdown` + `remark-gfm`                        |

## Empezar

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                  # http://localhost:3000
```

Scripts útiles:

```bash
npm run dev          # servidor de desarrollo
npm run build        # build de producción
npm run start        # sirve el build
npm run lint         # ESLint
npm run typecheck    # TypeScript sin emitir
npm run codegen      # regenera tipos en src/gql/ desde schema.graphql + src/graphql/
```

## Variables de entorno

| Variable                      | Descripción                                    |
| ----------------------------- | ---------------------------------------------- |
| `GRAPHQL_API_URL`             | Endpoint GraphQL (server-side / SSR y codegen) |
| `NEXT_PUBLIC_GRAPHQL_API_URL` | Endpoint GraphQL expuesto al navegador         |
| `AUTH_SECRET`                 | Secreto para firmar los JWT de Auth.js         |
| `NEXT_PUBLIC_SITE_URL`        | URL pública del sitio (metadatos y sitemap)    |
| `DEMO_ADMIN_EMAIL/PASSWORD`   | Credenciales demo del panel (solo desarrollo)  |

## Integración de la API GraphQL

La app consume el backend GraphQL de Slow Life (`GRAPHQL_API_URL`) desde Server
Components con Apollo Client. El flujo es:

1. Las operaciones viven en `src/graphql/`, separadas por dominio:
   - `blog.graphql` — queries públicas de lectura (posts, categorías, tags).
   - `auth.graphql` — mutations de autenticación (login, refreshToken, logout).
   - `admin.graphql` — queries y mutations del panel (me, users, roles, CRUD),
     todas protegidas con la directiva `@auth` del backend.
2. `npm run codegen` genera los tipos y documentos en `src/gql/` a partir de
   `schema.graphql` (SDL local) más los documentos de `src/graphql/`.
   > Regenerá los tipos cada vez que edites un archivo `.graphql` o el schema.
3. Las páginas leen datos vía `src/lib/blog/api.ts`, que usa el cliente Apollo
   de servidor (`src/lib/apollo/server.ts`) con revalidación ISR.
4. El login del panel usa la mutation `login` desde
   `src/lib/auth/authenticate.ts` (Auth.js guarda los tokens en sesión).

> Nota: las operaciones de `admin.graphql` requieren enviar el token JWT en el
> header `Authorization`; todavía falta inyectarlo en las requests de Apollo.

## Paleta de marca

La paleta vive como tokens en `src/app/globals.css`:

- `ink` `#111111` — texto/negro principal
- `cream` `#FAFAF7` — fondo/blanco principal
- `sand` `#F2EFE8` — fondo secundario
- `sage` `#8FA58A` — acentos suaves
- `forest` `#4E6B50` — botones destacados
- `terra` `#8A6B4D` — detalles
- `linen` `#DDD2C2` — tarjetas
- `stone` `#6B6B6B` — texto secundario

## Estructura

```
src/
├── app/
│   ├── api/auth/[...nextauth]/   # route handler de Auth.js
│   ├── blog/[slug]/                # detalle de historia (SSG + SEO)
│   ├── blog/                       # blog de estilo de vida (dark)
│   ├── admin/                    # panel protegido
│   ├── login/                    # acceso al panel
│   ├── layout.tsx                # raíz (fuentes, metadata)
│   ├── page.tsx                  # home
│   ├── robots.ts / sitemap.ts    # SEO
├── auth.ts                       # configuración de Auth.js v5
├── proxy.ts                      # proxy de protección de /admin
├── components/
│   ├── blog/                     # tarjetas, featured, cuerpo de artículo
│   ├── site/                     # header, footer, logo
│   └── ui/                       # shadcn/ui (Base UI)
├── lib/
│   ├── apollo/                   # cliente RSC + wrapper cliente
│   ├── auth/                     # autenticación contra el backend
│   └── blog/                     # tipos de dominio y lectura de artículos
└── gql/                          # generado por GraphQL Codegen
```
