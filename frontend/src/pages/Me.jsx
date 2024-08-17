import React, { useContext } from "react";
import Layout from "../components/Containers/Layout/Layout";
import ChangeUserInfo from "../components/ChangeUserInfo/ChangeUserInfo";
import ChangeUserPassword from "../components/ChangeUserPassword/ChangeUserPassword";
import AuthMessage from "../components/AuthMessage/AuthMessage";
import { useSelector } from "react-redux";

import PageTransition from "../components/Containers/PageTransition";
const Me = () => {
  const { user } = useSelector((state) => state.auth);
  let data = (
    <Layout>
      <PageTransition>
        {/* Change Information */}
        <ChangeUserInfo />
        {/* Change Password */}
        <ChangeUserPassword />
      </PageTransition>{" "}
    </Layout>
  );
  if (!user?.token)
    data = <AuthMessage message="You do not have access to this page!" />;
  return data;
};

export default Me;
