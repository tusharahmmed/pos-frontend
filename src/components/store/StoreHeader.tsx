import styles from "@/styles/store/storeHeader.module.scss";
import {ArrowLeft, Bill, Clock, Home, Order} from "../icons";
import {Dropdown, MenuProps} from "antd";
import Image from "next/image";
import Link from "next/link";

const StoreHeader = () => {
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={"/store_admin/dashboard"}>
          <span className="font-bold font-inter px-4 py-1.5 rounded-md ">
            Dashboard
          </span>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Link href={"/profile"}>
          <span className="font-bold font-inter px-4 py-1.5 rounded-md ">
            Profile
          </span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <button
          // onClick={logOut}
          className="w-full bg-[#ff7875] text-[#fff2f0] px-4 py-1.5 rounded-md border-0 hover:bg-[#ff4d4f]">
          Logout
        </button>
      ),
    },
  ];

  return (
    <header className={`${styles.header} border-b-2 border-slate-200`}>
      <div className={styles.left}>
        <div className="cursor-pointer">
          <ArrowLeft className="w-[26px]" />
        </div>
        <div className="border-l-2 border-slate-200 pl-4">STORE</div>
      </div>
      <div className={styles.right}>
        <div className="mx-4 flex gap-4">
          <nav className={styles.nav}>
            <ul>
              <li className="text-gold">
                <Link href={"#"}>
                  <Home className="w-5" />
                  Home
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Order className="w-5" />
                  Order
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Clock className="w-5" />
                  History
                </Link>
              </li>
              <li>
                <Link href={"/store_admin/billings"}>
                  <Bill className="w-5" />
                  Bill
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <span className="bg-[#FFF6EB] text-gold rounded-full text-sm px-3 py-2">
              Dining Options
            </span>
          </div>
          <div>
            <span className="bg-[#F8F9FD] text-dark rounded-full text-sm px-3 py-2">
              10:35:00 26/02/24
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <Dropdown className="cursor-pointer" menu={{items}}>
            {/* <Space wrap size={16}> */}
            {/* <Avatar size="large" icon={<UserOutlined />} /> */}
            <Image src={"/avatar.webp"} height={38} width={38} alt="avatar" />
            {/* </Space> */}
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
