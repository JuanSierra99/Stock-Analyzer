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

  useEffect(() => {
    const getData = async () => {
      try {
        const { fiscalDateEnding, netIncome, revenue } =
          await fetchQuarterlyGraphData("INCOME_STATEMENT");
        const { totalShareholderEquity } = await fetchQuarterlyGraphData(
          "BALANCE_SHEET"
        );
        setNetIncomeHistory(netIncome);
        setFiscalDateHistory(fiscalDateEnding);
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
    <>
      <button
        onClick={() => {
          setDisplayAsBarGraph(!displayAsBarGraph);
        }}
      >
        {displayAsBarGraph ? "Line" : "Bar"}
      </button>
      {displayAsBarGraph ? (
        <Bar
          datasetIdKey="id"
          data={{
            labels: fiscalDateHistory,
            datasets: [
              {
                label: "Quarterly Net Income",
                data: netIncomeHistory,
                backgroundColor: "red",
              },
              {
                label: "Quarterly Revenue",
                data: revenueHistory,
                backgroundColor: "grey",
              },
              {
                label: "Quarterly Shareholder Equity",
                data: totalShareholderEquityHistory,
                backgroundColor: "blue",
              },
            ],
          }}
        />
      ) : (
        <Line
          datasetIdKey="id"
          data={{
            labels: fiscalDateHistory,
            datasets: [
              {
                label: "Quarterly Net Income",
                data: netIncomeHistory,
                borderColor: "red",
              },
              {
                label: "Quarterly Revenue",
                data: revenueHistory,
                borderColor: "grey",
              },
              {
                label: "Quarterly Shareholder Equity",
                data: totalShareholderEquityHistory,
                borderColor: "blue",
              },
            ],
          }}
        />
      )}
    </>
  );
};

export default QuarterlyIncomeGraph;