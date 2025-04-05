
import React from 'react';
import { AnalysisReport } from '@/types/vehicle';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  report: AnalysisReport;
}

const PriceChart: React.FC<PriceChartProps> = ({ report }) => {
  const { marketValue, suggestedPrice, vehicleDetails } = report;
  
  const sellerPrice = vehicleDetails.sellerPrice 
    ? parseInt(vehicleDetails.sellerPrice)
    : null;
  
  const chartData = [
    {
      name: 'Market Min',
      value: marketValue.min,
      fill: '#94a3b8', // slate-400
    },
    {
      name: 'Market Max',
      value: marketValue.max,
      fill: '#64748b', // slate-500
    },
    {
      name: 'Dealer Avg',
      value: marketValue.dealerAvg,
      fill: '#a5b4fc', // indigo-300
    },
    {
      name: 'Direct Sell Avg',
      value: marketValue.directSellAvg,
      fill: '#818cf8', // indigo-400
    },
    {
      name: 'Suggested',
      value: suggestedPrice,
      fill: '#7c3aed', // violet-600 (primary)
    },
    ...(sellerPrice ? [
      {
        name: 'Quoted Price',
        value: sellerPrice,
        fill: sellerPrice > suggestedPrice ? '#ef4444' : '#10b981', // red-500 or emerald-500
      },
    ] : []),
  ];

  // Format the price values to show in Indian format (lakhs)
  const formatPrice = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-[300px] w-full">
      <ChartContainer
        config={{
          market: { label: 'Market' },
          suggested: { label: 'Suggested' },
          quoted: { label: 'Quoted' },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <defs>
              <linearGradient id="colorSuggested" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatPrice} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12 }}
              width={60}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent 
                  formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Price']}
                />
              }
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]} 
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default PriceChart;
