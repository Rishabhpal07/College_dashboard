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
    <header className="shadow bg-white w-full py-2 px-4 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <Image src={uniLogo} alt="unilogo" width={80} height={80} className='h-10 w-auto sm:h-12' />
          <nav className="hidden md:flex items-center gap-10 text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors ${
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

        <div className="flex items-center gap-3 shrink-0">
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
      </div>

      {/* Mobile nav: horizontal scroll */}
      <nav className="md:hidden mt-2 -mx-4 px-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-none text-sm font-medium ${
                pathname === item.path
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'hover:text-blue-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default AppHeader
