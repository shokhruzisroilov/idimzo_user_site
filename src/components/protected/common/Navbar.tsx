'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'
import { FiLogOut } from 'react-icons/fi'
import logo from '@/assets/icons/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'
import { useRouter } from 'next/navigation'
import { AppDispatch, RootState } from '@/redux/store'
import { startNotificationListener } from '@/redux/action/notificationThunk'
import { setNotification } from '@/redux/slices/notificationSlice'

const Navbar = () => {
	const dispatch = useDispatch<AppDispatch>()
	const router = useRouter()

	const [isNotifOpen, setIsNotifOpen] = useState(false)

	// Notification stateni reduxdan olamiz
	const notification = useSelector((state: RootState) => state.notification)

	// 1. Component yuklanganda listenerni ishga tushiramiz
	useEffect(() => {
		const unsubscribe = dispatch(
			startNotificationListener('stj7lHNcOLvG61qHRBtt')
		)

		return () => {
			if (typeof unsubscribe === 'function') unsubscribe()
		}
	}, [dispatch])

	// 2. endDate tugagach notificationni tozalash
	useEffect(() => {
		if (notification.endDate) {
			const endTimestamp = new Date(notification.endDate).getTime()
			const now = Date.now()

			if (endTimestamp <= now) {
				dispatch(setNotification(null))
			}
		}
	}, [notification.endDate, dispatch])

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
							aria-label='Notification button'
						>
							<IoIosNotifications className='text-blue-600 w-6 h-6 hover:scale-110 transition-transform duration-200' />
							{/* Agar kerak bo'lsa, notification countni dinamik qilishingiz mumkin */}
							{notification.content && (
								<span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full'>
									1
								</span>
							)}
						</button>

						{/* Notification Dropdown */}
						{isNotifOpen && (
							<div className='absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50'>
								<div className='p-3 text-sm font-semibold text-gray-700 border-b'>
									Bildirishnomalar
								</div>

								{notification.loading && (
									<div className='p-3 text-center text-gray-500'>
										Yuklanmoqda...
									</div>
								)}

								{notification.error && (
									<div className='p-3 text-center text-red-500'>
										Xato: {notification.error}
									</div>
								)}

								{!notification.loading &&
									!notification.error &&
									!notification.content && (
										<div className='p-3 text-center text-gray-500'>
											{`Bildirishnoma yo'q`}
										</div>
									)}

								{!notification.loading && notification.content && (
									<ul className='divide-y text-sm max-h-60 overflow-auto'>
										<li className='p-3 hover:bg-gray-100 cursor-pointer'>
											{/* Image */}
											{notification.images?.uz && (
												<Image
													src={notification.images?.uz || ''}
													alt='notification-img'
													width={64}
													height={64}
													className='object-cover rounded-md flex-shrink-0'
												/>
											)}

											{/* Matn va tugash sanasi */}
											<div className='flex flex-col'>
												<span className='font-medium text-gray-800'>
													{notification.content.uz}
												</span>
											</div>
										</li>
									</ul>
								)}
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
