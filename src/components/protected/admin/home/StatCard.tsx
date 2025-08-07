import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
	title: string
	count: number
	time: string
	icon: LucideIcon
	bgColor: string
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	count,
	time,
	icon: Icon,
	bgColor,
}) => (
	<div
		className={`${bgColor} text-white p-4 rounded-lg flex flex-col items-center justify-center text-center`}
	>
		<Icon className='w-8 h-8 mb-2' />
		<h3 className='text-lg font-semibold'>{title}</h3>
		<p className='text-2xl font-bold'>{count}</p>
		<p className='text-sm'>{time}</p>
	</div>
)

export default StatCard
