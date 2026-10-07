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
		<div class="nl-modal__embed is-loading" data-vt-nl-embed>
			<p class="nl-modal__loading" data-vt-nl-loading>Loading form…</p>
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
				style="height: 280px;"
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
			if (frame.dataset.vtResized === '1') {
				if (typeof frame.iFrameResizer !== 'undefined' && frame.iFrameResizer.resize) {
					frame.iFrameResizer.resize();
				}
				return;
			}
			frame.dataset.vtResized = '1';
			iFrameResize(
				{
					checkOrigin: false,
					heightCalculationMethod: 'lowestElement',
					minHeight: 220,
					onResized: () => {
						const embed = frame.closest('[data-vt-nl-embed]');
						if (embed) embed.classList.remove('is-loading');
					},
				},
				frame
			);
		});
}

function vtLoadMailjet() {
	const ir = vtEnsureScript(
		'https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js'
	);
	vtEnsureScript('https://app.mailjet.com/pas-nc-embedded-v2.js', { type: 'text/javascript' });
	const run = () => {
		vtResizeMailjetFrames();
		setTimeout(vtResizeMailjetFrames, 400);
		setTimeout(vtResizeMailjetFrames, 1200);
	};
	if (typeof iFrameResize === 'function') run();
	else if (ir) ir.onload = run;
	else setTimeout(run, 300);
}

function vtMarkNlReady(frame) {
	if (!frame) return;
	frame.dataset.vtLoaded = '1';
	const embed = frame.closest('[data-vt-nl-embed]');
	if (embed) embed.classList.remove('is-loading');
	vtResizeMailjetFrames();
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

		// Prefetch Mailjet + warm the NL iframe so open feels instant
		vtLoadMailjet();
		const nlFrame = document.querySelector('[data-vt-nl-frame]');
		if (nlFrame && !nlFrame.dataset.vtLoadBound) {
			nlFrame.dataset.vtLoadBound = '1';
			nlFrame.addEventListener('load', () => vtMarkNlReady(nlFrame));
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
		const embed = modal.querySelector('[data-vt-nl-embed]');
		const frame = modal.querySelector('[data-vt-nl-frame]');
		if (embed && frame && frame.dataset.vtLoaded !== '1') {
			embed.classList.add('is-loading');
		}
		document.documentElement.classList.add('is-nl-modal-open');
		if (typeof modal.showModal === 'function') modal.showModal();
		else modal.setAttribute('open', '');
		this.pinNlScroll();
		vtLoadMailjet();
		setTimeout(vtResizeMailjetFrames, 150);
		setTimeout(vtResizeMailjetFrames, 500);
		setTimeout(() => {
			vtResizeMailjetFrames();
			if (embed) embed.classList.remove('is-loading');
		}, 1800);
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
				return;
			}
			// Ensure nav/menu links always navigate (dc re-renders must not cancel them)
			const a = e.target.closest('a[href]');
			if (!a || !header.contains(a)) return;
			const href = a.getAttribute('href');
			if (!href || href.charAt(0) === '#') return;
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			e.preventDefault();
			window.location.assign(href);
		});
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
			// Structure key ignores colors so scroll/theme tweaks never destroy links mid-click
			const structure = navItems
				.map(
					n =>
						n.label +
						'>' +
						n.href +
						'>' +
						(n.kids || []).map(k => k.label + ':' + k.href).join(',')
				)
				.join('|');
			if (nav.dataset.vtNavStructure !== structure) {
				nav.dataset.vtNavStructure = structure;
				nav.innerHTML = navItems
					.map((n, i) => {
						const kids =
							n.kids && n.kids.length
								? `<div class="site-nav__dropdown"><div class="site-nav__dropdown-panel">${n.kids
										.map(
											k =>
												`<a href="${vtEsc(k.href)}" class="site-nav__dropdown-link">${vtEsc(
													k.label
												)}</a>`
										)
										.join('')}</div></div>`
								: '';
						return `<div data-vt-nav-i="${i}" class="site-nav__item${
							n.hasKids ? ' site-nav__item--has-kids' : ''
						}"><a href="${vtEsc(n.href)}" class="site-nav__link"${
							n.hasKids ? ' aria-haspopup="true"' : ''
						}>${vtEsc(n.label)}</a>${kids}</div>`;
					})
					.join('');
			}
			navItems.forEach((n, i) => {
				const item = nav.querySelector(`[data-vt-nav-i="${i}"]`);
				if (!item) return;
				const link = item.querySelector('.site-nav__link');
				if (link) {
					link.style.color = n.color || '';
					link.style.borderBottom = '1px solid ' + (n.underline || 'transparent');
				}
				const panel = item.querySelector('.site-nav__dropdown-panel');
				if (panel) {
					panel.style.background = theme.dropBg || '';
					panel.style.border = '1px solid ' + (theme.dropBorder || 'transparent');
				}
				(n.kids || []).forEach((k, ki) => {
					const kid = item.querySelectorAll('.site-nav__dropdown-link')[ki];
					if (kid) kid.style.color = k.color || '';
				});
			});
		}

		if (mobile && Array.isArray(navItems)) {
			const structure =
				navItems
					.map(
						n =>
							n.label +
							'>' +
							n.href +
							'>' +
							(n.kids || []).map(k => k.label + ':' + k.href).join(',')
					)
					.join('|') +
				'|contact:' +
				(theme.contactHref || 'contact.html');
			if (mobile.dataset.vtNavStructure !== structure) {
				mobile.dataset.vtNavStructure = structure;
				const links = navItems
					.map(n => {
						const top = `<a href="${vtEsc(n.href)}" class="mobile-menu__link">${vtEsc(n.label)}</a>`;
						const kids = (n.kids || [])
							.map(k => `<a href="${vtEsc(k.href)}" class="mobile-menu__sublink">${vtEsc(k.label)}</a>`)
							.join('');
						return top + kids;
					})
					.join('');
				mobile.innerHTML =
					links +
					`<a href="${vtEsc(theme.contactHref || 'contact.html')}" class="mobile-menu__contact">Contact us</a>`;
			}
			navItems.forEach((n, i) => {
				const tops = mobile.querySelectorAll('.mobile-menu__link');
				if (tops[i]) tops[i].style.color = n.color || '';
			});
			mobile.querySelectorAll('.mobile-menu__sublink').forEach((el, idx) => {
				const flat = [];
				navItems.forEach(n => (n.kids || []).forEach(k => flat.push(k)));
				if (flat[idx]) el.style.color = flat[idx].color || '';
			});
			const mContact = mobile.querySelector('.mobile-menu__contact');
			if (mContact) {
				mContact.style.background = theme.contactBg || '#03D0FF';
				mContact.style.color = theme.contactFg || '#022E59';
			}
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
