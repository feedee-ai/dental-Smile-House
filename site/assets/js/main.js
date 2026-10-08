// Smile House — поведение страницы. Без зависимостей.
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} },
  };

  /* ---------- open / closed status (Europe/Madrid, пн–пт 10:00–16:30) ---------- */
  const st = JSON.parse($('#status-i18n')?.textContent || '{}');
  function madridNow() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Madrid', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).map((x) => [x.type, x.value]));
    const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    return { wd, min: +p.hour * 60 + +p.minute };
  }
  function statusText() {
    const { wd, min } = madridNow();
    const open = 600, close = 990, work = (d) => d >= 1 && d <= 5;
    if (work(wd) && min >= open && min < close) return { open: true, text: `${st.open} · ${st.until} 16:30` };
    let d = wd, add = 0;
    if (!(work(wd) && min < open)) { do { d = (d + 1) % 7; add++; } while (!work(d)); }
    const day = add === 0 ? st.today : add === 1 ? st.tomorrow : st.days[d];
    return { open: false, text: `${st.closed} · ${st.opens} ${day} ${st.at} 10:00` };
  }
  function paintStatus() {
    const s = statusText();
    $$('[data-status]').forEach((el) => { el.textContent = s.text; el.classList.toggle('is-open', s.open); });
  }
  if (st.open) { paintStatus(); setInterval(paintStatus, 60000); }

  /* ---------- header + dock ---------- */
  const hdr = $('[data-hdr]'), dock = $('[data-dock]'), hero = $('[data-hero]');
  let ticking = false;
  function onScroll() {
    const y = scrollY;
    hdr?.classList.toggle('solid', y > 24 || !hero);
    const past = hero ? y > hero.offsetHeight * 0.7 : y > 300;
    const nearEnd = innerHeight + y > document.documentElement.scrollHeight - 160;
    dock?.classList.toggle('on', past && !nearEnd);
    caseTick();
    ticking = false;
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  /* ---------- hero: split words + iris ---------- */
  function splitWords(root) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const w = document.createElement('span');
            w.className = 'w'; w.style.setProperty('--d', i++); w.textContent = part; frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'I') walk(n);
      });
    };
    walk(root);
  }
  const h1 = $('[data-split]');
  if (h1 && !reduce) splitWords(h1);
  const heroMark = hero && $('.mark', hero);
  if (heroMark && !reduce) heroMark.setAttribute('data-wipe', '');
  if (hero) {
    const start = () => requestAnimationFrame(() => {
      hero.classList.add('on');
      if (heroMark) setTimeout(() => heroMark.classList.add('on'), reduce ? 0 : 900);
    });
    const im = $('.hero-photo img', hero);
    if (reduce || !im || im.complete) start(); else { im.addEventListener('load', start, { once: true }); setTimeout(start, 1200); }
  }

  /* ---------- reveal + marks in sections ---------- */
  $$('main .mark').forEach((m) => { if (m !== heroMark && !reduce) m.setAttribute('data-wipe', ''); });
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  }), { rootMargin: '0px 0px -12% 0px' });
  $$('[data-reveal], main .mark[data-wipe]').forEach((el) => { if (el !== heroMark) io.observe(el); });

  /* ---------- case file: scroll drives the scan and the ruler ---------- */
  const cf = $('[data-case]');
  const cfSteps = cf ? $$('.cf-step', cf) : [];
  const cfFill = cf && $('[data-cf-fill]', cf), cfNum = cf && $('[data-cf-num]', cf), cfTag = cf && $('[data-cf-tag]', cf), cfAfter = cf && $('.cf-after', cf);
  const lang = document.documentElement.lang.slice(0, 2);
  const tagBefore = cfTag?.textContent, tagAfter = cfAfter?.querySelector('img')?.alt;
  const fmt = (v) => (Math.round(v * 10) / 10).toFixed(1).replace('.', lang === 'en' ? '.' : ',').replace(/[.,]0$/, '');
  function caseTick() {
    if (!cf || !cfSteps.length) return;
    const list = cfSteps[0].parentElement.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.55 - list.top) / (list.height - innerHeight * 0.3)));
    const k = Math.min(1, Math.max(0, (p - 0.2) / 0.55));
    const mm = 2.5 + 7.5 * (reduce ? (p > 0.6 ? 1 : 0) : k);
    cf.style.setProperty('--mm', mm.toFixed(2));
    cfNum.textContent = fmt(mm);
    const after = Math.min(1, Math.max(0, (p - 0.62) / 0.2));
    cf.style.setProperty('--after', after.toFixed(3));
    cfTag.textContent = after > 0.5 ? tagAfter : tagBefore;
    const active = Math.min(cfSteps.length - 1, Math.floor(p * cfSteps.length * 0.999));
    cfSteps.forEach((s, i) => s.classList.toggle('on', i === active));
  }

  /* ---------- before / after ---------- */
  $$('[data-ba]').forEach((ba) => {
    const r = $('.ba-r', ba);
    const set = (v) => ba.style.setProperty('--x', `${v}%`);
    r.addEventListener('input', () => { ba.classList.remove('hint'); set(r.value); });
    if (!reduce) {
      const o = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) return; o.disconnect();
        ba.classList.add('hint');
        setTimeout(() => set(32), 150); setTimeout(() => set(66), 1150); setTimeout(() => { set(50); setTimeout(() => ba.classList.remove('hint'), 950); }, 2150);
      }, { threshold: 0.6 });
      o.observe(ba);
    }
  });
  $$('[role="tablist"]').forEach((tl) => {
    const tabs = $$('[role="tab"]', tl);
    const pick = (t) => {
      tabs.forEach((x) => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute('aria-controls')).hidden = !on; });
      t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => pick(t));
      t.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') pick(tabs[(i + 1) % tabs.length]);
        if (e.key === 'ArrowLeft') pick(tabs[(i - 1 + tabs.length) % tabs.length]);
      });
    });
  });

  /* ---------- booking sheet → WhatsApp ---------- */
  const sheet = $('[data-sheet]'), form = $('[data-book-form]');
  if (sheet && form) {
    const L = JSON.parse(form.dataset.i18n);
    const days = $('[data-days]', form);
    // ближайшие 10 рабочих дней по времени Мадрида
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
    const d = new Date(now); let added = 0;
    if (now.getHours() * 60 + now.getMinutes() >= 990) d.setDate(d.getDate() + 1);
    while (added < 10) {
      if (d.getDay() >= 1 && d.getDay() <= 5) {
        const label = `${L.wd[d.getDay()]} ${d.getDate()} ${L.mo[d.getMonth()]}`;
        const lab = document.createElement('label'); lab.className = 'chip';
        lab.innerHTML = `<input type="radio" name="day" value="${label}"><span>${label}</span>`;
        days.append(lab); added++;
      }
      d.setDate(d.getDate() + 1);
    }
    const any = document.createElement('label'); any.className = 'chip';
    any.innerHTML = `<input type="radio" name="day" value="any"><span>${L.any}</span>`; days.append(any);

    let lastFocus = null;
    const open = (reason, doctor) => {
      lastFocus = document.activeElement;
      if (reason) { const i = form.querySelector(`input[name="reason"][value="${reason}"]`); if (i) i.checked = true; }
      if (doctor) { const i = form.querySelector(`input[name="doctor"][value="${doctor}"]`); if (i) i.checked = true; }
      sheet.showModal();
      document.documentElement.style.overflow = 'hidden';
    };
    const close = () => {
      if (!sheet.open) return;
      if (reduce) { sheet.close(); return; }
      sheet.classList.add('closing');
      setTimeout(() => { sheet.classList.remove('closing'); sheet.close(); }, 250);
    };
    sheet.addEventListener('close', () => { document.documentElement.style.overflow = ''; lastFocus?.focus?.(); });
    sheet.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
    sheet.addEventListener('click', (e) => { if (e.target === sheet) close(); });
    $$('[data-close]', sheet).forEach((b) => b.addEventListener('click', close));
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-book]');
      if (!b || sheet.contains(b)) return;
      e.preventDefault();
      open(b.dataset.book || '', b.dataset.doctor || '');
    });

    const err = (k, m) => { const el = form.querySelector(`[data-err="${k}"]`); if (el) el.textContent = m || ''; };
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const f = new FormData(form);
      const reason = f.get('reason'), name = (f.get('name') || '').toString().trim();
      err('reason', reason ? '' : L.errReason);
      err('name', name ? '' : L.errName);
      err('consent', f.get('consent') ? '' : L.errConsent);
      if (!reason) { form.querySelector('input[name="reason"]').focus(); return; }
      if (!name) { form.querySelector('input[name="name"]').focus(); return; }
      if (!f.get('consent')) { form.querySelector('input[name="consent"]').focus(); return; }
      const m = L.msg, day = f.get('day'), time = f.get('time'), doc = f.get('doctor'), note = (f.get('note') || '').toString().trim();
      const lines = [m.hello, '', `${m.reason}: ${L.reasons[reason]}`];
      if (day) lines.push(`${m.day}: ${day === 'any' ? L.any : day === 'asap' ? L.asap : day}`);
      if (time) lines.push(`${m.time}: ${L.times[time]}`);
      if (doc) lines.push(`${m.doctor}: ${L.doctors[doc]}`);
      lines.push(`${m.name}: ${name}`);
      if (note) lines.push(`${m.note}: ${note}`);
      lines.push(`${m.lang}: ${m.langVal}`);
      const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener');
      close();
    });
  }

  /* ---------- map consent ---------- */
  const KEY = 'sh-map';
  const loadMap = () => $$('[data-map]').forEach((m) => {
    if (m.querySelector('iframe')) return;
    const f = document.createElement('iframe');
    f.src = m.dataset.src; f.loading = 'lazy'; f.title = 'Google Maps'; f.referrerPolicy = 'no-referrer-when-downgrade';
    m.append(f); m.querySelector('.map-ph')?.remove();
  });
  const banner = $('[data-cookie]');
  const choice = store.get(KEY);
  if (choice === 'yes') loadMap();
  if (!choice && banner) banner.hidden = false;
  $('[data-cookie-yes]')?.addEventListener('click', () => { store.set(KEY, 'yes'); banner.hidden = true; loadMap(); });
  $('[data-cookie-no]')?.addEventListener('click', () => { store.set(KEY, 'no'); banner.hidden = true; });
  $$('[data-map-load]').forEach((b) => b.addEventListener('click', () => { store.set(KEY, 'yes'); if (banner) banner.hidden = true; loadMap(); }));
  $$('[data-cookie-reset]').forEach((b) => b.addEventListener('click', () => { store.del(KEY); if (banner) banner.hidden = false; }));

  onScroll();
})();
