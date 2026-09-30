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
        'Gyms & fitness studios - schedules, memberships, booking':
          'Class timetables and, with the booking add-on, slot scheduling that lets members claim spots in seconds.',
        'Salons & spas - appointments, showcase, promotions':
          'A sleek service showcase for treatments and packages - add booking to replace phone tag with a real-time appointment booker.',
        'Travel agencies - packages, itineraries, inquiries':
          'Detailed package and itinerary pages that route lead inquiries straight to your inbox.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Patient-facing pages that build trust, with the booking add-on capturing appointments and holding calendar slots.',
        'Lawyers & law firms - services, testimonials, contact forms':
          'Credible service breakdowns, case studies, and secure contact forms that win client trust.',
        'Accountants & financial advisors - packages, consultations':
          'Polished corporate layouts that establish financial expertise and, with booking, paid consultation calendars.',
        'Architects & interior designers - portfolios, project showcases':
          'A high-end visual portfolio showcasing your spatial designs before the first consultation.',
        'Tutors & coaches - courses, booking, payments':
          'Course and coaching pages tied to your work calendar with the booking add-on.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'A world-class web presence that makes a young company look reliable to investors.',
        'Event planners - portfolios, packages, inquiry forms':
          'Portfolio pages with scoping-consultation calendars that qualify clients before you quote them.',
        'Real estate agents - listings, virtual tours, lead capture':
          'Automated booking links for physical site visits, open houses, or virtual property tours.',
        'Freelancers - portfolio, contact, service offerings':
          'A high-converting portfolio page that quickly highlights your skills and case studies.',
        'NGOs & charities - donation portals, campaigns, volunteers':
          'Informative campaign pages designed to share your mission and secure community support.',
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
  'custom-business-website': [
    {
      group: 'Small Businesses',
      items: {
        'Restaurants & cafés - menus, reservations, delivery':
          'Table, floor and kitchen management with order history, staff roles and a live owner dashboard - not just a menu page.',
        'Retail shops - e-commerce for clothing, electronics, furniture':
          'Multi-branch stock, staff permissions and customer records in one system instead of scattered spreadsheets. Custom POS and desktop builds that talk to your barcode scanners.',
        'Gyms & fitness studios - schedules, memberships, booking':
          'Member management, class scheduling, attendance and automated renewal reminders built together, with an optional mobile app for check-in via QR and workout log scanning.',
        'Salons & spas - appointments, showcase, promotions':
          'Stylist schedules, service history and package tracking so every chair and slot is accounted for.',
        'Travel agencies - packages, itineraries, inquiries':
          'Booking records, customer documents and enquiry pipelines managed in your own system.',
      },
    },
    {
      group: 'Professionals',
      items: {
        'Doctors & clinics - booking, patient info, telemedicine':
          'Patient records, appointments, prescriptions, follow-ups and staff access control - the workflow a clinic actually runs on.',
        'Lawyers & law firms - services, testimonials, contact forms':
          'Case and client management with secure document handling and matter-level tracking. Optional desktop or CLI tooling for batch-encrypted archiving and discovery search.',
        'Accountants & financial advisors - packages, consultations':
          'Client onboarding, document collection and engagement tracking in one place.',
        'Tutors & coaches - courses, booking, payments':
          'Batch and individual student tracking, fee management and progress reports.',
      },
    },
    {
      group: 'Growing Enterprises',
      items: {
        'Startups - branding, product showcase, investor relations':
          'Your core SaaS MVP taken from code to cloud deployment, plus an internal operations platform that scales with the team - dashboards, permissions and reporting built in.',
        'Event planners - portfolios, packages, inquiry forms':
          'Enquiry to delivery pipeline with crew assignments, schedules and client reporting, with a collaborative internal planning platform for staff and vendors.',
        'Real estate agents - listings, virtual tours, lead capture':
          'Property and tenant records, rent tracking, maintenance requests and owner reporting.',
        'NGOs & charities - donation portals, campaigns, volunteers':
          'Donor records, volunteer management and campaign reporting with role-based access.',
      },
    },
  ],
};

