import React from "react";
import styles from "@/styles/store/orderItem.module.scss";
import Image from "next/image";
import {ICartProduct} from "@/types";
import {addToCart, decreaseCartQuantity} from "@/rtk/features/cart/cartSlice";
import {useAppDispatch} from "@/rtk/hooks";

interface IProps {
  data: ICartProduct;
}

const OrderItem = ({data}: IProps) => {
  const dispatch = useAppDispatch();

  const increment = () => {
    dispatch(addToCart(data));
  };
  const decrement = () => {
    dispatch(decreaseCartQuantity(data));
  };

  return (
    <div className={styles.item}>
      <div className={styles.thumb}>
        <Image
          src={data.image}
          alt="product"
          height={40}
          width={40}
          // layout="responsive"
        />
      </div>
      <div>
        <h4 className="font-bold">{data.title}</h4>
        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-xs text-slate-400">price</h5>
            <p className="text-gold font-bold text-sm">$ {data.price}</p>
          </div>
          <div className="flex items-center font-sans gap-2">
            <span onClick={decrement} className={styles.btnMinus}>
              -
            </span>
            {data.count}
            <span onClick={increment} className={styles.btnPlus}>
              +
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
