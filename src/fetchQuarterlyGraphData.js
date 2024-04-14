// Function to convert date string to quarter format
const formatDateToQuarter = (dateStr) => {
  const [year, month] = dateStr.split("-");
  const quarter = Math.floor((parseInt(month) - 1) / 3) + 1;
  return `${year} Q${quarter}`;
};

const fetchQuarterlyGraphData = async (functionType, ticker, apiKey) => {
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
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      return console.error("Error fetching data from api.");
    }
    const data = await response.json();
    if (data.Information && data.Information.includes("API rate limit")) {
      throw new Error("API rate limit exceeded");
    }
    console.log(data);
    const quarterlyReports = data["quarterlyReports"];
    const fiscalDateEnding = quarterlyReports.map(
      ({ fiscalDateEnding }) => fiscalDateEnding
    );
    // Convert dates to quarter format
    const quarters = fiscalDateEnding.map(formatDateToQuarter).reverse();

    let result;
    if (functionType === "INCOME_STATEMENT") {
      const netIncome = quarterlyReports
        .map(({ netIncome }) => parseInt(netIncome))
        .reverse();

      const revenue = quarterlyReports
        .map(({ totalRevenue }) => parseInt(totalRevenue))
        .reverse();
      result = { quarters, netIncome, revenue };
    } else if (functionType === "BALANCE_SHEET") {
      const totalShareholderEquity = quarterlyReports
        .map(({ totalShareholderEquity }) => parseInt(totalShareholderEquity))
        .reverse();
      result = { quarters, totalShareholderEquity };
    }
    return result;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
};

export default fetchQuarterlyGraphData;
