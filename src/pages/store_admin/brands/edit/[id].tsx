import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";

import UploadImage from "@/components/form/UploadImage";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {USER_ROLE} from "@/constants/role";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetBrandDetailsQuery,
  useUpdateBrandMutation,
} from "@/rtk/features/api/brandApi";
import {
  useCreateCategoryMutation,
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "@/rtk/features/api/categoryApi";
import {createOrUpdateCategorySchema} from "@/schemas/category";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/router";
import React from "react";

const EditBrandPage = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const [updateBrand] = useUpdateBrandMutation();
  const {data: defaultValues} = useGetBrandDetailsQuery(id);

  //   console.log(defaultValues.data);

  const onSubmit = async (values: any) => {
    const obj = {...values};
    // console.log(obj);
    const file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    message.loading("updating...");
    try {
      const res = await updateBrand({id, body: formData}).unwrap();

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
      <h1 className="text-2xl font-medium my-2">Edit Brand</h1>

      <div>
        <Form
          defaultValues={defaultValues?.data}
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
                <UploadImage
                  defaultUrl={defaultValues?.data?.image}
                  name="file"
                  label="Image"
                />
              </Col>
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

export default EditBrandPage;

EditBrandPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
