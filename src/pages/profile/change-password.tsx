import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button} from "antd";
import React from "react";

const ChangePasswordPage = () => {
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={
        {
          // margin: "100px 0",
          // display: "flex",
          // justifyContent: "center",
        }
      }>
      <FBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/profile",
          },
        ]}
      />
      <Form submitHandler={onSubmit}>
        <div className="mt-4 text-lg">
          <h3 style={{marginBottom: "10px"}}>Reset Password</h3>
          <div style={{margin: "5px 0"}}>
            <FormInput
              name="oldPassword"
              label="Old password"
              type="password"
            />
          </div>
          <div style={{margin: "5px 0"}}>
            <FormInput
              name="newPassword"
              label="New password"
              type="password"
            />
          </div>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ChangePasswordPage;

ChangePasswordPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
