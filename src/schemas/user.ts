import * as yup from "yup";

export const createUserRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  serName: yup.string().required("Ser Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  role: yup.string().required("Role is required"),
  permissions: yup.array().required("Permission is required").nonNullable(),
});
export const updateUserRequestSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  serName: yup.string().required("Ser Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().optional(),
  role: yup.string().required("Role is required"),
  permissions: yup.array().required("Permission is required").nonNullable(),
});
