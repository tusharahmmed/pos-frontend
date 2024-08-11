import {getUserInfo, isLoggedIn} from "@/services/auth.service";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Layout, Row, Space, Spin} from "antd";

const PrivateRotes = ({children}: {children: React.ReactElement}) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading || !userLoggedIn) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}>
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }

  if (userLoggedIn) return <>{children}</>;
};

export default PrivateRotes;
