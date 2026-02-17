import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { getShopOrder } from "../../../services/orderService.js";
import "./ShopOrderDetails.css";

const ShopOrderDetails = () => {
  const [shopOrder, setShopOrder] = useState(null);
  const { shopId, orderId } = useParams();

  useEffect(() => {
    const fetchShopOrder = async () => {
      try {
        const orderData = await getShopOrder(shopId, orderId);
        setShopOrder(orderData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchShopOrder();
  }, [shopId, orderId]);

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

  if (!shopOrder) {
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
          <h1>ORDER #{shopOrder._id.slice(-8).toUpperCase()}</h1>
          <p className="breadcrumb">
            {shopOrder.shop?.name} •{" "}
            <span>{formatDate(shopOrder.createdAt)}</span>
          </p>
        </div>
        <div className="status-chip">
          <span className={`status-${shopOrder.status}`}>
            ● {formatStatus(shopOrder.status)}
          </span>
        </div>
      </div>

      {/* Line Items Table */}
      <div className="order-items-section">
        <table className="shop-order-table">
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
                <td className="item-name">{item.product?.name || "Product"}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td className="item-total">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total */}
      <div className="order-total-box">
        <div className="total-line">
          <span className="total-label">ORDER TOTAL</span>
          <span className="total-price">
            ${shopOrder.grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="footer-nav">
        <Link to={`/shops/${shopOrder.shop?._id}/orders`} className="btn-back">
          ← Back to Shop Orders
        </Link>
      </div>
    </main>
  );
};

export default ShopOrderDetails;
