import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IDriverRequest, IMeta} from "@/types";

const CUSTOMER_URL = "/drivers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomerRequest: builder.mutation({
      query: (payload) => ({
        url: `${CUSTOMER_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    getCustomerRequests: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CUSTOMER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IDriverRequest[], meta: IMeta) => {
        return {
          customerRequests: response,
          meta,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    getCustomerRequestDetails: builder.query({
      query: (id: string) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),
    deleteCustomerRequest: builder.mutation({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    updateCustomerRequest: builder.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const {
  useCreateCustomerRequestMutation,
  useGetCustomerRequestsQuery,
  useGetCustomerRequestDetailsQuery,
  useDeleteCustomerRequestMutation,
  useUpdateCustomerRequestMutation,
} = customerApi;
