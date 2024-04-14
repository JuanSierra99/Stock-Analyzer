// Function to convert date string to quarter format
const formatDateToQuarter = (dateStr) => {
  const [year, month] = dateStr.split("-");
  const quarter = Math.floor((parseInt(month) - 1) / 3) + 1;
  return `${year} Q${quarter}`;
};

// Function: Fetches and parses data from AlphaVantage api
const fetchQuarterlyGraphData = async (functionType, ticker, apiKey) => {
  //Invalid Argument Error Handling
  if (!apiKey) {
    throw new Error("API key not properly loaded");
  }
  if (!ticker) {
    throw new Error("ticker not provided");
  }
  let apiEndpoint;
  if (functionType === "INCOME_STATEMENT") {
    apiEndpoint = `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`;
  } else if (functionType === "BALANCE_SHEET") {
    apiEndpoint = `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${apiKey}`;
  } else {
    throw new Error("Invalid function type");
  }

  try {
    const response = await fetch(apiEndpoint); // Fetch data from Alpha Vanatage API
    if (!response.ok) {
      return console.error("Error fetching data from api.");
    }
    const data = await response.json(); // Extract json

    if (data.Information && data.Information.includes("API rate limit")) {
      throw new Error("API rate limit exceeded");
    }
    // Check if quarterlyReports exists and is not empty
    if (!data.quarterlyReports || data.quarterlyReports.length === 0) {
      throw new Error("No quarterly reports found for the provided ticker");
    }
    const quarterlyReports = data["quarterlyReports"]; // We only need the quarterly reports object
    // obtain the fiscalDates of every quarter
    const fiscalDateEnding = quarterlyReports.map(
      ({ fiscalDateEnding }) => fiscalDateEnding
    );
    // Convert dates to quarter format, and reverse it so its from oldest to newest
    const quarters = fiscalDateEnding.map(formatDateToQuarter).reverse();

    let result;
    if (functionType === "INCOME_STATEMENT") {
      // obtain the net income of every quarter and reverse it so its from oldest to newest
      const netIncome = quarterlyReports
        .map(({ netIncome }) => parseInt(netIncome))
        .reverse();
      // obtain the revenue of every quarter and reverse it so its from oldest to newest
      const revenue = quarterlyReports
        .map(({ totalRevenue }) => parseInt(totalRevenue))
        .reverse();
      result = { quarters, netIncome, revenue, ticker }; // store all data in an object, to be returned
    } else if (functionType === "BALANCE_SHEET") {
      // obtain the shareholderEquity of every quarter, and reverse it so its from oldest to newest
      const totalShareholderEquity = quarterlyReports
        .map(({ totalShareholderEquity }) => parseInt(totalShareholderEquity))
        .reverse();
      result = { quarters, totalShareholderEquity, ticker };
    }
    return result;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
};

export default fetchQuarterlyGraphData;
