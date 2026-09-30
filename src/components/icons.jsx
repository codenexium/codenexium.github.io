import {
  Globe,
  ShoppingBag,
  MessageCircle,
  Send,
  Filter,
  Bot,
  Store,
  Briefcase,
  Building2,
  Calendar,
  Code,
} from 'lucide-react'

const ICONS = {
  globe: Globe,
  'shopping-bag': ShoppingBag,
  'message-circle': MessageCircle,
  send: Send,
  filter: Filter,
  bot: Bot,
  store: Store,
  briefcase: Briefcase,
  building: Building2,
  calendar: Calendar,
  code: Code,
}

export function ServiceIcon({ name, className = 'h-5 w-5' }) {
  const Icon = ICONS[name] || Globe
  return <Icon className={className} />
}
