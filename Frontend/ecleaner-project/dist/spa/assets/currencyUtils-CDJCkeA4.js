function formatCurrency(value, locale = "pt-BR", currency = "BRL") {
  if (!value || isNaN(value)) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}
function parseCurrency(formattedValue) {
  if (!formattedValue) return 0;
  const cleaned = formattedValue.replace(/[^\d,.-]/g, "");
  const normalized = cleaned.replace(",", ".");
  return parseFloat(normalized) || 0;
}
function currencyMask(value, locale = "pt-BR", currency = "BRL") {
  if (!value) return "";
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  const cents = parseInt(numericValue, 10);
  const amount = cents / 100;
  return formatCurrency(amount, locale, currency);
}
function getCurrencyConfig(locale = "pt-BR") {
  const configs = {
    "pt-BR": {
      currency: "BRL",
      symbol: "R$",
      placeholder: "R$ 0,00"
    },
    "en-US": {
      currency: "USD",
      symbol: "$",
      placeholder: "$ 0.00"
    }
  };
  return configs[locale] || configs["pt-BR"];
}
export {
  currencyMask as c,
  formatCurrency as f,
  getCurrencyConfig as g,
  parseCurrency as p
};
//# sourceMappingURL=currencyUtils-CDJCkeA4.js.map
