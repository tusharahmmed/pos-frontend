import {isLoggedIn} from "@/services/auth.service";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Row, Space, Spin} from "antd";

const PublicRotes = ({children}: {children: React.ReactElement}) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userLoggedIn) {
      router.push("/profile");
    }
    setIsLoading(true);
  }, [router, isLoading, userLoggedIn]);

  if (!isLoading || userLoggedIn) {
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

  if (!userLoggedIn) return <>{children}</>;
};

export default PublicRotes;
