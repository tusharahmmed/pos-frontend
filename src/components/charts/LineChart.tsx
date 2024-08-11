import React, {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";
import {useGetDailySellReportsQuery} from "@/rtk/features/api/anylyticsApi";

const LineChart = () => {
  const chartRef = useRef(null) as any;

  const {data} = useGetDailySellReportsQuery(undefined);

  const res = data?.data;
  //   const res = [...data?.data].reverse()

  const labels = res?.map((item: any) => item.date);
  const dataset = res?.map((item: any) => item.totalQuantity);

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Quantity",
              data: dataset,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          backgroundColor: "rgb(75, 192, 192)",
          plugins: {
            title: {
              display: true,
              text: "Daily Sell Report",
            },
          },
          scales: {
            x: {
              //   type: "linear",
            },

            y: {
              beginAtZero: true,
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

export default LineChart;
