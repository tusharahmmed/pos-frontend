import {authKey} from "@/constants/storageKey";
import {getNewAccessToken} from "@/services/auth.service";

import {IGenericErrorResponse, ResponseSuccessType} from "@/types";
import {getFromLocalStorage, setToLocalStorage} from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();
instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 80000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      statusCode: response?.status,
      message: response?.data?.message,
    };
    // return responseObject;
    return {data: responseObject};
  },
  async function (error) {
    const config = error?.config;

    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      // get new token
      const response = await getNewAccessToken();
      const newAcccessToken = response?.data?.accessToken;
      // set new token
      config.headers.Authorization = newAcccessToken;
      setToLocalStorage(authKey, newAcccessToken);

      return instance(config);
    } else {
      const responseObject: IGenericErrorResponse = {
        statusCode:
          error?.response?.data?.statusCode || error?.response?.status || 500,
        message: error?.response?.data?.message || "Something went wrong",
        errorMessages:
          error?.response?.data?.errorMessages ||
          error?.response?.data?.message,
      };
      return {error: responseObject};
      // return Promise.reject(error);
    }
  }
);

export {instance};
