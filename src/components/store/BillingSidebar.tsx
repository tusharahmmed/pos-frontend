import React, {useRef, useState} from "react";
import styles from "@/styles/store/billingSidebar.module.scss";
import OrderItem from "./OrderItem";
import {useAppDispatch, useAppSelector} from "@/rtk/hooks";
import {ICartProduct, IResponseSuccessUnwrap} from "@/types";
import Form from "../form/Form";
import FormInput from "../form/FormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {createBillingSchema} from "@/schemas/billing";
import {message} from "antd";
import {useCreateBillingMutation} from "@/rtk/features/api/billingApi";
import {resetCart} from "@/rtk/features/cart/cartSlice";
import FModal from "../ui/FModal";
import OrderReceipt from "../invoice/OrderReceipt";
import {useReactToPrint} from "react-to-print";

const BillingSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState("");

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  const [createBilling] = useCreateBillingMutation();

  // tax & total
  const tax_amount = ((cart.sub_total / 100) * 10).toFixed(2);
  const total_amout = (cart.sub_total + Number(tax_amount)).toFixed(2);

  const handleFormSubmit = async (data: any) => {
    if (cart.products?.length === 0) {
      message.warning("Your cart is Empty!");
      return;
    }

    data.tax_amount = parseFloat(tax_amount);
    data.total_amount = parseFloat(total_amout);
    data.products = cart.products.map((item: ICartProduct) => {
      return {product_id: item.id, quantity: item.count};
    });
    // console.log(data);

    // generate billing
    message.loading("login.....");
    try {
      const res: IResponseSuccessUnwrap = await createBilling({
        ...data,
      }).unwrap();
      if (res?.data?.id) {
        setInvoiceId(res?.data?.id);
        message.success(res.message);
        dispatch(resetCart());
        setOpen(true);
      }
      // console.log(res);
    } catch (err: any) {
      // console.error(err);
      message.error(err.message);
    }
  };

  // print
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    // documentTitle: "Print This Document",
    content: () => componentRef.current,
    // removeAfterPrint: true,
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.customer}>
          <h2>Customer Information</h2>

          <Form
            id={"billing_form"}
            submitHandler={handleFormSubmit}
            resolver={yupResolver(createBillingSchema)}>
            <FormInput
              name="customer_name"
              placeholder="Customer name"
              errorStyle={{border: "2px solid red"}}
            />
            <FormInput
              name="customer_phone"
              placeholder="Customer phone"
              errorStyle={{border: "2px solid red"}}
            />
          </Form>
        </div>
        <div className={styles.orders}>
          <h2>Order details</h2>
          <div className={styles.items}>
            {cart.products?.length > 0 ? (
              cart.products?.map((item: ICartProduct) => {
                return <OrderItem data={item} />;
              })
            ) : (
              <div className="h-full text-slate-500 flex items-center justify-center font-inter">
                Add Item to cart
              </div>
            )}
          </div>
        </div>
        <div className={styles.price}>
          <div className="flex items-center justify-between mb-2">
            <p>Sub Total</p>
            <p>
              <span>$ {cart.sub_total.toFixed(2)}</span>
            </p>
          </div>
          <div className="flex items-center justify-between border-dashed	pb-2 border-b-2 border-slate-200">
            <p>Tax (10%)</p>
            <p>
              <span>$ {tax_amount}</span>
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <p>Total</p>
            <p className="text-gold font-bold">$ {total_amout}</p>
          </div>
          <button form="billing_form" className={styles.payBtn}>
            Pay Now
          </button>
        </div>
      </div>
      <FModal
        // title="Remove category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => {
          handlePrint();
        }}>
        <div className="flex items-center justify-center">
          <OrderReceipt invoiceId={invoiceId} componentRef={componentRef} />
        </div>
      </FModal>
    </>
  );
};

export default BillingSidebar;
