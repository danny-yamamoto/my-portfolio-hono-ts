# Welcome to Hono🔥
- [Hono Docks](https://hono.dev/)

## Development
```bash
npm install
npm run dev
```

```bash
open http://localhost:8788
```

## Deployment
```bash
npm run deploy
```

## D1
```bash
export DATABASE_NAME="portfolio"
wrangler d1 create $DATABASE_NAME
```

```bash
wrangler d1 execute $DATABASE_NAME --local --file=./schema.sql
```

```bash
wrangler d1 execute $DATABASE_NAME --local --command='SELECT * FROM experience'
```

## Reference
- Hono
   - [Service Worker mode or Module Worker mode](https://hono.dev/getting-started/cloudflare-workers#service-worker-mode-or-module-worker-mode)
   - [Hono + Cloudflare Workers で REST API を作ってみよう](https://zenn.dev/azukiazusa/articles/hono-cloudflare-workers-rest-api#hello-world)
- KV
   - [Cloudflare Workers + Durable Objects でホワイトボードを作ってみた](https://jinjor-labo.hatenablog.com/entry/2022/03/22/021059)
   - [Cloudflare Workers KV をローカルで使おうとしたらハマった](https://zenn.dev/egstock_inc/articles/95aa6a97caf39a)
- D1
   - [Remix v2をCloudflare Pages + D1で動かすチュートリアル](https://zenn.dev/necocoa/articles/remix-v2-with-cloudflare-pages-d1)
