import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button, Input, message} from "antd";
import Link from "next/link";
import {useState} from "react";
import {DeleteOutlined, EditOutlined, ReloadOutlined} from "@ant-design/icons";
import {useDebounced} from "@/rtk/hooks";
import FModal from "@/components/ui/FModal";
import dayjs from "dayjs";

import {USER_ROLE} from "@/constants/role";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/rtk/features/api/productApi";
import Image from "next/image";
import {IBrand, ICategory} from "@/types";

const ProductListPage = () => {
  const query: Record<string, any> = {};
  const [deleteProduct] = useDeleteProductMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "completed";

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["search"] = debouncedSearchTerm;
  }
  const {data, isLoading} = useGetProductsQuery({...query});
  const products = data?.products;
  const meta = data?.meta;

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: function (data: string) {
        return (
          <Image
            src={data}
            alt="thumb"
            width={40}
            height={60}
            className="w-14 h-auto"
          />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: function (data: string) {
        return <span>${data}</span>;
      },
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      render: function (data: number) {
        return <span>{data} Pcs</span>;
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      render: function (data: ICategory) {
        return <span>{data?.title}</span>;
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
      render: function (data: IBrand) {
        return <span>{data?.title}</span>;
      },
    },

    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Updated at",
      dataIndex: "updatedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            <Link href={`/${USER_ROLE.STORE_ADMIN}/products/edit/${data}`}>
              <Button
                style={{
                  margin: "5px 5px",
                }}
                onClick={() => {}}
                type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true);
                setAdminId(data);
              }}
              danger
              style={{marginLeft: "3px"}}>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const {order, field} = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteCategoryHandler = async (id: string) => {
    // console.log(id);
    setOpen(false);
    message.loading("Deleting...");
    try {
      const res = await deleteProduct(id).unwrap();
      if (res?.data?.id) {
        message.success(res.message);
        setOpen(false);
      }
    } catch (error: any) {
      setOpen(false);
      // console.log(error);
      message.error(error.message);
    }
  };

  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "store_admin",
            link: "/profile",
          },
        ]}
      />
      <ActionBar title="Product List">
        <Input
          size="large"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{margin: "0px 5px"}}
              type="primary"
              onClick={resetFilters}>
              <ReloadOutlined />
            </Button>
          )}
          <Link href={`/${USER_ROLE.STORE_ADMIN}/products/create`}>
            <Button type="primary">Create Product</Button>
          </Link>
        </div>
      </ActionBar>

      <FTable
        loading={isLoading}
        columns={columns}
        dataSource={products}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        rowKey="id"
      />

      <FModal
        title="Remove category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCategoryHandler(adminId)}>
        <p className="my-5">Do you want to remove this product?</p>
      </FModal>
    </div>
  );
};

export default ProductListPage;

ProductListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
