import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import FormMultiSelectField from "@/components/form/FormMultiSelectField";
import FormSelectField from "@/components/form/FormSelectField";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {userPermissionOptions, userRoleOptions} from "@/constants/global";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "@/rtk/features/api/userApi";
import {updateUserRequestSchema} from "@/schemas/user";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/router";

const EditUserPage = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const {data: defaultValues} = useGetUserDetailsQuery(id, {skip: !id});
  const [updateUser] = useUpdateUserMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating...");
    try {
      const res = await updateUser({id: id, body: values}).unwrap();
      if (res?.id) {
        message.success("User updated successfully!");
        router.push("/super_admin/user");
      }
    } catch (err: any) {
      message.error(err.message);
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
      <h1 className="text-2xl font-medium my-2">Update User</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValues}
          resolver={yupResolver(updateUserRequestSchema)}>
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
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditUserPage;

EditUserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
