import Login from "@/components/login/Login";
import PublicRotes from "@/layouts/PublicRoutes";
import RootLayout from "@/layouts/RootLayout";
import Head from "next/head";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <PublicRotes>
      <RootLayout>{page}</RootLayout>
    </PublicRotes>
  );
};
