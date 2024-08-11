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
import {
  useDeleteQuoteMutation,
  useGetQuotesQuery,
} from "@/rtk/features/api/quoteApi";

const CancledQuotePage = () => {
  const query: Record<string, any> = {};
  const [deleteQuote] = useDeleteQuoteMutation();

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
  query["status"] = "canceled";

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const {data, isLoading} = useGetQuotesQuery({...query});
  // console.log(data);
  const quotes = data?.quotes;
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      // dataIndex: "name",

      render: function (data: Record<string, string>) {
        const fullName = `${data?.name} ${data?.serName} `;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "PickupZip",
      dataIndex: "pickupZip",
    },
    {
      title: "DeliveryZip",
      dataIndex: "deliveryZip",
    },
    {
      title: "Pices",
      dataIndex: "totalPices",
    },
    {
      title: "Weight",
      dataIndex: "totalWeight",
      render: function (data: number) {
        return `${data} lb`;
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
      title: "Status",
      dataIndex: "status",
      render: (data: string) => {
        return (
          <div
            className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
            data-te-close="true">
            {data}
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        // console.log(data);
        return (
          <>
            {/* <Link href={`/super_admin/admin/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link> */}
            <Link href={`/admin/quote/edit/${data}`}>
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

  const deleteAdminHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteQuote(id).unwrap();
      if (res) {
        message.success("Quote Successfully Deleted!");
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
            label: "admin",
            link: "/profile",
          },
        ]}
      />
      <ActionBar title="Cancle Quote List">
        <Input
          size="large"
          placeholder="Search"
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
        </div>
      </ActionBar>

      <FTable
        loading={isLoading}
        columns={columns}
        dataSource={quotes}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        rowKey="id"
        expandable={{
          expandedRowRender: (record: any) => (
            <p style={{margin: 0}}>{record.question}</p>
          ),
          rowExpandable: (record: any) => record.question !== "Not Expandable",
        }}
      />

      <FModal
        title="Remove quote"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}>
        <p className="my-5">Do you want to remove this quote?</p>
      </FModal>
    </div>
  );
};

export default CancledQuotePage;

CancledQuotePage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
