// Заявка с сайта → сообщение в Telegram администратору клиники.
// Нужны переменные окружения TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID (см. .env.example).
import type { APIRoute } from 'astro';

export const prerender = false;

const clean = (v: FormDataEntryValue | null, max = 120) =>
  String(v ?? '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, max);

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const POST: APIRoute = async ({ request }) => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  const respond = (status: number, ok: boolean, back = '/') =>
    wantsJson
      ? new Response(JSON.stringify({ ok }), { status, headers: { 'content-type': 'application/json' } })
      : Response.redirect(new URL(`${back}?lead=${ok ? 'ok' : 'error'}#cita`, request.url), 303);

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return respond(400, false);
  }

  const lang = clean(fd.get('lang'), 2) === 'ru' ? 'ru' : 'es';
  const back = lang === 'ru' ? '/ru/' : '/';

  // Ловушка для ботов: настоящий человек это поле не видит.
  if (clean(fd.get('website'))) return respond(200, true, back);

  const name = clean(fd.get('name'), 80);
  const phone = clean(fd.get('phone'), 24);
  const contactBy = clean(fd.get('contactBy'), 12) === 'whatsapp' ? 'WhatsApp' : 'звонок';
  const reason = clean(fd.get('reason'), 60);
  const consent = fd.get('consent') === 'yes';

  if (name.length < 2 || phone.replace(/\D/g, '').length < 9 || !consent) {
    return respond(422, false, back);
  }

  const token = import.meta.env.TELEGRAM_BOT_TOKEN ?? process.env.TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.TELEGRAM_CHAT_ID ?? process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('lead: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set');
    return respond(503, false, back);
  }

  const time = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Madrid',
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date());

  const text = [
    '<b>Новая заявка с сайта</b>',
    `Имя: ${escape(name)}`,
    `Телефон: ${escape(phone)}`,
    `Связаться: ${contactBy}`,
    reason && `Повод: ${escape(reason)}`,
    `Язык сайта: ${lang.toUpperCase()}`,
    `Время (Мадрид): ${time}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    });
    if (!res.ok) throw new Error(`telegram ${res.status}`);
  } catch (e) {
    console.error('lead: telegram send failed', e);
    return respond(502, false, back);
  }

  return respond(200, true, back);
};
