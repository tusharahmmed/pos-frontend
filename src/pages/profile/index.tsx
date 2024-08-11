import DashboardLayout from "@/layouts/DashboardLayout";
import React from "react";

const Profile = () => {
  return (
    <div>
      <h2 className="text-lg font-medium">Profile</h2>
      <div className="mt-2 border-1 border-gray-200">
        Profile Module is Cooking!
      </div>
    </div>
  );
};

export default Profile;
Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
