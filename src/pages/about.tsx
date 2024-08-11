import RootLayout from "@/layouts/RootLayout";
import React from "react";

const AboutPage = () => {
  return <div>This is about page</div>;
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: React.ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
