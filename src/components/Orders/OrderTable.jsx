import { useState, useEffect, useContext } from "react";
import { getUserOrders, getShopOrders } from "../../services/orderService.js";
import { getShop } from "../../services/shopService.js";
import { UserContext } from "../../contexts/UserContext";
import { useParams, useNavigate } from "react-router";
import "./OrderTable.css";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [shop, setShop] = useState({});
  const { user } = useContext(UserContext);
  const { shopId } = useParams();
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const fetchedOrders = shopId
      ? await getShopOrders(shopId)
      : await getUserOrders();
    setOrders(fetchedOrders);
  };

  const fetchShop = async () => {
    if (!shopId) return false;
    setShop(await getShop(shopId));
  };

  useEffect(() => {
    fetchOrders();
  }, [user, shopId]);

  useEffect(() => {
    fetchShop();
  }, [shopId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <main className="grid-container">
      <header className="grid-header">
        <h1>{shopId ? `${shop.name} ` : "MY "}ORDERS</h1>
      </header>

      {orders.length > 0 ? (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>STATUS</th>
                <th>TOTAL</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="order-row"
                  onClick={() =>
                    navigate(
                      shopId
                        ? `/shops/${shopId}/orders/${order._id}`
                        : `/orders/${order._id}`,
                    )
                  }
                >
                  <td className="order-id">
                    #{order._id.slice(-8).toUpperCase()}
                  </td>
                  <td>
                    <span className={`status-badge status-${order.status}`}>
                      {formatStatus(order.status)}
                    </span>
                  </td>
                  <td className="order-total">
                    ${order?.grandTotal?.toFixed(2)}
                  </td>
                  <td className="order-date">{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders">
          <p>NO ORDERS YET</p>
          <span>Your orders will appear here</span>
        </div>
      )}
    </main>
  );
};

export default OrderTable;
