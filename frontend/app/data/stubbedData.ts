// data/stubbedData.ts
// added for personal project playground
export interface Item {
  product_id: string;
  name: string;
  quantity: number;
}

export interface Order {
  order_id: string;
  status: string;
  items: Item[];
  timestamp: string;
}

export interface InventoryItem {
  product_id: string;
  name: string;
  stock_level: number;
}

export const stubbedOrders: Order[] = [
  {
    order_id: "ord123",
    status: "Placed",
    items: [
      { product_id: "p1", name: "Widget A", quantity: 2 },
      { product_id: "p2", name: "Widget B", quantity: 1 },
    ],
    timestamp: "2025-08-09T18:00:00Z",
  },
  {
    order_id: "ord124",
    status: "Processed",
    items: [
      { product_id: "p3", name: "Widget C", quantity: 3 },
      { product_id: "p4", name: "Widget D", quantity: 2 },
    ],
    timestamp: "2025-08-09T18:30:00Z",
  },
  {
    order_id: "ord125",
    status: "Shipped",
    items: [
      { product_id: "p1", name: "Widget A", quantity: 1 },
      { product_id: "p5", name: "Widget E", quantity: 4 },
    ],
    timestamp: "2025-08-09T19:00:00Z",
  },
  {
    order_id: "ord126",
    status: "Delivered",
    items: [
      { product_id: "p2", name: "Widget B", quantity: 5 },
      { product_id: "p3", name: "Widget C", quantity: 1 },
    ],
    timestamp: "2025-08-09T20:00:00Z",
  },
  {
    order_id: "ord127",
    status: "Canceled",
    items: [
      { product_id: "p4", name: "Widget D", quantity: 3 },
      { product_id: "p5", name: "Widget E", quantity: 2 },
    ],
    timestamp: "2025-08-09T21:00:00Z",
  },
];

export const stubbedInventory: InventoryItem[] = [
  { product_id: "p1", name: "Widget A", stock_level: 50 },
  { product_id: "p2", name: "Widget B", stock_level: 20 },
  { product_id: "p3", name: "Widget C", stock_level: 8 },
  { product_id: "p4", name: "Widget D", stock_level: 100 },
  { product_id: "p5", name: "Widget E", stock_level: 15 },
];