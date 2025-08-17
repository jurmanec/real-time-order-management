import axios from 'axios';


const api_url = process.env.NEXT_PUBLIC_API_URL!;

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredOrders(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
      const response =  await axios.get(`${api_url}?search=${query}`)
      return response.data;
    } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch orders.');
  }
}

