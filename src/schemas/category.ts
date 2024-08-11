import * as yup from "yup";

export const createOrUpdateCategorySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // file: yup.string().optional(),
});
