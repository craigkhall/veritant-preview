// Page logic: state, scroll reveals and the methodology cycle diagram.
// Loaded (after content.js) by js/vendor/dc-runtime.js and evaluated as the page logic of the
// \<x-dc> template in every page. Each HTML file names the page it renders in \<html data-page>.
class Component extends DCLogic {
  state = {
    chHover: -1,
    navOpen: -1,
    page: FILE_PAGE,
    bioName: BIO_NAME,
    faqOpen: 0,
    eventFaqOpen: 0,
    eventSection: 'overview',
    filter: 0,
    hoverIdx: -1,
    menuOpen: false,
    email: '',
    subscribed: false,
    emailError: '',
    toast: '',
    methStep: 0,
    methCopyStep: 0,
    methCopyIn: true,
    methCenterIn: false,
    methTick: 0,
    methPhase: 'intro',
    methAuto: true,
  };
  closeIntro = () => {
    if (this.state.intro !== 'in') return;
    this.setState({ intro: 'out' });
    setTimeout(() => {
      this.setState({ intro: null });
      document.documentElement.style.overflow = '';
      this.scheduleReveal && this.scheduleReveal();
    }, 450);
  };
  playHeroVideo() {
    const v = document.querySelector('video[data-vt-hero-video]');
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const pr = [0.4, 0.28, 0.18][this.state.heroSpeed || 0];
    v.defaultPlaybackRate = pr;
    v.playbackRate = pr;
    v.setAttribute('muted', '');
    if (v.paused) v.play().catch(() => {});
  }
  headerRef = React.createRef();
  onVtScroll = () => {
    this.valAnim();
    if (!this._revT)
      this._revT = setTimeout(() => {
        this._revT = 0;
        const vh = window.innerHeight;
        document.querySelectorAll('main [data-vt-reveal="1"]').forEach(el => {
          if (el.style.opacity !== '0') return;
          const r = el.getBoundingClientRect();
          if (r.top < vh && r.bottom > 0) this.show(el);
        });
      }, 120);
    const sc = (window.scrollY || document.documentElement.scrollTop) > 24;
    if (sc !== !!this.state.scrolled) this.setState({ scrolled: sc });
    const h = this.headerRef.current && this.headerRef.current.offsetHeight;
    if (h && h !== this.state.headerH) this.setState({ headerH: h });
    if (FILE_PAGE === 'event') {
      const sub = document.querySelector('.event-subnav');
      const headerH = h || this.state.headerH || 80;
      const subH = (sub && sub.offsetHeight) || 56;
      /* Breathing room under sticky header + subnav when jumping to a section */
      const anchorOffset = headerH + subH + 24;
      document.documentElement.style.setProperty(
        '--event-anchor-offset',
        anchorOffset + 'px'
      );
      let cur = 'overview';
      EVENT_SUBNAV.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < anchorOffset + 8) cur = id;
      });
      if (cur !== this.state.eventSection) this.setState({ eventSection: cur });
    }
  };
  componentDidMount() {
    setTimeout(() => this.valAnim(), 300);
    window.addEventListener('scroll', this.onVtScroll, { passive: true });
    window.addEventListener('resize', this.onVtScroll);
    setTimeout(this.onVtScroll, 0);
    setTimeout(() => this.playHeroVideo(), 0);
    setTimeout(() => this.playHeroVideo(), 800);
    this.mountSiteChrome();
    this.scheduleReveal();
    setTimeout(() => {
      this.scheduleReveal();
      this.watchDom();
    }, 300);
    this.startMethIntro();
  }
  startMethIntro() {
    if (typeof METH_NEXT === 'undefined' || !METH_NEXT) return;
    clearTimeout(this._methIntroT);
    this._methIntroArmed = false;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      this.setState(
        {
          methPhase: 'play',
          methStep: 0,
          methCopyStep: 0,
          methCopyIn: true,
          methCenterIn: true,
          methAuto: true,
        },
        () => this.startMethCycle(),
      );
      return;
    }
    // Hand off only after the draw animation has actually started (data-in) and finished
    this.armMethIntro();
  }
  armMethIntro() {
    if (typeof METH_NEXT === 'undefined' || !METH_NEXT) return;
    if (this.state.methPhase === 'play' || this._methIntroArmed) return;
    const el = document.querySelector('[data-cyc-meth]');
    if (!el || !el.hasAttribute('data-in')) {
      clearTimeout(this._methIntroPoll);
      this._methIntroPoll = setTimeout(() => this.armMethIntro(), 200);
      return;
    }
    this._methIntroArmed = true;
    clearTimeout(this._methIntroT);
    // Full circle (4.9s) + intro center fade-in (4.7s + ~0.9s) + short hold.
    // Card already shows Design; circle center Design waits until intro copy finishes.
    this._methIntroT = setTimeout(() => {
      if (this.state.methPhase === 'play') {
        if (this.state.methAuto) this.startMethCycle();
        return;
      }
      this.setState(
        {
          methPhase: 'play',
          methStep: 0,
          methCopyStep: 0,
          methCopyIn: true,
          methCenterIn: false,
          methTick: 1,
          methAuto: true,
        },
        () => {
          clearTimeout(this._methFadeT);
          this._methFadeT = setTimeout(() => {
            this.setState({ methCenterIn: true }, () => this.startMethCycle());
          }, 420);
        },
      );
    }, 6200);
  }
  startMethCycle() {
    if (typeof METH_NEXT === 'undefined' || !METH_NEXT) return;
    this.stopMethCycle();
    if (!this.state.methAuto || this.state.methPhase !== 'play') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    this._methTimer = setInterval(() => {
      if (!this.state.methAuto) return;
      const n = (typeof METH_STEPS !== 'undefined' && METH_STEPS.length) || STEPS.length;
      this.methGoTo(((this.state.methStep || 0) + 1) % n, false);
    }, 4800);
  }
  stopMethCycle() {
    if (this._methTimer) {
      clearInterval(this._methTimer);
      this._methTimer = null;
    }
  }
  methPick(i, fromUser) {
    this.methGoTo(i, fromUser);
  }
  methGoTo(i, fromUser) {
    if (typeof METH_NEXT === 'undefined' || !METH_NEXT) return;
    const n = (typeof METH_STEPS !== 'undefined' && METH_STEPS.length) || STEPS.length;
    const step = ((i % n) + n) % n;
    clearTimeout(this._methFadeT);
    const wasIntro = this.state.methPhase !== 'play';
    if (fromUser) {
      this.stopMethCycle();
      clearTimeout(this._methIntroT);
      this._methIntroArmed = true;
    }
    const base = {
      methStep: step,
      methTick: (this.state.methTick || 0) + 1,
    };
    if (fromUser) {
      base.methPhase = 'play';
      base.methAuto = false;
    }
    // User takeover during intro — keep Design card; reveal circle center for the picked step
    if (wasIntro && fromUser) {
      const sameDesign = step === 0;
      this.setState({
        ...base,
        methPhase: 'play',
        methCopyStep: step,
        methCopyIn: sameDesign,
        methCenterIn: false,
      });
      this._methFadeT = setTimeout(() => {
        this.setState({ methCopyIn: true, methCenterIn: true });
      }, sameDesign ? 280 : 320);
      return;
    }
    // Same copy already visible — just move the arc / state
    if (step === this.state.methCopyStep && this.state.methCopyIn) {
      this.setState({ ...base, methCenterIn: true });
      return;
    }
    // Fade out → swap copy → fade in (card + circle center together)
    this.setState({ ...base, methCopyIn: false, methCenterIn: false });
    this._methFadeT = setTimeout(() => {
      this.setState({ methCopyStep: step, methCopyIn: true, methCenterIn: true });
    }, 280);
  }
  componentDidUpdate() {
    setTimeout(() => this.valAnim(), 60);
    this.playHeroVideo();
    this.mountSiteChrome();
  }
  mountSiteChrome() {
    if (typeof VT_SITE_CHROME === 'undefined') return;
    VT_SITE_CHROME.mount({
      onLegal: null,
      toggleMenu: () => this.setState({ menuOpen: !this.state.menuOpen }),
      closeMenu: () => {
        if (this.state.menuOpen) this.setState({ menuOpen: false });
      },
      onBfCacheRestore: () => {
        // Back/forward restore can leave the mobile menu half-open over the page
        this.setState({ menuOpen: false, navOpen: -1 });
        setTimeout(() => {
          this.mountSiteChrome();
          this.onVtScroll();
        }, 0);
      },
      openNav: i => this.setState({ navOpen: i }),
      closeNav: () => this.setState({ navOpen: -1 }),
    });
    this.applySiteChrome();
  }
  applySiteChrome() {
    if (typeof VT_SITE_CHROME === 'undefined') return;
    const s = this.state || {};
    const p = FILE_PAGE;
    // Transparent only on home before scroll — but never while the mobile menu is open
    // (transparent + white link text reads as a blank white panel).
    const menuOpen = !!s.menuOpen;
    const navBg = EVENT_THEME
      ? EVENT_THEME.header
      : p === 'home' && !s.scrolled && !menuOpen
        ? 'transparent'
        : p === 'home'
          ? '#0556CC'
          : 'linear-gradient(90deg,#0548E0 0%,#0551D4 100%)';
    const navHi = EVENT_THEME ? EVENT_THEME.navAccent || EVENT_THEME.accent : '#03D0FF';
    const fg = '#fff';
    const navItems = NAV.map(([id, label, kids], i) => {
      const act =
        p === id ||
        (id === 'events' && p === 'event') ||
        (id === 'who' && p === 'bio') ||
        (id === 'insights' && (p === 'press' || p === 'article')) ||
        (kids || []).some(k => k[0] === p);
      const first = kids ? kids[0][0] : id;
      return {
        label,
        href: pageHref(first),
        hasKids: !!kids,
        showKids: !!kids && s.navOpen === i,
        color: act ? navHi : fg,
        underline: act ? navHi : 'transparent',
        kids: (kids || []).map(([kid, kl]) => ({
          label: kl,
          href: pageHref(kid),
          color: p === kid ? navHi : fg,
        })),
      };
    });
    const headerEl = VT_SITE_CHROME.applyHeader(
      {
        navBg,
        navMb: p === 'home' ? -(s.headerH || 81) + 'px' : '0px',
        navBorder: '1px solid transparent',
        navFg: '#fff',
        contactBg: EVENT_THEME ? EVENT_THEME.accent : '#03D0FF',
        contactFg: EVENT_THEME ? EVENT_THEME.onAccent : '#022E59',
        contactHref: 'contact.html',
        dropBg: EVENT_THEME ? EVENT_THEME.drop : '#0556CC',
        dropBorder: 'rgba(255,255,255,.18)',
        menuOpen,
      },
      navItems
    );
    if (headerEl && this.headerRef) this.headerRef.current = headerEl;

    VT_SITE_CHROME.applyNewsletter({
      bg: '#0556CC',
      head: '#fff',
      text: '#fff',
      pad: '128px 40px',
      photo: true,
      btnBg: '#02C9B5',
      btnFg: '#022E59',
    });
  }
  scheduleReveal() {
    if (this._rafR) return;
    const run = () => {
      if (!this._rafR) return;
      this._rafR = 0;
      try {
        this.reveal();
      } catch (e) {
        this._mutating = false;
        document.querySelectorAll('main section [style*="opacity: 0"]').forEach(el => {
          el.style.opacity = '';
        });
      }
    };
    this._rafR = requestAnimationFrame(run);
    setTimeout(run, 120);
  }
  watchDom() {
    const root = document.querySelector('main');
    if (!root || this._mo) return;
    this._mo = new MutationObserver(() => {
      if (this._mutating) return;
      this.scheduleReveal();
    });
    this._mo.observe(root, { childList: true, subtree: true });
  }
  show(el) {
    el.style.opacity = el.dataset.vtOpacity;
    el.style.transform = el.dataset.vtTransform;
  }
  runMethCounters() {
    if (typeof METH_NEXT === 'undefined' || !METH_NEXT) return;
    const vh = window.innerHeight;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('[data-meth-count]').forEach(el => {
      if (el.dataset.counted === '1') return;
      const r = el.getBoundingClientRect();
      if (!(r.height && r.top < vh * 0.88 && r.bottom > 0)) return;
      el.dataset.counted = '1';
      const target = Math.max(0, parseInt(el.getAttribute('data-meth-count'), 10) || 0);
      const fmt = n => Math.round(n).toLocaleString('en-US');
      if (reduced) {
        el.textContent = fmt(target);
        return;
      }
      // Rapid count — short (~0.9s), ease-out so it settles quickly
      const dur = 900;
      const t0 = performance.now();
      const tick = now => {
        const p = Math.min(1, (now - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * e);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = fmt(target);
      };
      requestAnimationFrame(tick);
    });
  }
  valAnim() {
    const vh = window.innerHeight;
    this.runMethCounters();
    document.querySelectorAll('[data-cyc]').forEach(el => {
      if (el.hasAttribute('data-in')) return;
      const r = el.getBoundingClientRect();
      if (r.height && r.top < vh * 0.7 && r.bottom > vh * 0.2) {
        el.setAttribute('data-in', '');
        if (el.hasAttribute('data-cyc-meth')) this.armMethIntro();
      }
    });
    document.querySelectorAll('[data-v2-title]').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.9 && r.bottom > 0 && !el.hasAttribute('data-in')) el.setAttribute('data-in', '');
    });
    // Layout 2 (value-steps): grow top → node/card → bottom → curve → next top.
    // On tablet/phone curves are display:none (no height), so skip the curve gate
    // or later values never unlock past the first.
    document.querySelectorAll('[data-v2-row]').forEach((row, idx) => {
      const item = row.parentElement;
      const r = row.getBoundingClientRect();
      if (!(r.top < vh * 0.85 && r.bottom > 0)) return;
      const segs = row.querySelectorAll('[data-v2-seg]');
      const top = segs[0];
      const bot = segs[1];
      const node = row.querySelector('[data-v2-node]');
      const box = row.querySelector('[data-v2-box]');
      const prevItem = item && item.previousElementSibling;
      const prevCurve = prevItem && prevItem.querySelector('[data-v2-curve]');
      const curveBlocked =
        prevCurve &&
        getComputedStyle(prevCurve).display !== 'none' &&
        prevCurve.getBoundingClientRect().height > 0;
      const prevReady = !curveBlocked || +(prevCurve.dataset.p || 0) >= 0.98;
      if (idx === 0 || prevReady) {
        if (top && !top.hasAttribute('data-in')) top.setAttribute('data-in', '');
      }
      // Icon, title, card and bottom segment reveal as soon as the row is in view;
      // only the top segment waits for the previous curve to reach it
      [node, box, bot].forEach(el => {
        if (el && !el.hasAttribute('data-in')) el.setAttribute('data-in', '');
      });
      // Stacked layout (no visible curve after this row): unlock the next top immediately
      const ownCurve = item && item.querySelector('[data-v2-curve]');
      const ownCurveVisible =
        ownCurve &&
        getComputedStyle(ownCurve).display !== 'none' &&
        ownCurve.getBoundingClientRect().height > 0;
      if (!ownCurveVisible && bot && bot.hasAttribute('data-in')) {
        const nx = item && item.nextElementSibling;
        const sg = nx && nx.querySelector('[data-v2-seg]');
        if (sg && !sg.hasAttribute('data-in')) sg.setAttribute('data-in', '');
      }
    });
    document.querySelectorAll('.value-steps__segment--bottom').forEach(sg => {
      const r = sg.getBoundingClientRect();
      const h = sg.offsetHeight;
      if (!h) return;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / (h + vh * 0.05)));
      const prev = +(sg.dataset.p || 0);
      if (p > prev) {
        sg.dataset.p = p;
        sg.style.setProperty('--line-progress', p.toFixed(3));
      }
    });
    document.querySelectorAll('[data-val-row]').forEach(row => {
      const r = row.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) {
        row.querySelectorAll('[data-val-node],[data-val-box]').forEach(el => {
          if (!el.hasAttribute('data-in')) el.setAttribute('data-in', '');
        });
        const first = row.parentElement && !row.parentElement.previousElementSibling;
        if (first) {
          const sg = row.querySelector('[data-val-seg="t"]');
          if (sg) sg.setAttribute('data-in', '');
        }
      }
    });
    document.querySelectorAll('[data-val-seg="b"]').forEach(sg => {
      const r = sg.getBoundingClientRect();
      const h = sg.offsetHeight;
      if (!h) return;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / (h + vh * 0.05)));
      const prev = +(sg.dataset.p || 0);
      if (p > prev) {
        sg.dataset.p = p;
        sg.style.setProperty('--line-progress', p.toFixed(3));
      }
    });
    document.querySelectorAll('[data-val-curve]').forEach(svg => {
      const r = svg.getBoundingClientRect();
      if (!r.height) return;
      const own = svg.parentElement && svg.parentElement.querySelector('[data-val-seg="b"]');
      if (own && +(own.dataset.p || 0) < 1) return;
      const p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / (r.height + vh * 0.1)));
      const prev = +(svg.dataset.p || 0);
      if (p > prev) {
        svg.dataset.p = p;
        svg.style.clipPath = 'inset(0 0 ' + ((1 - p) * 100).toFixed(2) + '% 0)';
      }
      if (p >= 0.97) {
        const nx = svg.parentElement && svg.parentElement.nextElementSibling;
        const sg = nx && nx.querySelector('[data-val-seg="t"]');
        if (sg && !sg.hasAttribute('data-in')) sg.setAttribute('data-in', '');
      }
    });
    document.querySelectorAll('[data-v2-curve]').forEach(svg => {
      const item = svg.parentElement;
      const row = item && item.querySelector('[data-v2-row]');
      const bot = row && row.querySelectorAll('[data-v2-seg]')[1];
      if (bot && !bot.hasAttribute('data-in')) return;
      if (bot && +(bot.dataset.p || 0) < 1) return;
      const path = svg.querySelector('path');
      // Clear any leftover dash styles from the reverted experiment
      if (path) {
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
        delete path.dataset.len;
      }
      const r = svg.getBoundingClientRect();
      if (!r.height) return;
      const p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.15)));
      const prev = +(svg.dataset.p || 0);
      if (p > prev) {
        svg.dataset.p = p;
        svg.style.clipPath = 'inset(0 0 ' + ((1 - p) * 100).toFixed(2) + '% 0)';
      }
      if (p >= 0.98) {
        const nx = item && item.nextElementSibling;
        const sg = nx && nx.querySelector('[data-v2-seg]');
        if (sg && !sg.hasAttribute('data-in')) sg.setAttribute('data-in', '');
      }
    });
  }
  reveal() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.querySelector('main');
    if (!root) return;
    if (!this._seen) this._seen = new WeakSet();
    if (!this._io)
      this._io = new IntersectionObserver(
        entries => {
          entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target,
              kids = [...el.parentElement.children],
              i = Math.max(0, kids.indexOf(el));
            const decor = el.parentElement.tagName === 'SECTION';
            setTimeout(() => this.show(el), decor ? 80 : Math.min(i, 5) * 110);
            this._io.unobserve(el);
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -4% 0px' },
      );
    const fresh = [];
    root.querySelectorAll('section > div > *, section > img, section > svg').forEach(el => {
      if (this._seen.has(el)) return;
      /* Stagger direct kids (incl. cards/links) instead of the wrapper */
      if (el.hasAttribute('data-vt-stagger-kids')) {
        this._seen.add(el);
        [...el.children].forEach(kid => {
          if (this._seen.has(kid)) return;
          this._seen.add(kid);
          fresh.push([kid, false]);
        });
        return;
      }
      this._seen.add(el);
      if (el.closest('[data-vt-hero]')) return;
      const isDecor = el.parentElement.tagName === 'SECTION';
      if (isDecor) {
        const src = el.getAttribute('src') || '';
        const isIcon = el.tagName === 'IMG' && src.includes('/icons/');
        // Decorative section SVGs (e.g. qualification squares) stay CSS-owned — don't force opacity 1
        if (el.classList && el.classList.contains('meth-next-elig__art')) return;
        const isArtSvg = el.tagName === 'SVG';
        if (!isIcon && !isArtSvg) return;
      }
      if (/^(A|BUTTON|FORM|INPUT)$/.test(el.tagName) || el.getAttribute('role') === 'button') return;
      fresh.push([el, isDecor]);
    });
    if (!fresh.length) return;
    this._mutating = true;
    const vh = window.innerHeight;
    fresh.forEach(([el, isDecor]) => {
      const baseT = el.style.transform || '';
      el.dataset.vtReveal = '1';
      el.dataset.vtOpacity = el.style.opacity || '1';
      el.dataset.vtTransform = baseT;
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = (baseT ? baseT + ' ' : '') + (isDecor ? 'translateX(48px) scale(1.04)' : 'translateY(20px)');
    });
    void root.offsetWidth;
    fresh.forEach(([el, isDecor]) => {
      el.style.transition = isDecor
        ? 'opacity 1.8s cubic-bezier(.2,0,.2,1), transform 2.2s cubic-bezier(.2,0,.2,1)'
        : 'opacity .9s cubic-bezier(.2,0,.2,1), transform .9s cubic-bezier(.2,0,.2,1)';
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        const kids = [...el.parentElement.children],
          i = Math.max(0, kids.indexOf(el));
        setTimeout(() => this.show(el), isDecor ? 80 : 60 + Math.min(i, 5) * 110);
      } else this._io.observe(el);
      setTimeout(() => {
        if (el.isConnected && el.style.opacity === '0') {
          const rr = el.getBoundingClientRect();
          if (rr.top < vh && rr.bottom > 0) this.show(el);
        }
      }, 1800);
    });
    this._mutating = false;
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onVtScroll);
    window.removeEventListener('resize', this.onVtScroll);
    if (this._io) this._io.disconnect();
    if (this._mo) this._mo.disconnect();
    this.stopMethCycle();
    clearTimeout(this._methIntroT);
    clearTimeout(this._methIntroPoll);
    clearTimeout(this._methFadeT);
  }
  cycleMeth(active, phase, copyStep, copyIn, centerIn) {
    const h = React.createElement,
      play = phase === 'play',
      cx = 260,
      cy = 260,
      r = 190,
      n = STEPS.length,
      step = ((active % n) + n) % n,
      copy = ((copyStep % n) + n) % n,
      textIn = copyIn !== false,
      centerOn = centerIn !== false && play,
      // Align segment 0 (Design) at top, matching classic cycle offset
      off = -Math.PI / 2 - Math.PI / n;
    const pt = (a, rr) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
    const gid = 'cyc-meth-grad';
    const pick = i => e => {
      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();
      this.methPick(i, true);
    };
    // Clickable ring sections (the arc between nodes)
    const segHits = STEPS.map((_, i) => {
      const a0 = off + (i / n) * 2 * Math.PI,
        a1 = off + ((i + 1) / n) * 2 * Math.PI,
        [x0, y0] = pt(a0, r),
        [x1, y1] = pt(a1, r);
      return h('path', {
        key: 'hit' + i,
        className: 'cyc-meth-seg-hit',
        d: `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`,
        fill: 'none',
        stroke: 'rgba(0,0,0,0.001)',
        strokeWidth: 44,
        style: { pointerEvents: 'stroke', cursor: 'pointer' },
        onClick: pick(i),
      });
    });
    // Same stagger as home cycle (4.9s draw ÷ 7 steps)
    const nodeDelay = 700;
    const nodes = STEPS.map((_, i) => {
      const a = off + (i / n) * 2 * Math.PI,
        [x, y] = pt(a, r),
        rot = (a * 180) / Math.PI + 90,
        on = play && i === step;
      return h(
        'g',
        {
          key: 'n' + i,
          transform: `translate(${x} ${y}) rotate(${rot})`,
          style: { cursor: 'pointer' },
          onClick: pick(i),
        },
        h('circle', {
          cx: 0,
          cy: 0,
          r: 22,
          fill: 'rgba(0,0,0,0.001)',
        }),
        h(
          'g',
          { className: 'cyc-node', style: { '--d': i * nodeDelay + 'ms', pointerEvents: 'none' } },
          h('rect', {
            x: -6,
            y: -6,
            width: 12,
            height: 12,
            fill: '#022138',
            stroke: on ? '#03D0FF' : play ? 'rgba(110,180,247,.55)' : '#6EB4F7',
            strokeWidth: 1,
          }),
          h('path', {
            d: 'M-2 -3 L2 0 L-2 3',
            fill: 'none',
            stroke: on ? '#03D0FF' : '#fff',
            strokeWidth: 1.2,
          }),
        ),
      );
    });
    const labels = STEPS.map((s, i) => {
      const a0 = off + (i / n) * 2 * Math.PI,
        a1 = off + ((i + 1) / n) * 2 * Math.PI,
        mid = (a0 + a1) / 2;
      const bottom = Math.sin(mid) > 0.15,
        rr = bottom ? r + 42 : r + 32,
        id = `cyc-meth-p${i}`,
        on = play && i === step;
      const [sx, sy] = pt(bottom ? a1 : a0, rr),
        [ex, ey] = pt(bottom ? a0 : a1, rr),
        [hx, hy] = pt(mid, rr);
      return h(
        'g',
        {
          key: 'l' + i,
          className: 'cyc-lab cyc-meth-lab' + (on ? ' is-on' : ''),
          style: { cursor: 'pointer', '--d': i * nodeDelay + 'ms' },
          onClick: pick(i),
        },
        h('defs', null, h('path', { id, d: `M${sx} ${sy} A${rr} ${rr} 0 0 ${bottom ? 0 : 1} ${ex} ${ey}` })),
        h('circle', {
          cx: hx,
          cy: hy,
          r: 30,
          fill: 'rgba(0,0,0,0.001)',
        }),
        h('path', {
          d: `M${sx} ${sy} A${rr} ${rr} 0 0 ${bottom ? 0 : 1} ${ex} ${ey}`,
          fill: 'none',
          stroke: 'rgba(0,0,0,0.001)',
          strokeWidth: 28,
          style: { pointerEvents: 'stroke' },
        }),
        h(
          'text',
          {
            style: {
              fontSize: 13,
              letterSpacing: '.18em',
              fontWeight: on ? 500 : 400,
              fill: on ? '#03D0FF' : play ? 'rgba(255,255,255,.38)' : 'rgba(255,255,255,.85)',
              transition: 'fill 420ms ease',
              pointerEvents: 'none',
            },
          },
          h(
            'textPath',
            { href: '#' + id, xlinkHref: '#' + id, startOffset: '50%', textAnchor: 'middle' },
            s.toUpperCase(),
          ),
        ),
      );
    });
    const stepName = (STEPS[copy] || '').toUpperCase();
    const stepNum = String(copy + 1).padStart(2, '0');
    const offDeg = (off * 180) / Math.PI;
    const rotDeg = offDeg + (step / n) * 360;
    const dotDeg = offDeg + 90;
    const svgProps = {
      'data-cyc': '1',
      'data-cyc-meth': '1',
      'data-phase': play ? 'play' : 'intro',
      'data-copy-in': play && textIn ? '1' : '0',
      'data-center-in': centerOn ? '1' : '0',
      viewBox: '0 0 520 520',
      xmlns: 'http\://www.w3.org/2000/svg',
      xmlnsXlink: 'http\://www.w3.org/1999/xlink',
      style: { width: '100%', maxWidth: 540, height: 'auto', display: 'block', overflow: 'visible' },
    };
    // Keep drawn state across the intro→play handoff so the ring does not restart
    if (play) svgProps['data-in'] = '';
    return h(
      'svg',
      svgProps,
      h(
        'defs',
        null,
        h(
          'linearGradient',
          { id: gid, x1: '0', y1: '0', x2: '0', y2: '1' },
          h('stop', { offset: '0', stopColor: '#03D0FF' }),
          h('stop', { offset: '1', stopColor: '#0556CC' }),
        ),
        h(
          'filter',
          { id: 'cyc-meth-glow', x: '-20%', y: '-20%', width: '140%', height: '140%' },
          h('feGaussianBlur', { stdDeviation: '2', result: 'b' }),
          h('feMerge', null, h('feMergeNode', { in: 'b' }), h('feMergeNode', { in: 'SourceGraphic' })),
        ),
      ),
      h('circle', {
        cx,
        cy,
        r: r - 26,
        fill: 'none',
        stroke: 'rgba(255,255,255,.16)',
        strokeWidth: 1,
        style: { pointerEvents: 'none' },
      }),
      // Full-ring draw (intro) — same cadence and stroke weight as home cycle
      h('circle', {
        className: 'cyc-base',
        cx,
        cy,
        r,
        fill: 'none',
        stroke: `url(#${gid})`,
        strokeWidth: 9,
        style: { pointerEvents: 'none' },
      }),
      h('circle', {
        className: 'cyc-trail',
        cx,
        cy,
        r,
        fill: 'none',
        stroke: `url(#${gid})`,
        strokeWidth: 9,
        strokeLinecap: 'round',
        pathLength: 100,
        transform: `rotate(${offDeg} ${cx} ${cy})`,
        style: { pointerEvents: 'none' },
      }),
      // Segment highlight (play)
      h('circle', {
        className: 'cyc-meth-arc',
        cx,
        cy,
        r,
        fill: 'none',
        stroke: `url(#${gid})`,
        strokeWidth: 5,
        strokeLinecap: 'round',
        pathLength: 100,
        strokeDasharray: `${100 / n} ${100 - 100 / n}`,
        strokeDashoffset: 0,
        transform: `rotate(${rotDeg} ${cx} ${cy})`,
        filter: 'url(#cyc-meth-glow)',
        style: { transition: 'transform 480ms cubic-bezier(.2,0,.2,1), opacity 520ms ease', pointerEvents: 'none' },
      }),
      segHits,
      nodes,
      labels,
      h(
        'g',
        { className: 'cyc-dot', style: { '--a0': dotDeg + 'deg', '--a1': dotDeg + 360 + 'deg', pointerEvents: 'none' } },
        h('circle', { cx, cy: cy - r, r: 13, fill: '#03D0FF', opacity: 0.35 }),
        h('circle', { cx, cy: cy - r, r: 5.5, fill: '#fff' }),
      ),
      // Intro center copy
      h(
        'g',
        { className: 'cyc-center cyc-meth-center-intro', style: { pointerEvents: 'none' } },
        h(
          'text',
          {
            x: cx,
            y: cy - 6,
            textAnchor: 'middle',
            style: { fontSize: 30, fontWeight: 300, fill: '#fff' },
          },
          'Refine Each Cycle',
        ),
        h(
          'text',
          {
            x: cx,
            y: cy + 30,
            textAnchor: 'middle',
            style: { fontSize: 14, fontWeight: 300, fill: '#D2F0FC' },
          },
          'as the industry and best-practices evolve',
        ),
      ),
      // Play center: step # / name fade via data-center-in; tagline stays once play starts
      h(
        'g',
        {
          className: 'cyc-meth-center-play',
          style: { pointerEvents: 'none' },
        },
        h(
          'g',
          { className: 'cyc-meth-center-step' },
          h(
            'text',
            {
              x: cx,
              y: cy - 36,
              textAnchor: 'middle',
              style: { fontSize: 13, letterSpacing: '.16em', fontWeight: 400, fill: '#03D0FF' },
            },
            stepNum + ' / 07',
          ),
          h(
            'text',
            {
              x: cx,
              y: cy + 8,
              textAnchor: 'middle',
              style: { fontSize: 28, fontWeight: 300, letterSpacing: '.06em', fill: '#fff' },
            },
            stepName,
          ),
        ),
        h(
          'text',
          {
            className: 'cyc-meth-center-tagline',
            x: cx,
            y: cy + 40,
            textAnchor: 'middle',
            style: { fontSize: 13, fontWeight: 300, fill: 'rgba(210,240,252,.75)' },
          },
          'Each cycle informs the next',
        ),
      ),
    );
  }
  flash(msg) {
    clearTimeout(this._t);
    this.setState({ toast: msg });
    this._t = setTimeout(() => this.setState({ toast: '' }), 2200);
  }
  cycle(dark, theme) {
    const sap = theme === 'sapphire';
    const h = React.createElement,
      cx = 260,
      cy = 260,
      r = 190,
      n = STEPS.length,
      off = -Math.PI / 2 - Math.PI / n;
    const pt = (a, rr) => [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
    const gid = sap ? 'cyc-sap' : dark ? 'cyc-dark' : 'cyc-light';
    const nodes = STEPS.map((_, i) => {
      const a = off + (i / n) * 2 * Math.PI,
        [x, y] = pt(a, r),
        rot = (a * 180) / Math.PI + 90;
      return h(
        'g',
        { key: 'n' + i, transform: `translate(${x} ${y}) rotate(${rot})` },
        h(
          'g',
          { className: 'cyc-node', style: { '--d': i * 700 + 'ms' } },
          h('rect', {
            x: -7,
            y: -7,
            width: 14,
            height: 14,
            fill: sap ? '#0556CC' : dark ? '#022138' : '#fff',
            stroke: sap ? '#fff' : dark ? '#6EB4F7' : '#022E59',
            strokeWidth: 1,
          }),
          h('path', { d: 'M-2 -3.5 L2 0 L-2 3.5', fill: 'none', stroke: dark ? '#fff' : '#022E59', strokeWidth: 1.2 }),
        ),
      );
    });
    const labels = STEPS.map((s, i) => {
      const a0 = off + (i / n) * 2 * Math.PI,
        a1 = off + ((i + 1) / n) * 2 * Math.PI,
        mid = (a0 + a1) / 2;
      const bottom = Math.sin(mid) > 0.15,
        rr = bottom ? r + 40 : r + 30,
        id = `${gid}-p${i}`;
      const [sx, sy] = pt(bottom ? a1 : a0, rr),
        [ex, ey] = pt(bottom ? a0 : a1, rr);
      return h(
        'g',
        { key: 'l' + i, className: 'cyc-lab', style: { '--d': i * 700 + 'ms' } },
        h('defs', null, h('path', { id, d: `M${sx} ${sy} A${rr} ${rr} 0 0 ${bottom ? 0 : 1} ${ex} ${ey}` })),
        h(
          'text',
          { style: { fontSize: 13, letterSpacing: '.18em', fontWeight: 400, fill: dark ? '#fff' : '#022138' } },
          h(
            'textPath',
            { href: '#' + id, xlinkHref: '#' + id, startOffset: '50%', textAnchor: 'middle' },
            s.toUpperCase(),
          ),
        ),
      );
    });
    const offDeg = (off * 180) / Math.PI,
      dotDeg = offDeg + 90;
    return h(
      'svg',
      {
        'data-cyc': '1',
        viewBox: '0 0 520 520',
        xmlns: 'http\://www.w3.org/2000/svg',
        xmlnsXlink: 'http\://www.w3.org/1999/xlink',
        style: { width: '100%', maxWidth: 540, height: 'auto', display: 'block', overflow: 'visible' },
      },
      h(
        'defs',
        null,
        h(
          'linearGradient',
          { id: gid, x1: '0', y1: '0', x2: '0', y2: '1' },
          h('stop', { offset: '0', stopColor: '#03D0FF' }),
          h('stop', { offset: '1', stopColor: sap ? '#6EB4F7' : '#0556CC' }),
        ),
      ),
      h('circle', {
        cx,
        cy,
        r: r - 26,
        fill: 'none',
        stroke: sap ? 'rgba(255,255,255,.3)' : dark ? 'rgba(255,255,255,.16)' : 'rgba(2,33,56,.14)',
        strokeWidth: 1,
      }),
      h('circle', { className: 'cyc-base', cx, cy, r, fill: 'none', stroke: `url(#${gid})`, strokeWidth: 9 }),
      h('circle', {
        className: 'cyc-trail',
        cx,
        cy,
        r,
        fill: 'none',
        stroke: `url(#${gid})`,
        strokeWidth: 9,
        pathLength: 100,
        transform: `rotate(${offDeg} ${cx} ${cy})`,
      }),
      nodes,
      labels,
      h(
        'g',
        { className: 'cyc-dot', style: { '--a0': dotDeg + 'deg', '--a1': dotDeg + 360 + 'deg' } },
        h('circle', { cx, cy: cy - r, r: 13, fill: '#03D0FF', opacity: 0.35 }),
        h('circle', { cx, cy: cy - r, r: 5.5, fill: '#fff' }),
      ),
      h(
        'g',
        { className: 'cyc-center' },
        h(
          'text',
          {
            x: cx,
            y: cy - 6,
            textAnchor: 'middle',
            style: { fontSize: 30, fontWeight: 300, fill: dark ? '#fff' : '#022E59' },
          },
          'Refined each cycle',
        ),
        h(
          'text',
          {
            x: cx,
            y: cy + 30,
            textAnchor: 'middle',
            style: { fontSize: 14, fontWeight: 300, fill: dark ? '#D2F0FC' : '#4A6076' },
          },
          'as the industry and best-practices evolve',
        ),
      ),
    );
  }
  renderVals() {
    const s = this.state,
      p = s.page;
    const goNewsletter = e => {
      e.preventDefault();
      const el = document.getElementById('newsletter');
      if (!el) return;
      const header = this.headerRef && this.headerRef.current;
      const offset = (header && header.offsetHeight) || s.headerH || 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset - 12;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      const input = el.querySelector('input[type="email"]');
      if (input) {
        window.setTimeout(() => {
          try {
            input.focus({ preventScroll: true });
          } catch (_) {
            input.focus();
          }
        }, 450);
      }
    };
    const acc = (list, key) =>
      list.map(([q, a, link], i) => {
        const open = s[key] === i;
        const isNewsletter = link === 'newsletter';
        return {
          q,
          a: Array.isArray(a) ? a : [a],
          open,
          hasLink: !!link,
          linkHref: isNewsletter
            ? '#newsletter'
            : /^https?:/.test(link || '')
              ? link
              : pageHref(link || ''),
          linkTarget: /^https?:/.test(link || '') ? '_blank' : '_self',
          linkLabel:
            {
              methodology: 'View our methodology page',
              team: 'Meet the team',
              newsletter: 'Join our email list',
              'https\://www.forbes.com/': 'Visit Forbes.com',
            }[link] || '',
          onLink: isNewsletter ? goNewsletter : e => {},
          sign: open ? '–' : '+',
          color: open ? '#0556CC' : '#022E59',
          toggle: () => this.setState({ [key]: open ? -1 : i }),
        };
      });
    const comingSoon = e => {
      e.preventDefault();
      this.flash('News & Insights is coming soon.');
    };
    return {
      introOn: !!s.intro,
      closeIntro: this.closeIntro,
      openIntro: e => {
        e.preventDefault();
        document.documentElement.style.overflow = 'hidden';
        this.setState({ intro: 'in' });
      },
      stopProp: ev => ev.stopPropagation(),
      introAnim:
        s.intro === 'out'
          ? 'vt-scrim-out 400ms cubic-bezier(.4,0,1,1) both'
          : 'vt-scrim-in 400ms cubic-bezier(.2,0,.2,1) both',
      introContentAnim:
        s.intro === 'out'
          ? 'vt-box-out 350ms cubic-bezier(.4,0,1,1) both'
          : 'vt-box-in 700ms 100ms cubic-bezier(.2,0,.2,1) both',
      speedCur: () => this.setState({ heroSpeed: 0 }, () => this.playHeroVideo()),
      speedSlow: () => this.setState({ heroSpeed: 1 }, () => this.playHeroVideo()),
      speedSlowest: () => this.setState({ heroSpeed: 2 }, () => this.playHeroVideo()),
      spBd0: (s.heroSpeed || 0) === 0 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      spBd1: s.heroSpeed === 1 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      spBd2: s.heroSpeed === 2 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      ...((() => {
        const icon = {
          independence: 'momentum',
          mission: 'evidence',
          insights: 'perspective',
          forbes: 'connection',
          events: 'connection',
          rankings: 'benchmarks',
          methodology: 'comparison',
          faq: 'assessment',
          contact: 'assessment',
          legal: 'assessment',
        };
        const iconName = icon[p] || icon.independence;
        // Locked hero treatments (selectors removed on all pages except home)
        if (p === 'mission') {
          return {
            artColor: '#02C9B5',
            artMask: 'url("assets/icons/evidence-medium-white.svg")',
          };
        }
        if (p === 'independence') {
          return {
            artColor: '#F4DF19',
            artMask: 'url("assets/icons/momentum-white.svg")',
          };
        }
        return {
          artColor: '#03D0FF',
          artMask: 'url("assets/icons/' + iconName + '-white.svg")',
        };
      })()),
      nlBg: '#0556CC',
      nlHead: '#fff',
      nlText: '#fff',
      nlPad: '128px 40px',
      nlBtn: '#02C9B5',
      nlBtnFg: '#022E59',
      nlPhoto: true,
      menuOpen: s.menuOpen,
      menuLabel: s.menuOpen ? 'Close menu' : 'Open menu',
      menuClosed: !s.menuOpen,
      toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      navBg:
        EVENT_THEME
          ? EVENT_THEME.header
          : p === 'home' && !s.scrolled && !s.menuOpen
            ? 'transparent'
            : p === 'home'
              ? '#0556CC'
              : 'linear-gradient(90deg,#0548E0 0%,#0551D4 100%)',
      navMb: p === 'home' ? -(s.headerH || 81) + 'px' : '0px',
      headerRef: this.headerRef,
      headerH: (s.headerH || 81) + 'px',
      navFg: '#fff',
      contactBg: EVENT_THEME ? EVENT_THEME.accent : '#03D0FF',
      contactFg: EVENT_THEME ? EVENT_THEME.onAccent : '#022E59',
      navBorder: '1px solid transparent',
      comingSoon,
      contact: e => {
        e.preventDefault();
        if (FILE_PAGE === 'contact') {
          const form = document.querySelector('.contact-form');
          if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        location.href = pageHref('contact');
      },
      toast: s.toast,
      navItems: NAV.map(([id, label, kids], i) => {
        const fg = '#fff';
        const navHi = EVENT_THEME ? EVENT_THEME.navAccent || EVENT_THEME.accent : '#03D0FF';
        const act =
          p === id ||
          (id === 'events' && p === 'event') ||
          (id === 'who' && p === 'bio') ||
          (id === 'insights' && (p === 'press' || p === 'article')) ||
          (kids || []).some(k => k[0] === p);
        const first = kids ? kids[0][0] : id;
        return {
          label,
          href: pageHref(first),
          hasKids: !!kids,
          showKids: !!kids && s.navOpen === i,
          open: () => kids && this.setState({ navOpen: i }),
          close: () => this.setState({ navOpen: -1 }),
          color: act ? navHi : fg,
          underline: act ? navHi : 'transparent',
          kids: (kids || []).map(([kid, kl]) => ({
            label: kl,
            href: pageHref(kid),
            color: p === kid ? navHi : fg,
          })),
        };
      }),
      dropBg: EVENT_THEME ? EVENT_THEME.drop : '#0556CC',
      dropBorder: 'rgba(255,255,255,.18)',
      cycleDark: this.cycle(true),
      cycleMeth: this.cycleMeth(
        s.methStep || 0,
        s.methPhase || 'intro',
        s.methCopyStep || 0,
        s.methCopyIn !== false,
        s.methCenterIn === true,
      ),
      methIntro: s.methPhase !== 'play',
      methPlay: s.methPhase === 'play',
      methCopyClass: s.methCopyIn !== false ? 'is-in' : '',
      methStepNum: String((s.methPhase !== 'play' ? 0 : s.methCopyStep || 0) + 1).padStart(2, '0'),
      methPrev: () => {
        const n = (typeof METH_STEPS !== 'undefined' && METH_STEPS.length) || STEPS.length;
        this.methPick(((s.methStep || 0) - 1 + n) % n, true);
      },
      methNext: () => {
        const n = (typeof METH_STEPS !== 'undefined' && METH_STEPS.length) || STEPS.length;
        this.methPick(((s.methStep || 0) + 1) % n, true);
      },
      methSteps: (typeof METH_STEPS !== 'undefined' ? METH_STEPS : STEPS.map(name => [name, ''])).map(
        ([name, body], i) => {
          // Card shows Design during intro so users can take over; circle center waits
          const intro = s.methPhase !== 'play';
          const on = intro
            ? i === 0 && s.methCopyIn !== false
            : i === (s.methCopyStep || 0) && s.methCopyIn !== false;
          return {
            name,
            body,
            onClass: on ? 'is-in' : '',
            ariaHidden: !on,
          };
        },
      ),
      methQuantFactors: (typeof METH_QUANT !== 'undefined' ? METH_QUANT : []).map(t => ({ t })),
      methQualRow1: (typeof METH_QUAL !== 'undefined' ? METH_QUAL.slice(0, 3) : []).map(t => ({ t })),
      methQualRow2: (typeof METH_QUAL !== 'undefined' ? METH_QUAL.slice(3) : []).map(t => ({ t })),
      faqItems: acc(FAQ, 'faqOpen'),
      eventSubnav: EVENT_SUBNAV.map(([id, label]) => {
        const on = (s.eventSection || 'overview') === id;
        const hi = EVENT_THEME ? EVENT_THEME.navAccent || '#02C9B5' : '#03D0FF';
        return {
          href: '#' + id,
          label,
          color: on ? hi : '#fff',
          line: on ? hi : 'transparent',
        };
      }),
      eventAgenda: EVENT_AGENDA.map(([day, date, note, slots]) => ({
        day,
        date,
        note,
        slots: slots.map(([t, title, loc]) => ({ t, title, loc })),
      })),
      eventSpeakers: EVENT_SPEAKERS.map(([name, title, firm, img]) => ({
        name,
        title,
        firm,
        img,
      })),
      eventPartners: EVENT_PARTNERS.map(([name, img]) => ({ name, img })),
      eventFaqs: EVENT_FAQS.map(([q, a], i) => {
        const open = s.eventFaqOpen === i;
        return {
          q,
          a,
          open,
          sign: open ? '–' : '+',
          toggle: () => this.setState({ eventFaqOpen: open ? -1 : i }),
        };
      }),
      registerUrl: 'https\://www.shookresearch.com/events/',
      chItems: CHARTER.map(([t, b], i) => {
        const on = s.chHover === i;
        return {
          n: String(i + 1).padStart(2, '0'),
          t,
          b,
          enter: () => s.chHover !== i && this.setState({ chHover: i }),
          fill: on ? 'scaleX(1)' : 'scaleX(0)',
          numColor: on ? '#03D0FF' : '#0556CC',
          titleColor: on ? '#fff' : '#022E59',
          titleShift: on ? 'translateX(8px)' : 'none',
          bodyOpacity: on ? 1 : 0,
          bodyShift: on ? 'none' : 'translateX(24px)',
        };
      }),
      chLeave: () => this.setState({ chHover: -1 }),
      valItems: VALUES.map(([tt, lead, b], i) => {
        const on = s.valHover === i;
        const ic = ['evidence', 'relationships', 'caliber', 'momentum', 'assessment'][i % 5];
        const left = i % 2 === 0;
        // Convening uses a deeper bright-blue so icon, line, and card stay aligned
        const pal = ['#0556CC', '#022E59', '#028FBF', '#12797C', '#680062'][i % 5];
        const n = VALUES.length;
        return {
          t: tt,
          lead,
          b,
          enter: () => s.valHover !== i && this.setState({ valHover: i }),
          justify: left ? 'flex-start' : 'flex-end',
          x: left ? '40%' : '60%',
          titleSide: left ? 'left' : 'right',
          hasNext: i < n - 1,
          curve: left ? 'M40,0 C40,50 60,50 60,100' : 'M60,0 C60,50 40,50 40,100',
          ringBg: pal,
          ringBorder: pal,
          ringScale: on ? 'scale(1.1)' : 'none',
          wmIcon: 'assets/icons/' + ic + '-white.svg',
          iconWhite: 'assets/icons/' + ic + '-bold-white.svg',
          dir2: left ? 'row' : 'row-reverse',
          ml2: left ? 'calc(30% - 120px)' : '0',
          mr2: left ? '0' : 'calc(34% - 120px)',
          topSeg: i === 0 ? 'transparent' : ['#0556CC', '#022E59', '#028FBF', '#12797C', '#680062'][(i + 4) % 5],
          botSeg: i < n - 1 ? pal : 'transparent',
          curveColor: pal,
          curve2: left ? 'M30,0 C30,45 66,55 66,100' : 'M66,0 C66,45 30,55 30,100',
          boxLift: on ? 'translateY(-6px)' : 'none',
          wmOp: 0.12,
          titleColor: '#022E59',
          boxBg: [
            'linear-gradient(150deg,#0556CC 0%,#2A7FE6 100%)',
            'linear-gradient(150deg,#022E59 0%,#0A4C8A 100%)',
            'linear-gradient(150deg,#027AA8 0%,#028FBF 100%)',
            'linear-gradient(150deg,#12797C 0%,#1A9894 100%)',
            'linear-gradient(150deg,#680062 0%,#8C1A80 100%)',
          ][i % 5],
          boxFg: '#fff',
        };
      }),
      valLeave: () => this.setState({ valHover: -1 }),
      filters: FILTERS.map((label, i) => ({
        i,
        label,
        underline: s.filter === i ? '#022E59' : 'transparent',
        select: () => this.setState({ filter: i }),
      })).filter(fl => fl.i === 0 || PEOPLE.some(x => x.groups.includes(fl.i))),
      // Leadership: 3 / 2 centered layout, same card width as the 4-col grid
      teamCols: s.filter === 1 ? '3' : '4',
      people: PEOPLE.filter(x => s.filter === 0 || x.groups.includes(s.filter)).map((x, i) => {
        const hov = s.hoverIdx === i;
        return {
          ...x,
          weight: 300,
          bg: hov ? '#022E59' : '#E6E8EB',
          markOpacity: hov ? 0.22 : 0,
          imgOpacity: hov ? 0.9 : 1,
          blend: hov ? 'luminosity' : 'normal',
          enter: () => this.setState({ hoverIdx: i }),
          leave: () => this.setState({ hoverIdx: -1 }),
          hasBio: !!BIOS[x.name],
          hasPhoto: !!x.img,
          noPhoto: !x.img,
          initials: x.name.split(' ')[0][0] + x.name.split(' ').slice(-1)[0][0],
          cursor: BIOS[x.name] ? 'pointer' : 'default',
          bioHref: BIOS[x.name] ? bioHref(x.name) : pageHref('team'),
          open: e => {
            if (!BIOS[x.name]) return;
            if (
              e.currentTarget &&
              e.currentTarget.tagName === 'A' &&
              (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)
            )
              return;
            e.preventDefault();
            location.href = bioHref(x.name);
          },
        };
      }),
      contactOpen: !!s.contactOpen,
      contactForm: !s.contactSent,
      contactSent: !!s.contactSent,
      contactLabel: 'Contact ' + (s.bioName || 'Molly Bennard'),
      openContact: () => this.setState({ contactOpen: true, contactSent: false }),
      closeContact: () => this.setState({ contactOpen: false }),
      submitContact: e => {
        e.preventDefault();
        this.setState({ contactSent: true });
      },
      bio: (() => {
        const n = s.bioName || 'Molly Bennard';
        const b = TEAM.find(r => r[0] === n) || TEAM[0];
        return {
          name: n,
          first: n.split(' ')[0],
          title: b[1],
          img: PHOTOS[n] || '',
          hasPhoto: !!PHOTOS[n],
          noPhoto: !PHOTOS[n],
          initials: n.split(' ')[0][0] + n.split(' ').slice(-1)[0][0],
          paras: BIOS[n] || [],
          linkedin: LINKEDIN[n] || '',
          hasLinkedin: !!LINKEDIN[n],
        };
      })(),
      email: s.email,
      setEmail: e => this.setState({ email: e.target.value, emailError: '' }),
      emailBorder: s.emailError ? '#CE2FAC' : 'transparent',
      emailError: s.emailError,
      subscribed: s.subscribed,
      notSubscribed: !s.subscribed,
      subscribe: e => {
        e.preventDefault();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.email))
          return this.setState({ emailError: 'Enter a valid email address.' });
        this.setState({ subscribed: true });
      },
    };
  }
}