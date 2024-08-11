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
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "@/rtk/features/api/brandApi";

const CategoriesListPage = () => {
  const query: Record<string, any> = {};
  const [deleteBrand] = useDeleteBrandMutation();

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
  const {data, isLoading} = useGetBrandsQuery({...query});
  const brands = data?.brands;
  const meta = data?.meta;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
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
            <Link href={`/${USER_ROLE.STORE_ADMIN}/brands/edit/${data}`}>
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
      const res = await deleteBrand(id).unwrap();
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
      <ActionBar title="Brand List">
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
          <Link href={`/${USER_ROLE.STORE_ADMIN}/brands/create`}>
            <Button type="primary">Create Brand</Button>
          </Link>
        </div>
      </ActionBar>

      <FTable
        loading={isLoading}
        columns={columns}
        dataSource={brands}
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
        <p className="my-5">Do you want to remove this category?</p>
      </FModal>
    </div>
  );
};

export default CategoriesListPage;

CategoriesListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
