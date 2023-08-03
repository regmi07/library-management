import { getIssueStats } from "@/adapters/dashboard.adapter/dashboard";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toast } from "react-toastify";

function IssueBookBarChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    getIssueStats().then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        const labels = response.data.map(
          (item: any) => `Week ${item.weekNumber}`
        );
        console.log(labels);
        const issuedBooks = response.data.map((item: any) => item.issuedBooks);
        // Set the chart data
        setChartData({
          labels,
          datasets: [
            {
              label: "Issued Books",
              data: issuedBooks,
              backgroundColor: "rgba(75,192,192,0.6)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
            },
          ],
        });
      } else toast.error("Something went wrong while getting issue stats");
    });
  }, []);
  if (!chartData) {
    return <h2>Chart data is empty</h2>;
  }
  return (
    <div>
      <h2>Weekly Stats Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default IssueBookBarChart;
