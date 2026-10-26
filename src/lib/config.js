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

/**
 * Canonical catalogue of paid extras. A pricing tier opts into an add-on by
 * name in its `addons` array, so the same add-on can appear on one plan and
 * not another without duplicating its copy or price.
 *
 * `priceByService` overrides the base price where a service genuinely costs
 * more to support the same add-on (for example, maintaining an online store).
 */
export const ADDONS = [
  {
    slug: "domain-registration",
    name: "Domain Registration",
    icon: "globe",
    category: "Foundation",
    price: 1000,
    billing: "per year",
    summary:
      "Secure the right domain, register it in your name, and wire up DNS so your website and email work from day one.",
    intro: [
      "A domain is more than a URL. It is the address customers type, the name that appears in search results, and the identity printed on invoices, business cards and social profiles.",
      "I handle the technical setup end to end: checking availability, registering the name in your ownership, configuring DNS for hosting and email, and making sure the www and non-www versions resolve cleanly over HTTPS.",
    ],
    features: [
      "Domain availability search and naming alternatives",
      "Registration or transfer in your name, not mine",
      "DNS records for hosting, email and search verification",
      "SSL-ready configuration and HTTPS redirect",
      "www to non-www redirect so one canonical address is indexed",
      "SPF, DKIM and DMARC records when business email is in use",
      "Renewal reminders before the expiry date",
      "Help moving a domain away from an old website builder",
    ],
    benefits: [
      {
        title: "You own the asset",
        desc: "The domain is registered to you and stays with your business, even if we stop working together.",
      },
      {
        title: "No DNS guesswork",
        desc: "Hosting, email and verification records are configured together, so launch day does not turn into a debugging session.",
      },
      {
        title: "One canonical address",
        desc: "Redirects and HTTPS are set up before indexing, which avoids duplicate pages and mixed-content warnings.",
      },
    ],
    process: [
      {
        title: "Shortlist the name",
        desc: "We check availability, spelling, length and how the name reads over the phone before committing.",
      },
      {
        title: "Register or transfer",
        desc: "The domain is registered in your name, or moved from your current provider without letting the site go dark.",
      },
      {
        title: "Connect and verify",
        desc: "DNS, SSL and redirects are configured, then tested on both desktop and mobile.",
      },
    ],
    bestFor: ["New businesses", "Rebrands", "Campaign domains", "Moving off a website builder"],
    faq: [
      {
        q: "Is the domain included in my plan?",
        a: "The first year of hosting and business email is included in the website plans. The domain itself is a separate add-on unless your quote says otherwise.",
      },
      {
        q: "I already own a domain. Can you use it?",
        a: "Yes. I can either transfer it to a registrar I manage or leave it where it is and point its DNS records at the new site.",
      },
      {
        q: "How long does it take?",
        a: "Registration is usually instant and DNS propagation can take a few hours. Transfers can take up to five days depending on the current registrar.",
      },
      {
        q: "Who renews it next year?",
        a: "You can renew it yourself or add the annual renewal add-on and I will handle it before it expires.",
      },
    ],
  },
  {
    slug: "domain-hosting-email-renewal",
    name: "Domain, hosting and email renewal",
    icon: "server",
    category: "Foundation",
    price: 3000,
    priceByService: { "online-store": 5000 },
    billing: "per year",
    summary:
      "Keep your domain, hosting and business email running for another year without a last-minute expiry scramble.",
    intro: [
      "Renewals are boring until something lapses. An expired domain can take your email offline, break links customers saved, and put your search rankings at risk.",
      "This add-on bundles the three services that must stay alive together - domain, hosting and business email - and includes a check that DNS, SSL and mailboxes are still configured correctly after renewal.",
    ],
    features: [
      "Domain renewal for another year",
      "Hosting renewal with the same performance and storage",
      "Business email renewal with existing mailboxes",
      "DNS, SSL and HTTPS verification after renewal",
      "Mailbox capacity and deliverability check",
      "Renewal reminder 30 days before expiry",
      "Zero-downtime renewal where the provider supports it",
      "A single invoice for all three services",
    ],
    benefits: [
      {
        title: "Nothing lapses",
        desc: "Domain, hosting and email renew together, so a missed renewal cannot silently take your enquiries offline.",
      },
      {
        title: "Verified, not just paid",
        desc: "After renewal I check that the site loads over HTTPS and that email still sends and receives.",
      },
      {
        title: "One renewal to track",
        desc: "One date and one invoice replace three separate provider dashboards and three different card charges.",
      },
    ],
    process: [
      {
        title: "Review the expiry dates",
        desc: "I map the domain, hosting and email renewal dates and flag anything expiring within the next 60 days.",
      },
      {
        title: "Renew the bundle",
        desc: "All three services are renewed together, with any plan or capacity changes applied at the same time.",
      },
      {
        title: "Verify the setup",
        desc: "DNS, SSL, website uptime and email delivery are tested, then you receive confirmation and the new renewal date.",
      },
    ],
    bestFor: ["Annual website plans", "Businesses without in-house IT", "Sites that cannot afford downtime"],
    faq: [
      {
        q: "When should I renew?",
        a: "At least 30 days before expiry. Domains enter a grace period after expiry, but email and website access can be interrupted immediately.",
      },
      {
        q: "Can I move to a different hosting provider instead?",
        a: "Yes. Migration is quoted separately because it involves moving files, databases and email, then testing the new environment.",
      },
      {
        q: "Why is the store renewal higher?",
        a: "Online stores use more storage, more server resources and need more thorough post-renewal testing for checkout and order flows.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    name: "Maintenance & support",
    icon: "shield",
    category: "Foundation",
    price: 3000,
    priceByService: { "online-store": 5000 },
    billing: "per year",
    summary:
      "Proactive updates, backups, monitoring and fixes so your site stays fast, secure and online all year.",
    intro: [
      "A website is a living system. Plugins fall behind, security advisories appear, certificates expire and small issues quietly turn into lost enquiries.",
      "Maintenance and support is the ongoing care plan: I monitor uptime, apply safe updates, keep backups, investigate problems and make small fixes before they become emergencies.",
    ],
    features: [
      "24/7 uptime monitoring with alerts",
      "Weekly website and security checkups",
      "Core, theme and plugin updates after compatibility checks",
      "Scheduled backups with a tested restore process",
      "Malware and vulnerability scans",
      "Small bug fixes and broken-link repairs",
      "Speed and Core Web Vitals checks",
      "Monthly health report and priority email support",
    ],
    benefits: [
      {
        title: "Problems caught early",
        desc: "Monitoring and weekly checks catch downtime, failed backups and expired certificates before customers notice.",
      },
      {
        title: "Updates without surprises",
        desc: "Changes are tested instead of applied blindly, which reduces the chance of a plugin update breaking checkout or forms.",
      },
      {
        title: "A named person to call",
        desc: "You get a direct support channel and a clear monthly summary instead of a ticket queue.",
      },
    ],
    process: [
      {
        title: "Onboard and baseline",
        desc: "I document the stack, take a full backup and record current performance and security settings.",
      },
      {
        title: "Run the weekly cadence",
        desc: "Updates, scans, backups and uptime checks happen on a fixed schedule, with issues fixed as they appear.",
      },
      {
        title: "Report and review",
        desc: "Each month you receive what changed, what was fixed and anything that needs a decision or a larger quote.",
      },
    ],
    bestFor: ["WordPress and plugin-heavy sites", "Online stores", "Businesses without technical staff"],
    faq: [
      {
        q: "What is the response time?",
        a: "Non-urgent requests are answered within one business day. Downtime, security issues and broken checkout flows are treated as urgent and handled the same day.",
      },
      {
        q: "Does it include new features?",
        a: "No. Small fixes are included, but new pages, integrations and redesigns are quoted separately so the scope stays predictable.",
      },
      {
        q: "Do I have to pay annually?",
        a: "The plan is annual because monitoring, backups and updates only work when they run continuously. Monthly billing is available on request.",
      },
    ],
  },
  {
    slug: "custom-cms-admin-dashboard",
    name: "Custom CMS or admin dashboard",
    icon: "dashboard",
    category: "Build",
    price: 3000,
    billing: "one-time",
    summary:
      "A simple admin area to edit pages, posts, bookings, leads and enquiries without touching code.",
    intro: [
      "Not every content change should need a developer. A focused CMS or dashboard lets your team update offers, publish articles and follow up on enquiries in minutes.",
      "I build the admin area around the content you actually manage, with role-based access, a media library and a layout that matches the live site, so edits cannot break the design.",
    ],
    features: [
      "Secure login with role-based permissions",
      "Edit page sections, headings and images",
      "Create and publish blog posts or case studies",
      "Manage bookings, leads and enquiries in one place",
      "Media library with image compression",
      "Draft, preview and scheduled publishing",
      "Activity log for accountability",
      "Short training walkthrough and written notes",
    ],
    benefits: [
      {
        title: "Independence from developers",
        desc: "Routine updates no longer wait for a quote or a slot in someone else's schedule.",
      },
      {
        title: "Fewer emergency costs",
        desc: "Fixing a typo or swapping a banner becomes a two-minute job instead of a billable change request.",
      },
      {
        title: "Consistent design",
        desc: "Editors choose from approved blocks and fields, so new content still looks like it belongs on the site.",
      },
    ],
    process: [
      {
        title: "Map the content",
        desc: "We list what changes regularly and who needs to change it, then agree on the simplest set of screens.",
      },
      {
        title: "Build and connect",
        desc: "The dashboard is built, connected to the live content and tested with real edits.",
      },
      {
        title: "Train and hand over",
        desc: "You get a walkthrough, test credentials and a short guide covering the tasks you will actually do.",
      },
    ],
    bestFor: ["Teams updating offers", "Booking-based businesses", "Blogs and resource libraries"],
    faq: [
      {
        q: "Can I edit everything on the site?",
        a: "You can edit the content types we agree on. Layout-level changes and new sections stay with a developer to protect the design.",
      },
      {
        q: "Is this WordPress?",
        a: "It can be a WordPress admin setup or a custom dashboard, depending on the plan. The WordPress website tier already includes its own dashboard.",
      },
      {
        q: "What happens if I get stuck?",
        a: "The handover includes written notes and a walkthrough. Additional training or support is available as part of the maintenance add-on.",
      },
    ],
  },
  {
    slug: "payment-gateway-integration",
    name: "Payment gateway integration",
    icon: "credit-card",
    category: "Build",
    price: 3000,
    billing: "one-time",
    summary:
      "Take payments online with Razorpay, Stripe or PayPal, including test mode, receipts and a clean checkout.",
    intro: [
      "Online payments are a trust moment. A confusing checkout, a missing receipt or an untested webhook costs sales and creates support work.",
      "I connect the right gateway for your customers, test the full flow in sandbox mode, configure order confirmations and make sure refunds and failed payments have a clear path.",
    ],
    features: [
      "Gateway selection and merchant account guidance",
      "Checkout or payment button integration",
      "UPI, cards, netbanking and wallet support where available",
      "Webhook and order-status handling",
      "Sandbox testing before go-live",
      "Automatic receipts and admin notifications",
      "Refund and failed-payment handling",
      "Handover notes for your team",
    ],
    benefits: [
      {
        title: "Get paid without manual follow-up",
        desc: "Customers complete payment on the site instead of being sent to a bank transfer or a payment link.",
      },
      {
        title: "Fewer reconciliation headaches",
        desc: "Orders, receipts and status changes stay in sync, so you are not matching screenshots to bank statements.",
      },
      {
        title: "Tested before launch",
        desc: "Successful, failed and refunded payments are all exercised in test mode before real money moves.",
      },
    ],
    process: [
      {
        title: "Choose the gateway",
        desc: "We pick based on your customers, currency, settlement needs and the platform your site runs on.",
      },
      {
        title: "Connect and configure",
        desc: "API keys, checkout, webhooks and receipts are configured in a secure environment.",
      },
      {
        title: "Test and go live",
        desc: "Test payments are run end to end, then live keys are enabled and the first real transaction is monitored.",
      },
    ],
    bestFor: ["Online stores", "Consultants and clinics", "Course and event sellers", "Service deposits"],
    faq: [
      {
        q: "Which gateways do you support?",
        a: "Razorpay, Stripe and PayPal are the usual choices. Others can be integrated if they provide a documented API.",
      },
      {
        q: "Are gateway fees included?",
        a: "No. Gateway transaction fees and subscription charges are billed directly by the provider and are separate from the integration fee.",
      },
      {
        q: "Can I take recurring payments?",
        a: "Yes, on gateways and plans that support subscriptions. Recurring billing is scoped separately because it adds plans, dunning and cancellation flows.",
      },
    ],
  },
  {
    slug: "advanced-seo-analytics",
    name: "Advanced SEO, Google Analytics & Google Business Profile",
    icon: "search",
    category: "Growth",
    price: 3000,
    billing: "one-time",
    summary:
      "Technical SEO, analytics and your Google Business Profile set up so the right local customers can find you.",
    intro: [
      "Basic on-page SEO gets a site indexed. Advanced SEO makes it findable for the searches that actually bring enquiries, and measurement shows which pages do the work.",
      "This add-on covers keyword research, metadata, structured data, sitemaps, Search Console, Google Analytics 4 and a complete Google Business Profile setup for local visibility.",
    ],
    features: [
      "Keyword research for services, locations and intent",
      "Title tags and meta descriptions for every page",
      "Structured data for local business, products and articles",
      "XML sitemap and robots.txt configuration",
      "Google Search Console setup and verification",
      "Google Analytics 4 with conversion events",
      "Google Business Profile setup or cleanup",
      "Local citation checks and a baseline report",
    ],
    benefits: [
      {
        title: "Found for the right searches",
        desc: "Pages are mapped to commercial and local intent instead of generic traffic that never converts.",
      },
      {
        title: "Decisions backed by data",
        desc: "Search Console and GA4 show which pages, queries and locations produce enquiries.",
      },
      {
        title: "Stronger local presence",
        desc: "A complete Business Profile with accurate categories, hours and photos improves map visibility and trust.",
      },
    ],
    process: [
      {
        title: "Audit and research",
        desc: "I review indexing, page speed, existing metadata and competitors, then shortlist the queries worth targeting.",
      },
      {
        title: "Implement the fixes",
        desc: "Metadata, schema, sitemaps, analytics and the Business Profile are configured and verified.",
      },
      {
        title: "Measure and report",
        desc: "You receive a baseline report and a short explanation of what to watch over the next 90 days.",
      },
    ],
    bestFor: ["Local service businesses", "New websites", "Businesses relying on Google Maps", "Content-led sites"],
    faq: [
      {
        q: "Do you guarantee first-page rankings?",
        a: "No. Nobody can honestly guarantee rankings. This add-on fixes the technical and on-page foundations and gives you clean measurement.",
      },
      {
        q: "How long before I see results?",
        a: "Technical fixes can be picked up in days, but meaningful ranking movement usually takes four to twelve weeks depending on competition.",
      },
      {
        q: "Do I need Google Ads too?",
        a: "No. Ads and SEO are separate. Ads can produce faster traffic, while SEO compounds over time.",
      },
      {
        q: "Is content writing included?",
        a: "Metadata and page-level optimisation are included. New long-form articles or service pages are quoted separately.",
      },
    ],
  },
  {
    slug: "whatsapp-business-api",
    name: "WhatsApp Business API Integration",
    icon: "message-circle",
    category: "Growth",
    price: 3000,
    billing: "one-time",
    summary:
      "Official WhatsApp Business API setup for automated replies, order updates and follow-ups from one inbox.",
    intro: [
      "WhatsApp is where many customers already ask questions, confirm bookings and chase orders. The consumer app works until more than one person needs to reply or messages need to be automated.",
      "The official Business API adds a shared inbox, approved message templates, automation and CRM integration, while keeping your number verified and compliant with Meta's rules.",
    ],
    features: [
      "Meta Business verification support",
      "Phone number setup or migration",
      "Approved message templates for common replies",
      "Automated welcome, away and follow-up messages",
      "Order, booking and payment status updates",
      "CRM integration so conversations become contacts",
      "Shared team inbox with assignment",
      "Delivery and response reporting",
    ],
    benefits: [
      {
        title: "Faster replies",
        desc: "Common questions are answered instantly, and the team can pick up the rest from one shared inbox.",
      },
      {
        title: "Fewer missed leads",
        desc: "Enquiries that arrive outside business hours still get an immediate, on-brand response.",
      },
      {
        title: "Professional and compliant",
        desc: "A verified business profile and approved templates reduce the risk of number bans that come with unofficial tools.",
      },
    ],
    process: [
      {
        title: "Verify the business",
        desc: "We prepare the Meta business profile and documents, then complete verification for the phone number.",
      },
      {
        title: "Build the flows",
        desc: "Templates, auto-replies and CRM connections are configured around your real enquiry and order journeys.",
      },
      {
        title: "Test and launch",
        desc: "Messages are tested with the team, then the number goes live with a short guide for handling conversations.",
      },
    ],
    bestFor: ["Online stores", "Clinics and salons", "Service businesses", "Support teams"],
    faq: [
      {
        q: "Do I need a new phone number?",
        a: "Not always. An existing number can often be migrated, but it stops working in the consumer app once it moves to the API. A second number is usually simpler.",
      },
      {
        q: "Who approves the message templates?",
        a: "Meta reviews every template. I prepare them to match the policy, but approval timelines and decisions are controlled by Meta.",
      },
      {
        q: "Are WhatsApp conversation charges included?",
        a: "No. Meta bills conversation and template charges separately. The setup fee covers configuration and testing only.",
      },
    ],
  },
  {
    slug: "social-media-automation",
    name: "Social Media Integration & Automation",
    icon: "megaphone",
    category: "Growth",
    price: 3000,
    billing: "one-time",
    summary:
      "Connect your website and social profiles so new content, products and reviews publish and stay in sync.",
    intro: [
      "Social proof works best when it is current. Profiles that lag behind the website, or products that never get shared, make a business look inactive.",
      "I connect your site to the platforms you actually use, add share and follow touchpoints, and automate the repetitive publishing so a new blog post or product reaches the right audience without manual copy-paste.",
    ],
    features: [
      "Profile links and share buttons across the site",
      "Automatic sharing of new blog posts and products",
      "Social feed or review strip on relevant pages",
      "Zoho Social or native scheduler configuration",
      "UTM links so traffic is attributed correctly",
      "Open Graph and social preview images",
      "Review request automation after delivery",
      "A simple posting checklist for the team",
    ],
    benefits: [
      {
        title: "Consistent presence",
        desc: "New content is shared automatically, so profiles do not go quiet when the team gets busy.",
      },
      {
        title: "More reach from existing work",
        desc: "Blog posts, products and reviews are reused across channels instead of being published once and forgotten.",
      },
      {
        title: "Less manual posting",
        desc: "Scheduling and auto-sharing remove the weekly copy-paste routine while keeping a human review step.",
      },
    ],
    process: [
      {
        title: "Connect the accounts",
        desc: "We choose the platforms worth maintaining and connect them securely to the site and scheduler.",
      },
      {
        title: "Configure the automation",
        desc: "Share rules, preview images, UTM links and review requests are set up and tested.",
      },
      {
        title: "Hand over the rhythm",
        desc: "You get a simple cadence for what to post, what gets automated and what still needs a human.",
      },
    ],
    bestFor: ["Content-led businesses", "Online stores", "Personal brands", "Local service providers"],
    faq: [
      {
        q: "Which platforms are supported?",
        a: "Facebook, Instagram, LinkedIn, X and Google Business Profile are the usual set. The exact list depends on the scheduler and the accounts you own.",
      },
      {
        q: "Do I need Zoho Social?",
        a: "No. Native scheduling or another tool works. Zoho Social is convenient if you already use Zoho CRM.",
      },
      {
        q: "Will it post without my approval?",
        a: "Only if you want it to. Most teams keep a review step for sensitive content and let product or blog sharing run automatically.",
      },
    ],
  },
  {
    slug: "inventory-tax-shipping-automation",
    name: "Inventory, tax & shipping automation",
    icon: "boxes",
    category: "Store",
    price: 5000,
    billing: "one-time",
    summary:
      "Automate stock counts, tax rules and shipping rates so every order stays accurate without spreadsheets.",
    intro: [
      "Manual inventory works until orders arrive faster than someone can update a sheet. Then come oversells, wrong tax lines and shipping quotes that eat the margin.",
      "This add-on configures your store's stock, tax and shipping rules, connects them to the tools you already use, and adds alerts so problems surface before a customer does.",
    ],
    features: [
      "Product and variant stock setup",
      "Low-stock alerts and reorder thresholds",
      "GST and tax rules by product or region",
      "Shipping zones, weight bands and rate rules",
      "Automatic stock reduction on paid orders",
      "Order-status and fulfilment automation",
      "Supplier cost and margin tracking",
      "Reports for stock, tax and shipping",
    ],
    benefits: [
      {
        title: "Fewer oversells",
        desc: "Stock updates as orders are paid, and low-stock alerts give you time to restock before a listing runs dry.",
      },
      {
        title: "Accurate totals",
        desc: "Tax and shipping rules are configured once and applied consistently, instead of being corrected after checkout.",
      },
      {
        title: "Less admin per order",
        desc: "Status changes, stock movements and fulfilment steps stop depending on a spreadsheet update.",
      },
    ],
    process: [
      {
        title: "Audit the catalogue",
        desc: "We review products, variants, current stock, tax treatment and the shipping regions you actually serve.",
      },
      {
        title: "Configure the rules",
        desc: "Stock, tax and shipping logic is set up and connected to your store, POS or accounting tools.",
      },
      {
        title: "Test and monitor",
        desc: "Test orders are run across regions and payment states, then alerts and reports are handed over.",
      },
    ],
    bestFor: ["Growing stores", "Multi-channel sellers", "Large catalogues", "Stores shipping across states"],
    faq: [
      {
        q: "Does this work with WooCommerce?",
        a: "Yes. It works with WooCommerce and other platforms that expose stock, tax and shipping rules through their admin or API.",
      },
      {
        q: "Can it handle multiple warehouses?",
        a: "Yes, where the platform supports locations. Multi-location stock is scoped after reviewing the catalogue and fulfilment flow.",
      },
      {
        q: "Do you file my taxes?",
        a: "No. This is store configuration, not accounting or tax filing. Your accountant should confirm the rates and rules before they go live.",
      },
    ],
  },
  {
    slug: "product-image-cleanup",
    name: "Product image cleanup & listing setup",
    icon: "image",
    category: "Store",
    price: 5000,
    billing: "one-time",
    summary:
      "Upload, clean and optimise product photos and write listings so your catalogue looks consistent and sells.",
    intro: [
      "Product photos do most of the selling online. Mixed backgrounds, inconsistent crops and thin descriptions make even good products look unfinished.",
      "I clean and standardise the images, compress them for fast loading, and write titles, descriptions and alt text that work for both customers and search engines.",
    ],
    features: [
      "Background cleanup and consistent framing",
      "Cropping and resizing for store and social",
      "Compression that keeps images sharp but light",
      "Descriptive file names and alt text",
      "Product titles with the right keywords",
      "Short and long descriptions per product",
      "Categories, tags and variant labels",
      "Bulk upload and listing quality check",
    ],
    benefits: [
      {
        title: "A catalogue that looks deliberate",
        desc: "Consistent images and descriptions make the store feel trustworthy before a customer reads a single price.",
      },
      {
        title: "Faster pages",
        desc: "Compressed, correctly sized images improve load time and Core Web Vitals on both mobile and desktop.",
      },
      {
        title: "Better product discovery",
        desc: "Keyword-aware titles, descriptions and alt text help products appear in store search and Google Shopping.",
      },
    ],
    process: [
      {
        title: "Collect the assets",
        desc: "You share the original photos and product details; I flag missing angles or images that are too low-resolution to use.",
      },
      {
        title: "Edit and write",
        desc: "Images are cleaned and resized, then titles, descriptions and alt text are written to a consistent template.",
      },
      {
        title: "Upload and check",
        desc: "Listings are uploaded, checked on mobile and desktop, and corrected before handover.",
      },
    ],
    bestFor: ["New online stores", "Catalogue refreshes", "Marketplace sellers", "Stores with inconsistent photos"],
    faq: [
      {
        q: "How many products are covered?",
        a: "Up to 50 products are included. Larger catalogues are quoted per batch after reviewing image quality and variant count.",
      },
      {
        q: "Do you photograph the products?",
        a: "No. This add-on works from photos you provide. Product photography can be arranged separately.",
      },
      {
        q: "What if I do not like the descriptions?",
        a: "One revision round is included. I rewrite the listings using your feedback before the final upload.",
      },
    ],
  },
  {
    slug: "abandoned-cart-recovery",
    name: "Abandoned cart & WhatsApp order recovery",
    icon: "cart",
    category: "Store",
    price: 5000,
    billing: "one-time",
    summary:
      "Automated email and WhatsApp follow-ups that bring back abandoned carts and keep customers updated on orders.",
    intro: [
      "Most shoppers leave before paying. Some are comparison shopping, some got interrupted, and some hit a checkout problem they never reported.",
      "This add-on adds a short, polite recovery sequence across email and WhatsApp, plus order and shipping updates, so hesitant buyers get a reason to return and paying customers stop asking where their order is.",
    ],
    features: [
      "Abandoned-cart tracking and audience setup",
      "Three-step email and WhatsApp recovery sequence",
      "Approved WhatsApp templates with opt-in handling",
      "Order confirmation and shipping updates",
      "CRM sync for contacts and order history",
      "Opt-out and quiet-hours compliance",
      "Recovery and revenue reporting",
      "A/B test on timing or message copy",
    ],
    benefits: [
      {
        title: "Recover revenue already earned",
        desc: "A timely reminder reaches people who were close to buying, without spending more on ads.",
      },
      {
        title: "Fewer support messages",
        desc: "Automatic order and shipping updates answer the most common \"where is my order?\" question.",
      },
      {
        title: "A better repeat-purchase path",
        desc: "Every recovered order adds a contact you can re-engage with future offers, subject to opt-in.",
      },
    ],
    process: [
      {
        title: "Connect the store",
        desc: "Cart, order and customer events are connected from your store or platform into the automation tool.",
      },
      {
        title: "Design the sequence",
        desc: "Timing, copy and templates are written for email and WhatsApp, with a clear opt-out path.",
      },
      {
        title: "Approve and launch",
        desc: "WhatsApp templates are submitted for approval, test carts are run, then the sequence goes live.",
      },
    ],
    bestFor: ["Stores with steady traffic", "Cash-on-delivery stores", "Repeat-purchase products", "Stores sending order updates manually"],
    faq: [
      {
        q: "Is WhatsApp messaging allowed for every customer?",
        a: "Only with opt-in and approved templates. I configure the sequence to respect Meta's policy and your customers' preferences.",
      },
      {
        q: "Which platforms does it work with?",
        a: "WooCommerce, Shopify and Zoho Commerce are the usual starting points. Other platforms work if they expose cart and order events.",
      },
      {
        q: "How long does setup take?",
        a: "Usually one to two weeks, depending on template approval and how quickly product and brand assets are available.",
      },
    ],
  },
];

/**
 * Look up an add-on by slug or by the exact name used in a plan's `addons`
 * array. Matching is case-insensitive so small copy edits do not break links.
 */
export function getAddOn(identifier) {
  if (!identifier) return null;
  const key = String(identifier).trim().toLowerCase();
  return (
    ADDONS.find((addOn) => addOn.slug === key) ??
    ADDONS.find((addOn) => addOn.name.toLowerCase() === key) ??
    null
  );
}

export function addOnPrice(addOn, service) {
  if (!addOn) return 0;
  return addOn.priceByService?.[service?.slug] ?? addOn.price;
}

export function addOnPriceRange(addOn) {
  if (!addOn) return { min: 0, max: 0, varies: false };
  const prices = [addOn.price, ...Object.values(addOn.priceByService ?? {})];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return { min, max, varies: min !== max };
}

/**
 * Turns a catalogue entry into the lightweight shape the CTA modal and contact
 * form already understand (`label`, `desc`, `price`), with the price resolved
 * for the service the visitor is viewing.
 */
export function resolveAddOn(identifier, service) {
  const addOn = getAddOn(identifier);
  if (!addOn) return null;
  return {
    ...addOn,
    label: addOn.name,
    desc: addOn.summary,
    price: addOnPrice(addOn, service),
  };
}

export function addOnsForPlan(service, tier) {
  return (tier?.addons ?? []).map((name) => resolveAddOn(name, service)).filter(Boolean);
}

/**
 * Unique add-ons supported by any plan in a service, in catalogue order.
 */
export function addOnsForService(service) {
  const supported = new Set(
    (service?.pricing ?? []).flatMap((tier) =>
      (tier.addons ?? []).map((name) => getAddOn(name)?.slug).filter(Boolean)
    )
  );
  return ADDONS.filter((addOn) => supported.has(addOn.slug)).map((addOn) =>
    resolveAddOn(addOn.slug, service)
  );
}

/**
 * Every service plan that supports an add-on, used by the add-on detail page
 * to show where the extra can be attached.
 */
export function plansForAddOn(identifier) {
  const addOn = getAddOn(identifier);
  if (!addOn) return [];
  return SERVICES.flatMap((service) =>
    (service.pricing ?? [])
      .filter((tier) =>
        (tier.addons ?? []).some((name) => getAddOn(name)?.slug === addOn.slug)
      )
      .map((tier) => ({ service, tier }))
  );
}

export function relatedAddOns(addOn, limit = 3) {
  if (!addOn) return [];
  const sameCategory = ADDONS.filter(
    (item) => item.slug !== addOn.slug && item.category === addOn.category
  );
  const rest = ADDONS.filter(
    (item) => item.slug !== addOn.slug && item.category !== addOn.category
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

export function addOnBillingLabel(addOn) {
  if (!addOn) return "";
  if (addOn.billing === "per year") return "per year";
  if (addOn.billing === "monthly") return "per month";
  return "one-time";
}

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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Payment gateway integration",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "WhatsApp Business API Integration",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Custom CMS or admin dashboard",
          "Payment gateway integration",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "WhatsApp Business API Integration",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Custom CMS or admin dashboard",
          "Payment gateway integration",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "WhatsApp Business API Integration",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Custom CMS or admin dashboard",
          "Payment gateway integration",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "WhatsApp Business API Integration",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Product image cleanup & listing setup",
          "Abandoned cart & WhatsApp order recovery",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Inventory, tax & shipping automation",
          "Product image cleanup & listing setup",
          "Abandoned cart & WhatsApp order recovery",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Inventory, tax & shipping automation",
          "Product image cleanup & listing setup",
          "Abandoned cart & WhatsApp order recovery",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "Social Media Integration & Automation",
        ],
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
        addons: [
          "Domain Registration",
          "Domain, hosting and email renewal",
          "Maintenance & support",
          "Inventory, tax & shipping automation",
          "Product image cleanup & listing setup",
          "Abandoned cart & WhatsApp order recovery",
          "Advanced SEO, Google Analytics & Google Business Profile",
          "Social Media Integration & Automation",
        ],
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
