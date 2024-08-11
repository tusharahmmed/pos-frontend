import {IMeta, IUser} from "@/types";
import {baseApi} from "./baseApi";
import {tagTypes} from "@/rtk/tag-types";

const USER_URL = "/users";
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: `${USER_URL}`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `${USER_URL}`,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IUser[], meta: IMeta) => {
        return {
          users: response,
          meta,
        };
      },
      providesTags: [tagTypes.user],
    }),
    getUserDetails: builder.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
    updateUser: builder.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUserQuery,
  useGetUserDetailsQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;
