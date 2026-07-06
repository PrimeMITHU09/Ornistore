// Realtime Backend using json-server
const API_URL = 'http://localhost:3001/orders';

export const getOrders = async () => {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const saveOrder = async (order) => {
  const newOrder = {
    ...order,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newOrder)
  });
  const data = await res.json();
  return data.id;
};

export const getOrderById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
};

export const approveOrder = async (id, payload) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'approved', ...payload })
  });
};

export const updateOrder = async (id, payload) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
};
