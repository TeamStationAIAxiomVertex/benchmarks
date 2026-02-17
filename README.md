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

Static domain verification:

```sh
npm run verify:static
```

Release checklist command:

```sh
npm run release:static
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

Generated automatically before build:
- `public/robots.txt`
- `public/sitemap.xml`

Verification checks validate domain consistency across:
- `public/`
- `out/`
- `build/`
