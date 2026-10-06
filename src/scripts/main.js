import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// The hero's muted background video, paused while the lightbox is open.
let heroPlayer = null;
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
    // Derive the bar's state from the scroll position on every frame it
    // changes, rather than toggling on enter/leave events, so a fast or
    // programmatic scroll can never leave it stranded in the wrong state.
    let ticking = false;
    const update = () => {
      ticking = false;
      const threshold = hero.getBoundingClientRect().bottom;
      bar.classList.toggle('is-visible', threshold <= 80);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);
    update();
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
   Menu submenus
   The desktop panels are CSS, on hover and focus-within. These are the mobile
   ones, where a category's procedures fold away until asked for.
--------------------------------------------------------------------------- */
function initSubmenus() {
  $$('[data-sub-toggle]').forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  });

  // Escape closes a desktop panel, which focus-within alone cannot do.
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.activeElement?.closest('.navlist__item--has-menu');
    if (open) open.querySelector('.navlist__top')?.blur();
  });
}

/* ---------------------------------------------------------------------------
   Hero: entrance sequence and muted background video
--------------------------------------------------------------------------- */
function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;

  if (!reduceMotion) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });
    tl.to('.hero__line > span', { y: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out' })
      .to('[data-hero-rule]', { scaleX: 1, duration: 1, ease: 'expo.inOut' }, '-=0.7')
      .to('[data-hero-line]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
      .fromTo('.site-header', { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 1 }, '-=0.9');

    gsap.to('.hero__content', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
  }

  initHeroVideo();
}

function initHeroVideo() {
  const container = $('[data-hero-video]');
  const mount = container?.querySelector('[data-yt-mount]');
  if (!container || !mount) return;

  // Reduced motion, or a connection the visitor is paying for by the megabyte:
  // never fetch the player. The section keeps its plain black ground.
  const conn = navigator.connection;
  const frugal = conn && (conn.saveData || /2g/.test(conn.effectiveType || ''));
  if (reduceMotion || frugal) return;

  const id = container.dataset.heroVideo;
  if (!id) return;

  const build = () => {
    // The API replaces the mount node with the iframe, so the mount has to sit
    // inside the styled wrapper or the video ends up outside the cover box.
    heroPlayer = new window.YT.Player(mount, {
      // Privacy-enhanced mode, the same domain the lightbox uses. Without it
      // the player defaults to youtube.com and sets tracking cookies on the
      // home page before anyone has asked for a video.
      host: 'https://www.youtube-nocookie.com',
      videoId: id,
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
        cc_load_policy: 3,
        fs: 0,
      },
      events: {
        onReady: (e) => {
          e.target.mute();
          e.target.playVideo();
        },
        onStateChange: (e) => {
          if (e.data === window.YT.PlayerState.PLAYING) {
            container.classList.add('is-playing');
            // YouTube force-enables captions for muted autoplay, and
            // cc_load_policy alone does not hold. Tearing the module out once
            // playback has actually started does.
            try {
              e.target.unloadModule('captions');
              e.target.unloadModule('cc');
              e.target.setOption('captions', 'track', {});
            } catch {}
          }
          // Belt and braces: the loop playlist occasionally drops a lap.
          if (e.data === window.YT.PlayerState.ENDED) e.target.playVideo();
        },
      },
    });
  };

  const load = () => {
    if (window.YT && window.YT.Player) {
      build();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') prev();
      build();
    };
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    s.async = true;
    document.head.appendChild(s);
  };

  // Let the page paint and settle before pulling in the player.
  if (document.readyState === 'complete') setTimeout(load, 400);
  else window.addEventListener('load', () => setTimeout(load, 400), { once: true });

  // Don't burn battery decoding a video nobody can see.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) heroPlayer?.pauseVideo?.();
    else if (!document.querySelector('[data-lightbox]:not([hidden])')) heroPlayer?.playVideo?.();
  });
  ScrollTrigger.create({
    trigger: container,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? heroPlayer?.playVideo?.() : heroPlayer?.pauseVideo?.()),
  });
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
  $$('[data-tabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const panels = tabs.map((t) => document.getElementById(t.getAttribute('aria-controls'))).filter(Boolean);
    if (!tabs.length || panels.length !== tabs.length) return;

    const select = (i) => {
      tabs.forEach((t, j) => {
        t.setAttribute('aria-selected', String(i === j));
        t.tabIndex = i === j ? 0 : -1;
      });
      panels.forEach((p, j) => (p.hidden = i !== j));
      if (!reduceMotion) gsap.fromTo(panels[i], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      ScrollTrigger.refresh();
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

  // The cards are rendered twice; loopWidth is the width of one full set.
  const loopWidth = () => track.scrollWidth / 2;
  const wrap = () => {
    const half = loopWidth();
    if (track.scrollLeft >= half) track.scrollLeft -= half;
    else if (track.scrollLeft < 0) track.scrollLeft += half;
  };

  // Drag to scroll with a mouse.
  let down = false, startX = 0, startLeft = 0, moved = false;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse') return;
    down = true; moved = false; startX = e.clientX; startLeft = track.scrollLeft;
    track.classList.add('is-dragging');
    pause();
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) moved = true;
    track.scrollLeft = startLeft - dx;
    wrap();
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    track.classList.remove('is-dragging');
    resume();
  });
  track.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
  track.addEventListener('scroll', wrap, { passive: true });

  // Continuous marquee, paused while the visitor hovers, touches or focuses.
  const SPEED = 0.4; // px per frame at 60fps, a slow continuous drift
  let raf = null, paused = false, visible = false, last = 0;
  // The position is carried here rather than on the element: the browser
  // snaps scrollLeft to whole pixels, so `scrollLeft += 0.4` reads back
  // unchanged every frame and the drift never accumulates.
  let pos = 0;
  const tick = (t) => {
    if (!visible || paused) { raf = null; return; }
    const dt = last ? Math.min(t - last, 50) : 16.7;
    last = t;
    pos += SPEED * (dt / 16.7);
    const half = loopWidth();
    if (half > 0 && pos >= half) pos -= half;
    track.scrollLeft = pos;
    raf = requestAnimationFrame(tick);
  };
  // Picks the position back up wherever a drag or a pause left it.
  const start = () => { if (!raf && visible && !paused) { last = 0; pos = track.scrollLeft; raf = requestAnimationFrame(tick); } };
  const pause = () => { paused = true; };
  // `held` is the number of reviews the visitor has expanded to read: while
  // any is open the strip stays put, whatever the pointer does.
  let held = 0;
  const resume = () => { if (held) return; paused = false; start(); };

  // Reveal the expander only on reviews the clamp is actually cutting off,
  // and re-check on resize, where the same text may or may not overflow.
  const cards = $$('[data-reviews-card]', track);
  const syncExpanders = () => {
    cards.forEach((card) => {
      const text = card.querySelector('[data-review-text]');
      const btn = card.querySelector('[data-review-more]');
      if (!text || !btn) return;
      if (card.classList.contains('is-open')) return;
      btn.hidden = text.scrollHeight - text.clientHeight < 2;
    });
  };
  syncExpanders();
  window.addEventListener('load', syncExpanders, { once: true });
  let resizeId = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeId);
    resizeId = setTimeout(syncExpanders, 200);
  });

  track.addEventListener('click', (e) => {
    const btn = e.target.closest?.('[data-review-more]');
    if (!btn) return;
    const card = btn.closest('[data-reviews-card]');
    const open = card.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Read less' : 'Read more';
    if (open) { held += 1; pause(); }
    else { held = Math.max(0, held - 1); resume(); }
  });

  if (reduceMotion) return;
  root.addEventListener('pointerenter', pause);
  root.addEventListener('pointerleave', () => { if (!down) resume(); });
  root.addEventListener('focusin', pause);
  root.addEventListener('focusout', resume);
  root.addEventListener('touchstart', pause, { passive: true });
  root.addEventListener('touchend', () => setTimeout(resume, 1500), { passive: true });
  // An observer rather than a ScrollTrigger: this one only needs to know
  // whether the strip is on screen, and it re-measures itself as lazy images
  // below change the page height, which cached trigger positions do not.
  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else if (raf) { cancelAnimationFrame(raf); raf = null; }
    },
    { rootMargin: '10% 0px' },
  );
  io.observe(root);
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
   Video lightbox
--------------------------------------------------------------------------- */
function initLightbox() {
  const root = $('[data-lightbox]');
  const frame = $('[data-lightbox-frame]');
  if (!root || !frame) return;
  let lastFocus = null;

  const close = () => {
    root.classList.remove('is-open');
    root.hidden = true;
    frame.innerHTML = '';
    document.body.classList.remove('menu-open');
    try { heroPlayer?.playVideo?.(); } catch {}
    lastFocus?.focus?.();
  };

  const open = (id) => {
    lastFocus = document.activeElement;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    iframe.title = 'Video';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    frame.replaceChildren(iframe);
    root.hidden = false;
    root.classList.add('is-open');
    document.body.classList.add('menu-open');
    try { heroPlayer?.pauseVideo?.(); } catch {}
    $('[data-lightbox-close]:not(.lightbox__backdrop)', root)?.focus();
  };

  $$('[data-lightbox-open]').forEach((btn) => btn.addEventListener('click', () => open(btn.dataset.lightboxOpen)));
  $$('[data-lightbox-close]', root).forEach((btn) => btn.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !root.hidden) close(); });
}

/* ---------------------------------------------------------------------------
   Newsletter
--------------------------------------------------------------------------- */
function initNewsletter() {
  const form = $('[data-newsletter]');
  if (!form) return;
  const note = $('[data-newsletter-note]', form);
  const trap = form.querySelector('input[name="company"]');

  form.addEventListener('submit', (e) => {
    // Bots fill the hidden field; people never see it.
    if (trap && trap.value) { e.preventDefault(); return; }
    // With a list provider configured the browser posts to it as normal.
    if (form.getAttribute('action')) return;

    // Without one, hand the address to the practice's inbox rather than
    // swallowing it.
    e.preventDefault();
    const email = form.querySelector('input[name="EMAIL"]')?.value.trim();
    if (!email) return;
    const to = form.dataset.fallbackEmail;
    const subject = encodeURIComponent('Newsletter signup');
    const body = encodeURIComponent(`Please add this address to the newsletter: ${email}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    if (note) {
      note.textContent = 'Opening your email app to confirm.';
      note.classList.add('is-done');
    }
  });
}

/* ---------------------------------------------------------------------------
   The notice in front of the before and after photographs. Clinical nudity
   should not arrive unannounced, so the gallery stays behind it until the
   visitor says go. Remembered for the tab, not for the browser: the next
   visit gets the notice again.
--------------------------------------------------------------------------- */
function initBeforeAfterGate() {
  const guard = document.querySelector('[data-ba-guard]');
  if (!guard) return;
  const btn = guard.querySelector('[data-ba-enter]');

  const open = () => {
    guard.classList.add('is-open');
    try { sessionStorage.setItem('ba-seen', '1'); } catch { /* private mode */ }
  };

  let seen = false;
  try { seen = sessionStorage.getItem('ba-seen') === '1'; } catch { /* private mode */ }
  if (seen) guard.classList.add('is-open');

  btn?.addEventListener('click', open);
}

/* ---------------------------------------------------------------------------
   Before and after gallery
   Panel per procedure, scroll-snap slider inside each. The markup ships with
   every panel visible, so without this the photographs are still all there.
--------------------------------------------------------------------------- */
function initBeforeAfter() {
  initBeforeAfterGate();

  const root = document.querySelector('[data-ba-root]');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[data-ba-tab]')];
  const panels = [...root.querySelectorAll('[data-ba-panel]')];
  if (!tabs.length || !panels.length) return;

  /* --- one patient's angles --- */
  const wireSlider = (slider) => {
    const track = slider.querySelector('[data-ba-track]');
    const slides = [...slider.querySelectorAll('[data-ba-slide]')];
    const controls = slider.querySelector('[data-ba-controls]');
    if (!track || slides.length < 2 || !controls) return null;

    const prev = controls.querySelector('[data-ba-prev]');
    const next = controls.querySelector('[data-ba-next]');
    const counter = controls.querySelector('[data-ba-counter]');
    controls.hidden = false;

    let index = 0;
    const draw = () => {
      counter.textContent = `${index + 1} / ${slides.length}`;
      prev.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };
    const go = (i) => {
      index = Math.max(0, Math.min(slides.length - 1, i));
      // scrollLeft rather than scrollIntoView: the latter also scrolls the
      // page to bring the slide into view, which yanks you down the document.
      track.scrollTo({ left: slides[index].offsetLeft - track.offsetLeft, behavior: 'smooth' });
      draw();
    };

    prev.addEventListener('click', () => go(index - 1));
    next.addEventListener('click', () => go(index + 1));

    // Swiping moves the track without going through go(), so read it back.
    let settle = null;
    track.addEventListener('scroll', () => {
      clearTimeout(settle);
      settle = setTimeout(() => {
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        slides.forEach((s, i) => {
          const c = s.offsetLeft - track.offsetLeft + s.offsetWidth / 2;
          const d = Math.abs(c - mid);
          if (d < bestD) { bestD = d; best = i; }
        });
        if (best !== index) { index = best; draw(); }
      }, 90);
    }, { passive: true });

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1); }
    });

    draw();
    return () => { index = 0; track.scrollLeft = 0; draw(); };
  };

  // A procedure holds one slider per patient, so resets go to all of them.
  const resets = new Map();
  panels.forEach((p) => {
    const list = [...p.querySelectorAll('[data-ba-slider]')].map(wireSlider).filter(Boolean);
    resets.set(p.dataset.baPanel, list);
  });

  /* --- accordion, on a phone --- */
  const narrow = window.matchMedia('(max-width: 900px)');
  const toggles = new Map();
  panels.forEach((p) => {
    const t = p.querySelector('[data-ba-acc]');
    if (t) toggles.set(p.dataset.baPanel, t);
  });

  const openOnly = (slug) => {
    panels.forEach((p) => {
      const on = p.dataset.baPanel === slug;
      p.classList.toggle('is-open', on);
      toggles.get(p.dataset.baPanel)?.setAttribute('aria-expanded', String(on));
      if (on) resets.get(slug)?.forEach((reset) => reset());
    });
  };

  toggles.forEach((t, slug) => {
    t.addEventListener('click', () => {
      // Wider than a phone the procedure list does the switching, and the
      // heading is inert.
      if (!narrow.matches) return;
      const panel = panels.find((p) => p.dataset.baPanel === slug);
      if (panel.classList.contains('is-open')) {
        panel.classList.remove('is-open');
        t.setAttribute('aria-expanded', 'false');
      } else {
        openOnly(slug);
        // Opening one further down should not leave its heading off-screen.
        requestAnimationFrame(() => {
          const top = panel.getBoundingClientRect().top + window.scrollY - 90;
          if (panel.getBoundingClientRect().top < 0) window.scrollTo({ top, behavior: 'smooth' });
        });
      }
    });
  });

  /* --- switching --- */
  const show = (slug, { focus = false } = {}) => {
    const panel = panels.find((p) => p.dataset.baPanel === slug);
    if (!panel) return false;
    panels.forEach((p) => p.classList.toggle('is-active', p === panel));
    tabs.forEach((t) => {
      if (t.dataset.baTab === slug) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
    });
    resets.get(slug)?.forEach((reset) => reset());
    if (focus) panel.querySelector('.bapanel__title')?.focus();
    return true;
  };

  // The two modes keep their own state, so whichever is showing is correct the
  // moment the viewport crosses the breakpoint.
  const syncMode = () => {
    if (narrow.matches) {
      const open = panels.find((p) => p.classList.contains('is-open'));
      openOnly((open || panels.find((p) => p.classList.contains('is-active')) || panels[0]).dataset.baPanel);
    } else {
      // Expanded is the only honest answer when the body is always visible.
      toggles.forEach((t) => t.setAttribute('aria-expanded', 'true'));
    }
  };
  narrow.addEventListener('change', syncMode);

  panels.forEach((p) => {
    const h = p.querySelector('.bapanel__title');
    if (h) h.tabIndex = -1;
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const slug = tab.dataset.baTab;
      if (!show(slug, { focus: true })) return;
      history.replaceState(null, '', `#${slug}`);
      // On a phone the list sits above the panel, so bring the panel up.
      if (window.matchMedia('(max-width: 900px)').matches) {
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  root.classList.add('is-live');
  const fromHash = decodeURIComponent(location.hash.slice(1));
  if (!fromHash || !show(fromHash)) show(tabs[0].dataset.baTab);
  syncMode();
}


/* ---------------------------------------------------------------------------
   Contact form
   Two jobs: reveal the follow-up box for the answers that ask one, and, until
   a form handler is configured, hand the enquiry to the practice inbox as a
   pre-filled email rather than dropping it.
--------------------------------------------------------------------------- */
function initContact() {
  const form = $('[data-contact]');
  if (!form) return;

  const note = $('[data-contact-note]', form);
  const trap = form.querySelector('input[name="company"]');

  /* --- the follow-up box --- */
  const heard = $('[data-heard]', form);
  const wrap = $('[data-heard-detail]', form);
  const label = $('[data-heard-detail-label]', form);
  const input = wrap?.querySelector('input');

  const syncDetail = () => {
    if (!heard || !wrap || !input) return;
    const ask = heard.options[heard.selectedIndex]?.dataset.detail;
    wrap.hidden = !ask;
    input.required = Boolean(ask);
    if (ask && label) label.textContent = ask;
    if (!ask) input.value = '';
  };
  heard?.addEventListener('change', syncDetail);
  syncDetail();

  /* --- sending --- */
  form.addEventListener('submit', (e) => {
    if (trap && trap.value) { e.preventDefault(); return; }

    // The browser has already run validation; let it through to a real handler.
    if (!form.dataset.fallbackEmail || form.getAttribute('action')?.startsWith('mailto:') !== true) return;

    e.preventDefault();
    if (!form.reportValidity()) return;

    const get = (n) => form.querySelector(`[name="${n}"]`)?.value.trim() || '';
    const lines = [
      ['Name', get('name')],
      ['Email', get('email')],
      ['Telephone', get('phone')],
      ['Enquiry about', get('topic')],
      ['Heard about us', [get('heard_about'), get('heard_about_detail')].filter(Boolean).join(': ')],
      ['', ''],
      ['Message', get('message')],
    ]
      .filter(([k, v]) => k === '' || v)
      .map(([k, v]) => (k ? `${k}: ${v}` : ''))
      .join('\n');

    const to = form.dataset.fallbackEmail;
    const subject = encodeURIComponent(`Enquiry from ${get('name') || 'the website'}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${encodeURIComponent(lines)}`;
    if (note) {
      note.textContent = 'Opening your email app to send this. If nothing happens, email ' + to + ' directly.';
      note.classList.add('is-done');
    }
  });
}


/* ---------------------------------------------------------------------------
   Cookie consent
   Measurement and advertising load here and nowhere else, so declining really
   does mean nothing is set. The choice is kept in localStorage rather than a
   cookie, which keeps the page honest while a visitor is still deciding.
--------------------------------------------------------------------------- */
const CONSENT_KEY = 'cookie-consent';

function readConsent() {
  try { return localStorage.getItem(CONSENT_KEY); } catch { return null; }
}

function loadTags(ids) {
  const script = (src) => {
    const el = document.createElement('script');
    el.src = src;
    el.async = true;
    document.head.appendChild(el);
  };

  if (ids.ga4 || ids.googleAds) {
    window.dataLayer = window.dataLayer || [];
    // gtag has to push `arguments` itself, so this cannot be a rest parameter.
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    script(`https://www.googletagmanager.com/gtag/js?id=${ids.ga4 || ids.googleAds}`);
    // Anonymise at source: the practice needs the shape of its traffic, not
    // the address of the person reading about a particular operation.
    if (ids.ga4) window.gtag('config', ids.ga4, { anonymize_ip: true });
    if (ids.googleAds) window.gtag('config', ids.googleAds);
  }

  if (ids.metaPixel) {
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    window.fbq('init', ids.metaPixel);
    window.fbq('track', 'PageView');
  }
}

function initConsent() {
  const bar = $('[data-consent]');
  if (!bar) return;

  let ids = {};
  try { ids = JSON.parse(bar.dataset.consentIds || '{}'); } catch { /* malformed */ }

  const close = () => {
    bar.classList.remove('is-open');
    const done = () => { bar.hidden = true; };
    if (reduceMotion) done();
    else bar.addEventListener('transitionend', done, { once: true });
  };

  const decide = (answer) => {
    try { localStorage.setItem(CONSENT_KEY, answer); } catch { /* private mode */ }
    if (answer === 'yes') loadTags(ids);
    close();
  };

  const open = () => {
    bar.hidden = false;
    // A frame between unhiding and animating, or the transition never runs.
    requestAnimationFrame(() => bar.classList.add('is-open'));
  };

  $('[data-consent-yes]', bar)?.addEventListener('click', () => decide('yes'));
  $('[data-consent-no]', bar)?.addEventListener('click', () => decide('no'));

  // Anywhere on the site can reopen the question, which is what makes a
  // decision withdrawable rather than final.
  document.querySelectorAll('[data-consent-reopen]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); open(); });
  });

  const answer = readConsent();
  if (answer === 'yes') loadTags(ids);
  else if (answer !== 'no') open();
}

/* ---------------------------------------------------------------------------
   Procedure page: in-page section nav
   The bar sticks under the site bar, so the section you are reading is the
   last one whose top has passed below the bar.
--------------------------------------------------------------------------- */
function initSectionNav() {
  const nav = $('[data-secnav]');
  if (!nav) return;

  const scroller = $('.secnav__scroll', nav);
  const links = $$('[data-secnav-link]', nav);
  const pairs = links
    .map((a) => ({ a, section: document.getElementById(a.dataset.secnavLink) }))
    .filter((p) => p.section);
  if (pairs.length < 2) return;

  let current = null;

  // Keep the marked link in view in the bar's own scroller, which matters on
  // a phone where most of the bar is off-screen. scrollLeft, not
  // scrollIntoView: the latter would also scroll the page.
  const reveal = (a) => {
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const left = a.offsetLeft - scroller.offsetLeft;
    const target = left - (scroller.clientWidth - a.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const mark = (section) => {
    if (section === current) return;
    current = section;
    pairs.forEach(({ a, section: s }) => {
      const on = s === section;
      a.classList.toggle('is-current', on);
      if (on) { a.setAttribute('aria-current', 'true'); reveal(a); }
      else a.removeAttribute('aria-current');
    });
  };

  const measure = () => {
    // The bar's own bottom edge is the line a section has to cross, whatever
    // the header is doing above it.
    const line = nav.getBoundingClientRect().bottom + 8;
    let found = null;
    pairs.forEach(({ section }) => {
      if (section.getBoundingClientRect().top <= line) found = section;
    });

    // Past the last section's start, and at the very bottom of the document,
    // the final link is the honest answer.
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atEnd) found = pairs[pairs.length - 1].section;

    mark(found);
  };

  let queued = false;
  const onScroll = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; measure(); });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  measure();
}

/* ---------------------------------------------------------------------------
   Procedure page: before and after carousel
   Two patients to a view on a desktop, one on a phone. The track swipes on
   its own; the arrows step it by a whole view.
--------------------------------------------------------------------------- */
function initBaCarousel() {
  $$('[data-bacar]').forEach((root) => {
    const track = $('[data-bacar-track]', root);
    const slides = $$('[data-bacar-slide]', root);
    const controls = $('[data-bacar-controls]', root);
    if (!track || !controls || slides.length < 2) return;

    const prev = $('[data-bacar-prev]', root);
    const next = $('[data-bacar-next]', root);
    const counter = $('[data-bacar-count]', root);

    // Clinical photographs, warned about before they are shown, and the
    // gallery page's key so one answer covers the visit.
    const veil = $('[data-bacar-veil]', root);
    if (veil) {
      let seen = false;
      try { seen = sessionStorage.getItem('ba-seen') === '1'; } catch { /* private mode */ }
      const reveal = () => {
        root.classList.remove('is-veiled');
        veil.hidden = true;
        track.removeAttribute('aria-hidden');
        track.tabIndex = 0;
        try { sessionStorage.setItem('ba-seen', '1'); } catch { /* private mode */ }
      };
      if (!seen) {
        root.classList.add('is-veiled');
        veil.hidden = false;
        // Nothing behind the warning should be reachable while it stands.
        track.setAttribute('aria-hidden', 'true');
        track.tabIndex = -1;
      }
      $('[data-bacar-reveal]', root)?.addEventListener('click', reveal);
    }

    // How many slides a view holds, read off the layout rather than assumed,
    // so the breakpoint lives in one place: the stylesheet.
    const perView = () => {
      const w = slides[0].offsetWidth;
      if (!w) return 1;
      return Math.max(1, Math.round(track.clientWidth / w));
    };

    const offsetOf = (i) => slides[i].offsetLeft - slides[0].offsetLeft;
    const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

    let index = 0;

    const draw = () => {
      const per = perView();
      const last = Math.min(slides.length, index + per);
      counter.textContent = per > 1 && last > index + 1
        ? `Patients ${index + 1} to ${last} of ${slides.length}`
        : `Patient ${index + 1} of ${slides.length}`;
      // The ends are where the track can no longer move, not where the index
      // runs out: a part-slide of slack still counts as somewhere to go.
      if (prev) prev.disabled = track.scrollLeft <= 1;
      if (next) next.disabled = track.scrollLeft >= maxScroll() - 1;
    };

    const go = (i) => {
      const target = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({
        left: Math.min(offsetOf(target), maxScroll()),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      // The scroll handler settles the index and redraws once it lands.
    };

    // Swiping, and our own smooth scrolling, both move the track without
    // going through the index, so read the position back.
    const settleIndex = () => {
      const left = track.scrollLeft;
      let best = 0;
      let bestD = Infinity;
      slides.forEach((s, i) => {
        const d = Math.abs(offsetOf(i) - left);
        if (d < bestD) { bestD = d; best = i; }
      });
      index = best;
      draw();
    };

    let settle = null;
    track.addEventListener('scroll', () => {
      clearTimeout(settle);
      settle = setTimeout(settleIndex, 90);
    }, { passive: true });

    prev?.addEventListener('click', () => go(index - perView()));
    next?.addEventListener('click', () => go(index + perView()));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(index + perView()); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - perView()); }
    });

    window.addEventListener('resize', () => { clearTimeout(settle); settle = setTimeout(settleIndex, 150); });

    controls.hidden = false;
    draw();
  });
}

/* ---------------------------------------------------------------------------
   Boot
--------------------------------------------------------------------------- */
function boot() {
  initHeader();
  initSubmenus();
  initHero();
  initReveals();
  initParallax();
  initJourney();
  initTabs();
  initCompare();
  initReviews();
  initTestimonial();
  initBackToTop();
  initLightbox();
  initNewsletter();
  initBeforeAfter();
  initContact();
  initConsent();
  initSectionNav();
  initBaCarousel();

  // Images loading late can shift trigger positions.
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
