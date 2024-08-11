import Form from "@/components/form/Form";
import FormBrandField from "@/components/form/FormBrandField";
import FormCategoryField from "@/components/form/FormCategoryField";
import FormInput from "@/components/form/FormInput";
import FormInputNumber from "@/components/form/FormInputNumber";

import UploadImage from "@/components/form/UploadImage";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import {USER_ROLE} from "@/constants/role";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
} from "@/rtk/features/api/categoryApi";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/rtk/features/api/productApi";

import {updateProductSchema} from "@/schemas/product";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Col, Row, message} from "antd";
import {useRouter} from "next/router";
import React from "react";

const EditProductPage = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const [updateProduct] = useUpdateProductMutation();
  const {data: defaultValues} = useGetProductDetailsQuery(id);

  //   console.log(defaultValues.data);

  const onSubmit = async (values: any) => {
    //remove extra
    const {brand, category, ...submittedValues} = values;
    const obj = {...submittedValues};

    // console.log(obj);
    const file = obj["file"];
    delete obj["file"];

    const data = JSON.stringify(obj);

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);

    message.loading("updating...");
    try {
      const res = await updateProduct({id, body: formData}).unwrap();

      if (res?.data?.id) {
        message.success(res.message);
        router.push(`/${USER_ROLE.STORE_ADMIN}/products`);
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
            label: "products",
            link: "/store_admin/products",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Edit Product</h1>

      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValues?.data}
          resolver={yupResolver(updateProductSchema)}>
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
              Product Information
            </p>

            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={4}
                style={{
                  marginBottom: "10px",
                }}>
                <UploadImage
                  defaultUrl={defaultValues?.data?.image}
                  name="file"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                lg={12}
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
                xs={24}
                sm={24}
                md={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInputNumber name="price" size="large" label="Price" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormInputNumber
                  prefix={"Pcs"}
                  name="quantity"
                  size="large"
                  label="Quantity"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormCategoryField label="Category" name="category_id" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                sm={24}
                md={8}
                style={{
                  marginBottom: "10px",
                }}>
                <FormBrandField label="Brand" name="brand_id" />
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

export default EditProductPage;

EditProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
