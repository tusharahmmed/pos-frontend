import * as yup from "yup";

export const createBillingSchema = yup.object().shape({
  customer_name: yup.string().required("name is required"),
  customer_phone: yup.string().required("phone is required"),
});
