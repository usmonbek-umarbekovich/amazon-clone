import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../contexts/StateProvider';
import { db } from '../config';
import Order from '../components/Order';
import './style.css';

function Orders() {
  const [{ user }] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.title = 'My orders';
  }, []);

  useEffect(() => {
    if (!user) return setOrders([]);

    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const q = query(ordersRef, orderBy('created', 'desc'));
    onSnapshot(q, snapshot => {
      setOrders(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, [user]);

  return (
    <div className="orders col-10 mx-auto">
      <h1>My Orders</h1>
      <div className="orders__order">
        {orders?.map(order => (
          <Order key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
export default Orders;
