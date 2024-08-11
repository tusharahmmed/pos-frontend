import {tagTypes} from "@/rtk/tag-types";
import {baseApi} from "./baseApi";
import {IMeta, ResponseSuccessType} from "@/types";
import {getUserInfo} from "@/services/auth.service";

const {store_id} = getUserInfo() as any;

const PRODUCT_URL = `/products/${store_id}`;

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        data: payload,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.store_product],
    }),
    getProducts: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          products: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.product],
    }),
    getStoreProducts: builder.query({
      query: (arg: Record<string, any> | undefined) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          products: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: [tagTypes.store_product],
    }),
    getMoreStoreProducts: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
        params: arg,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        // remove page
        const {page, ...moreArg} = arg;
        try {
          const res = await queryFulfilled;
          const data = res?.data?.products;
          if (data.length > 0) {
            // console.log("from api", data);
            // update conversation cache pessimistically start
            dispatch(
              baseApi.util.updateQueryData(
                "getStoreProducts" as never,
                {...moreArg} as never,
                (draft: {products: any; meta: any}) => {
                  // draft?.products.push(...data);
                  // console.log(JSON.stringify(draft));
                  let newDraft = {
                    meta: {...draft.meta},
                    products: [...draft.products, ...data],
                  };
                  // console.log(JSON.stringify(newDraft));
                  return newDraft;
                }
              )
            );
            // update messages cache pessimistically end
          }
        } catch (err) {}
      },
      transformResponse: (response: ResponseSuccessType, meta: IMeta) => {
        return {
          products: response?.data,
          meta: response?.meta,
        };
      },
      // providesTags: [tagTypes.product],
    }),
    getProductDetails: builder.query({
      query: (id: string) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.store_product],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.product, tagTypes.store_product],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetStoreProductsQuery,
  useGetMoreStoreProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
