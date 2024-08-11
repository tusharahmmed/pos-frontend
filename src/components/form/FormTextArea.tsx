import {getErrorMessageByPropertyName} from "@/utils/schema-validator";
import {Input} from "antd";
import {Controller, useFormContext} from "react-hook-form";

type TextAreaProps = {
  name: string;
  label?: string;
  rows?: number;
  value?: string;
  placeholder?: string;
};

const FormTextArea = ({
  name,
  label,
  rows,
  value,
  placeholder,
}: TextAreaProps) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <div className={`flex flex-col  w-full`}>
      {label ? (
        <label className="flex justify-between pr-2 font-inter font-semibold text-[14px] text-[#0A0B0C] leading-[150%] mb-[8px] inline-block">
          {label}
          <small className="font-inter" style={{color: "red"}}>
            {errorMessage}
          </small>
        </label>
      ) : null}
      <Controller
        name={name}
        control={control}
        render={({field}) => (
          <Input.TextArea
            style={
              errorMessage
                ? {border: "1px solid red", resize: "none"}
                : {resize: "none"}
            }
            rows={rows}
            placeholder={placeholder}
            {...field}
            defaultValue={value}
          />
        )}
      />
    </div>
  );
};

export default FormTextArea;
