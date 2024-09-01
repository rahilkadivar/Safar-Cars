import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, message, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WishList = ({ productId }) => {
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const userId = useSelector((state) => state.auth.userId);

  const handleWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/addWishlist.php`,
        {
          user_id: userId,
          product_id: productId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "added") {
        setIsWishlisted(true);
        fetchWishlist();
        message.success("Product Added wishlist Successfully");
        setLoading(false);
      } else if (response.data.status === "removed") {
        setIsWishlisted(false);
        fetchWishlist();
        message.info("Product removed wishlist Successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/getWishlist.php/get?user_id=${userId}`
      );
      const data = await response.json();
      setWishlist(data);
      data.map((item) => {
        if (item.id === productId) {
          setIsWishlisted(true);
        }
      });
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [userId, isWishlisted]);

  console.log(wishlist);

  return (
    <div>
      <Tooltip
        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Button
          loading={loading}
          className="wishlist-icon"
          type="primary"
          shape="circle"
          icon={
            isWishlisted ? (
              <HeartFilled style={{ color: "red" }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={handleWishlist}
        />
      </Tooltip>
    </div>
  );
};

export default WishList;
