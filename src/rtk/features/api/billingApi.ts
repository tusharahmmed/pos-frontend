import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, ResponseSuccessType} from "@/types";
import {getUserInfo} from "@/services/auth.service";

const {store_id} = getUserInfo() as any;

const BILLING_URL = `/billings/${store_id}`;

export const billingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBilling: builder.mutation({
      query: (payload) => ({
        url: `${BILLING_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.billing],
    }),
    getBillings: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BILLING_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          billings: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.billing],
    }),
    getBillingDetails: builder.query({
      query: (id: string) => ({
        url: `${BILLING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.billing],
    }),
  }),
});

export const {
  useCreateBillingMutation,
  useGetBillingsQuery,
  useGetBillingDetailsQuery,
} = billingApi;
