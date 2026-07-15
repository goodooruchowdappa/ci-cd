# Simple Backend CI/CD

A minimal Node.js and Express API with GitHub Actions continuous integration and optional automatic deployment to Render.

## Run locally

Requires Node.js 20 or later.

```bash
npm install
npm start
```

The API runs at `http://localhost:3000`.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/` | Service message |
| GET | `/health` | Health check |
| GET | `/api/tasks` | List in-memory tasks |
| POST | `/api/tasks` | Create a task with `{ "title": "..." }` |

## CI/CD

Every pull request and push runs `npm install` and `npm test`. Pushes to `main` then trigger a Render deployment if the `RENDER_DEPLOY_HOOK` GitHub Actions secret is configured.

### One-time deployment setup

1. Create a free Render Web Service from this GitHub repository, or use the included `render.yaml` Blueprint.
2. In Render, copy the service's Deploy Hook URL.
3. On GitHub, open the repository's **Settings → Secrets and variables → Actions** and create a secret named `RENDER_DEPLOY_HOOK` with that URL.
4. Push to `main`. GitHub Actions runs the tests and triggers deployment only after they pass.

Render can also deploy directly from the connected GitHub repository. If you choose that option, the deploy-hook job is safely skipped unless the secret is set.
