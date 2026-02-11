import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import * as shopService from "../../../services/shopService";
import ProductList from "../../Products/ProductList/ProductList.jsx";

const ShopDetails = ({ user }) => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const shopData = await shopService.getShop(shopId);
        console.log("Backend Shop Data:", shopData);
        setShop(shopData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShop();
  }, [shopId]);

  const handleDelete = async () => {
    try {
      await shopService.deleteShop(shopId);
      navigate("/shops");
    } catch (err) {
      console.error(err);
    }
  };

  if (!shop)
    return (
      <main>
        <p>Loading...</p>
      </main>
    );

  const isOwner = shop.user === user?._id || shop.user?._id === user?._id;

  return (
    <main>
      <header>
        <h1>{shop.name}</h1>
        {isOwner && (
          <>
            <button>
              <Link to={`/shops/${shopId}/edit`}>Edit</Link>
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </header>

      <section>
        <h2>About</h2>
        <p>{shop.description}</p>
        <p>
          <b>Industry: </b> {shop.industry.name}
        </p>
      </section>

      <section>
        <h2>Location</h2>
        {shop.address ? (
          <>
            <p>
              Street: {shop.address.address1 || shop.address.street || "N/A"}
            </p>
            <p>Region: {shop.address.region || shop.address.city || "N/A"}</p>
            <p>Country: {shop.address.country || "N/A"}</p>
          </>
        ) : (
          <>
            <p>Street: {shop.address1 || shop.street || "N/A"}</p>
            <p>Region: {shop.region || shop.city || "N/A"}</p>
            <p>Country: {shop.country || "N/A"}</p>
          </>
        )}
      </section>

      <section>
        <ProductList shop={shop} user={user} />
      </section>

      <Link to="/shops">Back to Shops</Link>
    </main>
  );
};

export default ShopDetails;
