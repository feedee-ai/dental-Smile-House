// Секции главной. Каждая функция получает t (тексты языка) и lang.
import { esc, img, icon, monogram, mark } from './lib.mjs';
import { site, prices } from './config.mjs';
import { reviews, translatedNote } from './reviews.mjs';

const wa = (text = '') => `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const tel = `tel:${site.phone.e164}`;

function quote(id, lang, { cls = '', withDoctor = false } = {}) {
  const r = reviews[id];
  const note = translatedNote[lang][r.lang];
  return `<figure class="q ${cls}">
    <blockquote lang="${r.lang === lang ? lang : lang}"><p>${esc(r[lang])}</p></blockquote>
    <figcaption><span class="q-a">${esc(r.author)}</span><span class="q-s">Google${note ? ` · ${esc(note)}` : ''}</span></figcaption>
  </figure>`;
}

export function header(t, lang, alternates) {
  const others = ['es', 'ru', 'en']
    .map((l) => `<a href="${alternates[l]}" hreflang="${l}" lang="${l}"${l === lang ? ' aria-current="true"' : ''}>${l.toUpperCase()}</a>`)
    .join('');
  return `<header class="hdr" data-hdr>
  <a class="brand" href="${t.path}" aria-label="Smile House">${monogram()}<span class="brand-n">Smile House</span></a>
  <nav class="hdr-nav" aria-label="${esc(t.nav.menu)}">
    <a href="#casos">${esc(t.nav.cases)}</a><a href="#visita">${esc(t.nav.visit)}</a><a href="#equipo">${esc(t.nav.team)}</a><a href="#opiniones">${esc(t.nav.reviews)}</a><a href="#llegar">${esc(t.nav.contact)}</a>
  </nav>
  <div class="hdr-r">
    <div class="langs">${others}</div>
    <button class="btn btn-coral btn-sm" type="button" data-book>${esc(t.cta.book)}</button>
  </div>
</header>`;
}

export function hero(t, lang) {
  const [a, m, b] = t.hero.h1;
  const chips = t.booking.reasons.slice(0, 6)
    .map((r) => `<button type="button" class="chip" data-book="${r.k}">${esc(r.l)}</button>`).join('');
  return `<section class="hero" id="top" data-hero>
  <div class="hero-photo" data-iris>${img('hero', t.hero.photoAlt, { eager: true, sizes: '(min-width: 900px) 62vw, 100vw' })}</div>
  <div class="hero-scale" aria-hidden="true"><span></span></div>
  <div class="hero-body">
    <p class="hero-place">${esc(t.hero.place)}</p>
    <h1 class="h-hero" data-split>${esc(a)}${mark(m)}${esc(b)}</h1>
    <p class="hero-lead">${esc(t.hero.lead)}</p>
    <div class="hero-start">
      <p class="hero-start-l" id="start-l">${esc(t.hero.startLabel)}</p>
      <div class="chips" role="group" aria-labelledby="start-l">${chips}</div>
    </div>
    <div class="hero-cta">
      <button type="button" class="btn btn-coral" data-book>${esc(t.cta.book)} ${icon('arrow')}</button>
      <a class="btn btn-ghost" href="${wa()}" target="_blank" rel="noopener">${icon('whatsapp')} ${esc(t.cta.whatsapp)}</a>
    </div>
    <p class="hero-meta"><span class="status" data-status></span><span>${esc(t.hero.langs)}</span></p>
  </div>
</section>`;
}

export function voices(t, lang) {
  return `<section class="voices" aria-labelledby="voices-h">
  <div class="wrap">
    <h2 class="h2" id="voices-h">${esc(t.voices.title)}</h2>
    <div class="voices-list">${t.voices.ids.map((id, i) => quote(id, lang, { cls: `q-big q-${i}` })).join('')}</div>
  </div>
</section>`;
}

export function caseFile(t, lang) {
  const c = t.caseFile;
  const steps = c.steps.map((s, i) => `<li class="cf-step" data-step="${i}">
      <p class="cf-mm"><span class="num">${esc(s.mm)}</span> <span class="u">mm</span></p>
      <h3 class="h3">${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('');
  return `<section class="cf" id="casos" aria-labelledby="cf-h" data-case>
  <div class="wrap">
    <h2 class="h2 cf-h" id="cf-h">${esc(c.title)}</h2>
    <p class="lead cf-lead">${esc(c.lead)}</p>
    <div class="cf-grid">
      <div class="cf-viewer" aria-hidden="true">
        <div class="cf-screen">
          <div class="cf-img cf-before">${img('cbct-before', c.before, { sizes: '(min-width: 900px) 44vw, 92vw' })}</div>
          <div class="cf-img cf-after">${img('cbct-after', c.after, { sizes: '(min-width: 900px) 44vw, 92vw' })}</div>
          <span class="cf-cross cf-cross-x"></span><span class="cf-cross cf-cross-y"></span>
          <p class="cf-tag"><span data-cf-tag>${esc(c.before)}</span></p>
        </div>
        <div class="cf-ruler">
          <div class="cf-bar"><span class="cf-fill" data-cf-fill></span></div>
          <ol class="cf-ticks">${[10, 7.5, 5, 2.5, 0].map((v) => `<li>${String(v).replace('.', lang === 'en' ? '.' : ',')}</li>`).join('')}</ol>
        </div>
        <p class="cf-read"><span class="num" data-cf-num>${lang === 'en' ? '2.5' : '2,5'}</span><span class="u">${esc(c.unit)}</span></p>
      </div>
      <ol class="cf-steps">${steps}</ol>
    </div>
    <p class="cf-src"><a class="link" href="${c.url}" target="_blank" rel="noopener">${esc(c.source)} ${icon('out')}</a></p>
  </div>
</section>`;
}

export function beforeAfter(t) {
  const b = t.ba;
  const tabs = b.cases.map((c, i) => `<button type="button" role="tab" class="tab" id="ba-t-${c.id}" aria-controls="ba-p-${c.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(c.label)}</button>`).join('');
  const names = { wear: ['wear-before', 'wear-after'], metal: ['metal-before', 'metal-after'] };
  const panels = b.cases.map((c, i) => `<div class="ba-p" role="tabpanel" id="ba-p-${c.id}" aria-labelledby="ba-t-${c.id}"${i ? ' hidden' : ''}>
      <div class="ba" data-ba style="--x:50%">
        ${img(names[c.id][0], `${b.before}: ${c.label}`, { sizes: '(min-width: 1100px) 1000px, 100vw', cls: 'ba-b' })}
        <div class="ba-a">${img(names[c.id][1], `${b.after}: ${c.label}`, { sizes: '(min-width: 1100px) 1000px, 100vw' })}</div>
        <span class="ba-l ba-l-b">${esc(b.before)}</span><span class="ba-l ba-l-a">${esc(b.after)}</span>
        <span class="ba-h" aria-hidden="true"><span></span></span>
        <input class="ba-r" type="range" min="0" max="100" value="50" aria-label="${esc(b.handle)}">
      </div>
      <div class="ba-note"><p>${esc(c.note)}</p><a class="link" href="${c.url}" target="_blank" rel="noopener">${esc(b.open)} ${icon('out')}</a></div>
    </div>`).join('');
  return `<section class="bas" aria-labelledby="ba-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="ba-h">${esc(b.title)}</h2><p class="lead">${esc(b.lead)}</p></div>
    <div class="tabs" role="tablist" aria-label="${esc(b.title)}">${tabs}</div>
    ${panels}
  </div>
</section>`;
}

export function visit(t, lang) {
  const v = t.visit;
  const [a, m, b] = v.title;
  const steps = v.steps.map((s, i) => `<li><span class="v-n" aria-hidden="true">${i + 1}</span><div><h3 class="h3">${esc(s.t)}</h3><p>${esc(s.d)}</p></div></li>`).join('');
  return `<section class="visit light" id="visita" aria-labelledby="visit-h">
  <div class="wrap visit-grid">
    <div class="visit-media" data-reveal>${img('explain', v.photoAlt, { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
    <div class="visit-body">
      <h2 class="h2" id="visit-h">${esc(a)}${mark(m)}${esc(b)}</h2>
      <p class="lead">${esc(v.lead)}</p>
      <ol class="visit-steps">${steps}</ol>
    </div>
  </div>
  <div class="wrap visit-quotes">${v.quotes.map((id) => quote(id, lang)).join('')}</div>
</section>`;
}

export function lens(t) {
  const l = t.lens;
  const items = l.items.map((it) => `<li class="lens-i">
      <div class="lens-ph">${img(it.img, it.t, { sizes: '(min-width: 900px) 24vw, 72vw' })}</div>
      <h3 class="h3">${esc(it.t)}</h3><p>${esc(it.d)}</p></li>`).join('');
  return `<section class="lens" aria-labelledby="lens-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="lens-h">${esc(l.title)}</h2><p class="lead">${esc(l.lead)}</p></div>
  </div>
  <ul class="lens-rail" data-rail>${items}</ul>
  <div class="wrap lens-harvard">
    <div class="lens-hv-ph">${img('harvard', l.harvard.alt, { sizes: '(min-width: 900px) 46vw, 100vw' })}</div>
    <div><h3 class="h3">${esc(l.harvard.t)}</h3><p>${esc(l.harvard.d)}</p></div>
  </div>
</section>`;
}

export function team(t, lang) {
  const tm = t.team;
  const docs = tm.doctors.map((d) => {
    const r = reviews[d.review];
    const note = translatedNote[lang][r.lang];
    return `<li class="doc">
      <h3 class="doc-n">${esc(d.name)}</h3><p class="doc-r">${esc(d.role)}</p>
      <blockquote><p>${esc(r[lang])}</p></blockquote>
      <p class="q-s">${esc(r.author)} · Google${note ? ` · ${esc(note)}` : ''}</p>
      <button type="button" class="link" data-book data-doctor="${d.id}">${esc(t.cta.book)} ${icon('arrow')}</button>
    </li>`;
  }).join('');
  return `<section class="team light" id="equipo" aria-labelledby="team-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="team-h">${esc(tm.title)}</h2><p class="lead">${esc(tm.lead)}</p></div>
    <div class="team-grid">
      <div class="team-ph" data-reveal>${img('microscope', tm.photoAlt, { sizes: '(min-width: 900px) 34vw, 100vw' })}</div>
      <ul class="docs">${docs}</ul>
    </div>
  </div>
</section>`;
}

export function services(t) {
  const s = t.services;
  const rows = s.items.map((it) => `<li class="svc">
      <button type="button" class="svc-b" data-book="${it.key}">
        <span class="svc-t">${esc(it.t)}</span><span class="svc-d">${esc(it.d)}</span>
        <span class="svc-p">${esc(prices[it.key] ?? s.consult)}</span>
        <span class="svc-go" aria-hidden="true">${icon('arrow')}</span>
      </button></li>`).join('');
  return `<section class="services light" id="tratamientos" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="svc-h">${esc(s.title)}</h2><p class="lead">${esc(s.lead)}</p></div>
    <ul class="svcs">${rows}</ul>
  </div>
</section>`;
}

export function reviewsSec(t, lang) {
  const r = t.reviews;
  return `<section class="reviews light" id="opiniones" aria-labelledby="rev-h">
  <div class="wrap">
    <div class="sec-head"><h2 class="h2" id="rev-h">${esc(r.title)}</h2><p class="lead">${esc(r.lead)}</p></div>
    <div class="rev-cols">${r.ids.map((id) => quote(id, lang, { cls: 'q-card' })).join('')}</div>
    <p class="rev-all"><a class="btn btn-line" href="${site.reviewsUrl}" target="_blank" rel="noopener">${icon('google')} ${esc(r.all)}</a></p>
  </div>
</section>`;
}

export function faq(t) {
  const items = t.faq.items.map((f) => `<details class="fq"><summary><span>${esc(f.q)}</span>${icon('plus', 'i fq-i')}</summary><div class="fq-a"><p>${esc(f.a)}</p></div></details>`).join('');
  return `<section class="faq light" aria-labelledby="faq-h">
  <div class="wrap faq-grid">
    <h2 class="h2" id="faq-h">${esc(t.faq.title)}</h2>
    <div class="fqs">${items}</div>
  </div>
</section>`;
}

export function contact(t) {
  const c = t.contact;
  const a = site.address;
  return `<section class="contact" id="llegar" aria-labelledby="ct-h">
  <div class="wrap ct-grid">
    <div>
      <h2 class="h2" id="ct-h">${esc(c.title)}</h2>
      <p class="ct-addr">${esc(a.street)}<br>${esc(a.postalCode)} ${esc(a.city)} · ${esc(a.district)}</p>
      <p class="lead">${esc(c.near)}</p>
      <dl class="hours">
        <div><dt>${esc(c.weekdays)}</dt><dd class="num">10:00–16:30</dd></div>
        <div><dt>${esc(c.weekend)}</dt><dd>${esc(c.closedWord)}</dd></div>
      </dl>
      <p class="ct-status"><span class="status" data-status></span></p>
      <p class="ct-off">${esc(c.offHours)}</p>
      <div class="ct-cta">
        <a class="btn btn-coral" href="${wa()}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>
        <a class="btn btn-ghost" href="${tel}">${icon('phone')} ${esc(site.phone.display)}</a>
        <a class="btn btn-ghost" href="${site.mapsUrl}" target="_blank" rel="noopener">${icon('pin')} ${esc(c.route)}</a>
      </div>
    </div>
    <div class="map" data-map data-src="${esc(site.mapsEmbed)}">
      <div class="map-ph">
        <p class="map-c">${esc(c.mapConsent)}</p>
        <button type="button" class="btn btn-line" data-map-load>${icon('pin')} ${esc(c.mapShow)}</button>
      </div>
    </div>
  </div>
</section>`;
}
