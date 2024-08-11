import {getErrorMessageByPropertyName} from "@/utils/schema-validator";
import {Select} from "antd";
import {useFormContext, Controller} from "react-hook-form";

export type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  handleChange?: (el: string) => void;
  required?: boolean;
};

const FormSelectField = ({
  name,
  size = "large",
  value,
  placeholder = "select",
  options,
  label,
  defaultValue,
  handleChange,
  required,
}: SelectFieldProps) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}>
          *
        </span>
      ) : null}
      {label ? (
        <label className="flex justify-between pr-2 font-inter font-semibold text-[14px] text-[#0A0B0C] leading-[150%] mb-[8px] inline-block">
          {label}
          <small className="font-inter" style={{color: "red"}}>
            {errorMessage}
          </small>
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({field: {value, onChange}}) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            size={size}
            options={options}
            value={value}
            className="rounded-lg"
            style={
              errorMessage
                ? {border: "1px solid red", width: "100%"}
                : {width: "100%"}
            }
            placeholder={placeholder}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
