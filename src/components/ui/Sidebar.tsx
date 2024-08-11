import React, {useState} from "react";
import {Button, Layout, Menu} from "antd";

import {sidebarItems} from "@/constants/sidebarItems";
import {USER_ROLE} from "@/constants/role";
import {getUserInfo} from "@/services/auth.service";
import Link from "next/link";

const {Sider} = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {role} = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={240}
      style={{
        overflow: "auto",

        height: "100%",
        position: "sticky",
        left: 0,
        bottom: 0,
        background: "#fff",
        borderRight: "2px solid #ddd",
      }}>
      <Menu
        theme="light"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />

      <div className="mx-4">
        <Link
          style={{textDecoration: "none"}}
          className="m-auto flex items-center px-6 py-2 m-6 rounded-lg bg-gold text-white font-bold justify-center mt-6 hover:text-white"
          href={"/store"}>
          Go to Store
        </Link>
      </div>
    </Sider>
  );
};

export default SideBar;
