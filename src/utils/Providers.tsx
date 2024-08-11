import {inter, sans} from "@/fonts/fonts";
import React from "react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import {store} from "@/rtk/store";

interface IProvider {
  children: React.ReactElement | any;
}

const Providers = ({children}: IProvider) => {
  return (
    <Provider store={store}>
      <div className={`${inter.variable} ${sans.variable}`} id="_4u">
        <ConfigProvider
          theme={{
            components: {
              Layout: {
                /* here is your component tokens */
                triggerBg: "#eee",
                triggerColor: "black",
              },
            },
          }}>
          {children}
        </ConfigProvider>
      </div>
    </Provider>
  );
};

export default Providers;
