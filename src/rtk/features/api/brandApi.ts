import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, ResponseSuccessType} from "@/types";
import {getUserInfo} from "@/services/auth.service";

const {store_id} = getUserInfo() as any;

const BRAND_URL = `/brands/${store_id}`;

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (payload) => ({
        url: `${BRAND_URL}`,
        method: "POST",
        data: payload,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
    getBrands: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${BRAND_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          brands: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.brand],
    }),
    getBrandDetails: builder.query({
      query: (id: string) => ({
        url: `${BRAND_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brand],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `${BRAND_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `${BRAND_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandDetailsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
