import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const earningData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const expenseData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
];

const EarningsExpenses = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

    {/* Earnings */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm text-gray-500">Total Earnings</p>
          <h3 className="text-2xl font-bold text-gray-900">$64,522.24</h3>
        </div>
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <ArrowUpRight size={20} />
        </div>
      </div>

      <div className="h-28 -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={earningData}>
            <defs>
              <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Tooltip cursor={false} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2.5}
              fill="url(#colorEarn)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Expenses */}
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <h3 className="text-2xl font-bold text-gray-900">$60,522.24</h3>
        </div>
        <div className="p-2 bg-red-500 rounded-lg text-white">
          <ArrowDownRight size={20} />
        </div>
      </div>

      <div className="h-28 -mx-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={expenseData}>
            <defs>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Tooltip cursor={false} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#ef4444"
              strokeWidth={2.5}
              fill="url(#colorExp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>
);

export default EarningsExpenses;
