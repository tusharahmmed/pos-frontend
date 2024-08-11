import FormSelectField, { SelectOptions } from "./FormSelectField";
import { useGetCategoriesQuery } from "../../rtk/features/api/categoryApi";
import { ICategory } from "@/types";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const FormCategoryField = ({ name, label }: ACFacultyFieldProps) => {
  const { data, isLoading } = useGetCategoriesQuery({
    limit: 100,
    page: 1,
  });
  const categories = data?.categories;
  const categoryOptions = categories?.map((category:ICategory) => {
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={categoryOptions as SelectOptions[]}
    />
  );
};

export default FormCategoryField;
