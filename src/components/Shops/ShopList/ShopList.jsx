import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as shopService from "../../../services/shopService";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shopsData = await shopService.getShops();
        setShops(shopsData);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    };
    fetchShops();
  }, []);

  if (isLoading)
    return (
      <main>
        <p>Loading shops...</p>
      </main>
    );

  return (
    <main>
      <h1>Shops</h1>
      {shops.length === 0 ? (
        <p>No shops found.</p>
      ) : (
        <ul>
          {shops.map((shop) => (
            <li key={shop._id}>
              <Link to={`/shops/${shop._id}`}>
                <article>
                  <header>
                    <h2>{shop.name}</h2>
                  </header>
                  <p>{shop.description}</p>
                  {shop.address && (
                    <p>
                      {shop.address.city}, {shop.address.country}
                    </p>
                  )}
                </article>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default ShopList;
