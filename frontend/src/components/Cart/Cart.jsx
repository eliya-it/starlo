import React from "react";
import List from "../List/List";
import Item from "../List/Item/Item";
import { Link } from "react-router-dom";
import { LiaBookmark } from "react-icons/lia";

const Cart = () => {
  return (
    <List>
      <Item>
        <Link to="/bookings">
          <LiaBookmark className="navbar__bookmark" />
        </Link>
      </Item>
    </List>
  );
};

export default Cart;
