import React from "react";

interface ILayout {
  children: React.ReactElement;
}

const RootLayout = ({children}: ILayout) => {
  return <>{children}</>;
};

export default RootLayout;
