import { useState, useEffect } from "react";
import fetchQuarterlyGraphData from "./fetchQuarterlyGraphData.js";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./QuarterlyDataGraph.css";

// Chose to register, so that we have smaller bundle sizes
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineController,
  LineElement,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

const QuarterlyIncomeGraph = ({ type, value }) => {
  const [netIncomeHistory, setNetIncomeHistory] = useState([]);
  const [fiscalDateHistory, setFiscalDateHistory] = useState([]);
  const [revenueHistory, setRevenueHistory] = useState([]);
  const [totalShareholderEquityHistory, setTotalShareholderEquityHistory] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayAsBarGraph, setDisplayAsBarGraph] = useState(false);
  const quarterlyNetIncomeColor = "#2a9d8f";
  const quarterlyRevenueColor = "#e9c46a";
  const quarterlyShareholderColor = "#e76f51";
  const options = {
    elements: {
      point: {
        radius: 7,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value, index, ticks) => {
            if (value >= 1e9 || value <= -1e9) {
              return "$" + value / 1e9 + "B";
            } else if (value >= 1e6 || value <= -1e6) {
              return "$" + value / 1e6 + "M";
            } else if (value >= 1e3 || value <= -1e3) {
              return "$" + value / 1e3 + "K";
            }
            return "$" + value;
          },
        },
      },
    },
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { quarters, netIncome, revenue } = await fetchQuarterlyGraphData(
          "INCOME_STATEMENT"
        );
        const { totalShareholderEquity } = await fetchQuarterlyGraphData(
          "BALANCE_SHEET"
        );
        setNetIncomeHistory(netIncome);
        setFiscalDateHistory(quarters);
        setRevenueHistory(revenue);
        setTotalShareholderEquityHistory(totalShareholderEquity);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="graph-container">
      <button
        className="toggle-graph-type-button"
        onClick={() => {
          setDisplayAsBarGraph(!displayAsBarGraph);
        }}
      >
        {displayAsBarGraph ? "Bar Chart" : "Line Chart"}
      </button>
      {displayAsBarGraph ? (
        <Bar
          options={options}
          datasetIdKey="id"
          data={{
            labels: fiscalDateHistory,
            datasets: [
              {
                label: "Quarterly Net Income",
                data: netIncomeHistory,
                backgroundColor: quarterlyNetIncomeColor,
                borderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
              {
                label: "Quarterly Revenue",
                data: revenueHistory,
                backgroundColor: quarterlyRevenueColor,
                borderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
              {
                label: "Quarterly Shareholder Equity",
                data: totalShareholderEquityHistory,
                backgroundColor: quarterlyShareholderColor,
                borderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
            ],
          }}
        />
      ) : (
        <Line
          options={options}
          data={{
            labels: fiscalDateHistory,
            datasets: [
              {
                label: "Quarterly Net Income",
                data: netIncomeHistory,
                backgroundColor: quarterlyNetIncomeColor,
                borderColor: quarterlyNetIncomeColor,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
              {
                label: "Quarterly Revenue",
                data: revenueHistory,
                backgroundColor: quarterlyRevenueColor,
                borderColor: quarterlyRevenueColor,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
              {
                label: "Quarterly Shareholder Equity",
                data: totalShareholderEquityHistory,
                backgroundColor: quarterlyShareholderColor,
                borderColor: quarterlyShareholderColor,
                pointBackgroundColor: "transparent",
                pointBorderColor: "transparent",
                hoverBackgroundColor: "#264653",
              },
            ],
          }}
        />
      )}
    </div>
  );
};

export default QuarterlyIncomeGraph;
