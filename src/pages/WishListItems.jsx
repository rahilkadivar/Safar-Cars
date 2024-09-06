import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, message, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WishListItems = () => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const Navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const handleWishlist = async (id) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addWishlist.php`,
        {
          user_id: userId,
          product_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "added") {
        fetchWishlist();
        message.success("Product Added wishlist Successfully");
        setLoading(false);
      } else if (response.data.status === "removed") {
        fetchWishlist();
        message.info("Product removed wishlist Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getWishlist.php/get?user_id=${userId}`
      );
      const data = await response.json();

      const updatedData = data.map((item) => {
        if (item.image) {
          item.image = JSON.parse(item.image);
        }
        return item;
      });

      setWishlist(updatedData);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  function convertToSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const onDetailPage = (slug) => {
    const convertSlug = convertToSlug(slug);
    Navigate(`/product/${convertSlug}`);
  };

  return (
    <div>
      <section>
        <div className="container">
          <Row
            gutter={16}
            style={{ display: "flex", gap: "20px", }}
          >
            {wishlist.length > 0 ? (
              wishlist.map((item, index) => (
                <div
                  key={index}
                  className="car-item"
                  style={{ width: "23%", position: "relative" }}
                >
                  <Button
                    onClick={() => handleWishlist(item.id)}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "0",
                      zIndex: "100000",
                    }}
                    type="link"
                    loading={loading}
                  >
                    <CloseCircleOutlined style={{ fontSize: "24px" }} />{" "}
                  </Button>
                  <div
                    className="car-image"
                    style={{ cursor: "pointer" }}
                    onClick={() => onDetailPage(item.product_name)}
                  >
                    <img
                      src={`${API_BASE_URL}/${item.image[0]}`}
                      alt={item.product_name}
                    />
                    <span className="car-badge">Certified</span>
                    <div className="car-price">₹{item.price}</div>
                  </div>
                  <div className="car-content">
                    <h3
                      className="item-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDetailPage(item.product_name)}
                    >
                      {item.product_name}
                    </h3>

                    <div className="car-list">
                      <ul className="list-inline">
                        <li>
                          <img src="../images/calendar.png" alt="Calendar" />{" "}
                          {item.manufacturing_year}
                        </li>
                        <li>
                          <img src="../images/km.png" alt="KM Driven" />{" "}
                          {item.km_driven} km
                        </li>
                        <li>
                          <img src="../images/fuel.png" alt="Fuel Type" />{" "}
                          {item.fuel_type}
                        </li>
                        <li>
                          <img
                            src="../images/processing.png"
                            alt="Transmission"
                          />{" "}
                          {item.transmission}
                        </li>
                      </ul>
                    </div>
                    <div className="location">
                      <img src="../images/location.png" alt="Location" />
                      <span>S.G Highway, Ahmedabad</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3
                style={{
                  marginTop: "50px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                No Wishlist products found.
              </h3>
            )}
          </Row>
        </div>
      </section>
    </div>
  );
};

export default WishListItems;
