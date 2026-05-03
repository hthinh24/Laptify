import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist } from "@/feature/wishlist/wishlistThunk.js";
import { getCart } from "@/feature/cart/cartThunk.js";
import { getCustomerInfo } from "@/feature/checkout/checkoutThunk.js";

const RootPage = () => {
  const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth); 

  // TODO: Replace with actual authentication check

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Fetching user wishlist...");
      dispatch(fetchUserWishlist());
      dispatch(getCart());
      dispatch(getCustomerInfo())
    } else {
      console.log("User not authenticated, skipping wishlist fetch.");
    }
  }, [dispatch, isAuthenticated]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootPage;
