// Генерирует статический сайт в site/ из tools/content.mjs.
// Запуск: node tools/build.mjs  (зависимостей нет; результат коммитится, Vercel только раздаёт site/)
import { writeFileSync, mkdirSync } from 'node:fs';
import { content, langs } from './content.mjs';
import { site } from './config.mjs';
import { esc, icon, monogram } from './lib.mjs';
import * as S from './sections.mjs';
import { legalBody } from './legal.mjs';

const OUT = new URL('../site/', import.meta.url);
const V = Date.now().toString(36); // версия ассетов для сброса кэша
const home = Object.fromEntries(langs.map((l) => [l, content[l].path]));
const legal = Object.fromEntries(langs.map((l) => [l, content[l].path + 'legal/']));

function jsonLd(t) {
  const a = site.address;
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: site.legalName,
    url: site.url + t.path,
    telephone: site.phone.e164,
    image: site.url + '/assets/og.jpg',
    priceRange: '€€',
    foundingDate: String(site.since),
    knowsLanguage: ['es', 'ru', 'en'],
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, postalCode: a.postalCode, addressRegion: a.region, addressCountry: a.country },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '10:00', closes: '16:30' }],
    sameAs: [site.instagram],
    hasMap: site.mapsUrl,
  };
}

function faqLd(t) {
  return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };
}

function head(t, lang, { title, description, alternates, noindex = false, ld = [] }) {
  const canonical = site.url + alternates[lang];
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">\n' : ''}<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
${langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${site.url + alternates[l]}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${site.url + alternates.es}">
<meta name="theme-color" content="#0d0f10">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Smile House">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/geologica-300-600-normal-${lang === 'ru' ? 'cyrillic' : 'latin'}.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts/fonts.css?v=${V}">
<link rel="stylesheet" href="/assets/css/main.css?v=${V}">
${ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/main.js?v=${V}" defer></script>
</head>`;
}

function booking(t, lang) {
  const b = t.booking;
  const chip = (name, k, l, type = 'radio') => `<label class="chip"><input type="${type}" name="${name}" value="${esc(k)}"><span>${esc(l)}</span></label>`;
  const doctors = [{ id: 'any', name: b.anyDoctor }, ...t.team.doctors];
  return `<dialog class="sheet" id="book" aria-labelledby="book-h" data-sheet>
  <form class="sheet-in" method="dialog" novalidate data-book-form
    data-wa="${site.whatsapp}" data-lang="${lang}" data-i18n='${esc(JSON.stringify({ msg: b.msg, wd: b.weekdayShort, mo: b.months, any: b.anyDay, asap: b.asap, errReason: b.errReason, errName: b.errName, errConsent: b.errConsent, reasons: Object.fromEntries(b.reasons.map((r) => [r.k, r.l])), times: Object.fromEntries(b.times.map((r) => [r.k, r.l])), doctors: Object.fromEntries(doctors.map((d) => [d.id, d.name])) }))}'>
    <div class="sheet-top">
      <h2 class="h3" id="book-h">${esc(b.title)}</h2>
      <button type="button" class="icon-btn" data-close aria-label="${esc(t.nav.close)}">${icon('close')}</button>
    </div>
    <p class="sheet-lead">${esc(b.lead)}</p>
    <fieldset><legend>${esc(b.reason)}</legend><div class="chips">${b.reasons.map((r) => chip('reason', r.k, r.l)).join('')}</div><p class="err" data-err="reason" role="alert"></p></fieldset>
    <fieldset><legend>${esc(b.day)}</legend><div class="chips days" data-days>${chip('day', 'asap', b.asap)}</div></fieldset>
    <fieldset><legend>${esc(b.time)}</legend><div class="chips">${b.times.map((r) => chip('time', r.k, r.l)).join('')}</div></fieldset>
    <fieldset><legend>${esc(b.doctor)}</legend><div class="chips">${doctors.map((d) => chip('doctor', d.id, d.name)).join('')}</div></fieldset>
    <label class="field"><span>${esc(b.name)}</span><input name="name" autocomplete="given-name" maxlength="60"><span class="err" data-err="name" role="alert"></span></label>
    <label class="field"><span>${esc(b.note)}</span><textarea name="note" rows="2" maxlength="300" placeholder="${esc(b.notePh)}"></textarea></label>
    <label class="consent"><input type="checkbox" name="consent"><span>${esc(b.consent)} <a href="${legal[lang]}">${esc(b.privacy)}</a></span></label>
    <p class="err" data-err="consent" role="alert"></p>
    <div class="sheet-cta">
      <button type="submit" class="btn btn-coral btn-wide">${icon('whatsapp')} ${esc(b.send)}</button>
      <p class="sheet-call">${esc(b.orCall)} <a href="tel:${site.phone.e164}">${esc(site.phone.display)}</a></p>
    </div>
  </form>
</dialog>`;
}

function footer(t, lang) {
  return `<footer class="ftr">
  <div class="wrap ftr-grid">
    <div class="ftr-brand">${monogram()}<p>${esc(site.legalName)}<br>${esc(t.footer.since)}</p></div>
    <p class="ftr-addr">${esc(site.address.street)}<br>${esc(site.address.postalCode)} ${esc(site.address.city)}<br><a href="tel:${site.phone.e164}">${esc(site.phone.display)}</a> · <a href="${site.instagram}" target="_blank" rel="noopener">@smilehouse_vlc</a></p>
    <p class="ftr-legal">${esc(t.footer.registro)}: ${esc(site.registroSanitario ?? t.footer.registroPending)}<br><a href="${legal[lang]}">${esc(t.footer.legal)}</a> · <a href="${legal[lang]}#cookies">${esc(t.footer.cookies)}</a><br><span class="ftr-by">${esc(t.footer.madeBy)}</span></p>
  </div>
</footer>
<div class="dock" data-dock>
  <button type="button" class="btn btn-coral" data-book>${esc(t.cta.book)}</button>
  <a class="btn btn-ghost" href="https://wa.me/${site.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
  <a class="btn btn-ghost" href="tel:${site.phone.e164}" aria-label="${esc(t.cta.call)}">${icon('phone')}</a>
</div>
<div class="cookie" data-cookie hidden>
  <p>${esc(t.cookie.text)} <a href="${legal[lang]}#cookies">${esc(t.cookie.more)}</a></p>
  <div><button type="button" class="btn btn-line btn-sm" data-cookie-no>${esc(t.cookie.reject)}</button><button type="button" class="btn btn-coral btn-sm" data-cookie-yes>${esc(t.cookie.accept)}</button></div>
</div>
<script type="application/json" id="status-i18n">${JSON.stringify(t.status)}</script>`;
}

function page(lang) {
  const t = content[lang];
  const body = [
    S.hero(t, lang), S.voices(t, lang), S.caseFile(t, lang), S.beforeAfter(t), S.visit(t, lang),
    S.lens(t), S.team(t, lang), S.services(t), S.reviewsSec(t, lang), S.faq(t), S.contact(t),
  ].join('\n');
  return `${head(t, lang, { title: t.meta.title, description: t.meta.description, alternates: home, ld: [jsonLd(t), faqLd(t)] })}
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
${S.header(t, lang, home)}
<main id="main">
${body}
</main>
${footer(t, lang)}
${booking(t, lang)}
</body>
</html>
`;
}

function legalPage(lang) {
  const t = content[lang];
  const title = `${t.footer.legal} | Smile House`;
  return `${head(t, lang, { title, description: title, alternates: legal, noindex: true })}
<body class="page-legal">
<a class="skip" href="#main">${esc(t.skip)}</a>
${S.header(t, lang, legal).replace(/href="#/g, `href="${t.path}#`)}
<main id="main" class="wrap legal">${legalBody(lang)}</main>
${footer(t, lang)}
${booking(t, lang)}
</body>
</html>
`;
}

function write(rel, html) {
  const url = new URL(rel, OUT);
  mkdirSync(new URL('.', url), { recursive: true });
  writeFileSync(url, html);
}

for (const l of langs) {
  const p = content[l].path.replace(/^\//, '');
  write(`${p}index.html`, page(l));
  write(`${p}legal/index.html`, legalPage(l));
}
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${langs.map((l) => `<url><loc>${site.url}${home[l]}</loc>${langs.map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${site.url}${home[x]}"/>`).join('')}</url>`).join('\n')}
</urlset>
`);
console.log('built', langs.length * 2, 'pages, v', V);
