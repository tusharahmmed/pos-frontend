import * as yup from "yup";

export const creatProductSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().min(1).required("Price is Required"),
  quantity: yup.number().min(1).required("Quantity is Required"),
  category_id: yup.string().required("Category is required"),
  brand_id: yup.string().required("Brand is required"),

  // file: yup.string().optional(),
});
export const updateProductSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is Required"),
  quantity: yup.number().required("Quantity is Required"),
  category_id: yup.string().required("Category is required"),
  brand_id: yup.string().required("Brand is required"),

  // file: yup.string().optional(),
});
