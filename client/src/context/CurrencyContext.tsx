import React, { createContext, useContext, useState, useEffect } from "react";

export const CURRENCIES = {
  NGN: {
    code: "NGN",
    symbol: "₦",
    label: "NGN (₦)",
    name: "Nigerian Naira",
    rate: 1, // Base
    decimals: 0
  },
  USD: {
    code: "USD",
    symbol: "$",
    label: "USD ($)",
    name: "US Dollar (Diaspora)",
    rate: 1 / 1550,
    decimals: 2
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    label: "GBP (£)",
    name: "British Pound",
    rate: 1 / 2000,
    decimals: 2
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    label: "EUR (€)",
    name: "Euro",
    rate: 1 / 1700,
    decimals: 2
  }
};

const CurrencyContext = createContext({
  currency: "NGN",
  setCurrency: () => {},
  formatPrice: (amountNGN) => "",
  convertPrice: (amountNGN) => 0,
  currencyMeta: CURRENCIES.NGN
});

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("calabarpass_currency");
      if (saved && CURRENCIES[saved]) {
        return saved;
      }
    }
    return "NGN";
  });

  const setCurrency = (code) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
      if (typeof window !== "undefined") {
        localStorage.setItem("calabarpass_currency", code);
      }
    }
  };

  const currentMeta = CURRENCIES[currency] || CURRENCIES.NGN;

  const convertPrice = (amountNGN) => {
    const num = Number(amountNGN) || 0;
    return num * currentMeta.rate;
  };

  const formatPrice = (amountNGN, opts = {}) => {
    const num = Number(amountNGN) || 0;
    const converted = num * currentMeta.rate;

    if (currency === "NGN") {
      return `₦${Math.round(num).toLocaleString("en-NG")}`;
    }

    // For foreign currencies, format nicely
    const decimals = opts.decimals !== undefined ? opts.decimals : currentMeta.decimals;
    const formattedNum = converted.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    return `${currentMeta.symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        convertPrice,
        currencyMeta: currentMeta,
        availableCurrencies: Object.values(CURRENCIES)
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}

