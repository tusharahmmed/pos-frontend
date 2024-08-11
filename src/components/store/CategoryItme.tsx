import React from "react";
import styles from "@/styles/store/categoryItem.module.scss";
import Image from "next/image";
import {ICategory} from "@/types";
import {useAppDispatch, useAppSelector} from "@/rtk/hooks";
import {setCategory} from "@/rtk/features/store/storeSlice";

interface IProps {
  data: ICategory;
}

const CategoryItme = ({data}: IProps) => {
  const {title, image, id} = data || {};

  const {category_id} = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    dispatch(setCategory(id));
  };

  let activeClass = category_id === id ? "active" : "";

  return (
    <div
      onClick={clickHandler}
      className={`${styles.itemWraper} ${activeClass} text-[#89898A]`}>
      {image && (
        <div className={styles.imgWraper}>
          <Image src={image} height={40} width={30} alt="item" />{" "}
        </div>
      )}

      <p>{title}</p>
    </div>
  );
};

export default CategoryItme;
