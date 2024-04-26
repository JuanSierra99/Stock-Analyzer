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
import { GraphSlider } from "./GraphSlider.jsx";
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

const QuarterlyDataGraph = ({ searchTickerValue }) => {
  // Store data fetched from the api, to be used by chartjs graph
  const [netIncomeHistory, setNetIncomeHistory] = useState([]);
  const [fiscalDateHistory, setFiscalDateHistory] = useState([]);
  const [returnedTicker, setReturnedTicker] = useState();
  const [revenueHistory, setRevenueHistory] = useState([]);
  const [totalShareholderEquityHistory, setTotalShareholderEquityHistory] =
    useState([]);
  const [loading, setLoading] = useState(true); // true when data is loading
  const [error, setError] = useState(false); // true when we fail to recieve data from api
  const [errorMessage, setErrorMessage] = useState(""); // Display error message thrown when requesting for data from api
  const [displayAsBarGraph, setDisplayAsBarGraph] = useState(false); // Displays the chart as a bar graph when true
  // Colors to be used by Bar and Line graph components
  const quarterlyNetIncomeColor = "#2a9d8f";
  const quarterlyRevenueColor = "#e9c46a";
  const quarterlyShareholderColor = "#e76f51";
  const apiKey = import.meta.env.VITE_API_KEY;

  // Options for chartjs graphs. Allows us to style the graph to our liking.
  const options = {
    elements: {
      point: {
        radius: 7,
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => {
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
    const getDemoData = async () => {
      console.log("Fetching Demo Data");
      try {
        const { quarters, netIncome, revenue, ticker } =
          await fetchQuarterlyGraphData("INCOME_STATEMENT", "IBM", "demo");
        const { totalShareholderEquity } = await fetchQuarterlyGraphData(
          "BALANCE_SHEET",
          "IBM",
          "demo"
        );
        setNetIncomeHistory(netIncome);
        setFiscalDateHistory(quarters);
        setRevenueHistory(revenue);
        setTotalShareholderEquityHistory(totalShareholderEquity);
        setReturnedTicker(ticker);
      } catch (outerErr) {
        setError(true);
        setErrorMessage(
          "Error, failed to get any data from API: ",
          outerErr.message
        );
      }
    };
    getDemoData();
  }, []);

  // Fetches data from api on mount, and when user searches for new stock
  useEffect(() => {
    const getData = async () => {
      console.log("Fetching Non Demo Data");
      try {
        const { quarters, netIncome, revenue, ticker } =
          await fetchQuarterlyGraphData(
            "INCOME_STATEMENT",
            searchTickerValue,
            apiKey
          );
        const { totalShareholderEquity } = await fetchQuarterlyGraphData(
          "BALANCE_SHEET",
          searchTickerValue,
          apiKey
        );
        setNetIncomeHistory(netIncome);
        setFiscalDateHistory(quarters);
        setRevenueHistory(revenue);
        setTotalShareholderEquityHistory(totalShareholderEquity);
        setReturnedTicker(ticker);
      } catch (err) {
        console.error("Failed to get requested data");
        console.log("Error: ", err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [searchTickerValue]);

  if (loading) return <p>Loading Data...</p>;
  if (error) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="graph-container">
      <div className="graph-header">
        <button
          className="toggle-graph-type-button"
          onClick={() => {
            setDisplayAsBarGraph(!displayAsBarGraph);
          }}
        >
          <img
            src={displayAsBarGraph ? "/Svgs/Bars.svg" : "/Svgs/stocks-line.svg"}
            style={{ width: "20px" }}
          />
        </button>

        <h2 style={{ display: "inline" }}>{returnedTicker}</h2>
      </div>
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
      <GraphSlider></GraphSlider>
    </div>
  );
};

export default QuarterlyDataGraph;
