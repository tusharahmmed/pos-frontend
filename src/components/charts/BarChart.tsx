import React, {useEffect, useRef} from "react";
import {Chart} from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null) as any;

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy();
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: ["a", "b", "c"],
          datasets: [
            {
              label: "info",
              data: [10, 20, 30],
              borderColor: [
                "rgb(255,99,132,0.2)",
                "rgb(255,99,132,0.2)",
                "rgb(255,99,132,0.2)",
              ],
              borderWidth: 1,
            },
            {
              label: "tinfo",
              data: [10, 20, 30],
              borderColor: [
                "rgb(255,99,132,0.2)",
                "rgb(255,99,132,0.2)",
                "rgb(255,99,132,0.2)",
              ],
              backgroundColor: "red",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, []);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
