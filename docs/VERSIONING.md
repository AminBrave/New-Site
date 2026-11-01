# Versioning, commits and releases

The site follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). Every release has an entry in
[CHANGELOG.md](../CHANGELOG.md) ([Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format).

## Which number to bump

| Bump | When | Examples |
| --- | --- | --- |
| **MAJOR** (2.0.0) | A change that breaks how you work with the project | Removing or renaming a field in `Theme`, `Content` or `site.config.ts`; changing the hosting base path scheme |
| **MINOR** (1.2.0) | New capability, backwards compatible | A new section, a new preset or variant, a new dev tool, a new npm script |
| **PATCH** (1.1.1) | Fixes and content | Copy edits, a contrast fix, a bug fix, dependency updates with no visible change |

Edits to text in `src/data/` are PATCH releases. Adding a saved preset from the Theme lab is not a release by itself;
release when you change what the site ships or how the project works.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): summary`.

| Type | Use for | Changelog section |
| --- | --- | --- |
| `feat` | New capability | Added |
| `fix` | Bug fix | Fixed |
| `refactor`, `perf` | Internal change, same behavior | Changed |
| `docs`, `test`, `chore`, `ci`, `build` | Everything else | Usually omitted, or Changed when visible |
| `feat!` or a `BREAKING CHANGE:` footer | Breaking change | Changed, plus a MAJOR bump |

Scopes used so far: `theme`, `theme-lab`, `content`, `styles`, `ci`.

## Cutting a release

1. Move the entries under `## [Unreleased]` in `CHANGELOG.md` into a new `## [x.y.z] - YYYY-MM-DD` section and update the
   compare links at the bottom.
2. Set `"version"` in `package.json` to `x.y.z`.
3. Run `npm run verify`.
4. Commit as `chore(release): x.y.z`, then tag it:
   `git tag -a vx.y.z -m "x.y.z" && git push origin main --tags`.

## Tagging the reconstructed history

Versions 0.1.0 to 1.0.0 were reconstructed from commits (see the note at the top of the changelog). To make them real
tags, run these once from a full clone:

```sh
git tag -a v0.1.0  2031db7 -m "0.1.0"
git tag -a v0.2.0  9895e42 -m "0.2.0"
git tag -a v0.3.0  7c4add0 -m "0.3.0"
git tag -a v0.4.0  c209f6a -m "0.4.0"
git tag -a v0.5.0  d9b1ebf -m "0.5.0"
git tag -a v0.6.0  5304ddf -m "0.6.0"
git tag -a v0.7.0  0a965a0 -m "0.7.0"
git tag -a v0.8.0  e50e9fb -m "0.8.0"
git tag -a v0.9.0  6797a06 -m "0.9.0"
git tag -a v0.10.0 59b09f1 -m "0.10.0"
git tag -a v0.11.0 5d03578 -m "0.11.0"
git tag -a v1.0.0  bb86f38 -m "1.0.0"
git push origin --tags
```

Tag `v1.1.0` on the merge commit of the Theme lab pull request.
