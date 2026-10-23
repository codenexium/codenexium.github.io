export const SITE = {
  name: "Abhishek Sharma",
  role: "Full Stack Developer & AI Automation Expert",
  tagline: "I build websites and AI systems that businesses actually use.",
  email: "abhisheksharma@codenexium.com",
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
//   All of these are standard contact properties, so no custom properties are
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

/**
 * Technology stacks offered on every web service. The keys are used in the
 * `pricing` tiers below, so adding a stack to one service does not require
 * touching any component.
 */
export const TECH_STACKS = {
  "singlepage-with-contact-form": { label: "Single page", tag: "HTML/CSS/JS" },
  "multipage-with-contact-form": { label: "Next.js", tag: "Next.js" },
  "multipage-with-booking": { label: "Next.js", tag: "Next.js" },
  "wordpress-business": { label: "WordPress", tag: "WordPress" },
  "wordpress-store": { label: "WordPress", tag: "WordPress / WooCommerce" },
  "nextjs-store": { label: "Next.js", tag: "React / Next.js / Cloudflare" },
  "php-store": { label: "PHP", tag: "PHP / MySQL / Next.js" },
  "nextjs-premade-store": { label: "Next.js", tag: "Next.js / Shopify / Zoho Commerce" },
};

export const SERVICES = [
  {
    slug: "business-website",
    name: "Business Website",
    icon: "globe",
    short:
      "A professional website for any business. Start with a single page and scale up to a full multi-page build - the price you see is the price you pay.",
    pricingNote:
      "Base price covers design, development, setup, deployment, and a one-year domain, hosting and business email bundle. Need bookings, payments, CRM or automation? Add them below.",
    pricing: [
      {
        stack: "singlepage-with-contact-form",
        label: "Single page website with contact form",
        price: 3000,
        features: [
          "One scrolling page - Home, About, Services, Reviews, Contact",
          "Contact form submissions sent to your existing email and WhatsApp",
          "Contact section with Google Maps embed and directions",
          "Direct WhatsApp button for instant enquiries",
          "Mobile-first responsive design",
          "Fast, secure and SEO optimised",
          "Basic on-page SEO and Google indexing",
          "Includes one year of free hosting and business email",
        ],
      },
      {
        stack: "multipage-with-contact-form",
        label: "Multipage website with contact form",
        price: 5000,
        features: [
          "Separate pages - Home, About, Services, Contact",
          "Contact form submissions sent to CRM, email and WhatsApp",
          "Manage all contacts and communication in Zoho CRM",
          "Contact form prewired with Zoho Forms",
          "Mobile-first responsive design",
          "Fast, secure and SEO optimised",
          "Basic on-page SEO and Google indexing",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
      {
        stack: "multipage-with-booking",
        label: "Multipage website with booking/appointment",
        price: 7000,
        features: [
          "Separate pages - Home, About, Services, Bookings, Contact",
          "Contact form submissions sent to CRM, email and WhatsApp",
          "Manage bookings and appointments in Zoho CRM",
          "Manage contacts and communication in Zoho CRM",
          "Contact form prewired with Zoho Forms, and booking forms with Zoho Bookings",
          "Mobile-first responsive design",
          "Fast, secure and SEO optimised",
          "Basic on-page SEO and Google indexing",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
      {
        stack: "wordpress-business",
        label: "Multipage WordPress website",
        price: 10000,
        features: [
          "Separate pages - Home, About, Services, Gallery, Blogs, Bookings, Contact",
          "WordPress admin dashboard for full website control and management",
          "Manage pages, gallery, blog, forms & leads and bookings from the WordPress dashboard",
          "The website is built with the Elementor page builder for easy editing and management",
          "Easy to add more content later without a developer",
          "Speed, security and SEO plugins configured",
          "Mobile-first responsive design",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
    ],
    addOns: [
      {
        label: "Domain Registration",
        price: 1000,
        desc: "Domain registration and setup. Priced per year.",
      },
      {
        label: "Domain, hosting and email renewal",
        price: 3000,
        desc: "Domain, hosting and email renewal. Priced per year.",
      },
      {
        label: "Maintenance & support",
        price: 3000,
        desc: "Maintenance and support services, 24/7 uptime monitoring and weekly checkups, bug fixes and security updates. Priced per year.",
      },
      {
        label: "Custom CMS or admin dashboard",
        price: 3000,
        desc: "Custom content management system or admin dashboard for managing your website content, bookings, leads and enquiries.",
      },
      {
        label: "Payment gateway integration",
        price: 3000,
        desc: "Integrate popular payment gateways (Razorpay/PayPal/Stripe) for secure and seamless transactions.",
      },
      {
        label: "Advanced SEO, Google Analytics & Google Business Profile",
        price: 3000,
        desc: "Keyword research, on-page fixes, local listings and profile setup so you rank for the searches that matter.",
      },
      {
        label: "WhatsApp Business API Integration",
        price: 3000,
        desc: "Official WhatsApp Business API setup for automated messaging and customer engagement.",
      },
      {
        label: "Social Media Integration & Automation",
        price: 3000,
        desc: "Connect your website to social media platforms for automated posting and engagement using Zoho Social.",
      },
    ],
    deliverables: [
      "Website design & development - Next.js/WordPress",
      "You will get a fully functional website with all the features and functionality",
      "You will get the complete code and files for the website",
      "Mobile, tablet and desktop responsive layouts",
      "Contact, booking and enquiry forms wired to your inbox",
      "Speed, security & SEO optimisation",
      "Free 30-day support after launch",
      "Complete 1-Year Bundle: Hosting and Professional Email",
    ],
  },
  {
    slug: "online-store",
    name: "Business Website + Online Store/Subscriptions",
    icon: "shopping-bag",
    featured: true,
    short:
      "A full e-commerce experience - product listings, cart, checkout and secure payments, with your catalogue and orders managed from one place.",
    pricingNote:
      "Base price covers the full storefront, product catalogue, cart, checkout, payment gateway setup, and a one-year domain, hosting and business email bundle.",
    pricing: [
      {
        stack: "nextjs-premade-store",
        label: "Next.js website + Store (Shopify/Etsy/Banzena/Ballwool/Zoho Commerce)",
        price: 10000,
        features: [
          "Pages - Home, Shop, About, Contact",
          "Manage your product store, orders and payments yourself on the third-party platform",
          "Manage stock, taxes and shipping rules yourself",
          "Mobile-first responsive design",
          "Fast, secure and SEO optimised",
          "Basic on-page SEO and Google indexing",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
      {
        stack: "wordpress-store",
        label: "WordPress Website + Store (WooCommerce/EDD/Surecart/WP EasyCart/Ecwid/CartFlows/Dokan)",
        price: 15000,
        features: [
          "Pages - Home, Shop, Product Details, Cart, Checkout, Policies, About, Gallery, Blogs, Contact",
          "WordPress admin dashboard for full website control and management",
          "Manage pages, gallery, blog, forms & leads and orders from the WordPress dashboard",
          "The website is built with the Elementor page builder for easy editing and management",
          "WooCommerce setup with products and categories",
          "Manage stock, taxes and shipping rules yourself",
          "Razorpay / Stripe / PayPal payment integration",
          "Extensions and plugins configured and secured",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
      {
        stack: "php-store",
        label: "PHP Storefront",
        price: 20000,
        features: [
          "Pages - Home, Shop, Product Details, Cart, Checkout, Policies, About, Gallery, Blogs, Contact",
          "Storefront with product catalogue and categories",
          "Cart, checkout and order management",
          "Razorpay / Stripe / PayPal payment integration",
          "Custom PHP backend for orders, stock and customers",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
      {
        stack: "nextjs-store",
        label: "Next.js Storefront",
        price: 25000,
        features: [
          "Pages - Home, Shop, Product Details, Cart, Checkout, Policies, About, Gallery, Blogs, Contact",
          "Fast storefront with product catalogue and search",
          "Cart, checkout and order management",
          "Razorpay / Stripe / PayPal payment integration",
          "Customer accounts and order history",
          "Includes one year of free hosting and business email with mailbox",
        ],
      },
    ],
    addOns: [
      {
        label: "Domain Registration",
        price: 1000,
        desc: "Domain registration and setup. Priced per year.",
      },
      {
        label: "Domain, hosting and email renewal",
        price: 5000,
        desc: "Domain, hosting and email renewal. Priced per year.",
      },
      {
        label: "Maintenance & support",
        price: 5000,
        desc: "Maintenance and support services, 24/7 uptime monitoring and weekly checkups, bug fixes and security updates. Priced per year.",
      },
      {
        label: "Inventory, tax & shipping automation",
        price: 5000,
        desc: "Automatic stock tracking, tax calculation and shipping rules so orders and inventory stay in sync.",
      },
      {
        label: "Product image cleanup & listing setup",
        price: 5000,
        desc: "Upload, optimise and organise your catalogue with clean product descriptions and SEO tags.",
      },
      {
        label: "Abandoned cart & WhatsApp order recovery",
        price: 5000,
        desc: "Automated email and WhatsApp follow-ups for abandoned carts and order updates, wired into your CRM.",
      },
      {
        label: "Advanced SEO, Google Analytics & Google Business Profile",
        price: 3000,
        desc: "Keyword research, on-page fixes, local listings and profile setup so you rank for the searches that matter.",
      },
      {
        label: "Social Media Integration & Automation",
        price: 3000,
        desc: "Connect your website to social media platforms for automated posting and engagement using Zoho Social.",
      },
    ],
    deliverables: [
      "Website design & development - Next.js/PHP/WordPress",
      "Pages: Home, Shop, Product Details, Cart, Checkout, Policies",
      "Product catalogue setup and listing structure",
      "Cart, checkout and order management",
      "Payment gateway integration - Razorpay, Stripe, PayPal",
      "Speed, security & SEO optimisation",
      "Free 30-day support after launch",
      "Complete 1-Year Bundle: Hosting and Professional Email",
    ],
  },
];

/**
 * Services shown across the site. Entries in SERVICES with `hidden: true` stay
 * in the file so they can be switched back on by deleting one flag, but they
 * are filtered out of the service listings, the contact form and the footer.
 * Their /services/<slug> detail pages still build and resolve, so existing
 * links keep working while a service is paused.
 */
export const VISIBLE_SERVICES = SERVICES.filter((service) => !service.hidden);

const formatPrice = (amount) => `₹${amount.toLocaleString("en-IN")}`;

/**
 * Cheapest option for a service. Website services price per technology stack
 * and per add-on, so the headline number shown in listings is always the
 * lowest entry point rather than a hand-maintained number that can drift.
 */
export function startingPrice(service) {
  const tiers = service.pricing ?? [];
  if (tiers.length === 0) return service.price ?? 0;
  return Math.min(...tiers.map((tier) => tier.price));
}

export function startingPriceLabel(service) {
  const tiers = service.pricing ?? [];
  if (tiers.length === 0) return service.priceLabel ?? `from ${formatPrice(service.price ?? 0)}`;
  return `from ${formatPrice(startingPrice(service))}`;
}

export function formatINR(amount) {
  return formatPrice(amount);
}

/**
 * Single source of truth for a tier's option value, so the pricing cards and
 * the contact form's service list always agree on the same string.
 */
function tierOptionValue(service, tier, stack) {
  return `${service.name} - ${tier.label}${stack?.tag ? ` [${stack.tag}]` : ""} - ${formatPrice(tier.price)}`;
}

/**
 * The option value for one pricing tier, so a tier's "Start this project"
 * button can preselect that exact tier in the contact form.
 */
export function serviceTierOptionValue(service, tier) {
  return tierOptionValue(service, tier, TECH_STACKS[tier.stack]);
}

/**
 * Every bookable option, derived from the same `pricing` tiers the service
 * pages render, so the contact form can never drift from the published prices.
 *
 * Each entry keeps the service name, the option label, the tech stack and the
 * price. The `value` is the human-readable string because it is what lands in
 * the HubSpot `message` property - a sales lead should be able to read which
 * stack and budget was quoted without cross-referencing the site.
 */
export const SERVICE_OPTIONS = VISIBLE_SERVICES.flatMap((service) => {
  const tiers = service.pricing ?? [];

  if (tiers.length === 0) {
    return [
      {
        key: service.slug,
        service: service.name,
        slug: service.slug,
        option: service.priceLabel ?? "Standard",
        stack: "",
        price: service.price ?? null,
        label: `${service.name} - ${service.priceLabel ?? "Standard"}`,
        value: service.name,
      },
    ];
  }

  return tiers.map((tier) => {
    const stack = TECH_STACKS[tier.stack];
    const price = formatPrice(tier.price);
    const option = tier.label;
    // Several option labels already name their stack ("Multipage WordPress
    // website", "Next.js website + Store"), so only add the stack when it
    // actually adds information.
    const stackAddsInfo =
      stack?.label && !option.toLowerCase().includes(stack.label.toLowerCase());

    return {
      key: `${service.slug}::${tier.stack}`,
      service: service.name,
      slug: service.slug,
      option,
      stack: stack?.label ?? "",
      stackTag: stack?.tag ?? "",
      price: tier.price,
      label: `${option}${stackAddsInfo ? ` (${stack.label})` : ""} - ${price}`,
      value: tierOptionValue(service, tier, stack),
    };
  });
});

/**
 * Resolves the `defaultService` a CTA button passes in to a concrete option
 * value. Accepts either an exact tier value (a pricing card button) or a
 * service name (a service card), which falls back to that service's first
 * option. Returns "" when nothing matches.
 */
export function defaultServiceOption(serviceOrOption) {
  if (!serviceOrOption) return "";
  const exact = SERVICE_OPTIONS.find((o) => o.value === serviceOrOption);
  if (exact) return exact.value;
  const match = SERVICE_OPTIONS.find((o) => o.service === serviceOrOption);
  return match ? match.value : "";
}

export const PRICE_NOTE = "All service prices are starting prices.";

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery Call",
    duration: "Day 1",
    description:
      'We talk through your business, goals, audience and competitors. I learn exactly what "done" looks like for you.',
    items: [
      "Free 30-minute intro call",
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
      "Fixed-price proposal",
    ],
  },
  {
    step: "03",
    title: "Design & Build",
    duration: "Weeks 1–3",
    description:
      "Modern, on-brand design followed by clean, fast, SEO-friendly development. You get a staging link to review as we go.",
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
      "Post-launch, I keep everything running - updates, backups, and optional retainer work for improvements and marketing.",
    items: [
      "30 days of free support",
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
      "Travel agencies - packages, itineraries, enquiries",
    ],
  },
  {
    group: "Professionals",
    icon: "briefcase",
    description:
      "Trust-building websites that turn searches into booked consultations.",
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
      "Event planners - portfolios, packages, enquiry forms",
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
  "Zoho",
  "Omnisend",
  "WhatsApp API",
  "Node.js",
  "Hono",
  "Cloudflare",
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
      "Our portfolio site looks world-class and the booking flow is seamless. Abhishek treated our small event business like a big enterprise. Highly recommended.",
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
