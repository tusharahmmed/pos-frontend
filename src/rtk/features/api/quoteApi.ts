import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, IQuote} from "@/types";

const QUOTE_URL = "/quotes";

export const quoteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuote: builder.mutation({
      query: (payload) => ({
        url: `${QUOTE_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.quote],
    }),
    getQuotes: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${QUOTE_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IQuote[], meta: IMeta) => {
        return {
          quotes: response,
          meta,
        };
      },
      providesTags: [tagTypes.quote],
    }),
    getQuoteDetails: builder.query({
      query: (id: string) => ({
        url: `${QUOTE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.quote],
    }),
    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `${QUOTE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.quote],
    }),
    updateQuote: builder.mutation({
      query: (data) => ({
        url: `${QUOTE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.quote],
    }),
  }),
});

export const {
  useCreateQuoteMutation,
  useGetQuotesQuery,
  useGetQuoteDetailsQuery,
  useDeleteQuoteMutation,
  useUpdateQuoteMutation,
} = quoteApi;
