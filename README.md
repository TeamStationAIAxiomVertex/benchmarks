# benchmarks.teamstation.dev

Static Next.js export site for TeamStation benchmark content.

## Architecture

- Next.js App Router
- `output: "export"` with `trailingSlash: true`
- Build flow: `out/` export then copied to `build/`
- Domain target: `https://benchmarks.teamstation.dev`

## Route map

- `/`
- `/benchmarks/`
- `/benchmarks/[id]/` (500 static pages)
- `/categories/`
- `/categories/engineering-velocity/`
- `/categories/cost-efficiency/`
- `/categories/quality-reliability/`
- `/methodology/`
- `/about-data/`
- `/faq/`
- `/trust/`

## Content model

Source: `src/data/benchmarks.json`

Fields per record:
- `id`
- `title`
- `metric`
- `score`
- `summary`
- `source`
- `methodology`
- `lastUpdated`
- `category`
- `tags`

## Commands

Generate 500 records:

```sh
npm run seed:500
```

Build static export + SEO assets + build artifact:

```sh
npm run build
```

Validate code quality and content checks before release:

```sh
npm run validate
```

Static domain verification:

```sh
npm run verify:static
```

Voice enforcement verification:

```sh
npm run verify:humanizer
```

Release checklist command:

```sh
npm run release:static
```

## Writing policy

All user-facing text must be sourced through `src/lib/siteCopy.ts` and transformed by `src/lib/writingHumanizer.ts`.
`release:static` runs `verify:humanizer` and fails if app routes bypass this copy layer.

## Local setup for clean builds

1. Install Node.js 20+.
2. Install dependencies:

```sh
npm install
```

3. Install recommended VS Code extensions when prompted (from `.vscode/extensions.json`).
4. Run validation before building:

```sh
npm run validate
```

## FTP/SFTP deploy

```sh
FTP_HOST=your.droplet.host \
FTP_USER=your_user \
FTP_PASS=your_password \
FTP_PROTOCOL=sftp \
FTP_REMOTE_DIR=/var/www/benchmarks.teamstation.dev \
npm run deploy:ftp
```

Optional vars:
- `FTP_PROTOCOL`: `ftp`, `ftps`, `sftp` (default `ftp`)
- `FTP_PORT`: defaults to `21` (`22` auto for `sftp` if left at `21`)
- `LOCAL_DIR`: default `build`

## SEO assets

Static files committed in repo:
- `public/robots.txt`
- `public/sitemap.xml`

Verification checks validate domain consistency across:
- `public/`
- `out/`
- `build/`
