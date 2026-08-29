//  -  -  -  -  -  Service detail page helpers  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
// Dedicated /services/<slug> pages. The slugs in SERVICES contain spaces (e.g.
// "business - website"); normalizeSlug turns them into URL-safe routes that match
// the documented examples (e.g. /services/business-website).
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  - 
export function normalizeSlug(slug) {
  return String(slug).replace(/\s+/g, '')
}

// Maps every service (keyed by normalized slug) to the industry groups and items
// from the INDUSTRIES array that the service fulfills. Each item pairs the exact
// INDUSTRIES label with a note explaining how the service addresses that need.
export const SERVICE_INDUSTRIES = {
  'business-website': [
    {
      group: 'Small Businesses',
      items: {
        'Restaurants & cafés - menus, reservations, delivery':
          'Menu-driven informative pages with clear CTAs that turn local searches into physical foot traffic.',
        'Salons & spas - appointments, showcase, promotions':
          'A sleek service showcase that outlines your treatments, packages, and location details.',
        'Travel agencies - packages, itineraries, inquiries':
          'Detailed package and itinerary pages that route lead inquiries straight to your inbox.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Lawyers & law firms - services, testimonials, contact forms':
          'Credible service breakdowns, case studies, and secure contact forms that win client trust.',
        'Architects & interior designers - portfolios, project showcases':
          'A high-end visual portfolio showcasing your spatial designs before the first consultation.',
        'Accountants & financial advisors - packages, consultations':
          'Polished corporate layouts that establish financial expertise and highlight core services.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'A world-class web presence that makes a young company look reliable to investors.',
        'Freelancers - portfolio, contact, service offerings':
          'A high-converting portfolio page that quickly highlights your skills and case studies.',
        'NGOs & charities - donation portals, campaigns, volunteers':
          'Informative campaign pages designed to share your mission and secure community support.',
      },
    },
  ],
  'online-bookings': [
    {
      group: 'Small Businesses',
      items: {
        'Restaurants & cafés - menus, reservations, delivery':
          'Interactive table reservations and event room bookings handled seamlessly online.',
        'Gyms & fitness studios - schedules, memberships, booking':
          'Class timetables and slot scheduling that let members claim spots in seconds.',
        'Salons & spas - appointments, showcase, promotions':
          'An active, real-time appointment booker that slashes phone tag and prevents double-booking.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Patient-facing scheduling pipelines that capture appointments and handle calendar slots.',
        'Accountants & financial advisors - packages, consultations':
          'Paid consultation calendars that require commitment before booking a strategy slot.',
        'Tutors & coaches - courses, booking, payments':
          'Class slot and private coaching booking modules tied right into your work calendar.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Real estate agents - listings, virtual tours, lead capture':
          'Automated booking links for physical site visits, open houses, or virtual property tours.',
        'Event planners - portfolios, packages, inquiry forms':
          'Initial scoping consultation calendars that qualify clients before you sketch a design.',
      },
    },
  ],
  'online-store': [
    {
      group: 'Small Businesses',
      items: {
        'Retail shops - e-commerce for clothing, electronics, furniture':
          'A comprehensive storefront with deep categories, rapid sorting, and secure checkout loops.',
        'Restaurants & cafés - menus, reservations, delivery':
          'Direct online ordering, cart management, and payment portals to bypass third-party app fees.',
        'Gyms & fitness studios - schedules, memberships, booking':
          'Sell equipment, supplements, and digital workout programs directly from your core hub.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Tutors & coaches - courses, booking, payments':
          'Sell pre-recorded video modules, e-books, and training masterclasses with instant delivery.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'Direct-to-consumer (D2C) online checkout engines configured tightly alongside your CRM.',
        'NGOs & charities - donation portals, campaigns, volunteers':
          'Accept custom recurring donations or sell fundraising merchandise securely.',
      },
    },
  ],
  'ai-automation': [
    {
      group: 'Small Businesses',
      items: {
        'Restaurants & cafés - menus, reservations, delivery':
          'Automated inventory threshold alerts and daily sales reporting bots run over backend engines.',
        'Retail shops - e-commerce for clothing, electronics, furniture':
          'Autonomous order tracking, stock updates, and vendor data synchronization pipelines.',
        'Travel agencies - packages, itineraries, inquiries':
          'AI systems that read booking criteria and dynamically draft tailored travel itineraries.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Automated follow-up data routing and diagnostic logging scripts that ease administrative loads.',
        'Accountants & financial advisors - packages, consultations':
          'Automated document data extraction (OCR) and bank ledger cross-matching systems.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'AI-powered competitor scraping, real-time lead enrichment, and instant slack notification workflows.',
        'Real estate agents - listings, virtual tours, lead capture':
          'Automatic property listing generation and syndication across multiple listing portals.',
      },
    },
  ],
  'crm-funnels-chatbots': [
    {
      group: 'Small Businesses',
      items: {
        'Salons & spas - appointments, showcase, promotions':
          'Automated WhatsApp appointment confirmations and seasonal offer broadcast funnels.',
        'Gyms & fitness studios - schedules, memberships, booking':
          'High-converting landing pages offering free trial passes to feed your membership sales pipeline.',
        'Travel agencies - packages, itineraries, inquiries':
          'WhatsApp interactive chatbots that answer package FAQs and group leads by destination interest.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Automated clinic SMS reminders and secure digital intake forms that sync with your CRM.',
        'Lawyers & law firms - services, testimonials, contact forms':
          'Lead capture landing pages that screen legal inquiries before routing them to internal staff.',
        'Tutors & coaches - courses, booking, payments':
          'Multi-step webinar funnels complete with automated email warm-up and checkout bumps.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Real estate agents - listings, virtual tours, lead capture':
          'Targeted property landing pages that dump interested buyers straight into targeted drip pools.',
        'Event planners - portfolios, packages, inquiry forms':
          'Smart qualification funnels that gather event budget and date requirements upfront.',
      },
    },
  ],
  'custom-software': [
    {
      group: 'Small Businesses',
      items: {
        'Retail shops - e-commerce for clothing, electronics, furniture':
          'Custom cross-platform desktop POS systems tailored for custom hardware and barcode scanners.',
        'Gyms & fitness studios - schedules, memberships, booking':
          'Custom mobile applications allowing members to track progress, check in via QR, and scan logs.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Secure web applications for custom patient records management aligned with regional compliance.',
        'Lawyers & law firms - services, testimonials, contact forms':
          'Custom CLI tools or desktop apps for secure, batch-encrypted client archiving and discovery search.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'Building your core proprietary Software-as-a-Service (SaaS) MVP from code to cloud deployment.',
        'Event planners - portfolios, packages, inquiry forms':
          'Interactive, collaborative internal planning platforms built for staff shift scheduling and vendors.',
      },
    },
  ],
};

