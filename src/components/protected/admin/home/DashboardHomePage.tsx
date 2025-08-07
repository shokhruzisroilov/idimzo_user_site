'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getNews } from '@/redux/slices/newsSlice'
import {
	LayoutDashboard,
	FileText,
	BookOpen,
	User,
	Newspaper,
} from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import NewsModal from './NewsModal'
import NewsCard from './NewsCard'
import StatCard from './StatCard'

const DashboardHomePage = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { data, isLoading, error } = useSelector(
		(state: RootState) => state.news
	)

	const [selectedNews, setSelectedNews] = useState<{
		imageUrl: string
		title: string
	} | null>(null)

	useEffect(() => {
		dispatch(getNews())
	}, [dispatch])

	const stats = [
		{
			title: 'Shartnomalar soni',
			count: 4,
			time: '5 daqiqa oldin',
			bgColor: 'bg-yellow-400',
			icon: LayoutDashboard,
		},
		{
			title: 'Tugash muddati',
			count: 3,
			time: '10 kun ichida',
			bgColor: 'bg-blue-400',
			icon: BookOpen,
		},
		{
			title: 'Bekor qilingan',
			count: 1,
			time: '5 kun oldin',
			bgColor: 'bg-blue-400',
			icon: FileText,
		},
		{
			title: 'Jarayonda',
			count: 1,
			time: '15 daqiqa oldin',
			bgColor: 'bg-yellow-400',
			icon: User,
		},
	]

	return (
		<>
			<NewsModal
				open={!!selectedNews}
				onClose={() => setSelectedNews(null)}
				imageUrl={selectedNews?.imageUrl || ''}
				title={selectedNews?.title || ''}
			/>

			{/* Yangiliklar Slider */}
			<div className='w-full'>
				{isLoading ? (
					<div className='flex gap-4 py-4 overflow-x-auto'>
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className='w-[120px] h-[200px] flex flex-col items-center justify-center animate-pulse'
							>
								<div className='w-[100px] h-[150px] bg-gray-300 rounded mb-2'></div>
								<div className='w-20 h-4 bg-gray-300 rounded'></div>
							</div>
						))}
					</div>
				) : error ? (
					<p className='text-red-500 text-center mt-4'>
						Xatolik yuz berdi: {error}
					</p>
				) : data.length === 0 ? (
					<div className='w-[100px] h-[200px] rounded-lg flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300'>
						<Newspaper className='w-8 h-8 mb-2' />
						<span className='text-sm text-center px-1'>
							Hozircha yangilik yo‘q
						</span>
					</div>
				) : (
					<Swiper
						spaceBetween={12}
						slidesPerView={2.2}
						breakpoints={{
							480: { slidesPerView: 3 },
							640: { slidesPerView: 4 },
							768: { slidesPerView: 5 },
							1024: { slidesPerView: 6 },
							1280: { slidesPerView: 8 },
							1536: { slidesPerView: 10 },
						}}
						autoplay={{ delay: 3000, disableOnInteraction: false }}
						loop={true}
						modules={[Autoplay]}
						className='py-4'
					>
						{data.map((item, index) => (
							<SwiperSlide key={index}>
								<NewsCard
									imageUrl={item.mediaUrl}
									title={item.title?.uz || ''}
									onClick={() =>
										setSelectedNews({
											imageUrl: item.mediaUrl,
											title: item.title?.uz || '',
										})
									}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>

			{/* Statistika */}
			<div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 mt-10'>
				{stats.map((stat, index) => (
					<StatCard key={index} {...stat} />
				))}
			</div>
		</>
	)
}

export default DashboardHomePage
