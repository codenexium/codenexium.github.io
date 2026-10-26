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
  ShieldCheck,
  Search,
  Megaphone,
  CreditCard,
  Boxes,
  Image as ImageIcon,
  ShoppingCart,
  LayoutDashboard,
  Server,
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
  shield: ShieldCheck,
  search: Search,
  megaphone: Megaphone,
  'credit-card': CreditCard,
  boxes: Boxes,
  image: ImageIcon,
  cart: ShoppingCart,
  dashboard: LayoutDashboard,
  server: Server,
}

export function ServiceIcon({ name, className = 'h-5 w-5' }) {
  const Icon = ICONS[name] || Globe
  return <Icon className={className} />
}
