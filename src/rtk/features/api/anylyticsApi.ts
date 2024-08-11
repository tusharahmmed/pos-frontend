import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, ResponseSuccessType} from "@/types";
import {getUserInfo} from "@/services/auth.service";

const {store_id} = getUserInfo() as any;

const ANYLYTICS_URL = `/anylytics`;

export const anylyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandReports: builder.query({
      query: (arg: Record<string, any> | undefined) => ({
        url: `${ANYLYTICS_URL}/brand_reports/${store_id}`,
        method: "GET",
        params: arg,
      }),
    }),
    getDailySellReports: builder.query({
      query: (arg: Record<string, any> | undefined) => ({
        url: `${ANYLYTICS_URL}/daily_sells/${store_id}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          data: response?.data.reverse(),
        };
      },
    }),
  }),
});

export const {useGetBrandReportsQuery, useGetDailySellReportsQuery} =
  anylyticsApi;
