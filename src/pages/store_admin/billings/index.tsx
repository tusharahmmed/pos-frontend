import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import FTable from "@/components/ui/FTable";
import DashboardLayout from "@/layouts/DashboardLayout";
import {Button, Input, message} from "antd";
import Link from "next/link";
import {useRef, useState} from "react";
import {EyeOutlined, ReloadOutlined, PrinterOutlined} from "@ant-design/icons";
import {useDebounced} from "@/rtk/hooks";
import FModal from "@/components/ui/FModal";
import dayjs from "dayjs";

import {USER_ROLE} from "@/constants/role";
import {useGetBillingsQuery} from "@/rtk/features/api/billingApi";
import OrderReceipt from "@/components/invoice/OrderReceipt";

import {useReactToPrint} from "react-to-print";

const BillingsListPage = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [invoiceId, setInvoiceId] = useState<string>("");

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
  const {data, isLoading} = useGetBillingsQuery({...query});
  const billings = data?.billings;
  const meta = data?.meta;

  const columns = [
    {
      title: "Customer",
      dataIndex: "customer_name",
    },
    {
      title: "Phone",
      dataIndex: "customer_phone",
    },
    {
      title: "Total Products",
      dataIndex: "billing_products",
      render: function (data: any) {
        return `${data?.length} Pcs`;
      },
    },
    {
      title: "Tax",
      dataIndex: "tax_amount",
      render: function (data: any) {
        return `$ ${data}`;
      },
    },
    {
      title: "Total (+vat)",
      dataIndex: "total_amount",
      render: function (data: any) {
        return `$ ${data}`;
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
            <Button
              style={{
                margin: "5px 5px",
              }}
              onClick={() => {
                setInvoiceId(data);
                // handlePrint();
                setOpen(true);
              }}
              type="primary">
              <PrinterOutlined />
            </Button>
            <Link href={`/${USER_ROLE.STORE_ADMIN}/billings/view/${data}`}>
              {" "}
              <Button type="primary" style={{marginLeft: "3px"}}>
                <EyeOutlined />
              </Button>
            </Link>
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

  // handle print
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    // documentTitle: "Print This Document",
    content: () => componentRef.current,
    // removeAfterPrint: true,
  });

  const handlePrintInvoice = async (id: string) => {
    handlePrint();
    // console.log(id);
    setOpen(false);
    // message.loading("Deleting...");
    // try {
    //   const res = await deleteBrand(id).unwrap();
    //   if (res?.data?.id) {
    //     message.success(res.message);
    //     setOpen(false);
    //   }
    // } catch (error: any) {
    //   setOpen(false);
    //   // console.log(error);
    //   message.error(error.message);
    // }
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
      <ActionBar title="Billing List">
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
        </div>
      </ActionBar>

      <FTable
        loading={isLoading}
        columns={columns}
        dataSource={billings}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
        rowKey="id"
      />

      <FModal
        // title="Remove category"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => {
          handlePrint();
        }}>
        <div className="flex items-center justify-center">
          <OrderReceipt invoiceId={invoiceId} componentRef={componentRef} />
        </div>
      </FModal>
      {/* <div style={{display: "none"}}>
        <OrderReceipt invoiceId={invoiceId} componentRef={componentRef} />
      </div> */}
    </div>
  );
};

export default BillingsListPage;

BillingsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
