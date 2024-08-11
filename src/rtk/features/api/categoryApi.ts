import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, ResponseSuccessType} from "@/types";
import {getUserInfo} from "@/services/auth.service";

const {store_id} = getUserInfo() as any;

const CATEGORY_URL = `/categories/${store_id}`;

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (payload) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        data: payload,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getCategories: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          categories: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.category],
    }),
    getCategoryDetails: builder.query({
      query: (id: string) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.category],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.category],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryDetailsQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
