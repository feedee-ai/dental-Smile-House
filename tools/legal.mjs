// Aviso legal (LSSI-CE, art. 10), privacidad (RGPD) и cookies.
// ⚠️ Шаблон для демо: реквизиты клиники в [скобках] — заполнить и показать юристу клиники.
import { site } from './config.mjs';
import { esc } from './lib.mjs';

export function legalBody(lang) {
  const P = { es: '[pendiente]', ru: '[уточняется]', en: '[pending]' }[lang];
  const owner = esc(site.titular?.name ?? P);
  const nif = esc(site.titular?.nif ?? P);
  const email = esc(site.email ?? P);
  const reg = esc(site.registroSanitario ?? P);
  const addr = esc(`${site.address.street}, ${site.address.postalCode} ${site.address.city}`);
  const phone = esc(site.phone.display);

  if (lang === 'ru') return `<h1 class="h2">Правовая информация</h1>
<h2 class="h3">Владелец сайта</h2>
<p>В соответствии со ст. 10 Закона 34/2002 (LSSI-CE): владелец — ${owner}; NIF — ${nif}; адрес — ${addr}; телефон — ${phone}; email — ${email}. Медицинский центр внесён в реестр Conselleria de Sanidad Валенсийского сообщества под номером ${reg}.</p>
<h2 class="h3">Персональные данные</h2>
<p><strong>Ответственный:</strong> ${owner}, ${addr}.</p>
<p><strong>Как это работает:</strong> форма записи на сайте ничего не отправляет на наш сервер. Она собирает сообщение у вас в браузере и открывает WhatsApp; вы сами решаете, отправлять ли его.</p>
<p><strong>Какие данные:</strong> имя, удобные день и время, повод обращения и комментарий, если вы их укажете, а также номер WhatsApp, с которого вы пишете.</p>
<p><strong>Зачем:</strong> чтобы ответить и записать вас на приём. Рекламу не отправляем.</p>
<p><strong>Основание:</strong> ваше согласие (ст. 6.1.a и, для повода обращения, ст. 9.2.a GDPR). Его можно отозвать в любой момент.</p>
<p><strong>Сколько храним:</strong> до записи на приём, но не дольше ${P}. Если вы станете пациентом, действуют правила о медицинской карте.</p>
<p><strong>Кто ещё видит данные:</strong> WhatsApp (Meta Platforms Ireland Ltd.) — по его собственной политике; хостинг сайта — Vercel Inc. [Проверить список подрядчиков до публикации.]</p>
<p><strong>Ваши права:</strong> доступ, исправление, удаление, возражение, ограничение и переносимость — по адресу ${email}. Жалобу можно подать в Agencia Española de Protección de Datos (aepd.es).</p>
<h2 class="h3" id="cookies">Cookies</h2>
<p>Сайт не использует рекламные и аналитические cookies. В браузере сохраняется только ваш выбор насчёт карты.</p>
<p>Карта Google загружается, только если вы разрешите. После этого Google может установить свои cookies (policies.google.com).</p>
<p><button type="button" class="btn btn-line btn-sm" data-cookie-reset>Изменить выбор</button></p>`;

  if (lang === 'en') return `<h1 class="h2">Legal notice and privacy</h1>
<h2 class="h3">Website owner</h2>
<p>Under article 10 of Spanish Law 34/2002 (LSSI-CE): owner — ${owner}; tax ID (NIF) — ${nif}; address — ${addr}; phone — ${phone}; email — ${email}. Healthcare centre registered with the Conselleria de Sanidad of the Valencian Community under number ${reg}.</p>
<h2 class="h3">Personal data</h2>
<p><strong>Controller:</strong> ${owner}, ${addr}.</p>
<p><strong>How it works:</strong> the booking form on this site sends nothing to our server. It builds a message in your browser and opens WhatsApp; you decide whether to send it.</p>
<p><strong>What data:</strong> your name, preferred day and time, the reason and note if you add them, and the WhatsApp number you write from.</p>
<p><strong>Why:</strong> to reply and book your visit. We do not send advertising.</p>
<p><strong>Legal basis:</strong> your consent (GDPR art. 6.1.a and, for the reason for your visit, art. 9.2.a). You can withdraw it at any time.</p>
<p><strong>How long:</strong> until your visit is booked and at most ${P}. If you become a patient, clinical-record rules apply.</p>
<p><strong>Who else sees it:</strong> WhatsApp (Meta Platforms Ireland Ltd.) under its own policy; website hosting by Vercel Inc. [Review processors before publishing.]</p>
<p><strong>Your rights:</strong> access, rectification, erasure, objection, restriction and portability at ${email}. You can complain to the Agencia Española de Protección de Datos (aepd.es).</p>
<h2 class="h3" id="cookies">Cookies</h2>
<p>This site uses no advertising or analytics cookies. Your browser only stores your choice about the map.</p>
<p>The Google map only loads if you allow it. Google may then set its own cookies (policies.google.com).</p>
<p><button type="button" class="btn btn-line btn-sm" data-cookie-reset>Change my choice</button></p>`;

  return `<h1 class="h2">Aviso legal y privacidad</h1>
<h2 class="h3">Titular del sitio web</h2>
<p>En cumplimiento del artículo 10 de la Ley 34/2002 (LSSI-CE): titular, ${owner}; NIF, ${nif}; domicilio, ${addr}; teléfono, ${phone}; email, ${email}. Centro sanitario inscrito en el registro de la Conselleria de Sanidad de la Generalitat Valenciana con el número ${reg}.</p>
<h2 class="h3">Protección de datos</h2>
<p><strong>Responsable:</strong> ${owner}, ${addr}.</p>
<p><strong>Cómo funciona:</strong> el formulario de cita no envía nada a nuestro servidor. Prepara un mensaje en tu navegador y abre WhatsApp; tú decides si lo envías.</p>
<p><strong>Qué datos:</strong> nombre, día y franja que te van bien, motivo y nota si los indicas, y el número de WhatsApp desde el que escribes.</p>
<p><strong>Para qué:</strong> responderte y darte cita. No enviamos publicidad.</p>
<p><strong>Base legal:</strong> tu consentimiento (art. 6.1.a y, para el motivo de la consulta, art. 9.2.a del RGPD). Puedes retirarlo en cualquier momento.</p>
<p><strong>Cuánto tiempo:</strong> hasta gestionar la cita y, como máximo, ${P}. Si pasas a ser paciente, se aplica la normativa de historia clínica.</p>
<p><strong>Quién más lo ve:</strong> WhatsApp (Meta Platforms Ireland Ltd.), según su propia política; alojamiento web, Vercel Inc. [Revisar encargados antes de publicar.]</p>
<p><strong>Tus derechos:</strong> acceso, rectificación, supresión, oposición, limitación y portabilidad, en ${email}. Puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).</p>
<h2 class="h3" id="cookies">Cookies</h2>
<p>Este sitio no usa cookies de publicidad ni de analítica. Tu navegador solo guarda tu elección sobre el mapa.</p>
<p>El mapa de Google se carga únicamente si lo permites. Al cargarlo, Google puede instalar sus propias cookies (policies.google.com).</p>
<p><button type="button" class="btn btn-line btn-sm" data-cookie-reset>Cambiar mi elección</button></p>`;
}
