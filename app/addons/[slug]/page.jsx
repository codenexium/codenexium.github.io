import { AddOnDetail } from '../../../src/routes/AddOnDetail'
import {
  ADDONS,
  addOnBillingLabel,
  addOnPriceRange,
  formatINR,
} from '../../../src/lib/config'

export function generateStaticParams() {
  return ADDONS.map((addOn) => ({ slug: addOn.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const addOn = ADDONS.find((item) => item.slug === slug)

  if (!addOn) {
    return {
      title: 'Add-ons-Abhishek Sharma',
      description: 'Fixed-price website add-ons.',
    }
  }

  const price = addOnPriceRange(addOn)
  return {
    title: `${addOn.name} add-on - ${price.varies ? 'from ' : ''}${formatINR(price.min)} ${addOnBillingLabel(addOn)}-Abhishek Sharma`,
    description: addOn.summary,
  }
}

export default function Page() {
  return <AddOnDetail />
}
