// Function to convert date string to quarter format
const formatDateToQuarter = (dateStr) => {
  const [year, month] = dateStr.split("-");
  const quarter = Math.floor((parseInt(month) - 1) / 3) + 1;
  return `${year} Q${quarter}`;
};

const fetchQuarterlyGraphData = async (functionType) => {
  let apiEndpoint;
  if (functionType === "INCOME_STATEMENT") {
    apiEndpoint =
      "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo";
  } else if (functionType === "BALANCE_SHEET") {
    apiEndpoint =
      "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo";
  } else {
    throw new Error("Invalid function type");
  }

  try {
    const response = await fetch(apiEndpoint);
    if (!response.ok) {
      return console.error("Error fetching data from api.");
    }
    const data = await response.json();
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
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(
      "There was a problem with the fetch operation: " + error.message
    );
  }
};

export default fetchQuarterlyGraphData;
