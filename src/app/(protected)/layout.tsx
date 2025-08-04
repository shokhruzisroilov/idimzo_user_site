'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/protected/common/Navbar'
import Footer from '@/components/protected/common/Footer'
import { getItem } from '@/helpers/persistanceStorage'
import Image from 'next/image'
import logo from '@/assets/icons/logo.png'

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const [loading, setLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		const accessToken = getItem<string>('accessToken')
		if (!accessToken) {
			router.replace('/login') // 🔄 Login sahifasiga redirect
		} else {
			setLoading(false) // ✅ Faqat token bo‘lsa kontent ochiladi
		}
	}, [router])

	if (loading) {
		return (
			<div className='w-full h-screen flex flex-col items-center justify-center bg-white'>
				<Image src={logo} alt='Logo' className='w-24 h-auto mb-6' />
				<div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4'></div>
				<p className='text-lg text-gray-600'>Iltimos, kuting...</p>
			</div>
		)
	}

	return (
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<main className='flex-grow'>{children}</main>
			<Footer />
		</div>
	)
}
