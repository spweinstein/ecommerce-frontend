// UserOrderDetails.jsx - Improved Version
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getUserOrder } from "../../../services/orderService.js";
import "./UserOrderDetails.css";

const UserOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getUserOrder(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [orderId]);

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

  if (!order) {
    return (
      <main className="details-page">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="details-page">
      <div className="details-header details-header--bordered">
        <div>
          <h1>ORDER #{order._id.slice(-8).toUpperCase()}</h1>
          <p className="breadcrumb">
            Placed <span>{formatDate(order.createdAt)}</span>
          </p>
        </div>
        <div className="status-chip">
          <span className={`status-${order.status}`}>
            ● {formatStatus(order.status)}
          </span>
        </div>
      </div>

      {/* Shop Orders */}
      {order.shopOrders && order.shopOrders.length > 0 && (
        <div className="order-sections">
          {order.shopOrders.map((shopOrder) => (
            <div key={shopOrder._id} className="shop-order-section">
              <div className="shop-order-header-compact">
                <div className="shop-name-group">
                  <h3>{shopOrder.shop?.name || "Shop"}</h3>
                  <span className={`status-dot status-${shopOrder.status}`}>
                    {formatStatus(shopOrder.status)}
                  </span>
                </div>
              </div>

              {/* Line Items Table */}
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>ITEM</th>
                    <th>QTY</th>
                    <th>PRICE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {shopOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="item-name">
                        {item.product?.name || "Product"}
                      </td>
                      <td>{item.quantity}</td>
                      <td>${item.unitPrice.toFixed(2)}</td>
                      <td className="item-total">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="subtotal-row">
                    <td colSpan="3">Shop Subtotal</td>
                    <td className="subtotal-amount">
                      ${shopOrder.subtotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {/* Grand Total */}
      <div className="order-grand-total">
        <div className="total-line">
          <span className="total-label">Subtotal</span>
          <span className="total-price">
            ${order.subtotal?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="total-line">
          <span className="total-label">Shipping Total</span>
          <span className="total-price">
            ${order.shippingTotal?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="total-line">
          <span className="total-label">Tax Total</span>
          <span className="total-price">
            ${order.taxTotal?.toFixed(2) || "0.00"}
          </span>
        </div>
        <div className="total-line total-line--grand">
          <span className="total-label">ORDER TOTAL</span>
          <span className="total-price">${order.grandTotal.toFixed(2)}</span>
        </div>
      </div>
      <div className="footer-nav">
        <Link to="/orders" className="btn-back">
          ← Back to My Orders
        </Link>
      </div>
    </main>
  );
};

export default UserOrderDetails;
