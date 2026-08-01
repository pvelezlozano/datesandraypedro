/* ═══════════════════════════════════════════════════
   datesandraypedro.com
   ═══════════════════════════════════════════════════ */

/* ─── CONFIGURACIÓN ─── */
const CONFIG = {
  // Número de WhatsApp en formato internacional, SIN "+" ni espacios.
  phone: '528711897822',
  message: 'Hola! Soy Sandra Beatriz y confirmo la cita para el Miércoles, quedo al pendiente!',
};

const $ = (sel) => document.querySelector(sel);

/* ═══════════ 1 · El botón "No" (imposible de tocar) ═══════════ */

const btnNo = $('#btn-no');
let dodges = 0;

function fleeNo(event) {
  if (event) event.preventDefault();
  if (btnNo.classList.contains('is-fleeing')) return;

  // Se desvanece y deja de recibir clics ANTES de que el clic se registre.
  btnNo.classList.add('is-fleeing');
  dodges += 1;

  // Reaparece un par de veces en otro lugar, luego se va para siempre.
  if (dodges < 4) {
    setTimeout(() => {
      const x = (Math.random() * 60 - 30).toFixed(0);
      const y = (Math.random() * 24 - 12).toFixed(0);
      btnNo.style.transform = `translate(${x}px, ${y}px)`;
      btnNo.classList.remove('is-fleeing');
    }, 1100);
  } else {
    setTimeout(() => { btnNo.style.display = 'none'; }, 450);
  }
}

// pointerdown ocurre ANTES de click: al quitar pointer-events, el click nunca pasa.
btnNo.addEventListener('pointerenter', fleeNo);
btnNo.addEventListener('pointerdown', fleeNo);
btnNo.addEventListener('focus', fleeNo);
btnNo.addEventListener('click', (e) => e.preventDefault());

/* ═══════════ 2 · Sí → pasar a las tarjetas ═══════════ */

const screenAsk = $('#screen-ask');
const screenCards = $('#screen-cards');
const cards = [...document.querySelectorAll('.info-card')];
const dots = [...document.querySelectorAll('.dot')];
const btnPrev = $('#btn-prev');
const btnNext = $('#btn-next');

let current = 0;

// Una tarjeta a la vez.
function show(i, dir = 1) {
  current = Math.max(0, Math.min(i, cards.length - 1));

  cards.forEach((card, n) => {
    card.classList.toggle('is-active', n === current);
    card.classList.toggle('from-right', dir === 1);
    card.classList.toggle('from-left', dir === -1);
  });

  dots.forEach((d, n) => d.classList.toggle('is-on', n === current));

  btnPrev.hidden = current === 0;
  btnNext.hidden = current === cards.length - 1;
}

$('#btn-yes').addEventListener('click', () => {
  screenAsk.classList.remove('is-active');
  screenCards.classList.add('is-active');
  window.scrollTo({ top: 0 });
  show(0);
});

btnNext.addEventListener('click', () => show(current + 1, 1));
btnPrev.addEventListener('click', () => show(current - 1, -1));

// Flechas del teclado, por si lo abre en la compu.
document.addEventListener('keydown', (e) => {
  if (!screenCards.classList.contains('is-active')) return;
  if (e.key === 'ArrowRight') show(current + 1, 1);
  if (e.key === 'ArrowLeft') show(current - 1, -1);
});

/* ═══════════ 3 · Link de WhatsApp ═══════════ */

$('#btn-confirm').href =
  `https://wa.me/${CONFIG.phone}?text=${encodeURIComponent(CONFIG.message)}`;
