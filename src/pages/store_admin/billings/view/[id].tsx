import React from "react";

import FBreadCrumb from "@/components/ui/FBreadCrumb";

import DashboardLayout from "@/layouts/DashboardLayout";
import {useGetBillingDetailsQuery} from "@/rtk/features/api/billingApi";

import {Col, Row} from "antd";
import Image from "next/image";
import {useRouter} from "next/router";

const BillingDetails = () => {
  const router = useRouter();
  const id = router?.query?.id as string;

  const {data} = useGetBillingDetailsQuery(id);
  const {
    customer_name,
    customer_phone,
    tax_amount,
    total_amount,
    billing_products,
  } = data?.data || {};

  // console.log(data?.data);

  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "store_admin",
            link: "/profile",
          },
          {
            label: "billings",
            link: "/store_admin/billings",
          },
        ]}
      />
      <h1 className="text-2xl font-medium my-2">Billing Details</h1>

      <div>
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
            Billing Information
          </p>

          <Row
            className="font-inter font-semibold"
            gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}>
              <div className="flex text-base gap-4">
                <p>Customer Name:</p>
                <p>{customer_name}</p>
              </div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}>
              <div className="flex text-base gap-4">
                <p>Customer Phone:</p>
                <p>{customer_phone}</p>
              </div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}>
              <div className="flex text-base gap-4">
                <p>Tax Amount:</p>
                <p>$ {tax_amount}</p>
              </div>
            </Col>
            <Col
              className="gutter-row"
              span={6}
              style={{
                marginBottom: "10px",
              }}>
              <div className="flex text-base gap-4">
                <p>Total Amount:</p>
                <p>$ {total_amount}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            padding: "15px",
            marginBottom: "10px",
          }}>
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}>
            Billing Products
          </p>
          <div className="grid grid-cols-8 gap-10">
            {billing_products?.map((item: any) => {
              return (
                <div className="bg-white p-4 rounded-md">
                  <Image
                    src={item?.product?.image}
                    alt="product"
                    height={200}
                    width={200}
                  />
                  <div className="text-center">
                    <div>Price : {item?.product?.price}</div>
                    <div>Quantity : {item?.quantity}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;

BillingDetails.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
