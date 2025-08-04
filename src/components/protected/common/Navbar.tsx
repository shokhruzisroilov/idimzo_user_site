'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { UserCircle } from 'lucide-react'
import logo from '@/assets/icons/logo.png'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'

const Navbar = () => {
	const [isNotifOpen, setIsNotifOpen] = useState(false)
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = () => {
		dispatch(logout())
		router.replace('/login')
	}

	return (
		<nav className='w-full bg-white px-6 py-4 shadow-sm'>
			<div className='flex justify-between items-center relative'>
				{/* Logo */}
				<Link href='/admin' className='flex items-center gap-2'>
					<Image src={logo} alt='Logo' className='w-32 h-auto object-contain' />
				</Link>

				{/* Right Side */}
				<div className='flex items-center gap-6 relative'>
					{/* Notification */}
					<div className='relative group'>
						<div
							onClick={() => setIsNotifOpen(prev => !prev)}
							className='relative cursor-pointer'
						>
							<IoIosNotifications className='text-blue-600 w-6 h-6 group-hover:scale-110 transition-transform duration-200' />
							<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full'>
								3
							</span>
						</div>

						{/* Dropdown */}
						{isNotifOpen && (
							<div className='absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50'>
								<div className='p-3 text-sm text-gray-700 border-b'>
									Bildirishnomalar
								</div>
								<ul className='divide-y'>
									<li className='p-3 hover:bg-gray-100 cursor-pointer'>
										{`1. Yangi foydalanuvchi ro'yxatdan o'tdi`}
									</li>
									<li className='p-3 hover:bg-gray-100 cursor-pointer'>
										2. Shartnoma tugamoqda
									</li>
									<li className='p-3 hover:bg-gray-100 cursor-pointer'>
										3. Bot orqali yangi so‘rov
									</li>
								</ul>
							</div>
						)}
					</div>

					{/* Phone Number */}
					<a
						href='tel:+998712002900'
						className='hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200'
					>
						<FaPhoneAlt className='text-blue-600' />
						<span className='font-medium'>+998 71 200 29 00</span>
					</a>

					{/* Language Selector */}
					<select className='bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option>UZ</option>
						<option>RU</option>
						<option>EN</option>
					</select>

					{/* 👤 User Profile Icon */}
					<div className='relative'>
						<UserCircle
							className='w-7 h-7 text-blue-600 cursor-pointer'
							onClick={() => setIsProfileOpen(!isProfileOpen)}
						/>
						{isProfileOpen && (
							<div className='absolute right-0 mt-2 w-36 bg-white border rounded shadow-md z-50'>
								<ul className='text-sm'>
									<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
										<Link href='/admin/profile/info'>Profil</Link>
									</li>
									<li
										className='px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer'
										onClick={handleLogout}
									>
										Chiqish
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
