import React from "react";

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Standard Shipping", days: "5-7 business days" },
  { id: "express", name: "Express Shipping", days: "2-3 business days" },
  { id: "overnight", name: "Overnight Shipping", days: "1 business day" },
];

const ShopSection = ({
  shopData,
  shippingSelection,
  onShippingChange,
  disabled,
}) => {
  const { shopId, shop, items, subtotal, shipping, total } = shopData;

  return (
    <div className="shop-section">
      <h2 className="shop-name">{shop?.name || "Unknown Shop"}</h2>

      <div className="items-list">
        {items?.map((item) => (
          <div key={item.product} className="checkout-item">
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">x{item.quantity}</span>
            <span className="item-price">${item.price?.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="subtotal-row">
        <span>Subtotal:</span>
        <span>${subtotal?.toFixed(2) || "..."}</span>
      </div>

      <div className="shipping-section">
        <label htmlFor={`shipping-${shopId}`} className="shipping-label">
          Shipping Method:
        </label>
        <select
          id={`shipping-${shopId}`}
          value={shippingSelection || "standard"}
          onChange={(e) => onShippingChange(shopId, e.target.value)}
          className="shipping-select"
          disabled={disabled}
        >
          {SHIPPING_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} ({option.days})
            </option>
          ))}
        </select>
      </div>

      <div className="subtotal-row">
        <span>Shipping:</span>
        <span>${shopData.shippingTotal?.toFixed(2) || "..."}</span>
      </div>

      <div className="shop-total-row">
        <span>Shop Total:</span>
        <span>${shopData.grandTotal?.toFixed(2) || "..."}</span>
      </div>
    </div>
  );
};

export default ShopSection;
