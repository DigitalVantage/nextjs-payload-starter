import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, locales, type Locale } from './config'

const LOCALE_COOKIE = 'NEXT_LOCALE'

function pickLocaleFromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined
  const candidates = header
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean) as string[]

  for (const candidate of candidates) {
    const short = candidate.split('-')[0] as Locale
    if (locales.includes(short)) return short
  }
  return undefined
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const requestHeaders = await headers()

  const fromCookie = cookieStore.get(LOCALE_COOKIE)?.value as Locale | undefined
  const fromHeader = pickLocaleFromAcceptLanguage(requestHeaders.get('accept-language'))

  const locale: Locale =
    (fromCookie && locales.includes(fromCookie) ? fromCookie : undefined) ??
    fromHeader ??
    defaultLocale

  const messages = (await import(`./messages/${locale}.json`)).default

  return { locale, messages }
})
