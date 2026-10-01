// Page logic: routing, state, scroll reveals and the methodology cycle diagram.
// Loaded (in order: content.js, resources.js, app.js) by js/vendor/dc-runtime.js and
// evaluated together as the page logic of the <x-dc> template in index.html.

class Component extends DCLogic {
  state = {
    heroMode: 0,
    chHover: -1,
    navOpen: -1,
    page: FILE_PAGE || 'home',
    bioName: BIO_NAME,
    faqOpen: 0,
    indOpen: 0,
    filter: 0,
    hoverIdx: -1,
    videoPlaying: false,
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
    const h = (location.hash || '').replace('#', '');
    const sp = this.props.startPage;
    // Old index.html#<page> links to a page that now has its own file: send them there.
    if (!FILE_PAGE && h !== 'home' && PAGE_FILES[h]) {
      location.replace(PAGE_FILES[h]);
      return;
    }
    if (!FILE_PAGE) {
      if (PAGES.includes(sp) && sp !== 'home' && !PAGE_FILES[sp]) this.setState({ page: sp });
      else if (PAGES.includes(h)) this.setState({ page: h });
      this._onHash = () => {
        const p = location.hash.replace('#', '');
        if (p !== 'home' && PAGE_FILES[p]) return location.replace(PAGE_FILES[p]);
        if (PAGES.includes(p) && p !== this.state.page) this.setState({ page: p });
      };
      window.addEventListener('hashchange', this._onHash);
    }
    const rm = () => document.querySelectorAll('[data-demo-control]').forEach(e => e.remove());
    rm();
    setTimeout(rm, 500);
    setTimeout(rm, 2000);
    this.scheduleReveal();
    setTimeout(() => {
      this.scheduleReveal();
      this.watchDom();
    }, 300);
  }
  componentDidUpdate(prev, prevState) {
    setTimeout(() => this.valAnim(), 60);
    prev = prev || {};
    prevState = prevState || { page: this._lastPage };
    const _pg = this._lastPage;
    this._lastPage = this.state.page;
    if (_pg !== this.state.page) prevState = Object.assign({}, prevState, { page: _pg });
    this.playHeroVideo();
    const sp = this.props.startPage;
    if (!FILE_PAGE && sp !== prev.startPage && PAGES.includes(sp) && !PAGE_FILES[sp] && sp !== this.state.page) {
      this.setState({ page: sp });
      window.scrollTo(0, 0);
    }
    if (prevState.page !== this.state.page) this.scheduleReveal();
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
    document.querySelectorAll('[data-v2-row]').forEach(row => {
      const r = row.getBoundingClientRect();
      if (r.top < vh * 0.85 && r.bottom > 0) {
        row.querySelectorAll('[data-v2-node],[data-v2-box],[data-v2-seg]:last-child').forEach(el => {
          if (!el.hasAttribute('data-in')) el.setAttribute('data-in', '');
        });
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
      const r = svg.getBoundingClientRect();
      if (!r.height) return;
      const p = Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height + vh * 0.15)));
      const prev = +(svg.dataset.p || 0);
      if (p > prev) {
        svg.dataset.p = p;
        svg.style.clipPath = 'inset(0 0 ' + ((1 - p) * 100).toFixed(2) + '% 0)';
      }
      if (p >= 0.97) {
        const nx = svg.parentElement && svg.parentElement.nextElementSibling;
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
    window.removeEventListener('hashchange', this._onHash);
    if (this._io) this._io.disconnect();
    if (this._mo) this._mo.disconnect();
  }
  go(page) {
    return e => {
      // Target lives in another HTML file: do a real page load (keep cmd/ctrl-click for new tabs).
      if (page !== FILE_PAGE && (FILE_PAGE || (page !== 'home' && PAGE_FILES[page]))) {
        if (
          e.currentTarget &&
          e.currentTarget.tagName === 'A' &&
          (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)
        )
          return;
        e.preventDefault();
        location.href = pageHref(page);
        return;
      }
      e.preventDefault();
      this.setState({ page, menuOpen: false });
      if (!FILE_PAGE)
        try {
          history.replaceState(null, '', '#' + page);
        } catch (_) {}
      window.scrollTo(0, 0);
    };
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
  cycleOld(dark) {
    const h = React.createElement,
      cx = 250,
      cy = 250,
      r = 190,
      n = STEPS.length;
    const segs = STEPS.map((s, i) => {
      const off = -Math.PI / 2 - Math.PI / n;
      const a0 = off + (i / n) * 2 * Math.PI + 0.06,
        a1 = off + ((i + 1) / n) * 2 * Math.PI - 0.06;
      const p = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [x0, y0] = p(a0),
        [x1, y1] = p(a1);
      const mid = off + ((i + 0.5) / n) * 2 * Math.PI,
        lr = r + 34;
      const [lx, ly] = [cx + lr * Math.cos(mid), cy + lr * Math.sin(mid)];
      let rot = (mid * 180) / Math.PI + 90;
      if (mid > 0 && mid < Math.PI) rot += 180;
      const t = i / (n - 1),
        col = `color-mix(in srgb, #03D0FF ${100 - t * 100}%, #0556CC)`;
      const [ax, ay] = p(a1 + 0.06);
      return h(
        'g',
        { key: s },
        h('path', {
          d: `M${x0} ${y0} A${r} ${r} 0 0 1 ${x1} ${y1}`,
          stroke: col,
          strokeWidth: 7,
          fill: 'none',
          strokeLinecap: 'butt',
        }),
        h('circle', {
          cx: ax,
          cy: ay,
          r: 6,
          fill: dark ? '#022138' : '#fff',
          stroke: dark ? '#6EB4F7' : '#022E59',
          strokeWidth: 1,
        }),
        h(
          'text',
          {
            x: lx,
            y: ly,
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            transform: `rotate(${rot} ${lx} ${ly})`,
            style: {
              fontSize: 13,
              letterSpacing: '.16em',
              fontWeight: 400,
              fill: dark ? '#fff' : '#022138',
              textTransform: 'uppercase',
            },
          },
          s.toUpperCase(),
        ),
      );
    });
    return h(
      'svg',
      {
        viewBox: '0 0 500 500',
        style: { width: '100%', maxWidth: 520, height: 'auto', display: 'block', overflow: 'visible' },
      },
      h('circle', {
        cx,
        cy,
        r: r - 22,
        fill: 'none',
        stroke: dark ? 'rgba(255,255,255,.14)' : 'rgba(2,33,56,.12)',
        strokeWidth: 1,
      }),
      segs,
      h(
        'text',
        {
          x: cx,
          y: cy - 6,
          textAnchor: 'middle',
          style: { fontSize: 28, fontWeight: 300, fill: dark ? '#fff' : '#022E59' },
        },
        'Refined each cycle',
      ),
      h(
        'text',
        {
          x: cx,
          y: cy + 28,
          textAnchor: 'middle',
          style: { fontSize: 14, fontWeight: 300, fill: dark ? '#D2F0FC' : '#4A6076' },
        },
        'as the industry and best-practices evolve',
      ),
    );
  }
  renderVals() {
    const s = this.state,
      p = s.page,
      light = p === 'home-min' || p === 'home-light';
    const acc = (list, key) =>
      list.map(([q, a, link], i) => {
        const open = s[key] === i;
        return {
          q,
          a: Array.isArray(a) ? a : [a],
          open,
          hasLink: !!link,
          goLink: link && !/^https?:/.test(link) ? this.go(link) : null,
          linkHref: /^https?:/.test(link || '') ? link : pageHref(link || ''),
          linkTarget: /^https?:/.test(link || '') ? '_blank' : '_self',
          linkLabel:
            {
              methodology: 'View our methodology page',
              team: 'Meet the team',
              'https://www.forbes.com/': 'Visit Forbes.com',
            }[link] || '',
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
      isHome: p === 'home',
      speedCur: () => this.setState({ heroSpeed: 0 }, () => this.playHeroVideo()),
      speedSlow: () => this.setState({ heroSpeed: 1 }, () => this.playHeroVideo()),
      speedSlowest: () => this.setState({ heroSpeed: 2 }, () => this.playHeroVideo()),
      spBd0: (s.heroSpeed || 0) === 0 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      spBd1: s.heroSpeed === 1 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      spBd2: s.heroSpeed === 2 ? 'rgba(255,255,255,.45)' : 'rgba(255,255,255,.12)',
      valLayout1: s.valLayout === 1,
      valLayout2: s.valLayout !== 1,
      valL1: () => this.setState({ valLayout: 1 }),
      valL2: () => this.setState({ valLayout: 2 }),
      valLine1: s.valLayout === 1 ? '#0556CC' : 'transparent',
      valLine2: s.valLayout !== 1 ? '#0556CC' : 'transparent',
      prImg: s.prImg !== false,
      prImgOn: () => this.setState({ prImg: true }),
      prImgOff: () => this.setState({ prImg: false }),
      prLineOn: s.prImg !== false ? '#0556CC' : 'transparent',
      prLineOff: s.prImg === false ? '#0556CC' : 'transparent',
      newsOpt1: (s.newsOpt ?? 1) === 1,
      newsOpt2: s.newsOpt === 2,
      newsSet1: () => this.setState({ newsOpt: 1 }),
      newsSet2: () => this.setState({ newsOpt: 2 }),
      newsLine1: (s.newsOpt ?? 1) === 1 ? '#0556CC' : 'transparent',
      newsLine2: s.newsOpt === 2 ? '#0556CC' : 'transparent',
      art0: (s.charterArt ?? 1) === 0,
      artColored: (s.charterArt ?? 1) !== 0,
      artRight: (s.charterArt ?? 1) === 2 ? '-4%' : '-2%',
      artW: (s.charterArt ?? 1) === 2 ? 'clamp(340px,46vw,660px)' : 'clamp(300px,40vw,560px)',
      artColor: s.charterColor || '#03D0FF',
      artA: (s.charterArt ?? 1) === 1,
      artB: (s.charterArt ?? 1) === 2,
      artMask: (() => {
        const M = {
          independence: ['vi-momentum-w', 'momentum-white.svg'],
          mission: ['vi-evidence-w', 'evidence-white.svg'],
          news: ['vi-perspective-w', 'perspective-white.svg'],
          insights: ['vi-perspective-w', 'perspective-white.svg'],
          forbes: ['vi-connection-w', 'connection-white.svg'],
          events: ['vi-connection-w', 'connection-white.svg'],
          rankings: ['ic-h-benchmarks', 'benchmarks-white.svg'],
          methodology: ['ic-h-comparison', 'comparison-white.svg'],
          faq: ['vi-assessment-w', 'assessment-white.svg'],
        };
        const e = M[s.page] || M.independence;
        return 'url("' + ((window.__resources || {})[e[0]] || 'assets/icons/' + e[1]) + '")';
      })(),
      artSwatches: [
        ['Yellow', '#F4DF19'],
        ['Turquoise', '#02C9B5'],
        ['Magenta', '#CE2FAC'],
        ['Bright Blue', '#03D0FF'],
        ['Deep Magenta', '#680062'],
      ].map(([name, c]) => ({
        name,
        c,
        ring: (s.charterColor || '#03D0FF') === c ? '#fff' : 'rgba(255,255,255,.2)',
        pick: () => this.setState({ charterColor: c }),
      })),
      artSet0: () => this.setState({ charterArt: 0 }),
      artFg0: (s.charterArt ?? 1) === 0 ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.4)',
      artSet1: () => this.setState({ charterArt: 1 }),
      artFg1: (s.charterArt ?? 1) === 1 ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.4)',
      artSet2: () => this.setState({ charterArt: 2 }),
      artFg2: (s.charterArt ?? 1) === 2 ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.4)',
      heroVideo: !s.heroMode || s.heroMode === 3,
      heroStatic: s.heroMode === 1,
      heroSplit: s.heroMode === 2,
      heroWhite: s.heroMode === 3,
      heroNotSplit: !s.heroMode || s.heroMode === 1,
      heroSetVideo: () => this.setState({ heroMode: 0 }, () => setTimeout(() => this.playHeroVideo(), 0)),
      heroSetStatic: () => this.setState({ heroMode: 1 }),
      heroSetSplit: () => this.setState({ heroMode: 2 }),
      heroSetWhite: () => this.setState({ heroMode: 3 }, () => setTimeout(() => this.playHeroVideo(), 0)),
      heroSetWhiteFg: s.heroMode === 3 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.35)',
      heroSetVideoFg: !s.heroMode ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.35)',
      heroSetStaticFg: s.heroMode === 1 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.35)',
      heroSetSplitFg: s.heroMode === 2 ? 'rgba(255,255,255,.85)' : 'rgba(255,255,255,.35)',
      heroModeLabel: ['Hero: video', 'Hero: static', 'Hero: split'][s.heroMode || 0] + ' >',
      toggleHeroMode: () =>
        this.setState({ heroMode: ((s.heroMode || 0) + 1) % 3 }, () => setTimeout(() => this.playHeroVideo(), 0)),
      nlBg: '#0556CC',
      nlHead: '#fff',
      nlText: '#fff',
      nlPad: '128px 40px',
      nlBtn: '#02C9B5',
      nlBtnFg: '#022E59',
      nlPhoto: true,
      isHomeCeo: p === 'home-ceo',
      isHomeBody: p === 'home' || p === 'home-ceo',
      isHomeBlue: p === 'home-blue',
      isHomeMin: p === 'home-min',
      isHomeLight: p === 'home-light',
      isBlueBody: p === 'home-blue' || p === 'home-min' || p === 'home-light',
      navLight: light,
      navDark: !light,
      menuOpen: s.menuOpen,
      menuLabel: s.menuOpen ? 'Close menu' : 'Open menu',
      menuClosed: !s.menuOpen,
      toggleMenu: () => this.setState({ menuOpen: !s.menuOpen }),
      missionPadTop: p === 'home-min' || p === 'home-light' ? '80px' : '128px',
      navBg: light
        ? '#fff'
        : p === 'home' && !s.scrolled
          ? 'transparent'
          : p === 'home'
            ? '#0556CC'
            : 'linear-gradient(90deg,#0548E0 0%,#0551D4 100%)',
      navMb: p === 'home' ? -(s.headerH || 81) + 'px' : '0px',
      headerRef: this.headerRef,
      navFg: light ? '#022138' : '#fff',
      navLogo: light
        ? (window.__resources && window.__resources.r5) || 'assets/veritant-midnight.svg'
        : (window.__resources && window.__resources.r6) || 'assets/veritant-white.svg',
      contactBg: p === 'home' && s.heroMode === 2 && !s.scrolled ? '#fff' : '#03D0FF',
      contactFg: '#022E59',
      navBorder: light ? '1px solid rgba(2,33,56,.12)' : '1px solid transparent',
      videoPlaying: s.videoPlaying,
      playVideo: () => this.setState({ videoPlaying: true }),
      isMission: p === 'mission',
      isIndependence: p === 'independence',
      isMethodology: p === 'methodology',
      isTeam: p === 'team',
      isFaq: p === 'faq',
      hrefs: Object.fromEntries(PAGES.map(pg => [pg, pageHref(pg)])),
      goHome: this.go('home'),
      goHomeBlue: this.go('home-blue'),
      goHomeMin: this.go('home-min'),
      goMission: this.go('mission'),
      goIndependence: this.go('independence'),
      goMethodology: this.go('methodology'),
      goTeam: this.go('team'),
      goFaq: this.go('faq'),
      goEvents: this.go('events'),
      comingSoon,
      contact: e => {
        e.preventDefault();
        this.flash('Contact form coming soon. Write to research@veritantresearch.com.');
      },
      toast: s.toast,
      navItems: NAV.map(([id, label, kids], i) => {
        const fg = light ? '#022138' : '#fff';
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
          go: e => {
            this.setState({ navOpen: -1 });
            this.go(first)(e);
          },
          kids: (kids || []).map(([kid, kl]) => ({
            label: kl,
            href: pageHref(kid),
            color: p === kid ? '#03D0FF' : fg,
            go: e => {
              this.setState({ navOpen: -1 });
              this.go(kid)(e);
            },
          })),
        };
      }),
      dropBg: light ? '#fff' : '#0556CC',
      dropBorder: light ? 'rgba(2,33,56,.14)' : 'rgba(255,255,255,.18)',
      isForbes: p === 'forbes',
      isInsights: p === 'insights',
      isPress: p === 'press',
      isArticle: p === 'article',
      goInsights: this.go('insights'),
      goForbes: this.go('forbes'),
      goRankings: this.go('rankings'),
      goPress: this.go('press'),
      goArticle: this.go('article'),
      isRankings: p === 'rankings',
      isEvents: p === 'events',
      cycleDark: this.cycle(true),
      cycleLight: this.cycle(false),
      cycleSapphire: this.cycle(true, 'sapphire'),
      insights: [
        {
          kind: 'Article',
          title: 'Rebuilding a research method in public',
          blurb: 'Why we are publishing the criteria before the rankings, and what changes each cycle.',
          cta: 'View more →',
          img: (window.__resources && window.__resources.r7) || 'assets/photo/event-audience-web.jpg',
        },
        {
          kind: 'Video',
          title: 'Rebuilding a research method in public',
          blurb: 'Molly Bennard on the firewall between research and commerce.',
          cta: 'Watch video →',
          img: (window.__resources && window.__resources.r8) || 'assets/photo/event-applause.jpg',
        },
      ],
      values: [
        {
          title: 'Accountability',
          body: 'We answer for every ranking we publish.',
          icon: (window.__resources && window.__resources['vi-evidence-w']) || 'assets/icons/evidence-white.svg',
        },
        {
          title: 'Transparency',
          body: 'Criteria and process are published, not implied.',
          icon: (window.__resources && window.__resources['vi-momentum-w']) || 'assets/icons/momentum-white.svg',
        },
        {
          title: 'Independence',
          body: 'No outside party influences a result.',
          icon: (window.__resources && window.__resources['vi-assessment-w']) || 'assets/icons/assessment-white.svg',
        },
        {
          title: 'Continuous improvement',
          body: 'The method is reviewed and refined each cycle.',
          icon: (window.__resources && window.__resources.r12) || 'assets/icons/pathways-white.svg',
        },
      ],
      faqItems: acc(FAQ, 'faqOpen'),
      indItems: acc(IND, 'indOpen'),
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
        const R = window.__resources || {};
        const left = i % 2 === 0;
        const pal = [
          ['#0556CC', '#fff'],
          ['#022E59', '#fff'],
          ['#03D0FF', '#fff'],
          ['#12797C', '#fff'],
          ['#680062', '#fff'],
        ][i % 5];
        const dk = pal[1] === '#fff';
        const n = VALUES.length;
        return {
          t: tt,
          lead,
          b,
          enter: () => s.valHover !== i && this.setState({ valHover: i }),
          justify: left ? 'flex-start' : 'flex-end',
          x: left ? '40%' : '60%',
          titleSide: left ? 'left' : 'right',
          lineTop: i === 0 ? '50%' : '0',
          lineBot: i === n - 1 ? '50%' : '0',
          hasNext: i < n - 1,
          curve: left ? 'M40,0 C40,50 60,50 60,100' : 'M60,0 C60,50 40,50 40,100',
          ringBg: pal[0],
          ringBorder: pal[0],
          ringScale: on ? 'scale(1.1)' : 'none',
          blueOp: dk ? 0 : 1,
          whiteOp: dk ? 1 : 0,
          wmIcon: dk
            ? R['vi-' + ic + '-w'] || 'assets/icons/' + ic + '-white.svg'
            : R['vi-' + ic + '-b'] || 'assets/icons/' + ic + '-royal-blue.svg',
          notch: left
            ? 'polygon(36px 0,100% 0,100% 100%,0 100%,0 36px)'
            : 'polygon(0 0,calc(100% - 36px) 0,100% 36px,100% 100%,0 100%)',
          iconBlue: R['vb-' + ic + '-b'] || 'assets/icons/' + ic + '-bold-royal-blue.svg',
          iconWhite: R['vb-' + ic + '-w'] || 'assets/icons/' + ic + '-bold-white.svg',
          dir2: left ? 'row' : 'row-reverse',
          ml2: left ? 'calc(30% - 120px)' : '0',
          mr2: left ? '0' : 'calc(34% - 120px)',
          topSeg: i === 0 ? 'transparent' : ['#0556CC', '#022E59', '#03D0FF', '#12797C', '#680062'][(i + 4) % 5],
          botSeg: i < n - 1 ? pal[0] : 'transparent',
          curveColor: pal[0],
          curve2: left ? 'M30,0 C30,45 66,55 66,100' : 'M66,0 C66,45 30,55 30,100',
          boxLift: on ? 'translateY(-6px)' : 'none',
          wmOp: i % 5 === 2 ? 0.4 : 0.12,
          titleColor: '#022E59',
          boxBg: [
            'linear-gradient(150deg,#0556CC 0%,#2A7FE6 100%)',
            'linear-gradient(150deg,#022E59 0%,#0A4C8A 100%)',
            'linear-gradient(150deg,#03D0FF 0%,#6EDDFF 100%)',
            'linear-gradient(150deg,#12797C 0%,#1A9894 100%)',
            'linear-gradient(150deg,#680062 0%,#8C1A80 100%)',
          ][i % 5],
          boxFg: pal[1],
          boxShift: on ? (left ? 'translateX(8px)' : 'translateX(-8px)') : 'none',
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
        const f = i === 0 && x.group === 1;
        const hov = s.hoverIdx === i;
        return {
          ...x,
          weight: 300,
          bg: hov ? '#022E59' : '#E6E8EB',
          markOpacity: hov ? 0.22 : 0,
          imgOpacity: hov ? 0.9 : 1,
          blend: hov ? 'luminosity' : 'normal',
          imgScale: 'none',
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
      isBio: p === 'bio',
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
          linkedin: LINKEDIN[n] || 'https://www.linkedin.com/',
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
