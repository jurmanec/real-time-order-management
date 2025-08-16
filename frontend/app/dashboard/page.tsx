"use client";
import { useState, useEffect } from 'react';
import { DataTable } from '../ui/dashboard/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
// import { Bar, BarChart } from "recharts" // shadcn/ui dependency
// import { XAxis, YAxis, CartesianGrid, Tooltip } from '@/components/ui/chart'; // shadcn/ui Chart
import { createColumns } from '../ui/dashboard/columns';
import { lusitana } from '@/app/ui/fonts';
import { Order } from '@/app/lib/definitions';

/* testing */
import { stubbedOrders, stubbedInventory } from '@/app/data/stubbedData';


/* charts.js */
ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function DashboardPage() {
    // const [orders, setOrders] = useState([]);
    // const [inventory, setInventory] = useState([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [inventory, setInventory] = useState(stubbedInventory);

    // axios.get('https://yau0yycux8.execute-api.us-east-1.amazonaws.com/dev/orders')
    //     .then(response => console.log(`response.data ${JSON.stringify(response.data)}`))
    //     .catch(error => console.error('Error:', error));

    const api_url = process.env.NEXT_PUBLIC_API_URL!;
    const websocket_url = process.env.NEXT_PUBLIC_WEBSOCKET_URL!;
    
    /**
     * Executes on component mount
     */
    useEffect(() => {
        // Fetch data
        axios.get(api_url)
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error:', error));
        // axios.get('https://<api-id>.execute-api.<region>.amazonaws.com/prod/inventory')
        //     .then(response => setInventory(response.data))
        //     .catch(error => console.error('Error:', error));

        // // WebSocket
        // const ws = new WebSocket('wss://<api-id>.execute-api.<region>.amazonaws.com/prod');
        const ws = new WebSocket(websocket_url); /* bi-directional connection */
        /* test invoking the websocket-update Lambda fn */
        // ws.onopen = () => {
        // const message = {
        //     action: 'updateStatus',
        //     order_id: 'ord123',
        //     status: 'Shipped'
        //   };
        //   ws.send(JSON.stringify(message));
        // };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(`ws.onmessage ${JSON.stringify(event)}`)
              console.log(`ws.onmessage data ${JSON.stringify(event.data)}`)
            setOrders(prev => prev.map(order =>
                order.order_id === data.order_id ? { ...order, status: data.status } : order
            ));
        };
        return () => ws.close();
    }, []);

    /**
     * Put to server, update state for client. Called in table columns.
     */
    const handleStatusChange = async (orderId: string, newStatus: string) => {
      try {
          await axios.put(`${api_url}/${orderId}`, { status: newStatus });
          setOrders(prev => prev.map(order =>
              order.order_id === orderId ? { ...order, status: newStatus } : order
          ));
      } catch (error) {
          console.error('Error:', error);
      }
    };
    const columns = createColumns(handleStatusChange);

    const inventoryData = {
        labels: inventory.map(item => item.product_id),
        datasets: [{
            label: 'Stock Level',
            data: inventory.map(item => item.stock_level),
            backgroundColor: inventory.map(item => item.stock_level < 10 ? 'rgba(255, 99, 132, 0.2)' : 'rgba(75, 192, 192, 0.2)'),
            borderColor: inventory.map(item => item.stock_level < 10 ? 'rgba(255, 99, 132, 1)' : 'rgba(75, 192, 192, 1)'),
            borderWidth: 1,
        }],
    };

    // shadcn chart
    // const inventoryChartData = inventory.map(item => ({
    //   name: item.name,
    //   stock: item.stock_level,
    //   fill: item.stock_level < 10 ? '#ef4444' : '#4b48c0', // Red for low stock, blue otherwise
    // }));

    const totalOrders = orders.length;
    const statusCounts = orders.reduce<Record<string, number>>((acc, order) => ({
        ...acc,
        [order.status]: (acc[order.status] || 0) + 1,
    }), {});
    const lowStock = inventory.filter(item => item.stock_level < 10).length;

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                    <CardHeader><CardTitle>Total Orders</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl">{totalOrders}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Orders by Status</CardTitle></CardHeader>
                    <CardContent>
                        <p>Placed: {statusCounts.Placed || 0}</p>
                        <p>Shipped: {statusCounts.Shipped || 0}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Low Stock Alerts</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl text-red-500">{lowStock}</p></CardContent>
                </Card>
            </div>
            <Card className="mb-8">
                <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
                <CardContent><DataTable columns={columns} data={orders} /></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Inventory Levels</CardTitle></CardHeader>
                <CardContent><Bar data={inventoryData} /></CardContent>
            </Card>
            {/* <Card className="bg-white border border-gray-200 rounded-lg">
              <CardHeader><CardTitle>Inventory Levels</CardTitle></CardHeader>
              <CardContent>
                <BarChart data={inventoryChartData} className="w-full h-[300px]">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="stock" />
                </BarChart>
              </CardContent>
            </Card> */}
        </main>
    );
}