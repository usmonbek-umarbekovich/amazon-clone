import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../../contexts/StateProvider';
import { db } from '../../config';
import './style.css';

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, 'users', user.uid, 'orders');
    const q = query(ordersRef, orderBy('created', 'desc'));
    onSnapshot(q, snapshot => {
      setOrders(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, []);

  return (
    <div className="orders">
      <h1>Your Orders</h1>
    </div>
  );
}
export default Orders;
