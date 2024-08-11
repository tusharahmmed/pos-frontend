import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FormMultiSelectField from "@/components/form/FormMultiSelectField";
import FormSelectField from "@/components/form/FormSelectField";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {userPermissionOptions, userRoleOptions} from "@/constants/global";
import DashboardLayout from "@/layouts/DashboardLayout";
import {useCreateUserMutation} from "@/rtk/features/api/userApi";
import {createUserRequestSchema} from "@/schemas/user";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/navigation";
import React from "react";

const CreateUserPage = () => {
  const [createUser] = useCreateUserMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    message.loading("Creating...");
    try {
      const res = await createUser(values).unwrap();
      if (res?.id) {
        message.success("User created successfully!");
        router.push("/super_admin/user");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/profile",
          },
          {
            label: "user",
            link: "/super_admin/user",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Create User</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createUserRequestSchema)}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}>
              User Information
            </p>
            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput type="text" name="name" size="large" label="Name" />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="serName"
                  size="large"
                  label="Ser Name"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="email"
                  size="large"
                  label="Email"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="password"
                  name="password"
                  size="large"
                  label="Password"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormSelectField
                  size="large"
                  name="role"
                  options={userRoleOptions}
                  label="Role"
                  placeholder="Select"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormMultiSelectField
                  name="permissions"
                  label="Permissions"
                  size="large"
                  placeholder="Select"
                  options={userPermissionOptions}
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}></Col>
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateUserPage;

CreateUserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
