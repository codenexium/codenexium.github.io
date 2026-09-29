export const SITE = {
  name: "Abhishek Sharma",
  role: "Full Stack Developer & AI Automation Expert",
  tagline: "I build websites and AI systems that businesses actually use.",
  email: "contactabhisheksharmaji@gmail.com",
  location: "India · Working worldwide",
  experienceYears: 5,
  projectsDelivered: 120,
  industriesServed: 20,
  satisfaction: 98,
};

//  -  -  -  -  Integration configuration  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
// Replace the placeholder values below with your real credentials.
//
// HubSpot:
//   HUBSPOT.portalId drives the tracking script in app/layout.jsx.
//   HUBSPOT.formId is the HubSpot form that receives submissions, posted by
//   submitToHubSpot() below via the Forms API.
//
//   We submit through the Forms API rather than the tracking code's
//   "non-HubSpot forms" auto-capture. Auto-capture was tested and does create
//   contacts, but it offers no success/error feedback, needs the form to be
//   visible at submit time, and it auto-generates throwaway form entries in
//   the HubSpot forms list that you then have to clean up by hand.
//
//   The HubSpot form must be published and contain these internal field names.
//   All four are standard contact properties, so no custom properties are
//   needed:
//     firstname, lastname  split from the single full-name input
//     email, phone         standard contact properties
//     message              the only other field; service, project details and
//                          the optional resource URL are composed into it as
//                          formatted text by ContactForm
//
// WhatsApp:
//   WHATSAPP_NUMBER is the full international number used by wa.me links.
//
// Cal ID:
//   CALID.username / CALID.event build the booking page URL that the calendar
//   modal iframes. calIdEmbedUrl() appends the visitor's UTM params and a ref.
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
export const HUBSPOT = {
  portalId: "246934536",
  formId: "9e7f8044-c9dd-42f7-bd38-426e0f0b483f",
  region: "na2",
  chatEnabled: true,
};

export const WHATSAPP = {
  number: "+919518609407",
  get url() {
    const message = encodeURIComponent(
      "Hi Abhishek! I found your website and I would love to discuss a project with you.",
    );
    return `https://wa.me/${this.number.replace(/[^0-9]/g, "")}?text=${message}`;
  },
};

// Cal ID booking calendar. Replaced Calendly: cal.id is a separate product, and
// its embed.js is a Cal.com leftover that throws "Cal is not defined", so the
// calendar is embedded as a plain iframe. Verified working - the iframe renders
// the duration picker, timezone and bookable slots.
export const CALID = {
  username: "abhisheksharmaji",
  event: "client-consultation",
  get url() {
    return `https://cal.id/${this.username}/${this.event}`;
  },
};

/**
 * Builds the iframe src, forwarding the visitor's UTM parameters and a `ref`
 * tag so bookings can be traced back to where they came from in the cal.id
 * dashboard. UTM values are only appended when present, to keep the URL clean.
 */
export function calIdEmbedUrl({ ref = "website" } = {}) {
  if (typeof window === "undefined") return CALID.url;

  const params = new URLSearchParams({ embed: "true" });

  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]) {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value) params.set(key, value);
  }

  if (ref) params.set("ref", ref);

  return `${CALID.url}?${params.toString()}`;
}

//  -  -  -  -  -  -  -  -  -  HubSpot Forms API submit  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
// POSTs to the legacy unauthenticated Forms API endpoint, which is safe to call
// from the browser: it accepts submissions for a given portal + form pair and
// exposes no data.
export async function submitToHubSpot(fields) {
  const { portalId, formId } = HUBSPOT;
  if (!portalId || !formId) {
    console.warn(
      "[hubspot] Portal ID / Form ID not configured. Set HUBSPOT.portalId and HUBSPOT.formId in src/lib/config.js",
    );
    return { ok: false, simulated: true, status: 0 };
  }

  const body = {
    fields: Object.entries(fields)
      .filter(([, value]) => value !== "" && value != null)
      .map(([name, value]) => ({ name, value })),
    context: {
      pageUri: window.location.href,
      pageName: document.title,
    },
  };

  let res;
  try {
    res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
  } catch (err) {
    return { ok: false, simulated: false, status: 0, error: String(err) };
  }

  if (!res.ok) {
    let detail = "";
    try {
      detail = JSON.stringify(await res.json());
    } catch {
      detail = res.statusText;
    }
    console.error(`[hubspot] submission failed (${res.status}): ${detail}`);
  }

  return { ok: res.ok, simulated: false, status: res.status };
}

export const SERVICES = [
  {
    slug: "business-website",
    name: "Business Website",
    icon: "globe",
    price: 10000,
    priceLabel: "from ₹10,000",
    short:
      "A polished, fast, SEO-ready website that makes your business look established and turns visitors into enquiries.",
    deliverables: [
      "Website design & development - WordPress / PHP / Next.js",
      "Core pages: Home, Services, About Us, Contact Us, Portfolio",
      "Speed, security & SEO optimisation plugins",
      "Complete 1 Year Bundle: Domain, Hosting, and Professional Email",
      "Form submissions routed directly to your email",
      "Free Domain registration and hosting setup",
      "Free Mailbox setup for professional email",
      "Free 30 days support after launch",
    ],
  },
   {
    slug: "online-store",
    name: "Business Website + Online Store",
    icon: "shopping-bag",
    price: 20000,
    priceLabel: "from ₹20,000",
    featured: true,
    short:
      "A full e-commerce experience - product listings, orders, and secure revenue, wired into your CRM from day one.",
    deliverables: [
      "Website design & development - WordPress / PHP / Next.js",
      "Pages: Home, Shop, Product Details, Cart, Checkout, Privacy Policy, Terms & Conditions",
      "WooCommerce / Custom e-commerce store setup + product listings",
      "Inventory management, tax calculations, and shipping rule configuration",
      "Payment gateway integration - Stripe, PayPal, Razorpay",
      "Speed, security & SEO optimisation plugins",
      "Complete 1 Year Bundle: Domain, Hosting, and Professional Email",
      "Free Domain registration and hosting setup",
      "Free 30 days support after launch",
    ],
  },
  {
    slug: "online-bookings",
    name: "Business Website + Online Bookings",
    icon: "calendar",
    price: 15000,
    priceLabel: "from ₹15,000",
    short:
      "A complete professional website equipped with smart scheduling tools to let clients book your time and services automatically.",
    deliverables: [
      "Website design & development - WordPress / PHP / Next.js",
      "Pages: Home, Services/Packages, About, Testimonials, Book Appointment",
      "Interactive appointment scheduler & calendar sync (Google/Outlook)",
      "Automated email & SMS booking confirmations and reminders",
      "Payment gateway integration (Stripe, Razorpay) for paid appointments",
      "Speed, security & SEO optimisation plugins",
      "Complete 1 Year Bundle: Domain, Hosting, and Professional Email",
      "Free Domain registration and hosting setup",
      "Free 30 days support after launch",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI Agents and Automation",
    icon: "bot",
    price: 25000,
    priceLabel: "from ₹25,000",
    short:
      "Eliminate manual busywork. Build autonomous AI agents and automated n8n workflows that process data, sync systems, and run 24/7.",
    deliverables: [
      "n8n / Node.js backend workflow automation setup",
      "Autonomous AI Agents leveraging OpenAI, Anthropic, or Hugging Face",
      "API integrations connecting your CRM, ERP, and internal SaaS tools",
      "Automated lead enrichment, data processing, and ETL pipelines",
      "Social media and marketing workflow automation",
      "Error monitoring, alert logs, and operational dashboards",
      "Includes 1 Year VPS hosting setup for self-hosted automation engines",
      "Complete handover documentation and 1-on-1 team training",
    ],
  },
  {
    slug: "crm-funnels-chatbots",
    name: "CRM, Funnels & Chatbots",
    icon: "filter",
    price: 15000,
    priceLabel: "from ₹15,000",
    short:
      "Maximize conversions with sales funnels, synchronized CRMs, and WhatsApp/web chatbots that nurture leads automatically.",
    deliverables: [
      "Conversion-optimised landing pages with target CTAs & lead magnets",
      "CRM architecture & setup - HubSpot, Zoho, or custom platforms",
      "Multi-stage sales pipelines with automated deal tracking",
      "No-code / code-driven visual chatbot builders for Web & WhatsApp",
      "Omnichannel marketing workflows - automated email, SMS, and WhatsApp alerts",
      "Analytics & tracking setup - GA4, Meta Pixel, heatmaps",
      "Meta Business profile & official WhatsApp Business API integration",
      "Complete 1 Year Bundle: VPS Hosting for WhatsApp CRM setups",
    ],
  },
  {
    slug: "custom-software",
    name: "Custom Software Development",
    icon: "code",
    price: 40000,
    priceLabel: "from ₹40,000",
    short:
      "Tailor-made Web Apps, Mobile Apps, Desktop software, and CLI tools built to solve specific operational bottlenecks for any industry.",
    deliverables: [
      "Full Stack Development using modern stacks - Next.js, React, Node.js, PHP",
      "Cross-platform Mobile Apps (iOS & Android) or native Desktop software",
      "Custom CLI (Command Line Interface) utilities for advanced scripting and automation",
      "Scalable database architecture setup (PostgreSQL, MySQL, MongoDB)",
      "Secure user authentication (OAuth, JWT) and role-based permissions",
      "Comprehensive API documentation and unit testing",
      "Cloud deployment setup - AWS, Vercel, DigitalOcean, or VPS",
      "60 Days extended post-launch support and maintenance blueprint",
    ],
  },
];


export const PRICE_NOTE = "All service prices are starting prices.";

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    duration: "Day 1",
    description:
      'We talk through your business, goals, audience and competitors. I learn exactly what "done" looks like for you.',
    items: [
      "Free 30 min intro call",
      "Requirements mapping",
      "Scope & timeline estimate",
    ],
  },
  {
    step: "02",
    title: "Strategy & Planning",
    duration: "Days 2–4",
    description:
      "I translate your goals into a concrete plan - sitemap, page structure, tech stack, integrations and content checklist.",
    items: [
      "Sitemap & wireframes",
      "Tech stack selection",
      "Fixed price proposal",
    ],
  },
  {
    step: "03",
    title: "Design & Build",
    duration: "Weeks 1–3",
    description:
      "Modern, brand design followed by clean, fast, SEO-friendly development. You get a staging link to review as we go.",
    items: [
      "UI/UX design",
      "Development & integrations",
      "Weekly progress updates",
    ],
  },
  {
    step: "04",
    title: "Testing & Launch",
    duration: "Week 4",
    description:
      "Speed, security, mobile and SEO checks. Then we point your domain, connect email and go live together.",
    items: [
      "Quality assurance",
      "Speed & security audit",
      "Domain + email setup",
    ],
  },
  {
    step: "05",
    title: "Growth & Support",
    duration: "Ongoing",
    description:
      "Post-launch I keep everything running - updates, backups, and optional retainer work for improvements and marketing.",
    items: [
      "30 days free support",
      "Maintenance options",
      "Analytics & reporting",
    ],
  },
];

export const INDUSTRIES = [
  {
    group: "Small Businesses",
    icon: "store",
    description:
      "Restaurants, retail, gyms, salons, travel - get online and get booked.",
    items: [
      "Restaurants & cafés - menus, reservations, delivery",
      "Retail shops - e-commerce for clothing, electronics, furniture",
      "Gyms & fitness studios - schedules, memberships, booking",
      "Salons & spas - appointments, showcase, promotions",
      "Travel agencies - packages, itineraries, inquiries",
    ],
  },
  {
    group: "Professionals",
    icon: "briefcase",
    description:
      "Trust - building websites that turn searches into booked consultations.",
    items: [
      "Doctors & clinics - booking, patient info, telemedicine",
      "Lawyers & law firms - services, testimonials, contact forms",
      "Accountants & financial advisors - packages, consultations",
      "Architects & interior designers - portfolios, project showcases",
      "Tutors & coaches - courses, booking, payments",
    ],
  },
  {
    group: "Growing Enterprises",
    icon: "building",
    description:
      "Scalable web systems for teams that need to look bigger and sell faster.",
    items: [
      "Startups - branding, product showcase, investor relations",
      "Event planners - portfolios, packages, inquiry forms",
      "Real estate agents - listings, virtual tours, lead capture",
      "Freelancers - portfolio, contact, service offerings",
      "NGOs & charities - donation portals, campaigns, volunteers",
    ],
  },
];

export const TECH_STACK = [
  "WordPress",
  "PHP",
  "Next.js",
  "React",
  "TailwindCSS",
  "WooCommerce",
  "HubSpot",
  "n8n",
  "OpenAI",
  "Omnisend",
  "WhatsApp API",
  "Node.js",
  "Razorpay",
  "Stripe",
  "PayPal",
];

export const TESTIMONIALS = [
  {
    name: "Priya Verma",
    role: "Owner · Urban Spoon Café, Mumbai",
    quote:
      "Abhishek built our website and online ordering in two weeks. Bookings and delivery orders tripled within the first month. He explained everything in plain language and the site is lightning fast.",
  },
  {
    name: "Dr. Rohan Mehta",
    role: "Director · Mehta Family Clinic",
    quote:
      "Patients now book appointments online and the WhatsApp CRM keeps everything organised. It genuinely feels like we hired a full IT team, not one developer.",
  },
  {
    name: "Sarah Collins",
    role: "Founder · Collins Coaching",
    quote:
      "The funnel and email automation he set up doubled my webinar signups. He thinks about business results, not just pretty pages. Worth every rupee.",
  },
  {
    name: "Arjun Nair",
    role: "CEO · Nair Realty",
    quote:
      "Property enquiries now come in through clean landing pages straight into our CRM. Professional, fast, and reliable - rare in this space.",
  },
  {
    name: "Meera Iyer",
    role: "Principal · Bloom Events",
    quote:
      "Our portfolio site looks world - class and the booking flow is seamless. Abhishek treated our small event business like a big enterprise. Highly recommended.",
  },
  {
    name: "Vikram Singh",
    role: "Manager · FitZone Studio",
    quote:
      "Memberships, class schedules and payments all in one place. My members love it and I finally have systems that run themselves.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "why-small-businesses-need-a-crm",
    title: "Why your small business needs a CRM before a bigger ad budget",
    excerpt:
      "You can throw money at ads all day, but if leads leak out of your WhatsApp and inbox, you are paying for customers you never talk to. Here is how to plug the leak.",
    category: "Business",
    readTime: "6 min read",
    date: "Jul 24, 2026",
    cover: "crm",
  },
  {
    slug: "wordpress-vs-nextjs",
    title:
      "WordPress vs Next.js: choosing the right foundation for your website",
    excerpt:
      "The stack you pick decides your speed, your SEO ceiling and your maintenance cost. I break down when WordPress wins and when Next.js is the smarter bet.",
    category: "Development",
    readTime: "8 min read",
    date: "Jul 12, 2026",
    cover: "stack",
  },
  {
    slug: "whatsapp-for-business",
    title: "WhatsApp Business API in 2026: the complete non-technical guide",
    excerpt:
      "From Meta business verification to template approval to the perfect broadcast - everything a business owner needs to know before going live on WhatsApp.",
    category: "Automation",
    readTime: "10 min read",
    date: "Jun 28, 2026",
    cover: "whatsapp",
  },
  {
    slug: "automate-first-30-days",
    title:
      "5 automations every service business should set up in its first 30 days",
    excerpt:
      "Welcome sequences, lead routing, follow-up nudges and invoice reminders - the small workflows that quietly add hours back to your week.",
    category: "Automation",
    readTime: "7 min read",
    date: "Jun 10, 2026",
    cover: "bot",
  },
  {
    slug: "landing-page-that-converts",
    title: "Anatomy of a landing page that converts (with real examples)",
    excerpt:
      "Headline, proof, objection handling, one clear CTA. The 9 building blocks I use on every funnel page and how to order them for maximum conversion.",
    category: "Marketing",
    readTime: "9 min read",
    date: "May 30, 2026",
    cover: "funnel",
  },
  {
    slug: "seo-checklist-2026",
    title:
      "The 2026 SEO checklist: what actually moves the needle for local businesses",
    excerpt:
      "Core Web Vitals, schema markup, local citations and content depth - I walk through the checks I run before any site goes live.",
    category: "SEO",
    readTime: "8 min read",
    date: "May 18, 2026",
    cover: "seo",
  },
];
