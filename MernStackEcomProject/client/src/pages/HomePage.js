import React from "react";
import Layout from "../components/Layout/Layout";

import { useAuth } from "../Context/Auth";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title={"Home - Ecommerce app"}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 5)}</pre>
    </Layout>
  );
};

export default HomePage;
