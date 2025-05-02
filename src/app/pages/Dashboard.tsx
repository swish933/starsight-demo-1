import { ReactNode, useState } from "react";
import {
	BarChart,
	LineChart,
	PieChart,
	Bar,
	Line,
	Pie,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Cell,
} from "recharts";
import { Users, Clock, ThumbsUp, Award } from "lucide-react";

// Sample data - replace with actual data in a real implementation
const dailyServiceData = [
	{ name: "Mon", completed: 85, target: 90 },
	{ name: "Tue", completed: 88, target: 90 },
	{ name: "Wed", completed: 92, target: 90 },
	{ name: "Thu", completed: 91, target: 90 },
	{ name: "Fri", completed: 89, target: 90 },
	{ name: "Sat", completed: 78, target: 90 },
	{ name: "Sun", completed: 82, target: 90 },
];

const workOrdersPerTech = [
	{ name: "John", orders: 6.2 },
	{ name: "Sarah", orders: 7.1 },
	{ name: "Mike", orders: 5.8 },
	{ name: "Lisa", orders: 6.5 },
	{ name: "David", orders: 6.0 },
];

const firstVisitResolution = [
	{ name: "Resolved", value: 78 },
	{ name: "Unresolved", value: 22 },
];

const colors = ["#0088FE", "#FF8042"];

const customerSatisfactionData = [
	{ name: "Jan", score: 8.2 },
	{ name: "Feb", score: 8.4 },
	{ name: "Mar", score: 8.3 },
	{ name: "Apr", score: 8.7 },
	{ name: "May", score: 8.5 },
];

const staffSatisfactionData = [
	{ name: "Jan", score: 7.2 },
	{ name: "Feb", score: 7.4 },
	{ name: "Mar", score: 7.6 },
	{ name: "Apr", score: 7.9 },
	{ name: "May", score: 7.8 },
];

const idleTimeData = [
	{ name: "Mon", hours: 1.2 },
	{ name: "Tue", hours: 0.9 },
	{ name: "Wed", hours: 1.1 },
	{ name: "Thu", hours: 0.8 },
	{ name: "Fri", hours: 1.3 },
];

interface KPIProps {
	title: string;
	timeframe: string;
	value: string;
	target: string;
	trend: string;
	trendUp: boolean;
	icon: ReactNode;
}

export default function FieldServiceDashboard() {
	const [timeframe, setTimeframe] = useState("Week");

	return (
		<div className='bg-gray-100 p-6 min-h-screen'>
			<div className='mb-6'>
				<h1 className='text-3xl font-bold text-gray-800'>
					Field Service Management Dashboard
				</h1>
				<div className='flex items-center mt-4'>
					<div className='mr-4'>
						<select
							className='bg-white border border-gray-300 rounded-md px-3 py-2 text-sm'
							value={timeframe}
							onChange={(e) => setTimeframe(e.target.value)}
						>
							<option>Day</option>
							<option>Week</option>
							<option>Month</option>
							<option>Quarter</option>
							<option>Year</option>
						</select>
					</div>
					<p className='text-gray-600'>Viewing data for: Current {timeframe}</p>
				</div>
			</div>

			{/* KPI Summary Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
				<KpiCard
					timeframe={timeframe}
					title='SLA Adherence'
					value='88%'
					target='90%'
					icon={<Clock className='text-blue-500' />}
					trend='+2%'
					trendUp={true}
				/>
				<KpiCard
					timeframe={timeframe}
					title='First Visit Resolution'
					value='78%'
					target='85%'
					icon={<Award className='text-green-500' />}
					trend='-3%'
					trendUp={false}
				/>
				<KpiCard
					timeframe={timeframe}
					title='Avg. Work Orders/Tech/Day'
					value='6.3'
					target='6.5'
					icon={<Users className='text-purple-500' />}
					trend='+0.2'
					trendUp={true}
				/>
				<KpiCard
					timeframe={timeframe}
					title='Customer Satisfaction'
					value='8.5/10'
					target='9.0/10'
					icon={<ThumbsUp className='text-yellow-500' />}
					trend='+0.3'
					trendUp={true}
				/>
			</div>

			{/* Charts Row 1 */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>Daily SLA Performance</h2>
					<div className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={dailyServiceData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis domain={[50, 100]} />
								<Tooltip />
								<Legend />
								<Line
									type='monotone'
									dataKey='completed'
									stroke='#8884d8'
									name='% Completed in SLA'
								/>
								<Line
									type='monotone'
									dataKey='target'
									stroke='#82ca9d'
									strokeDasharray='5 5'
									name='Target %'
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>
						First Visit Resolution Rate
					</h2>
					<div className='h-64 flex justify-center items-center'>
						<ResponsiveContainer width='70%' height='100%'>
							<PieChart>
								<Pie
									data={firstVisitResolution}
									cx='50%'
									cy='50%'
									labelLine={false}
									outerRadius={80}
									fill='#8884d8'
									dataKey='value'
									label={({ name, percent }) =>
										`${name}: ${(percent * 100).toFixed(0)}%`
									}
								>
									{firstVisitResolution.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={colors[index % colors.length]}
										/>
									))}
								</Pie>
								<Tooltip />
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Charts Row 2 */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>
						Work Orders Per Technician
					</h2>
					<div className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<BarChart data={workOrdersPerTech}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis domain={[0, 10]} />
								<Tooltip />
								<Bar dataKey='orders' fill='#8884d8' name='Avg. Orders/Day' />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>Technician Idle Time</h2>
					<div className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={idleTimeData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis />
								<Tooltip />
								<Line
									type='monotone'
									dataKey='hours'
									stroke='#ff7300'
									name='Hours'
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* Charts Row 3 */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>
						Customer Satisfaction Trend
					</h2>
					<div className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={customerSatisfactionData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis domain={[0, 10]} />
								<Tooltip />
								<Line
									type='monotone'
									dataKey='score'
									stroke='#82ca9d'
									name='CSAT Score'
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className='bg-white p-4 rounded-lg shadow'>
					<h2 className='text-xl font-semibold mb-4'>
						Staff Satisfaction Trend
					</h2>
					<div className='h-64'>
						<ResponsiveContainer width='100%' height='100%'>
							<LineChart data={staffSatisfactionData}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='name' />
								<YAxis domain={[0, 10]} />
								<Tooltip />
								<Line
									type='monotone'
									dataKey='score'
									stroke='#8884d8'
									name='Employee Score'
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
}

// KPI Card Component
function KpiCard({
	title,
	value,
	target,
	icon,
	trend,
	trendUp,
	timeframe,
}: KPIProps) {
	return (
		<div className='bg-white p-4 rounded-lg shadow'>
			<div className='flex justify-between items-start'>
				<div>
					<p className='text-gray-500 text-sm'>{title}</p>
					<p className='text-2xl font-bold mt-1'>{value}</p>
					<p className='text-gray-500 text-xs mt-1'>Target: {target}</p>
				</div>
				<div className='p-2 rounded-full bg-gray-100'>{icon}</div>
			</div>
			<div
				className={`mt-2 text-sm flex items-center ${
					trendUp ? "text-green-500" : "text-red-500"
				}`}
			>
				{trendUp ? "↑" : "↓"} {trend} vs previous {timeframe}
			</div>
		</div>
	);
}
