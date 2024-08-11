import DashboardLayout from "@/layouts/DashboardLayout";

const StoreAdminLanding = () => {
  return (
    <div>
      <h1>This is store Admin Landing</h1>
    </div>
  );
};

export default StoreAdminLanding;

StoreAdminLanding.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
