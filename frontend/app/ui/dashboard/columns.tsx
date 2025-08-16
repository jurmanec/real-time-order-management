
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Order } from '@/app/data/stubbedData';
import { Button } from '@/components/ui/button';

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ColumnDef } from '@tanstack/react-table';
    

type OrderRow = { row: { original: Order } };

export const createColumns = (handleStatusChange: (orderId: string, newStatus: string) => void): ColumnDef<Order>[] => [
    { accessorKey: 'order_id', header: 'Order ID', enableSorting: true },
    { 
        accessorKey: 'status', 
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }, 
        enableSorting: true
    },
    { accessorKey: 'items', header: 'Items', cell: ({ row } : OrderRow) => row.original.items.map(item => item.product_id).join(', ') },
    { 
        accessorKey: 'timestamp',         
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Timestamp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }, 
        enableSorting: true, 
    },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row } : OrderRow ) => (
            <div className="flex space-x-2">
                <Select value={row.original.status} onValueChange={(value) => handleStatusChange(row.original.order_id, value)}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Processed">Processed</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="destructive" onClick={() => handleStatusChange(row.original.order_id, 'Canceled')}>
                    Cancel
                </Button>
            </div>
        ),
    },
    {
        id: 'actions2',
        cell: ({ row } : OrderRow ) => {
            const order = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(order.order_id)}
                        >
                            Copy order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
];