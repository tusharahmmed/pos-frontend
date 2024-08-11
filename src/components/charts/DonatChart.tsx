import React, {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import {useGetBrandReportsQuery} from "@/rtk/features/api/anylyticsApi";

const DoughnutChart = () => {
  const chartRef = useRef(null) as any;

  const {data} = useGetBrandReportsQuery(undefined);

  const res = data?.data;

  const labels = res?.map((item: any) => item.brandTitle);
  const dataset = res?.map((item: any) => item.totalQuantity);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "doughnut",
        data: {
          //   labels: ["a", "b", "c"],
          labels: labels,
          datasets: [
            {
              label: "Total sell",
              data: dataset,
              backgroundColor: [
                "#003f5c",
                "#2f4b7c",
                "#665191",
                "#a05195",
                "#d45087",
                "#f95d6a",
                "#ff7c43",
                "#ffa600",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Brand Report",
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [res]);

  return (
    <>
      <canvas ref={chartRef}></canvas>
    </>
  );
};

export default DoughnutChart;
