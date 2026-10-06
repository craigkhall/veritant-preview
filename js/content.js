// Site content: navigation, FAQ, charter, team, bios and other copy data.
// Loaded (before app.js) by js/vendor/dc-runtime.js and evaluated together with it as the
// page logic of the <x-dc> template in every page.

// Every page has its own HTML file. When adding a page, add it here and to sitemap.xml.
const PAGE_FILES = { home: 'index.html', mission: 'our-why.html', independence: 'independence-charter.html', team: 'team.html', forbes: 'forbes-partnership.html', methodology: 'methodology.html', rankings: 'rankings.html', events: 'events.html', event: 'event-top-ria-summit.html', insights: 'news-insights.html', press: 'shook-research-is-now-veritant.html', article: 'what-makes-a-great-financial-advisor.html', faq: 'faq.html', bio: 'team.html' };
// The page this HTML file renders (<html data-page="...">).
const FILE_PAGE = document.documentElement.getAttribute('data-page') || 'home';
// Event detail pages: <html data-page="event" data-event-theme="turquoise" data-event="top-ria-summit">
const EVENT_THEME_KEY = document.documentElement.getAttribute('data-event-theme') || '';
const EVENT_SLUG = document.documentElement.getAttribute('data-event') || '';
// Team bio files (<html data-page="bio" data-bio="Full Name">) are named team-<full-name>.html.
const BIO_NAME = document.documentElement.getAttribute('data-bio') || null;
// Per-event header/page palettes. Only turquoise is fully live; other keys are reserved hooks.
const EVENT_THEMES = {
	turquoise: {
		header: '#12797C',
		drop: '#12797C',
		field: '#12797C',
		accent: '#FFFFFF',
		onAccent: '#12797C',
		navAccent: '#02C9B5',
		deep: '#12797C',
		night: '#022138',
		tint: '#E8F6F4',
		tint2: '#C8EEE9',
		bold: '#02C9B5',
		boldBtn: '#12797C',
		boldInk: '#022138',
		boldInk2: '#022E59',
		glow: 'rgba(2,201,181,.4)',
		card: 'rgba(18,121,124,.75)',
		grad: 'linear-gradient(135deg,#12797C 0%,#02C9B5 100%)',
		heroGrad: 'linear-gradient(135deg,#02C9B5 0%,#D2F0FC 100%)',
		ruleGrad: 'linear-gradient(90deg,#12797C 0%,#02C9B5 100%)',
	},
	/* Reserved for future summit branding — fill when those pages ship */
	magenta: null,
	'bright-blue': null,
	'deep-magenta': null,
	yellow: null,
};
const EVENT_THEME = EVENT_THEMES[EVENT_THEME_KEY] || null;
const EVENT_SUBNAV = [
	['overview', 'Overview'],
	['agenda', 'Agenda'],
	['speakers', 'Speakers'],
	['venue', 'Venue'],
	['partners', 'Partners'],
	['faqs', 'FAQs'],
];
const EVENT_AGENDA = [
	[
		'Sunday',
		'November 29',
		'',
		[
			['2:00 PM–3:00 PM', 'Registration', 'Oceana Ballroom Foyer'],
			['3:00 PM–4:30 PM', 'General Session', 'Oceana Salon B'],
			['5:00 PM–6:00 PM', 'Cocktail Reception', 'Event Lawn'],
			['6:00 PM', 'Dine-Arounds with Partners', ''],
		],
	],
	[
		'Monday',
		'November 30',
		'',
		[
			['7:00 AM–8:00 AM', 'Breakfast', 'Oceana Ballroom Foyer'],
			['8:00 AM–10:45 AM', 'General Session', 'Oceana Salon B'],
			['10:45 AM–11:50 AM', 'Breakout Sessions', 'Oceana Salon C & D'],
			['12:00 PM–12:45 PM', 'Networking Lunch', 'Oceana Salon A'],
			['12:45 PM–3:00 PM', 'General Session', 'Oceana Salon B'],
		],
	],
];
const EVENT_SPEAKERS = [
	['Sarah Mitchell', 'Head of Advisory', 'Merrill Lynch', 'assets/summit/photo-1.png'],
	['James Harrington', 'Managing Director', 'Morgan Stanley', 'assets/summit/photo-2.png'],
	['Karen Voss', 'Private Wealth Advisor', 'UBS Wealth Management', 'assets/summit/photo-3.png'],
	['David Chen', 'Head of Private Markets', 'Raymond James', 'assets/summit/photo-4.png'],
	['Patricia Holden', 'Senior Portfolio Manager', 'Bank of America', 'assets/summit/photo-5.png'],
];
const EVENT_PARTNERS = [
	['Allspring', 'assets/summit/logo-1.png'],
	['Ares', 'assets/summit/logo-2.png'],
	['Blackstone', 'assets/summit/logo-3.png'],
	['BNY', 'assets/summit/logo-4.png'],
	['Capital Group', 'assets/summit/logo-5.png'],
	['First Trust', 'assets/summit/logo-6.png'],
	['Hartford Funds', 'assets/summit/logo-7.png'],
	['Invesco QQQ', 'assets/summit/logo-8.png'],
	['State Street Investment Management', 'assets/summit/logo-9.png'],
	['TPG', 'assets/summit/logo-10.png'],
];
const EVENT_FAQS = [
	['Who can attend?', 'Attendance is by invitation, extended to advisors on Veritant’s independent rankings and to confirmed partners.'],
	['Are CE credits available?', 'Yes. Indicate your designation during registration and we will confirm eligible sessions.'],
	['Is press permitted?', 'Sessions are closed to press so conversations stay candid.'],
	['What is included?', 'All sessions, meals, and evening events. Travel and accommodation are booked separately through the room block.'],
];
const bioHref = name => 'team-' + name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.html';
const pageHref = page => PAGE_FILES[page] || 'index.html';
const CHARTER = [["Independent Research","We alone design our methodology and decide who's ranked, with every applicant judged the same way."],["Research Firewall","Research and commercial activities are separate. There is no cost to apply, no payment for placement."],["No Outside Influence","Observers may watch, never influence. No one outside Veritant shapes who gets ranked."],["Conflict Management","We disclose and manage conflicts of interest, and recuse anyone too close to an evaluation."],["Full Transparency","We're open about our process and methodology while we build each ranking, not just after it's published."],["Independent Oversight","A third party audits our governance and methodology every year and certifies our practices."],["Direct Engagement","We listen to advisors, firms, and sponsors, and use their feedback to strengthen our business"]];
const NAV = [['who','Who We Are',[['mission','Our Why'],['independence','Independence Charter'],['team','Team'],['forbes','Forbes Partnership']]],['approach','Our Approach',[['methodology','Methodology'],['rankings','Rankings']]],['events','Events'],['insights','News & Insights'],['faq','FAQs']];
const FAQ = [
  ['What does Veritant do?', ['Veritant produces independent, research-based rankings of top financial advisors and brings the industry together through high impact and high energy events. Behind every ranking is real due diligence — over 10 years, we\'ve reviewed more than 50,000 survey submissions and met with over 7,000 advisors in person.']],
  ['Where are the historical Rankings?', ['All current rankings can be found on Forbes.com. Check back soon for historical rankings on our website.'], 'https://www.forbes.com/'],
  ['Research cycle and rankings calendar', ['The first Veritant Research rankings will be published in December 2026, starting with the Top RIA Firms. The 2027 research cycle opens for submissions in January 2027. A full calendar of criteria, submission deadlines and publication dates will be published before submissions open.']],
  ['Can I submit my survey now?', ['Not yet. Submissions open in January 2027, and there is no cost to apply or be considered. Join our email list below and we’ll let you know when the cycle opens.', 'Submissions will be accepted via our website, starting in January 2027.'], 'newsletter'],
  ['I was previously named to a Forbes | Shook list. Can I still market my award?', ['Yes, you can still market the award under the Forbes | Shook rankings, subject to your firm\'s guidance. You can market the award consistent with the naming convention provided at the time.']],
  ['Do I need to reapply each year to be considered for the ranking?', ['Yes. Advisors are required to confirm their information annually in order to be considered. Advisors are evaluated against the published criteria for each research cycle. Any data you submitted in the 2026 calendar year will be used as part of our due diligence process for 2027 rankings. You may be asked to refresh and or confirm certain information prior to 2027 publication.']],
  ['Is there a cost to apply or be ranked?', ['No. There is no cost to apply, be considered or be ranked. Advisors may choose to purchase marketing materials after recognition, but those purchases do not influence the research or ranking outcome.']],
  ['How are the rankings determined?', [], 'methodology'],
];
const FILTERS = ['All','Leadership','Research & Operations','Marketing & Events','Relationship Management'];
// Full LinkedIn profile URLs by name (e.g. https://www.linkedin.com/in/jane-doe/). A bio only shows
// the LinkedIn button when its person has an entry here.
const LINKEDIN = {};
const BIOS = {"Molly Bennard":["Molly Bennard is a seasoned wealth management executive with more than two decades of experience building, scaling, and integrating firms across the United States and internationally. Most recently, she held senior leadership roles at Focus Financial Partners as President of International Operations and served as Chief Executive Officer of Connectus Wealth Advisers. In these roles, she led global expansion, M&A, and the development of advisor platforms designed to drive sustainable growth.","Earlier in her career, Molly served as Head of Strategy for AXA US, overseeing corporate strategy and business development initiatives. She also worked in Morgan Stanley’s Investment Banking Division and at PricewaterhouseCoopers in accounting and transaction advisory.","Molly is a Chartered Financial Analyst (CFA) and a Certified Public Accountant (CPA, inactive). She holds an MBA from Columbia Business School and a BS in Economics from The Wharton School at the University of Pennsylvania. Outside of work, she enjoys travel, scuba diving, dancing, running, and photography."],"Ian McGuinness":["Ian joined Shook Research as Chief Revenue Officer after four years as an Executive Director at Institutional Investor, where he led commercial partnerships with many of the world's largest asset managers across the Institutional Investor Institute and Alternative Investor Institutes.","Before that, he spent nearly eight years at Informa, most recently as Head of Sales for the GAIM and Private Placements franchises. He began his career in London with Incisive Media before relocating to New York to lead business development for Risk.net/Risk Magazine.","At Shook, he leads revenue strategy across the firm's research, recognition and event platforms — work that has always come down to convening the right people and building partnerships that last.","Ian currently lives in Orlando with his wife, Michelle, and their daughter Penelope. Outside of work, he is an avid reader, foodie and lifelong Evertonian — the one ranking he'd rather not discuss."],"Blake Eggemeyer":["Before joining SHOOK Research, Blake served as Head of Partner Engagement & Events within Private Wealth Partnerships at Ares Management, where she led key initiatives across the global wealth channel and supported advisor engagement.","Previously, she was a Vice President at Black Creek Group, directing channel marketing across multiple distribution platforms and managing the firm’s flagship strategic events.","A graduate of the University of Arizona, she began her career in finance and marketing roles within financial services. Blake lives in Denver with her husband and two young boys."]};
Object.assign(BIOS, {"Frank Berland":["Frank helped launch SHOOK Research in September 2015 and his role has grown beyond research to include managing critical projects and launching new initiatives. Frank's extensive Wall Street career has included positions with Garvin Guy Butler's OTC Currency Options trading desk, proprietary floor trader on the New York Futures Exchange trading options and futures on the NYSE Composite Index, Finex Dollar Index, and New York Mercantile Exchange. He was a Senior Natural Gas Derivatives Broker for Berisford Capital Markets Group covering basis swaps, fixed float, swaptions, EFP's, and physical gas. Frank was co-founder Energy Derivatives Desk-Natural Gas and Electricity at Garban-Intercapital (now ICAP). He is a graduate of Hofstra University, and lives with his wife and two children in Boca Raton, FL."]});
Object.assign(BIOS, {"Jordan Merrill":["Jordan graduated Columbia University's engineering school with a degree in Operations Research and a concentration in Engineering Management Systems. Her background includes marketing and research for a medical technology firm. In her spare time, Jordan enjoys cooking, writing, and going to the beach."],"Erick Lopez":["Erick graduated from Florida State University with a Bachelor of Science degree in Finance and a minor in Entrepreneurship. His professional background is in the banking industry. Erick was born and raised in West Palm Beach, FL, where he currently resides. In his spare time, he enjoys spending time with friends and family, going to the gym, and playing basketball."],"Ann Hall":["Ann graduated from the University of Virginia with a B.A. in Cognitive Science with a concentration in Cognitive Psychology. Her background includes research and design, where she was a product design intern for Premise Data. She is originally from Virginia and lives in South Florida. In her spare time, she enjoys hiking, playing tennis, and reading."],"Skylar Finkel":["Skylar graduated from the University of Florida’s Warrington College of Business with a Master of Science in Information Systems and Operations Management. Her background includes business analytics and experience as a Product Management Intern. Skylar currently resides in Wellington, FL, and enjoys going to the beach, traveling, staying active, cooking, and spending time with friends and family."],"Vincent Huynh":["Vincent is originally from Paris, France. He holds a Bachelor’s degree in business management from Stonehill College, an MBA from St. Thomas University, and a Master’s degree in Organizational Leadership from The University of the Cumberlands. In the last 4 years, he served as a Development and Operations associate as well as a Tennis and Pickleball Coach at Sportime/John McEnroe Tennis Academy in New York.","Outside of work, Vincent enjoys sports (gym, tennis, and pickleball) as well as hanging out with friends and family."],"Maxwell Bennett":["Maxwell is originally from Jacksonville, FL. He has a Bachelor's degree, dual majoring in Finance and Economics from Stetson University. He also played Division I soccer for 4 years at Stetson. Maxwell was in Stetson's highly accredited student-managed investment program, helping manage over $7 million as a Lead Analyst in Basic Materials and an Assistant Portfolio Manager. He was an Investor Relations intern at a Fortune 157 company, as well as an Investment Analyst and Wealth Management Intern at an RIA firm. For fun, he likes to surf, work out, play golf, and spend time with friends and family."],"Amman Ilyas Chuhan":["Amman is a graduate of the University of Southern California, where he earned a degree in Computer Science. He joined SHOOK Research to bring his technical background to the team. He is passionate about how data and technology can bring new perspectives to complex industries. Outside of his professional interests, Amman enjoys cooking, playing soccer, and creative storytelling through content production."],"Olivia Knier":["Olivia is a graduate of the University of Florida with a Master of International Business and a Bachelor of Economics. Her background includes financial analysis, data analytics, and experience in international consulting. Olivia currently resides in Palm Beach, FL, and enjoys running, reading, and spending time with friends and family."],"Erica Horak":["Erica graduated from Florida Atlantic University with a Bachelor’s degree in Multimedia Journalism. Her background includes hospitality and marketing for a start-up software company. In her spare time, she loves to travel and hang out with friends and family."],"Dylan Ferrante":["Dylan graduated from Florida State University with a Bachelor of Science in Marketing. Born and raised in South Florida, Dylan enjoys kayaking, going to the beach, and spending time with friends and family."]});
Object.assign(BIOS, {"Josh Opp":["Josh is a graduate of the University of Utah and obtained his CPA while working at Ernst & Young. Within EY's assurance practice, he was responsible for assessing the financial statement integrity of public banks, private insurance companies, and various alternative fund structures. From there, he held various controllership and financial leadership roles within U.S. financial services firms and global fund administrators. He brings extensive experience in finance, operations, and team leadership.","Outside of work, Josh enjoys playing music, skiing, cycling, and participating in various sports. He has also held board positions for local non-profits. He lives in the Salt Lake City area with his wife, an aerospace engineer, and their three children, who are active in both sports and music."],"Lindsey Winderman":["Lindsey graduated from the University of Florida, Warrington College of Business with a degree in Marketing. Her background is in Finance, where she previously interned for a Financial Advisor in Coral Springs, FL. In her spare time, she enjoys exercising, traveling, cooking and spending time with family and friends. She currently lives in Boca Raton, FL with her husband, Jake."],"LoriAnn LaSalle":["LoriAnn, also known as “LA,” was born and raised in South Florida. She holds a bachelor's degree in Education from the University of Florida and has experience as both a realtor and the publisher of an online media company. Passionate about helping others, LoriAnn has volunteered with various non-profit organizations over the years. She resides in Boca Raton, FL, with her two children and their rescue cat, KitKat. In her free time, she enjoys spending time at the beach, boating, cooking—primarily Italian cuisine—and reading mystery novels."],"Callie Askins":["Callie is a graduate of Kent State University with a Bachelor’s degree in Managerial Marketing, Minor in Entrepreneurship and a Professional Sales Certificate. Her background is in the Building Materials Industry where she was a Sales Support Intern at Koroseal Interior Products. She lives in Boynton Beach, FL and enjoys spending time with friends and paddle boarding."],"Brooke Jacobazzi":["Brooke has a Master's Degree in Hospitality and Tourism Management with a specialization in Mega Events along with a Bachelor's Degree in Business Marketing. Her background is in the event marketing field where she previously interned for the Joe DiMaggio Children's Hospital Foundation and then worked with the Seminole Casino Coconut Creek banquets team. Brooke currently resides in Deerfield Beach with her French bulldog, Henri."],"Iris Testiler":["Iris graduated from Florida Atlantic University with a double major in Social Sciences and History. She began her career in the hospitality industry, working in Event Sales for renowned properties including The Breakers and The Diplomat Beach Resort. Outside of work, she enjoys hot yoga, traveling abroad, and rock climbing."],"Jenny DeSeno":["Jenny DeSeno graduated from Florida State University’s College of Business with a Bachelor’s of Science Degree in Real Estate. Jenny was born in Chicago, but considers herself a Florida Native residing in Coral Springs. In her free time she likes to read and spend time on the beach."]});
const VALUES = [["Rigorous","Our methodology is our moat.","Quantitative discipline meets qualitative review: references, interviews, regulatory review, and years of pattern recognition. Rankings are the output. Rigor is the asset."],["Mission-led","We exist to elevate the industry, not just rank it.","Every interview, every event, every insight points toward the same conviction: that advisors shape lives, and the standard we hold them to should reflect that."],["Convening","We bring the industry into one room,","where advisors, management, sponsors, and capital converge. We tap into a shared energy of excellence to create influence."],["Uncompromising","Independence is non-negotiable.","Our rankings aren’t driven by AUM alone. Credibility compounds, and we protect it."],["Human","Wealth management is a human business.","Behind every ranking is a relationship, with the advisor, their client, and the community. That sense of purpose goes deep, which is why we support causes that improve lives."]];
const PHOTOS = { 'Molly Bennard': 'assets/photo/team-molly.jpg', 'Ian McGuinness': 'assets/photo/team-ian.jpg', 'Blake Eggemeyer': 'assets/photo/team-blake.jpg', 'Frank Berland': 'assets/photo/team-frank.jpg', 'Josh Opp': 'assets/photo/team-josh.jpg', 'Lindsey Winderman': 'assets/photo/team-lindsey.jpg', 'LoriAnn LaSalle': 'assets/photo/team-loriann.jpg', 'Callie Askins': 'assets/photo/team-callie.jpg', 'Brooke Jacobazzi': 'assets/photo/team-brooke.jpg', 'Iris Testiler': 'assets/photo/team-iris.jpg', 'Olivia Knier': 'assets/photo/team-olivia.jpg', 'Maxwell Bennett': 'assets/photo/team-maxwell.jpg', 'Amman Ilyas Chuhan': 'assets/photo/team-amman.jpg', 'Vincent Huynh': 'assets/photo/team-vincent.jpg', 'Skylar Finkel': 'assets/photo/team-skylar.jpg', 'Dylan Ferrante': 'assets/photo/team-dylan.jpg', 'Erica Horak': 'assets/photo/team-erica.jpg', 'Erick Lopez': 'assets/photo/team-erick.jpg', 'Jordan Merrill': 'assets/photo/team-jordan.jpg' };
const PEOPLE = [];
const TEAM = [["Molly Bennard","Chief Executive Officer",[1,2]],["Ian McGuinness","Chief Revenue Officer",[1,4]],["Frank Berland","Managing Partner",[1,4]],["Blake Eggemeyer","Chief Marketing Officer",[1,3]],["Lindsey Winderman","Vice President, Director of Operations",[2]],["Josh Opp","Vice President, Finance & Accounting",[1,2]],["Brooke Jacobazzi","Vice President of Events",[3]],["LoriAnn LaSalle","Vice President, Business Manager",[2]],["Callie Askins","Sr. Associate VP, Senior Project Leader",[2]],["Iris Testiler","Senior Associate VP, Events",[3]],["Jordan Merrill","Associate VP, Senior Research Manager",[2]],["Erick Lopez","Associate VP, Research Manager",[2]],["Erica Horak","Associate VP, Honors and Recognition",[3]],["Dylan Ferrante","Associate VP, Marketing Strategist",[3]],["Skylar Finkel","Senior Analyst",[2]],["Vincent Huynh","Senior Analyst",[4]],["Amman Ilyas Chuhan","Systems & Data Analyst",[2]],["Maxwell Bennett","Analyst",[2]],["Olivia Knier","Analyst",[2]]];
TEAM.forEach(([name, title, groups]) => PEOPLE.push({ name, title, groups, img: PHOTOS[name] || '' }));
const STEPS = ['Design','Collect','Validate','Interview','Weight','Check','Re-evaluate'];

