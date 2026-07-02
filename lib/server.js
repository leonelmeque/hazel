const hazel = require('./index')

const {
  INTERVAL: interval,
  ACCOUNT: account,
  REPOSITORY: repository,
  TOKEN: token,
  URL: PRIVATE_BASE_URL,
  VERCEL_URL
} = process.env

const url = VERCEL_URL || PRIVATE_BASE_URL

// Env vars are strings, so `Boolean(process.env.PRE)` makes "0" TRUTHY — the
// classic Hazel footgun that flips it into pre-releases-only mode and hides your
// normal releases. Only treat an explicit 1/true as "serve pre-releases".
const pre = /^(1|true)$/i.test((process.env.PRE || '').trim())

// timelin is a monorepo with TWO release tracks (release-please tags
// `desktop-vX.Y.Z` and `mobile-vX.Y.Z`). Hazel otherwise grabs the single latest
// release — which can be a mobile tag with no macOS assets — so restrict it to
// desktop releases. Overridable via TAG_PREFIX (set to '' to consider all).
const tagPrefix =
  process.env.TAG_PREFIX === undefined ? 'desktop-' : process.env.TAG_PREFIX

module.exports = hazel({
  interval,
  account,
  repository,
  pre,
  token,
  url,
  tagPrefix
})
