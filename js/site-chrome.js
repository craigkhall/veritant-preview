// Global site chrome: header + newsletter + footer.
// Mounted into .site (inside #dc-root) so it stacks under main — not as a
// body sibling overlapping the height:100% dc host.
// Loaded with content.js / app.js via data-dc-script.

const VT_MAILJET_NL_SRC = 'https://go.mail.shookresearch.com/wgt/sy0h8/swos/form?c=d061d9b4';

const VT_SITE_HEADER_HTML = `
<header class="site-header" data-vt-header>
	<div class="site-header__inner">
		<a href="index.html" class="site-header__brand">
			<img src="assets/veritant-white.svg" alt="Veritant" class="site-header__logo">
		</a>
		<nav class="site-nav" data-vt-nav aria-label="Primary"></nav>
		<a href="contact.html" class="site-header__contact" data-vt-contact>Contact us</a>
		<button type="button" class="site-header__menu-toggle" data-vt-menu-toggle aria-label="Open menu" aria-expanded="false">
			<svg data-vt-icon-open viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
				<path d="M2 6h20M2 12h20M2 18h20" stroke="#fff" stroke-width="1.5"></path>
			</svg>
			<svg data-vt-icon-close viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" hidden>
				<path d="M4 4l16 16M20 4L4 20" stroke="#fff" stroke-width="1.5"></path>
			</svg>
		</button>
	</div>
	<div class="mobile-menu" data-vt-mobile-menu hidden></div>
</header>
`;

const VT_SITE_END_HTML = `
<section id="newsletter" data-screen-label="Newsletter" class="newsletter" data-vt-newsletter>
	<div class="newsletter__backdrop">
		<img src="assets/photo/newsletter-skyline-web.jpg" alt="" class="newsletter__image">
	</div>
	<div class="newsletter__tint"></div>
	<div class="newsletter__inner">
		<h2 class="newsletter__title">What’s next.</h2>
		<p class="newsletter__text">Get the latest from Veritant, including research, insights and company updates.</p>
		<button type="button" class="newsletter__submit" data-vt-nl-open>Keep me posted</button>
	</div>
</section>
<footer class="site-footer" data-vt-footer>
	<div class="site-footer__inner">
		<a href="index.html">
			<img src="assets/veritant-white.svg" alt="Veritant" class="site-footer__logo">
		</a>
		<div>
			<div class="site-footer__heading">Who We Are</div>
			<div class="site-footer__links">
				<a href="our-why.html" class="site-footer__link">Our Why</a>
				<a href="independence-charter.html" class="site-footer__link">Independence Charter</a>
				<a href="team.html" class="site-footer__link">Team</a>
				<a href="forbes-partnership.html" class="site-footer__link">Forbes Partnership</a>
			</div>
		</div>
		<div>
			<div class="site-footer__heading">Our Approach</div>
			<div class="site-footer__links">
				<a href="methodology.html" class="site-footer__link">Methodology</a>
				<a href="rankings.html" class="site-footer__link">Rankings</a>
			</div>
		</div>
		<div>
			<div class="site-footer__heading">Explore</div>
			<div class="site-footer__links">
				<a href="events.html" class="site-footer__link">Events</a>
				<a href="news-insights.html" class="site-footer__link">News &amp; Insights</a>
				<a href="faq.html" class="site-footer__link">FAQs</a>
				<a href="contact.html" class="site-footer__link">Contact</a>
			</div>
		</div>
	</div>
	<div class="site-footer__bottom">
		<span>© 2026 Veritant Research. All rights reserved.</span>
		<a href="#legal" class="site-footer__legal-link">User Agreement and Privacy Statement</a>
	</div>
</footer>
<dialog class="nl-modal" data-vt-nl-modal aria-label="Newsletter signup">
	<div class="nl-modal__panel">
		<button type="button" class="nl-modal__close" data-vt-nl-close aria-label="Close">Close</button>
		<header class="nl-modal__header">
			<h2 class="nl-modal__title">Enter your email to receive updates</h2>
		</header>
		<div class="nl-modal__embed">
			<iframe
				data-w-type="embedded"
				data-vt-nl-frame
				title="Newsletter signup"
				frameborder="0"
				scrolling="no"
				marginheight="0"
				marginwidth="0"
				src="${VT_MAILJET_NL_SRC}"
				width="100%"
				style="height: 0;"
			></iframe>
		</div>
	</div>
</dialog>
`;

function vtEnsureScript(src, attrs) {
	if (document.querySelector('script[src="' + src + '"]')) return null;
	const s = document.createElement('script');
	s.src = src;
	if (attrs) Object.keys(attrs).forEach(k => s.setAttribute(k, attrs[k]));
	document.body.appendChild(s);
	return s;
}

function vtResizeMailjetFrames() {
	if (typeof iFrameResize !== 'function') return;
	document
		.querySelectorAll(
			'.nl-modal__embed iframe[data-w-type="embedded"], .contact-form__frame iframe[data-w-type="embedded"]'
		)
		.forEach(frame => {
			if (frame.dataset.vtResized === '1') return;
			frame.dataset.vtResized = '1';
			iFrameResize({ checkOrigin: false, heightCalculationMethod: 'lowestElement' }, frame);
		});
}

function vtLoadMailjet() {
	const ir = vtEnsureScript(
		'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js'
	);
	vtEnsureScript('https://app.mailjet.com/pas-nc-embedded-v2.js', { type: 'text/javascript' });
	const run = () => {
		vtResizeMailjetFrames();
		setTimeout(vtResizeMailjetFrames, 600);
		setTimeout(vtResizeMailjetFrames, 1600);
	};
	if (typeof iFrameResize === 'function') run();
	else if (ir) ir.onload = run;
	else setTimeout(run, 400);
}

function vtEsc(s) {
	return String(s == null ? '' : s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/"/g, '&quot;');
}

const VT_SITE_CHROME = {
	mountedEnd: false,
	headerBound: false,
	nlBound: false,
	handlers: null,

	mount(opts) {
		this.handlers = opts || {};
		this.mountHeader();
		this.mountEnd();
		return true;
	},

	mountHeader() {
		if (document.querySelector('[data-vt-header]')) return;
		const site = document.querySelector('.site');
		if (!site) return;
		this.headerBound = false;
		site.insertAdjacentHTML('afterbegin', VT_SITE_HEADER_HTML);
		this.bindHeaderOnce();
	},

	mountEnd() {
		const site = document.querySelector('.site');
		if (!site) return;

		// Drop orphan chrome left outside #dc-root from earlier mounts
		document.querySelectorAll('body > [data-vt-newsletter], body > [data-vt-footer], body > [data-vt-nl-modal]').forEach(el => {
			if (!site.contains(el)) el.remove();
		});
		document.querySelectorAll('[data-vt-site-end]').forEach(el => el.remove());

		if (!site.querySelector('[data-vt-newsletter]')) {
			site.insertAdjacentHTML('beforeend', VT_SITE_END_HTML);
			const legal = site.querySelector('.site-footer__legal-link');
			if (legal && this.handlers && this.handlers.onLegal) {
				legal.addEventListener('click', this.handlers.onLegal);
			}
		}

		// Contact page still needs Mailjet for its own iframe
		if (document.querySelector('.contact-form__frame iframe[data-w-type="embedded"]')) {
			vtLoadMailjet();
		}

		this.bindNewsletterOnce();
		this.mountedEnd = true;
	},

	bindNewsletterOnce() {
		if (this.nlBound) return;
		this.nlBound = true;

		document.addEventListener('click', e => {
			if (e.target.closest('[data-vt-nl-open]')) {
				e.preventDefault();
				e.stopPropagation();
				this.openNlModal();
			} else if (e.target.closest('[data-vt-nl-close]')) {
				e.preventDefault();
				this.closeNlModal();
			}
		});

		document.addEventListener(
			'close',
			e => {
				if (e.target && e.target.matches && e.target.matches('[data-vt-nl-modal]')) {
					this.restoreNlScroll();
				}
			},
			true
		);

		document.addEventListener('click', e => {
			const modal = e.target.closest('[data-vt-nl-modal]');
			if (modal && e.target === modal) this.closeNlModal();
		});
	},

	saveNlScroll() {
		this._nlScrollY = window.scrollY || window.pageYOffset || 0;
	},

	pinNlScroll() {
		const y = this._nlScrollY || 0;
		const apply = () => window.scrollTo(0, y);
		apply();
		requestAnimationFrame(apply);
		setTimeout(apply, 0);
	},

	restoreNlScroll() {
		document.documentElement.classList.remove('is-nl-modal-open');
		this.pinNlScroll();
	},

	openNlModal() {
		const modal = document.querySelector('[data-vt-nl-modal]');
		if (!modal || modal.open) return;
		this.saveNlScroll();
		// Keep dialog on <body> so showModal focus doesn't scroll the footer into view
		if (modal.parentElement !== document.body) {
			document.body.appendChild(modal);
		}
		document.documentElement.classList.add('is-nl-modal-open');
		if (typeof modal.showModal === 'function') modal.showModal();
		else modal.setAttribute('open', '');
		this.pinNlScroll();
		vtLoadMailjet();
		setTimeout(vtResizeMailjetFrames, 200);
		setTimeout(vtResizeMailjetFrames, 800);
	},

	closeNlModal() {
		const modal = document.querySelector('[data-vt-nl-modal]');
		if (!modal || !modal.open) return;
		// Keep the scroll Y saved at open — don't re-read after a jump
		if (typeof modal.close === 'function') modal.close();
		else {
			modal.removeAttribute('open');
			this.restoreNlScroll();
		}
	},

	bindHeaderOnce() {
		if (this.headerBound) return;
		const header = document.querySelector('[data-vt-header]');
		if (!header) return;
		this.headerBound = true;

		header.addEventListener('click', e => {
			const toggle = e.target.closest('[data-vt-menu-toggle]');
			if (toggle && this.handlers && this.handlers.toggleMenu) {
				e.preventDefault();
				this.handlers.toggleMenu();
			}
		});

		header.addEventListener('mouseenter', e => {
			const item = e.target.closest('[data-vt-nav-i]');
			if (!item || !header.contains(item)) return;
			const i = +item.getAttribute('data-vt-nav-i');
			if (this.handlers && this.handlers.openNav) this.handlers.openNav(i);
		}, true);

		header.addEventListener('mouseleave', e => {
			const item = e.target.closest('[data-vt-nav-i]');
			if (!item || !header.contains(item)) return;
			if (this.handlers && this.handlers.closeNav) this.handlers.closeNav();
		}, true);
	},

	/**
	 * Apply header chrome. `theme` carries event-theme + home scroll colors;
	 * `navItems` is the same shape app.js already builds for the old template.
	 */
	applyHeader(theme, navItems) {
		this.mountHeader();
		const header = document.querySelector('[data-vt-header]');
		if (!header || !theme) return header;

		header.style.background = theme.navBg || '';
		header.style.borderBottom = theme.navBorder || '1px solid transparent';
		header.style.marginBottom = theme.navMb || '0px';

		const contact = header.querySelector('[data-vt-contact]');
		if (contact) {
			contact.href = theme.contactHref || 'contact.html';
			contact.style.background = theme.contactBg || '#03D0FF';
			contact.style.color = theme.contactFg || '#022E59';
		}

		const toggle = header.querySelector('[data-vt-menu-toggle]');
		const openIcon = header.querySelector('[data-vt-icon-open]');
		const closeIcon = header.querySelector('[data-vt-icon-close]');
		const mobile = header.querySelector('[data-vt-mobile-menu]');
		const menuOpen = !!theme.menuOpen;
		header.classList.toggle('is-menu-open', menuOpen);
		if (toggle) {
			toggle.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
			toggle.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
		}
		if (openIcon) {
			openIcon.hidden = menuOpen;
			openIcon.style.display = menuOpen ? 'none' : 'block';
		}
		if (closeIcon) {
			closeIcon.hidden = !menuOpen;
			closeIcon.style.display = menuOpen ? 'block' : 'none';
		}
		if (mobile) {
			mobile.hidden = !menuOpen;
			mobile.style.background = theme.navBg || '';
		}

		const stroke = theme.navFg || '#fff';
		header.querySelectorAll('[data-vt-menu-toggle] path').forEach(p => p.setAttribute('stroke', stroke));

		const nav = header.querySelector('[data-vt-nav]');
		if (nav && Array.isArray(navItems)) {
			nav.innerHTML = navItems
				.map((n, i) => {
					const kids =
						n.showKids && n.kids && n.kids.length
							? `<div class="site-nav__dropdown"><div class="site-nav__dropdown-panel" style="background:${vtEsc(
									theme.dropBg
								)};border:1px solid ${vtEsc(theme.dropBorder)}">${n.kids
									.map(
										k =>
											`<a href="${vtEsc(k.href)}" class="site-nav__dropdown-link" style="color:${vtEsc(
												k.color
											)}">${vtEsc(k.label)}</a>`
									)
									.join('')}</div></div>`
							: '';
					return `<div data-vt-nav-i="${i}" class="site-nav__item"><a href="${vtEsc(
						n.href
					)}" class="site-nav__link" style="color:${vtEsc(n.color)};border-bottom:1px solid ${vtEsc(
						n.underline
					)}"${n.hasKids ? ' aria-haspopup="true"' : ''}>${vtEsc(n.label)}</a>${kids}</div>`;
				})
				.join('');
		}

		if (mobile && Array.isArray(navItems)) {
			const links = navItems
				.map(n => {
					const top = `<a href="${vtEsc(n.href)}" class="mobile-menu__link" style="color:${vtEsc(
						n.color
					)}">${vtEsc(n.label)}</a>`;
					const kids = (n.kids || [])
						.map(
							k =>
								`<a href="${vtEsc(k.href)}" class="mobile-menu__sublink" style="color:${vtEsc(
									k.color
								)}">${vtEsc(k.label)}</a>`
						)
						.join('');
					return top + kids;
				})
				.join('');
			const cBg = theme.contactBg || '#03D0FF';
			const cFg = theme.contactFg || '#022E59';
			mobile.innerHTML =
				links +
				`<a href="${vtEsc(theme.contactHref || 'contact.html')}" class="mobile-menu__contact" style="background:${vtEsc(
					cBg
				)};color:${vtEsc(cFg)}">Contact us</a>`;
		}

		return header;
	},

	applyNewsletter(theme) {
		this.mountEnd();
		const nl = document.querySelector('.site [data-vt-newsletter]');
		if (!nl || !theme) return;
		if (theme.bg) nl.style.background = theme.bg;
		const inner = nl.querySelector('.newsletter__inner');
		if (inner && theme.pad) inner.style.padding = theme.pad;
		const title = nl.querySelector('.newsletter__title');
		if (title && theme.head) title.style.color = theme.head;
		const text = nl.querySelector('.newsletter__text');
		if (text && theme.text) text.style.color = theme.text;
		const btn = nl.querySelector('[data-vt-nl-open]');
		if (btn) {
			btn.style.background = theme.btnBg || '#02C9B5';
			btn.style.color = theme.btnFg || '#022E59';
			btn.style.pointerEvents = 'auto';
		}
		const photo = nl.querySelector('.newsletter__backdrop');
		const tint = nl.querySelector('.newsletter__tint');
		const showPhoto = theme.photo !== false;
		if (photo) photo.style.display = showPhoto ? '' : 'none';
		if (tint) tint.style.display = showPhoto ? '' : 'none';
	},
};
