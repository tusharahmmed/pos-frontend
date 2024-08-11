import FormSelectField, {SelectOptions} from "./FormSelectField";
import {IBrand} from "@/types";
import {useGetBrandsQuery} from "@/rtk/features/api/brandApi";

type ACFacultyFieldProps = {
  name: string;
  label: string;
};

const FormBrandField = ({name, label}: ACFacultyFieldProps) => {
  const {data, isLoading} = useGetBrandsQuery({
    limit: 100,
    page: 1,
  });
  const brands = data?.brands;
  const brandOption = brands?.map((brand: IBrand) => {
    return {
      label: brand?.title,
      value: brand?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={brandOption as SelectOptions[]}
    />
  );
};

export default FormBrandField;
