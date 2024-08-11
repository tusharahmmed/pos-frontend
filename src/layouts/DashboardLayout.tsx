import Contents from "@/components/ui/Contents";
import DashboardHeader from "@/components/ui/DashboardHeader";
import SideBar from "@/components/ui/Sidebar";
import {isLoggedIn} from "@/services/auth.service";
import {Layout, Row, Space, Spin} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
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

  if (userLoggedIn)
    return (
      <>
        <div
          style={{
            height: "100vh",
            position: "relative",
          }}>
          <DashboardHeader />
          <Layout
            style={{
              height: "100%",
              position: "sticky",
              top: "0px",
              paddingTop: "64px",
            }}
            hasSider>
            <SideBar />
            <Contents>{children}</Contents>
          </Layout>
        </div>
      </>
    );
};

export default DashboardLayout;
