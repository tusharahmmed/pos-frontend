import {type MenuProps} from "antd";
import {
  ProfileOutlined,
  UserOutlined,
  LineChartOutlined,
  BarsOutlined,
  InsertRowBelowOutlined,
  PoundOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {USER_ROLE} from "./role";

export const sidebarItems = (role: string) => {
  // default options
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        // {
        //   label: <Link href={`/profile/change-password`}>Change Password</Link>,
        //   key: `/profile/change-password`,
        // },
      ],
    },
  ];

  // const quoteItems: MenuProps["items"] = [
  //   {
  //     label: "Manage Quatation",
  //     key: "manage-quatation",
  //     icon: <UnorderedListOutlined />,
  //     children: [
  //       {
  //         label: (
  //           <Link href={`/${role}/quote/pending`}>
  //             Pending <Badge></Badge>
  //           </Link>
  //         ),
  //         key: `/${role}/quote/pending`,
  //       },
  //       {
  //         label: <Link href={`/${role}/quote/completed`}>Completed</Link>,
  //         key: `/${role}/quote/completed`,
  //       },
  //       {
  //         label: <Link href={`/${role}/quote/cancled`}>Cancled</Link>,
  //         key: `/${role}/quote/cancled`,
  //       },
  //     ],
  //   },
  // ];

  const storeAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/dashboard`}>Dashboard</Link>,
      icon: <LineChartOutlined />,
      key: `/${role}/dashboard`,
    },
    {
      label: <Link href={`/${role}/products`}>Products</Link>,
      icon: <BarsOutlined />,
      key: `/${role}/products`,
    },
    {
      label: <Link href={`/${role}/categories`}>Categories</Link>,
      icon: <InsertRowBelowOutlined />,
      key: `/${role}/categories`,
    },
    {
      label: <Link href={`/${role}/brands`}>Brands</Link>,
      icon: <InsertRowBelowOutlined />,
      key: `/${role}/brands`,
    },
    {
      label: <Link href={`/${role}/billings`}>Billings</Link>,
      icon: <PoundOutlined />,
      key: `/${role}/billings`,
    },
    ...defaultSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <UserOutlined />,
      key: `/${role}/user`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.STORE_ADMIN) return storeAdminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
