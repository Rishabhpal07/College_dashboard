'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import uniLogo from '../public/uniLogo.png'

const AppHeader = () => {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = [
    { name: 'Timetable', path: '/dashboard' },
    { name: 'Announcements', path: `/dashboard/${session?.user.Role}/announcements` },
    { name: 'Recommendation', path: `/dashboard/${session?.user.Role}/recommendation` },
    { name: 'Map', path: `/dashboard/${session?.user.Role}/map` },
  ]

  return (
    <header className="shadow bg-white w-340 py-2 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Image src={uniLogo} alt="unilogo" width={100} height={100} />
        <nav className=" flex items-center gap-20 text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition-all ${
                pathname === item.path
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={session?.user?.image || '/profile.png'}
          alt="Profile"
          className="rounded-full border w-10 h-10 object-cover"
        />
        <Button
          variant="outline"
          onClick={() => signOut()}
          className="text-sm font-medium px-4 py-2"
        >
          Logout
        </Button>
      </div>
    </header>
  )
}

export default AppHeader
