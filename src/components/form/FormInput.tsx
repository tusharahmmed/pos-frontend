import {getErrorMessageByPropertyName} from "@/utils/schema-validator";
import {Input} from "antd";
import {useFormContext, Controller} from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  errorStyle?: any;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  errorStyle,
}: IInput) => {
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
        render={({field}) =>
          type === "password" ? (
            <Input.Password
              style={errorMessage ? {border: "1px solid red"} : {}}
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : (
            <Input
              style={
                errorMessage ? errorStyle || {border: "1px solid red"} : {}
              }
              type={type}
              size={size}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
    </>
  );
};

export default FormInput;
