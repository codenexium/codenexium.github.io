import { ServiceDetail } from '../../../src/routes/ServiceDetail'
import { SERVICES, MERGED_SERVICES, startingPriceLabel } from '../../../src/lib/config'
import { normalizeSlug } from '../../../src/lib/service-pages'

export function generateStaticParams() {
  return [
    ...SERVICES.map((service) => ({ slug: normalizeSlug(service.slug) })),
    // Merged services keep building a page so old links land on the new service.
    ...Object.keys(MERGED_SERVICES).map((slug) => ({ slug: normalizeSlug(slug) })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const service = SERVICES.find((s) => normalizeSlug(s.slug) === slug)
  return {
    title: service
      ? `${service.name} - ${startingPriceLabel(service)}-Abhishek Sharma`
      : 'Services-Abhishek Sharma',
    description: service?.short || '',
  }
}

export default function Page() {
  return <ServiceDetail />
}
