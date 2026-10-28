import Link from 'next/link'

export function Logo({ className = '' }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <img src="/Abhishek-Sharma.jpg" alt="Abhishek Sharma" className="h-10 w-10 rounded-xl" />
    </Link>
  )
}
