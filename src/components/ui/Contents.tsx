import React from "react";
import {Layout} from "antd";
const {Content} = Layout;
import styles from "@/styles/ui/contents.module.scss";

const Contents = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="h-full w-full">
      <Content
        style={{
          color: "black",
          marginTop: "0px",
          paddingLeft: "10px",

          height: "100%",
        }}>
        <div className={styles.contentWraper}>{children}</div>
      </Content>
    </div>
  );
};

export default Contents;
