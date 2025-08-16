import axios from 'axios';


const ITEMS_PER_PAGE = 6;
const http_api_id = 'l2sqsbjuc1';
const region = 'us-east-1';
const env = 'dev';
const api_url = `https://${http_api_id}.execute-api.${region}.amazonaws.com/${env}/orders`;


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

