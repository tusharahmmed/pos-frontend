import React from "react";
import {useAppDispatch, useAppSelector} from "@/rtk/hooks";
import {setBrand} from "@/rtk/features/store/storeSlice";
import {IBrand} from "@/types";

interface IProps {
  data: IBrand;
}

const BrandItem = ({data}: IProps) => {
  const dispatch = useAppDispatch();
  const {brand_id} = useAppSelector((state) => state.store);

  return (
    <span
      className={data?.id == brand_id ? "active" : ""}
      onMouseUpCapture={() => {
        dispatch(setBrand(data?.id));
      }}>
      {data?.title}
    </span>
  );
};

export default BrandItem;
