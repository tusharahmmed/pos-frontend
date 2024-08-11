import {getBaseUrl} from "@/helpers/config/envConfig";
import {useGetBillingDetailsQuery} from "@/rtk/features/api/billingApi";
import {getUserInfo} from "@/services/auth.service";
import {QRCode, QRCodeProps} from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

interface IProps {
  componentRef: any;
  invoiceId: string;
}

const OrderReceipt = ({componentRef, invoiceId}: IProps) => {
  const {data} = useGetBillingDetailsQuery(invoiceId);
  const {
    id,
    customer_name,
    customer_phone,
    tax_amount,
    total_amount,
    billing_products,
    created_at,
  } = data?.data || {};

  let subTotal = billing_products?.reduce(
    (total: number, currentItem: any): number => {
      return (
        total + currentItem?.quantity * parseFloat(currentItem?.product?.price)
      );
    },
    0
  );

  const {store_id} = getUserInfo() as any;

  return (
    <div ref={componentRef} className="receipt">
      <h2 className="name"> {store_id} </h2>

      <p className="greeting"> Thank you for your order! </p>

      {/* <!-- Order info --> */}
      <div className="order">
        <p> Order No : {id} </p>
        <p> Date : {dayjs(created_at).format("MMM D, YYYY hh:mm A")} </p>
        <p> Name : {customer_name} </p>
        <p> Phone : {customer_phone} </p>
      </div>

      <hr />

      {/* <!-- Details --> */}
      <div className="details">
        <h3> Details </h3>

        {billing_products?.map((item: any) => {
          return (
            <>
              <div className="product">
                <Image
                  src={item?.product?.image}
                  alt="product"
                  height={100}
                  width={100}
                />

                <div className="info">
                  <h4> {item?.product?.title} </h4>

                  <p> Qty: {item?.quantity} </p>
                </div>
                <p className="price">
                  ${item?.product?.price * item?.quantity}
                </p>
              </div>
            </>
          );
        })}
      </div>

      {/* <!-- Sub and total price --> */}
      <div className="totalprice">
        <p className="sub">
          Subtotal <span> ${subTotal} </span>
        </p>

        <p className="del">
          Tax <span> ${tax_amount} </span>{" "}
        </p>

        <hr />

        <p className="tot">
          {" "}
          Total <span> ${total_amount} </span>{" "}
        </p>
      </div>

      {/* <!-- Footer --> */}
      <footer>
        <QRCode
          style={{marginBottom: 16}}
          errorLevel={"Q" as QRCodeProps["errorLevel"]}
          value={`${getBaseUrl()}/store_admin/billings/view/${id}`}
        />
      </footer>
    </div>
  );
};

export default OrderReceipt;
