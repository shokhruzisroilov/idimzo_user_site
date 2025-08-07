import React from 'react'

interface NewsCardProps {
	imageUrl: string
	title: string
	onClick: () => void
}

const NewsCard: React.FC<NewsCardProps> = ({ imageUrl, title, onClick }) => (
	<div
		className='w-[100px] h-[200px] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform'
		onClick={onClick}
	>
		<div
			className='w-[100px] h-[150px] mb-2 bg-no-repeat bg-center bg-cover rounded-[20px] border-2 border-[#007BFF]'
			style={{ backgroundImage: `url(${imageUrl})` }}
		/>
		<span className='text-sm text-center line-clamp-2 px-1'>{title}</span>
	</div>
)

export default NewsCard
