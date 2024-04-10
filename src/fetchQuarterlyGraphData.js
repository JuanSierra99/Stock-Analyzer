// we only want to return netIncome and total revenue
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
    let result;
    if (functionType === "INCOME_STATEMENT") {
      const netIncome = quarterlyReports.map(({ netIncome }) =>
        parseInt(netIncome)
      );
      const revenue = quarterlyReports.map(({ totalRevenue }) =>
        parseInt(totalRevenue)
      );
      result = { fiscalDateEnding, netIncome, revenue };
    } else if (functionType === "BALANCE_SHEET") {
      const totalShareholderEquity = quarterlyReports.map(
        ({ totalShareholderEquity }) => parseInt(totalShareholderEquity)
      );
      result = { fiscalDateEnding, totalShareholderEquity };
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
