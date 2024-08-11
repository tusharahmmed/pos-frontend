import React from "react";

import {InputNumber} from "antd";
// import type {InputNumberProps} from "antd";
import {useFormContext, Controller} from "react-hook-form";
import {getErrorMessageByPropertyName} from "@/utils/schema-validator";

type IFormInputProps = {
  name: string;
  label: string;
  size?: "large" | "small";
  placeholder?: string;
  defaultValue?: number;
  prefix?: any;
};

const FormInputNumber = ({
  name,
  label,
  size = "large",
  placeholder,
  defaultValue,
  prefix,
}: IFormInputProps) => {
  const {
    setValue,
    control,
    formState: {errors},
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  //   const onChange: InputNumberProps["onChange"] = (value) => {
  //     console.log(value);
  //     setValue(name, value);
  //   };

  const priceRegex = /\$\s?|(,*)/g;
  const otheRegex = /\\s?|(,*)/g;

  return (
    <>
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
          name === "price" ? (
            <InputNumber<number>
              {...field}
              className="w-full"
              style={errorMessage ? {border: "1px solid red"} : {}}
              placeholder={placeholder}
              size={size}
              defaultValue={defaultValue}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(priceRegex, "") as unknown as number
              }
              //   onChange={onChange}
            />
          ) : (
            <InputNumber<number>
              {...field}
              className="w-full"
              style={errorMessage ? {border: "1px solid red"} : {}}
              placeholder={placeholder}
              size={size}
              defaultValue={defaultValue}
              prefix={prefix}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(otheRegex, "") as unknown as number
              }
              //   onChange={onChange}
            />
          )
        }
      />

      {/* {name === "price" ? (
        <InputNumber<number>
          className="w-full"
          style={errorMessage ? {border: "1px solid red"} : {}}
          placeholder={placeholder}
          size={size}
          defaultValue={defaultValue}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) =>
            value?.replace(priceRegex, "") as unknown as number
          }
          onChange={onChange}
        />
      ) : (
        <InputNumber<number>
          className="w-full"
          style={errorMessage ? {border: "1px solid red"} : {}}
          placeholder={placeholder}
          size={size}
          defaultValue={defaultValue}
          prefix={prefix}
          formatter={(value) =>
            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value?.replace(otheRegex, "") as unknown as number}
          onChange={onChange}
        />
      )} */}
    </>
  );
};

export default FormInputNumber;
