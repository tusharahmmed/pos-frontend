import {Avatar, Button, Dropdown, Layout, MenuProps, Row, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {USER_ROLE} from "@/constants/role";
import {getUserInfo, removeUserInfo} from "@/services/auth.service";
import {authKey} from "@/constants/storageKey";
import {useRouter} from "next/navigation";
const {Header: AntHeader} = Layout;

const DashboardHeader = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <button
          onClick={logOut}
          className="bg-[#ff7875] text-[#fff2f0] px-4 py-1.5 rounded-md border-0 hover:bg-[#ff4d4f]">
          Logout
        </button>
      ),
    },
  ];
  const {role} = getUserInfo() as any;

  return (
    <AntHeader
      style={{
        background: "#fff",
        borderBottom: "2px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9,
      }}>
      <Row justify="space-between" align="middle">
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
            fontWeight: "bold",
          }}>
          POS
        </div>

        <div className="flex">
          <p
            style={{
              margin: "0px 5px",
            }}>
            {role}
          </p>
          <Dropdown menu={{items}}>
            <a>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Row>
    </AntHeader>
  );
};

export default DashboardHeader;
