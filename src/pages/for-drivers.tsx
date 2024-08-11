import {
  Benefits,
  DriverRequestSection,
  JoinTeam,
} from "@/components/forDrivers";
import RootLayout from "@/layouts/RootLayout";

const ForDrivers = () => {
  return (
    <>
      <JoinTeam />
      <Benefits />
      <DriverRequestSection />
    </>
  );
};

export default ForDrivers;

ForDrivers.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
