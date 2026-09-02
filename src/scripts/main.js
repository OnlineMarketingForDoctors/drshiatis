import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ---------------------------------------------------------------------------
   Header: compact bar, mobile menu
--------------------------------------------------------------------------- */
function initHeader() {
  const bar = $('[data-site-bar]');
  const hero = $('[data-hero]');
  const menu = $('[data-mobile-menu]');
  const toggles = $$('[data-menu-toggle]');
  const closeBtn = $('[data-menu-close]');

  if (bar && hero) {
    ScrollTrigger.create({
      trigger: hero,
      start: 'bottom 80px',
      onEnter: () => bar.classList.add('is-visible'),
      onLeaveBack: () => bar.classList.remove('is-visible'),
    });
  }

  const setMenu = (open) => {
    if (!menu) return;
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
    toggles.forEach((t) => t.setAttribute('aria-expanded', String(open)));
    if (open) closeBtn?.focus();
  };

  toggles.forEach((t) => t.addEventListener('click', () => setMenu(true)));
  closeBtn?.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('is-open')) setMenu(false);
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
}

/* ---------------------------------------------------------------------------
   Hero: entrance sequence and YouTube background
--------------------------------------------------------------------------- */
function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;

  if (!reduceMotion) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
    tl.fromTo('[data-hero-mark]', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out' })
      .to('.hero__line > span', { y: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' }, '-=0.9')
      .to('[data-hero-rule]', { scaleX: 1, duration: 1, ease: 'expo.inOut' }, '-=0.7')
      .to('[data-hero-line]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
      .fromTo('.site-header', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1 }, '-=0.9');

    gsap.to('.hero__content', {
      yPercent: 18,
      opacity: 0.35,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  initHeroVideo();
}

function initHeroVideo() {
  const mount = $('[data-hero-video]');
  if (!mount || reduceMotion) return;
  const id = mount.dataset.heroVideo;
  if (!id) return;

  // Save data on constrained connections: keep the poster.
  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;

  const load = () => {
    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(mount, {
        videoId: id,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          loop: 1,
          playlist: id,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          disablekb: 1,
          iv_load_policy: 3,
          fs: 0,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            const el = e.target.getIframe();
            if (e.data === window.YT.PlayerState.PLAYING) el.parentElement?.classList.add('is-playing') || el.classList.add('is-playing');
            if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo();
          },
        },
      });
      // The API replaces the mount element with the iframe; wrap classes accordingly.
      const iframe = player.getIframe?.();
      if (iframe) {
        const wrap = document.createElement('div');
        wrap.className = 'hero__video';
        iframe.parentNode.insertBefore(wrap, iframe);
        wrap.appendChild(iframe);
      }
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
  };

  if (document.readyState === 'complete') setTimeout(load, 400);
  else window.addEventListener('load', () => setTimeout(load, 400), { once: true });
}

/* ---------------------------------------------------------------------------
   Scroll reveals
--------------------------------------------------------------------------- */
function initReveals() {
  if (reduceMotion) {
    gsap.set('[data-reveal]', { opacity: 1, y: 0 });
    gsap.set('[data-img-reveal]', { clipPath: 'none' });
    return;
  }

  // Group children so a block reveals with a stagger.
  $$('[data-reveal-group]').forEach((group) => {
    const items = $$('[data-reveal]', group).filter((el) => el.closest('[data-reveal-group]') === group);
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  // Loose items not in a group.
  $$('[data-reveal]').forEach((el) => {
    if (el.closest('[data-reveal-group]')) return;
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  $$('[data-img-reveal]').forEach((el) => {
    const img = el.querySelector('img');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } });
    tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'expo.inOut' });
    if (img) tl.to(img, { scale: 1, duration: 1.8, ease: 'power3.out' }, 0.15);
  });

  // Gold rules draw in.
  $$('.rule').forEach((el) => {
    if (el.matches('[data-hero-rule]')) return;
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
}

/* ---------------------------------------------------------------------------
   Parallax backgrounds
--------------------------------------------------------------------------- */
function initParallax() {
  if (reduceMotion) return;
  $$('[data-parallax]').forEach((el) => {
    const strength = parseFloat(el.dataset.parallaxStrength || '10');
    const section = el.parentElement;
    gsap.fromTo(
      el,
      { yPercent: -strength / 2 },
      {
        yPercent: strength / 2,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ---------------------------------------------------------------------------
   Journey thread
--------------------------------------------------------------------------- */
function initJourney() {
  const list = $('[data-journey]');
  const fill = $('[data-journey-fill]');
  const steps = $$('[data-journey-step]');
  if (!list || !fill) return;

  if (reduceMotion) {
    fill.style.transform = 'scaleY(1)';
    steps.forEach((s) => s.classList.add('is-active'));
    return;
  }

  gsap.to(fill, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: 0.4 },
  });

  steps.forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 60%',
      onEnter: () => step.classList.add('is-active'),
      onLeaveBack: () => step.classList.remove('is-active'),
    });
  });
}

/* ---------------------------------------------------------------------------
   Meet: value tabs
--------------------------------------------------------------------------- */
function initTabs() {
  const root = $('[data-values]');
  if (!root) return;
  const tabs = $$('[role="tab"]', root);
  const panels = $$('[role="tabpanel"]', root);

  const select = (i) => {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
    });
    panels.forEach((p, j) => (p.hidden = i !== j));
    if (!reduceMotion) gsap.fromTo(panels[i], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
  };

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(i));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const n = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        select(n);
        tabs[n].focus();
      }
    });
  });
}

/* ---------------------------------------------------------------------------
   Before and after compare
--------------------------------------------------------------------------- */
function initCompare() {
  $$('[data-compare]').forEach((box) => {
    const input = $('[data-compare-input]', box);
    if (!input) return;
    const set = (v) => box.style.setProperty('--pos', `${v}%`);
    input.addEventListener('input', () => set(input.value));

    // Pointer drag anywhere in the box (the range input is transparent on top,
    // so this mostly covers touch on browsers that swallow the input).
    const move = (e) => {
      const r = box.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - r.left, 0), r.width);
      const v = (x / r.width) * 100;
      input.value = v;
      set(v);
    };
    box.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      move(e);
      const up = () => window.removeEventListener('pointermove', move);
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up, { once: true });
      window.addEventListener('pointercancel', up, { once: true });
    });
  });
}

/* ---------------------------------------------------------------------------
   Reviews carousel
--------------------------------------------------------------------------- */
function initReviews() {
  const root = $('[data-reviews]');
  const track = $('[data-reviews-track]');
  if (!root || !track) return;
  const cards = $$('[data-reviews-card]', track);
  const prev = $('[data-reviews-prev]');
  const next = $('[data-reviews-next]');

  const step = () => (cards[0]?.getBoundingClientRect().width || 320) + parseFloat(getComputedStyle(track).gap || '16');
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

  const go = (dir) => {
    if (dir > 0 && atEnd()) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: dir * step(), behavior: 'smooth' });
  };
  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  // Drag to scroll with a mouse.
  let down = false, startX = 0, startLeft = 0, moved = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = startLeft - dx;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
  });
  track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);

  // Gentle autoplay, paused while the visitor is interacting or away.
  if (reduceMotion) return;
  let timer = null;
  let visible = false;
  const start = () => { stop(); timer = setInterval(() => go(1), 5200); };
  const stop = () => { if (timer) clearInterval(timer); timer = null; };
  ['pointerenter', 'focusin', 'touchstart'].forEach((ev) => root.addEventListener(ev, stop, { passive: true }));
  ['pointerleave', 'focusout'].forEach((ev) => root.addEventListener(ev, () => visible && start()));
  ScrollTrigger.create({
    trigger: root,
    start: 'top 90%',
    end: 'bottom 10%',
    onToggle: (self) => { visible = self.isActive; visible ? start() : stop(); },
  });
}

/* ---------------------------------------------------------------------------
   Full-bleed testimonial
--------------------------------------------------------------------------- */
function initTestimonial() {
  const root = $('[data-testi]');
  if (!root) return;
  const slides = $$('[data-testi-slide]', root);
  if (slides.length < 2) return;
  let i = 0;
  let timer = null;

  const show = (n) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, j) => {
      s.classList.toggle('is-active', i === j);
      s.setAttribute('aria-hidden', String(i !== j));
    });
  };
  const restart = () => {
    if (reduceMotion) return;
    if (timer) clearInterval(timer);
    timer = setInterval(() => show(i + 1), 7000);
  };

  $('[data-testi-prev]', root)?.addEventListener('click', () => { show(i - 1); restart(); });
  $('[data-testi-next]', root)?.addEventListener('click', () => { show(i + 1); restart(); });

  ScrollTrigger.create({
    trigger: root,
    start: 'top 80%',
    end: 'bottom 20%',
    onToggle: (self) => {
      if (self.isActive) restart();
      else if (timer) { clearInterval(timer); timer = null; }
    },
  });
}

/* ---------------------------------------------------------------------------
   Back to top
--------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = $('[data-to-top]');
  if (!btn) return;
  ScrollTrigger.create({
    start: 600,
    onEnter: () => btn.classList.add('is-visible'),
    onLeaveBack: () => btn.classList.remove('is-visible'),
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    $('#main')?.focus?.();
  });
}

/* ---------------------------------------------------------------------------
   Boot
--------------------------------------------------------------------------- */
function boot() {
  initHeader();
  initHero();
  initReveals();
  initParallax();
  initJourney();
  initTabs();
  initCompare();
  initReviews();
  initTestimonial();
  initBackToTop();

  // Images loading late can shift trigger positions.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
