# Financial Graphing App

This is a financial graphing application that utilizes Vite, React, and Chart.js to display historical data from the AlphaVantage API. It provides graphs based on data retrieved from the `INCOME_STATEMENT` and `BALANCE_SHEET` endpoints.

## Getting Started

To get started with the application, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
cd stock analyzer

npm install
```

# Obtain API key

Visit [Alpha Vantage](https://www.alphavantage.co) to obtain your free private key

# Store API key

Make sure you place your private key in a .env file, located in the root directory

VITE_PRIVATE_KEY=your-private-key

# Start your local development server

```bash
npm run dev
```

# Features

Display historical financial data using Chart.js.
Graphs based on INCOME_STATEMENT and BALANCE_SHEET endpoints from AlphaVantage API.
Error handling for API rate limits and other errors.
