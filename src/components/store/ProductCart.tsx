import React from "react";
import Image from "next/image";
import styles from "@/styles/store/productCart.module.scss";
import {IProduct} from "@/types";
import {message} from "antd";
import {useAppDispatch} from "@/rtk/hooks";
import {addToCart} from "@/rtk/features/cart/cartSlice";

interface IProps {
  data: IProduct;
}

const ProductCart = ({data}: IProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(data));
    message.success("Item added to cart");
  };

  return (
    <div onClick={handleAddToCart} className={styles.product}>
      <div className={styles.thumb}>
        <Image src={"/1.jpg"} height={300} width={300} alt="product" />
      </div>
      <h2>{data?.title}</h2>
      <p>$ {data?.price}</p>
    </div>
  );
};

export default ProductCart;
