'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import logo from '@/assets/icons/logo.png'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'

const Navbar = () => {
	const [isNotifOpen, setIsNotifOpen] = useState(false)
	const dispatch = useDispatch()
	const router = useRouter()

	const handleLogout = () => {
		dispatch(logout())
		router.replace('/login')
	}

	return (
		<nav className='w-full bg-white px-4 sm:px-6 py-4 shadow-sm'>
			<div className='flex justify-between items-center relative'>
				{/* Logo */}
				<Link href='/admin' className='flex items-center gap-2'>
					<Image
						src={logo}
						alt='Logo'
						className='w-28 sm:w-32 h-auto object-contain'
					/>
				</Link>

				{/* Right Side */}
				<div className='flex items-center gap-4 sm:gap-6 relative'>
					{/* Notification Icon */}
					<div className='relative'>
						<button
							onClick={() => setIsNotifOpen(prev => !prev)}
							className='relative focus:outline-none'
						>
							<IoIosNotifications className='text-blue-600 w-6 h-6 hover:scale-110 transition-transform duration-200' />
							<span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full'>
								3
							</span>
						</button>

						{/* Notification Dropdown */}
						{isNotifOpen && (
							<div className='absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-50'>
								<div className='p-3 text-sm font-semibold text-gray-700 border-b'>
									Bildirishnomalar
								</div>
								<ul className='divide-y text-sm'>
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

					{/* Phone Number (Hidden on small screens) */}
					<a
						href='tel:+998712002900'
						className='hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base'
					>
						<FaPhoneAlt className='text-blue-600' />
						<span className='font-medium'>+998 71 200 29 00</span>
					</a>

					{/* Language Selector */}
					<select className='bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'>
						<option>UZ</option>
						<option>RU</option>
						<option>EN</option>
					</select>

					{/* Logout Button */}
					<button
						onClick={handleLogout}
						className='flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 text-sm sm:text-base font-medium'
					>
						<FiLogOut className='w-5 h-5' />
						<span className='hidden sm:inline'>Chiqish</span>
					</button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
