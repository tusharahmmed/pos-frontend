import BillingSidebar from "@/components/store/BillingSidebar";
import CategoryMenu from "@/components/store/CategoryMenu";
import StoreHeader from "@/components/store/StoreHeader";
import {isLoggedIn} from "@/services/auth.service";
import {Row, Space, Spin} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import styles from "@/styles/layout/storeLayout.module.scss";
import Script from "next/script";

const StoreLayout = ({children}: {children: React.ReactNode}) => {
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
          className={styles.container}
          style={{
            height: "100vh",
            position: "relative",
          }}>
          <StoreHeader />
          <div className={styles.contentWraper}>
            <CategoryMenu />
            <div className={styles.content}>{children}</div>
            <BillingSidebar />
          </div>
        </div>
        <Script src="custom.js" />
      </>
    );
};

export default StoreLayout;
