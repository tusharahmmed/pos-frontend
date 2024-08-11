import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";

import UploadImage from "@/components/form/UploadImage";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {USER_ROLE} from "@/constants/role";
import DashboardLayout from "@/layouts/DashboardLayout";
import {useCreateBrandMutation} from "@/rtk/features/api/brandApi";
import {createOrUpdateCategorySchema} from "@/schemas/category";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/navigation";
import React from "react";

const CreateCategoryPage = () => {
  const [createBrand] = useCreateBrandMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const obj = {...values};
    // console.log(obj);
    const file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    message.loading("Creating...");
    try {
      const res = await createBrand(formData).unwrap();

      if (res?.data?.id) {
        message.success(res.message);
        router.push(`/${USER_ROLE.STORE_ADMIN}/brands`);
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
            label: "store_admin",
            link: "/profile",
          },
          {
            label: "brands",
            link: "/store_admin/brands",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Create Brand</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(createOrUpdateCategorySchema)}>
          <div></div>
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
              Brand Information
            </p>

            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}></Col>
              <Col
                className="gutter-row"
                span={8}
                style={{
                  marginBottom: "10px",
                }}>
                <UploadImage name="file" label="Image" />
              </Col>
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

export default CreateCategoryPage;

CreateCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
