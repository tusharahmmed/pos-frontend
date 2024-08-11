import * as yup from "yup";

export const loginRequestSchema = yup.object().shape({
  store_id: yup.string().required("Store id is required"),
  password: yup.string().required("Password is required").min(6),
});
