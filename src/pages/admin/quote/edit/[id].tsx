import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {useRouter} from "next/router";
import {
  useGetQuoteDetailsQuery,
  useUpdateQuoteMutation,
} from "@/rtk/features/api/quoteApi";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import ActionBar from "@/components/ui/ActionBar";
import {Button, Col, Row, message} from "antd";

import FormSelectField from "@/components/form/FormSelectField";
import {quoteStatusOptions} from "@/constants/global";
import Form from "@/components/form/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {quoteStatusSchema} from "@/schemas/quote_status";
import dayjs from "dayjs";

const EditPage = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const {data} = useGetQuoteDetailsQuery(id, {skip: !id});

  const [updateQuote] = useUpdateQuoteMutation();

  const {
    name,
    serName,
    email,
    phone,
    pickupZip,
    deliveryZip,
    totalPices,
    totalWeight,
    question,
    status,
    createdAt,
    updatedAt,
  } = data || {};

  const defaultValues = {status};

  const editHandle = async (values: any) => {
    message.loading("updating...");
    try {
      const res = await updateQuote({id, body: values}).unwrap();
      //   console.log(res);
      if (res?.id) {
        message.success("Quote Successfully Updated!");
        window.history.back();
        // router.push(`/super_admin/quote/${values?.status}`);
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
            label: "admin",
            link: "/profile",
          },
          {
            label: "quotes",
            link: "/admin/quote/pending",
          },
        ]}
      />
      <ActionBar title="Edit Quote"></ActionBar>

      <div>
        <Form
          submitHandler={editHandle}
          resolver={yupResolver(quoteStatusSchema)}
          defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}>
            <p style={{fontSize: "18px", fontWeight: "500", margin: "5px 0px"}}>
              Status information
            </p>
            <Row gutter={{xs: 24, xl: 8, lg: 8, md: 24}}>
              <Col span={8} style={{margin: "10px 0"}}>
                <FormSelectField
                  name="status"
                  defaultValue={status}
                  //   label="Status"
                  options={quoteStatusOptions}
                />
              </Col>

              <Col
                span={8}
                className="flex items-center"
                style={{margin: "10px 0"}}>
                <Button type="primary" size="middle" htmlType="submit">
                  update
                </Button>
              </Col>
            </Row>
          </div>
        </Form>
      </div>

      <div style={{border: "1px solid #ccc", padding: "20px"}}>
        <h3 className="text-lg">
          <span className="font-medium">Name:</span> {name} {serName}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Email:</span> {email}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Phone:</span> {phone}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Pickup Zip:</span> {pickupZip}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Delivery Zip:</span> {deliveryZip}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Total Pices:</span> {totalPices}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Total Weight:</span> {totalWeight} lbs
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Question:</span> {question}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Created At:</span>{" "}
          {dayjs(createdAt).format("MMM D, YYYY hh:mm A")}
        </h3>
        <h3 className="text-lg">
          <span className="font-medium">Last Updated At:</span>{" "}
          {dayjs(updatedAt).format("MMM D, YYYY hh:mm A")}
        </h3>
      </div>
    </div>
  );
};

export default EditPage;

EditPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
