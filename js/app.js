// Page logic: state, scroll reveals and the methodology cycle diagram.
// Loaded (after content.js) by js/vendor/dc-runtime.js and evaluated as the page logic of the
// <x-dc> template in every page. Each HTML file names the page it renders in <html data-page>.

class Component extends DCLogic {
  state = {
    chHover: -1,
    navOpen: -1,
    page: FILE_PAGE,
    bioName: BIO_NAME,
    faqOpen: 0,
    filter: 0,
    hoverIdx: -1,
    menuOpen: false,
    email: '',
    subscribed: false,
    emailError: '',
    toast: '',
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
  };
  componentDidMount() {
    setTimeout(() => this.valAnim(), 300);
    window.addEventListener('scroll', this.onVtScroll, { passive: true });
    window.addEventListener('resize', this.onVtScroll);
    setTimeout(this.onVtScroll, 0);
    setTimeout(() => this.playHeroVideo(), 0);
    setTimeout(() => this.playHeroVideo(), 800);
    this.scheduleReveal();
    setTimeout(() => {
      this.scheduleReveal();
      this.watchDom();
    }, 300);
  }
  componentDidUpdate() {
    setTimeout(() => this.valAnim(), 60);
    this.playHeroVideo();
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
  valAnim() {
    const vh = window.innerHeight;
    document.querySelectorAll('[data-cyc]').forEach(el => {
      if (el.hasAttribute('data-in')) return;
      const r = el.getBoundingClientRect();
      if (r.height && r.top < vh * 0.7 && r.bottom > vh * 0.2) el.setAttribute('data-in', '');
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
      if (top && top.hasAttribute('data-in')) {
        if (node && !node.hasAttribute('data-in')) node.setAttribute('data-in', '');
        if (box && !box.hasAttribute('data-in')) box.setAttribute('data-in', '');
        if (bot && !bot.hasAttribute('data-in')) bot.setAttribute('data-in', '');
      }
      // Stacked layout: once this row is in, unlock the next top immediately
      if (!curveBlocked && bot && bot.hasAttribute('data-in')) {
        const nx = item && item.nextElementSibling;
        const sg = nx && nx.querySelector('[data-v2-seg]');
        if (sg && !sg.hasAttribute('data-in')) sg.setAttribute('data-in', '');
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
        sg.style.scale = '1 ' + p.toFixed(3);
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
      this._seen.add(el);
      if (el.closest('[data-vt-hero]')) return;
      const isDecor = el.parentElement.tagName === 'SECTION';
      if (isDecor && !(el.getAttribute('src') || '').includes('/icons/')) return;
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
        xmlns: 'http://www.w3.org/2000/svg',
        xmlnsXlink: 'http://www.w3.org/1999/xlink',
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
              'https://www.forbes.com/': 'Visit Forbes.com',
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
      prImg: s.prImg !== false,
      prImgOn: () => this.setState({ prImg: true }),
      prImgOff: () => this.setState({ prImg: false }),
      prLineOn: s.prImg !== false ? '#0556CC' : 'transparent',
      prLineOff: s.prImg === false ? '#0556CC' : 'transparent',
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
        p === 'home' && !s.scrolled
          ? 'transparent'
          : p === 'home'
            ? '#0556CC'
            : 'linear-gradient(90deg,#0548E0 0%,#0551D4 100%)',
      navMb: p === 'home' ? -(s.headerH || 81) + 'px' : '0px',
      headerRef: this.headerRef,
      navFg: '#fff',
      contactBg: '#03D0FF',
      contactFg: '#022E59',
      navBorder: '1px solid transparent',
      comingSoon,
      contact: e => {
        e.preventDefault();
        this.flash('Contact form coming soon. Write to research@veritantresearch.com.');
      },
      toast: s.toast,
      navItems: NAV.map(([id, label, kids], i) => {
        const fg = '#fff';
        const act =
          p === id ||
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
          color: act ? '#03D0FF' : fg,
          underline: act ? '#03D0FF' : 'transparent',
          kids: (kids || []).map(([kid, kl]) => ({
            label: kl,
            href: pageHref(kid),
            color: p === kid ? '#03D0FF' : fg,
          })),
        };
      }),
      dropBg: '#0556CC',
      dropBorder: 'rgba(255,255,255,.18)',
      cycleDark: this.cycle(true),
      faqItems: acc(FAQ, 'faqOpen'),
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
