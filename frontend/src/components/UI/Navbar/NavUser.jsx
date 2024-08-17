import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FULL_PATH } from "../../../config";
import Cart from "../../Cart/Cart";
const NavUser = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="u-flex ">
      {user?.token ? (
        <Link className="navbar__user" to="/me">
          <img
            src={`${FULL_PATH}/img/users/${user.photo}`}
            alt={`${user.name} photo`}
            className="navbar__user__pic"
          />
          <p className="navbar__user__name">{user.name}</p>
        </Link>
      ) : null}
      <Cart />
    </div>
  );
};

export default NavUser;
