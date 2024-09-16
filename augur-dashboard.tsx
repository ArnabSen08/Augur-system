import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for distributors
const mockDistributors = [
  {
    id: 1,
    name: 'Acme Distribution',
    shippedLastMonth: 1500,
    forecastNextMonth: 1800,
    ytdAvgShipped: 1650,
    onTimeDeliveryRate: 95,
    customerSatisfaction: 4.7,
  },
  {
    id: 2,
    name: 'Global Logistics Co.',
    shippedLastMonth: 2200,
    forecastNextMonth: 2500,
    ytdAvgShipped: 2300,
    onTimeDeliveryRate: 98,
    customerSatisfaction: 4.9,
  },
  // Add more mock distributors as needed
];

const Dashboard = () => {
  const [selectedDistributor, setSelectedDistributor] = useState(mockDistributors[0]);

  const chartData = [
    { name: 'Last Month', shipped: selectedDistributor.shippedLastMonth },
    { name: 'Next Month (Forecast)', shipped: selectedDistributor.forecastNextMonth },
    { name: 'YTD Average', shipped: selectedDistributor.ytdAvgShipped },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Augur Distributor Dashboard</h1>
      
      <div className="mb-6">
        <label htmlFor="distributor-select" className="block text-sm font-medium text-gray-700">
          Select Distributor:
        </label>
        <select
          id="distributor-select"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={selectedDistributor.id}
          onChange={(e) => setSelectedDistributor(mockDistributors.find(d => d.id === parseInt(e.target.value)))}
        >
          {mockDistributors.map((distributor) => (
            <option key={distributor.id} value={distributor.id}>
              {distributor.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Shipped Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedDistributor.shippedLastMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Forecast Next Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedDistributor.forecastNextMonth}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>YTD Avg. Shipped/Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedDistributor.ytdAvgShipped}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Shipping Metrics Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="shipped" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>On-Time Delivery Rate</TableCell>
                <TableCell>{selectedDistributor.onTimeDeliveryRate}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Customer Satisfaction</TableCell>
                <TableCell>{selectedDistributor.customerSatisfaction}/5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
