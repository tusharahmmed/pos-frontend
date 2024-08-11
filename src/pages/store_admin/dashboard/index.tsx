import BarChart from "@/components/charts/BarChart";
import DoughnutChart from "@/components/charts/DonatChart";
import LineChart from "@/components/charts/LineChart";
import ActionBar from "@/components/ui/ActionBar";
import FBreadCrumb from "@/components/ui/FBreadCrumb";
import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <FBreadCrumb
        items={[
          {
            label: "store_admin",
            link: "/dashboard",
          },
        ]}
      />
      <ActionBar title="Admin Dashboard"></ActionBar>
      <div className="grid grid-cols-2 gap-10">
        <div className=" h-[365px] flex  justify-center flex-col	">
          {/* <div className="w-full">
            <h3>Daily Sell Report</h3>
          </div> */}
          <DoughnutChart />
        </div>
        <div className="h-[315px] flex items-center justify-center flex-col	">
          {/* <div className="w-full">
            <h3>Brand Report</h3>
          </div> */}
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
