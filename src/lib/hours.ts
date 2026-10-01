// Открыта ли клиника сейчас — по времени Мадрида, а не посетителя.
// Праздники и отпуск (в 2026 году клиника закрывалась 1-16 августа) пока не учитываем.

export type Slot = { days: number[]; open: string; close: string };

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

function madridNow(tz: string, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, min: Number(get('hour')) * 60 + Number(get('minute')) };
}

export type Status =
  | { open: true; closes: string }
  | { open: false; opensDay: number; opensIn: number; opens: string };

export function status(slots: Slot[], tz: string, now = new Date()): Status {
  const { day, min } = madridNow(tz, now);
  for (const s of slots) {
    if (s.days.includes(day) && min >= toMin(s.open) && min < toMin(s.close)) {
      return { open: true, closes: s.close };
    }
  }
  // Ближайшее открытие: сегодня позже или в один из следующих дней.
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const candidates = slots
      .filter((s) => s.days.includes(d) && (i > 0 || toMin(s.open) > min))
      .sort((a, b) => toMin(a.open) - toMin(b.open));
    if (candidates.length) return { open: false, opensDay: d, opensIn: i, opens: candidates[0].open };
  }
  return { open: false, opensDay: 1, opensIn: 1, opens: slots[0]?.open ?? '10:00' };
}
