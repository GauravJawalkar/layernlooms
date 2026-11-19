// Country and Currency System for LayerNlooms Partner Commission Calculator
// Supports 210+ countries and all active ISO 4217 currencies worldwide.

export interface Country {
  code: string;
  name: string;
  currency: string;
  region: string;
  flag: string;
  popular?: boolean;
}

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  presets: number[];
  minAmount: number;
  maxAmount: number;
  step: number;
  defaultAmount: number;
}

export const COUNTRIES: Country[] = [
  {
    "code": "US",
    "name": "United States",
    "currency": "USD",
    "region": "North America",
    "popular": true,
    "flag": "🇺🇸"
  },
  {
    "code": "GB",
    "name": "United Kingdom",
    "currency": "GBP",
    "region": "Europe",
    "popular": true,
    "flag": "🇬🇧"
  },
  {
    "code": "IN",
    "name": "India",
    "currency": "INR",
    "region": "Asia & Pacific",
    "popular": true,
    "flag": "🇮🇳"
  },
  {
    "code": "AE",
    "name": "United Arab Emirates",
    "currency": "AED",
    "region": "Middle East",
    "popular": true,
    "flag": "🇦🇪"
  },
  {
    "code": "CA",
    "name": "Canada",
    "currency": "CAD",
    "region": "North America",
    "popular": true,
    "flag": "🇨🇦"
  },
  {
    "code": "AU",
    "name": "Australia",
    "currency": "AUD",
    "region": "Asia & Pacific",
    "popular": true,
    "flag": "🇦🇺"
  },
  {
    "code": "DE",
    "name": "Germany",
    "currency": "EUR",
    "region": "Europe",
    "popular": true,
    "flag": "🇩🇪"
  },
  {
    "code": "FR",
    "name": "France",
    "currency": "EUR",
    "region": "Europe",
    "popular": true,
    "flag": "🇫🇷"
  },
  {
    "code": "SG",
    "name": "Singapore",
    "currency": "SGD",
    "region": "Asia & Pacific",
    "popular": true,
    "flag": "🇸🇬"
  },
  {
    "code": "JP",
    "name": "Japan",
    "currency": "JPY",
    "region": "Asia & Pacific",
    "popular": true,
    "flag": "🇯🇵"
  },
  {
    "code": "CH",
    "name": "Switzerland",
    "currency": "CHF",
    "region": "Europe",
    "popular": true,
    "flag": "🇨🇭"
  },
  {
    "code": "SA",
    "name": "Saudi Arabia",
    "currency": "SAR",
    "region": "Middle East",
    "popular": true,
    "flag": "🇸🇦"
  },
  {
    "code": "QA",
    "name": "Qatar",
    "currency": "QAR",
    "region": "Middle East",
    "popular": true,
    "flag": "🇶🇦"
  },
  {
    "code": "KW",
    "name": "Kuwait",
    "currency": "KWD",
    "region": "Middle East",
    "popular": true,
    "flag": "🇰🇼"
  },
  {
    "code": "OM",
    "name": "Oman",
    "currency": "OMR",
    "region": "Middle East",
    "popular": true,
    "flag": "🇴🇲"
  },
  {
    "code": "BH",
    "name": "Bahrain",
    "currency": "BHD",
    "region": "Middle East",
    "popular": true,
    "flag": "🇧🇭"
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "currency": "EUR",
    "region": "Europe",
    "popular": true,
    "flag": "🇳🇱"
  },
  {
    "code": "IE",
    "name": "Ireland",
    "currency": "EUR",
    "region": "Europe",
    "popular": true,
    "flag": "🇮🇪"
  },
  {
    "code": "NZ",
    "name": "New Zealand",
    "currency": "NZD",
    "region": "Asia & Pacific",
    "popular": true,
    "flag": "🇳🇿"
  },
  {
    "code": "ZA",
    "name": "South Africa",
    "currency": "ZAR",
    "region": "Africa",
    "popular": true,
    "flag": "🇿🇦"
  },
  {
    "code": "SE",
    "name": "Sweden",
    "currency": "SEK",
    "region": "Europe",
    "flag": "🇸🇪"
  },
  {
    "code": "NO",
    "name": "Norway",
    "currency": "NOK",
    "region": "Europe",
    "flag": "🇳🇴"
  },
  {
    "code": "DK",
    "name": "Denmark",
    "currency": "DKK",
    "region": "Europe",
    "flag": "🇩🇰"
  },
  {
    "code": "FI",
    "name": "Finland",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇫🇮"
  },
  {
    "code": "ES",
    "name": "Spain",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇪🇸"
  },
  {
    "code": "IT",
    "name": "Italy",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇮🇹"
  },
  {
    "code": "BE",
    "name": "Belgium",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇧🇪"
  },
  {
    "code": "AT",
    "name": "Austria",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇦🇹"
  },
  {
    "code": "PT",
    "name": "Portugal",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇵🇹"
  },
  {
    "code": "PL",
    "name": "Poland",
    "currency": "PLN",
    "region": "Europe",
    "flag": "🇵🇱"
  },
  {
    "code": "BR",
    "name": "Brazil",
    "currency": "BRL",
    "region": "Americas",
    "flag": "🇧🇷"
  },
  {
    "code": "MX",
    "name": "Mexico",
    "currency": "MXN",
    "region": "Americas",
    "flag": "🇲🇽"
  },
  {
    "code": "MY",
    "name": "Malaysia",
    "currency": "MYR",
    "region": "Asia & Pacific",
    "flag": "🇲🇾"
  },
  {
    "code": "ID",
    "name": "Indonesia",
    "currency": "IDR",
    "region": "Asia & Pacific",
    "flag": "🇮🇩"
  },
  {
    "code": "TH",
    "name": "Thailand",
    "currency": "THB",
    "region": "Asia & Pacific",
    "flag": "🇹🇭"
  },
  {
    "code": "PH",
    "name": "Philippines",
    "currency": "PHP",
    "region": "Asia & Pacific",
    "flag": "🇵🇭"
  },
  {
    "code": "VN",
    "name": "Vietnam",
    "currency": "VND",
    "region": "Asia & Pacific",
    "flag": "🇻🇳"
  },
  {
    "code": "KR",
    "name": "South Korea",
    "currency": "KRW",
    "region": "Asia & Pacific",
    "flag": "🇰🇷"
  },
  {
    "code": "HK",
    "name": "Hong Kong",
    "currency": "HKD",
    "region": "Asia & Pacific",
    "flag": "🇭🇰"
  },
  {
    "code": "TW",
    "name": "Taiwan",
    "currency": "TWD",
    "region": "Asia & Pacific",
    "flag": "🇹🇼"
  },
  {
    "code": "IL",
    "name": "Israel",
    "currency": "ILS",
    "region": "Middle East",
    "flag": "🇮🇱"
  },
  {
    "code": "TR",
    "name": "Turkey",
    "currency": "TRY",
    "region": "Europe",
    "flag": "🇹🇷"
  },
  {
    "code": "EG",
    "name": "Egypt",
    "currency": "EGP",
    "region": "Middle East",
    "flag": "🇪🇬"
  },
  {
    "code": "NG",
    "name": "Nigeria",
    "currency": "NGN",
    "region": "Africa",
    "flag": "🇳🇬"
  },
  {
    "code": "KE",
    "name": "Kenya",
    "currency": "KES",
    "region": "Africa",
    "flag": "🇰🇪"
  },
  {
    "code": "PK",
    "name": "Pakistan",
    "currency": "PKR",
    "region": "Asia & Pacific",
    "flag": "🇵🇰"
  },
  {
    "code": "BD",
    "name": "Bangladesh",
    "currency": "BDT",
    "region": "Asia & Pacific",
    "flag": "🇧🇩"
  },
  {
    "code": "LK",
    "name": "Sri Lanka",
    "currency": "LKR",
    "region": "Asia & Pacific",
    "flag": "🇱🇰"
  },
  {
    "code": "NP",
    "name": "Nepal",
    "currency": "NPR",
    "region": "Asia & Pacific",
    "flag": "🇳🇵"
  },
  {
    "code": "GR",
    "name": "Greece",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇬🇷"
  },
  {
    "code": "CZ",
    "name": "Czech Republic",
    "currency": "CZK",
    "region": "Europe",
    "flag": "🇨🇿"
  },
  {
    "code": "HU",
    "name": "Hungary",
    "currency": "HUF",
    "region": "Europe",
    "flag": "🇭🇺"
  },
  {
    "code": "RO",
    "name": "Romania",
    "currency": "RON",
    "region": "Europe",
    "flag": "🇷🇴"
  },
  {
    "code": "CL",
    "name": "Chile",
    "currency": "CLP",
    "region": "Americas",
    "flag": "🇨🇱"
  },
  {
    "code": "CO",
    "name": "Colombia",
    "currency": "COP",
    "region": "Americas",
    "flag": "🇨🇴"
  },
  {
    "code": "PE",
    "name": "Peru",
    "currency": "PEN",
    "region": "Americas",
    "flag": "🇵🇪"
  },
  {
    "code": "AR",
    "name": "Argentina",
    "currency": "ARS",
    "region": "Americas",
    "flag": "🇦🇷"
  },
  {
    "code": "AF",
    "name": "Afghanistan",
    "currency": "AFN",
    "region": "Asia & Pacific",
    "flag": "🇦🇫"
  },
  {
    "code": "AL",
    "name": "Albania",
    "currency": "ALL",
    "region": "Europe",
    "flag": "🇦🇱"
  },
  {
    "code": "DZ",
    "name": "Algeria",
    "currency": "DZD",
    "region": "Africa",
    "flag": "🇩🇿"
  },
  {
    "code": "AS",
    "name": "American Samoa",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇦🇸"
  },
  {
    "code": "AD",
    "name": "Andorra",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇦🇩"
  },
  {
    "code": "AO",
    "name": "Angola",
    "currency": "AOA",
    "region": "Africa",
    "flag": "🇦🇴"
  },
  {
    "code": "AI",
    "name": "Anguilla",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇦🇮"
  },
  {
    "code": "AG",
    "name": "Antigua and Barbuda",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇦🇬"
  },
  {
    "code": "AM",
    "name": "Armenia",
    "currency": "AMD",
    "region": "Asia & Pacific",
    "flag": "🇦🇲"
  },
  {
    "code": "AW",
    "name": "Aruba",
    "currency": "AWG",
    "region": "Americas",
    "flag": "🇦🇼"
  },
  {
    "code": "AZ",
    "name": "Azerbaijan",
    "currency": "AZN",
    "region": "Asia & Pacific",
    "flag": "🇦🇿"
  },
  {
    "code": "BS",
    "name": "Bahamas",
    "currency": "BSD",
    "region": "Americas",
    "flag": "🇧🇸"
  },
  {
    "code": "BB",
    "name": "Barbados",
    "currency": "BBD",
    "region": "Americas",
    "flag": "🇧🇧"
  },
  {
    "code": "BY",
    "name": "Belarus",
    "currency": "BYN",
    "region": "Europe",
    "flag": "🇧🇾"
  },
  {
    "code": "BZ",
    "name": "Belize",
    "currency": "BZD",
    "region": "Americas",
    "flag": "🇧🇿"
  },
  {
    "code": "BJ",
    "name": "Benin",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇧🇯"
  },
  {
    "code": "BM",
    "name": "Bermuda",
    "currency": "BMD",
    "region": "Americas",
    "flag": "🇧🇲"
  },
  {
    "code": "BT",
    "name": "Bhutan",
    "currency": "BTN",
    "region": "Asia & Pacific",
    "flag": "🇧🇹"
  },
  {
    "code": "BO",
    "name": "Bolivia",
    "currency": "BOB",
    "region": "Americas",
    "flag": "🇧🇴"
  },
  {
    "code": "BA",
    "name": "Bosnia and Herzegovina",
    "currency": "BAM",
    "region": "Europe",
    "flag": "🇧🇦"
  },
  {
    "code": "BW",
    "name": "Botswana",
    "currency": "BWP",
    "region": "Africa",
    "flag": "🇧🇼"
  },
  {
    "code": "BN",
    "name": "Brunei",
    "currency": "BND",
    "region": "Asia & Pacific",
    "flag": "🇧🇳"
  },
  {
    "code": "BG",
    "name": "Bulgaria",
    "currency": "BGN",
    "region": "Europe",
    "flag": "🇧🇬"
  },
  {
    "code": "BF",
    "name": "Burkina Faso",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇧🇫"
  },
  {
    "code": "BI",
    "name": "Burundi",
    "currency": "BIF",
    "region": "Africa",
    "flag": "🇧🇮"
  },
  {
    "code": "CV",
    "name": "Cabo Verde",
    "currency": "CVE",
    "region": "Africa",
    "flag": "🇨🇻"
  },
  {
    "code": "KH",
    "name": "Cambodia",
    "currency": "KHR",
    "region": "Asia & Pacific",
    "flag": "🇰🇭"
  },
  {
    "code": "CM",
    "name": "Cameroon",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇨🇲"
  },
  {
    "code": "KY",
    "name": "Cayman Islands",
    "currency": "KYD",
    "region": "Americas",
    "flag": "🇰🇾"
  },
  {
    "code": "CF",
    "name": "Central African Republic",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇨🇫"
  },
  {
    "code": "TD",
    "name": "Chad",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇹🇩"
  },
  {
    "code": "CN",
    "name": "China",
    "currency": "CNY",
    "region": "Asia & Pacific",
    "flag": "🇨🇳"
  },
  {
    "code": "KM",
    "name": "Comoros",
    "currency": "KMF",
    "region": "Africa",
    "flag": "🇰🇲"
  },
  {
    "code": "CD",
    "name": "Congo (DRC)",
    "currency": "CDF",
    "region": "Africa",
    "flag": "🇨🇩"
  },
  {
    "code": "CG",
    "name": "Congo (Republic)",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇨🇬"
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "currency": "CRC",
    "region": "Americas",
    "flag": "🇨🇷"
  },
  {
    "code": "CI",
    "name": "Côte d'Ivoire",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇨🇮"
  },
  {
    "code": "HR",
    "name": "Croatia",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇭🇷"
  },
  {
    "code": "CU",
    "name": "Cuba",
    "currency": "CUP",
    "region": "Americas",
    "flag": "🇨🇺"
  },
  {
    "code": "CY",
    "name": "Cyprus",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇨🇾"
  },
  {
    "code": "DJ",
    "name": "Djibouti",
    "currency": "DJF",
    "region": "Africa",
    "flag": "🇩🇯"
  },
  {
    "code": "DM",
    "name": "Dominica",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇩🇲"
  },
  {
    "code": "DO",
    "name": "Dominican Republic",
    "currency": "DOP",
    "region": "Americas",
    "flag": "🇩🇴"
  },
  {
    "code": "EC",
    "name": "Ecuador",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇪🇨"
  },
  {
    "code": "SV",
    "name": "El Salvador",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇸🇻"
  },
  {
    "code": "GQ",
    "name": "Equatorial Guinea",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇬🇶"
  },
  {
    "code": "ER",
    "name": "Eritrea",
    "currency": "ERN",
    "region": "Africa",
    "flag": "🇪🇷"
  },
  {
    "code": "EE",
    "name": "Estonia",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇪🇪"
  },
  {
    "code": "SZ",
    "name": "Eswatini",
    "currency": "SZL",
    "region": "Africa",
    "flag": "🇸🇿"
  },
  {
    "code": "ET",
    "name": "Ethiopia",
    "currency": "ETB",
    "region": "Africa",
    "flag": "🇪🇹"
  },
  {
    "code": "FJ",
    "name": "Fiji",
    "currency": "FJD",
    "region": "Asia & Pacific",
    "flag": "🇫🇯"
  },
  {
    "code": "GA",
    "name": "Gabon",
    "currency": "XAF",
    "region": "Africa",
    "flag": "🇬🇦"
  },
  {
    "code": "GM",
    "name": "Gambia",
    "currency": "GMD",
    "region": "Africa",
    "flag": "🇬🇲"
  },
  {
    "code": "GE",
    "name": "Georgia",
    "currency": "GEL",
    "region": "Asia & Pacific",
    "flag": "🇬🇪"
  },
  {
    "code": "GH",
    "name": "Ghana",
    "currency": "GHS",
    "region": "Africa",
    "flag": "🇬🇭"
  },
  {
    "code": "GI",
    "name": "Gibraltar",
    "currency": "GIP",
    "region": "Europe",
    "flag": "🇬🇮"
  },
  {
    "code": "GL",
    "name": "Greenland",
    "currency": "DKK",
    "region": "Americas",
    "flag": "🇬🇱"
  },
  {
    "code": "GD",
    "name": "Grenada",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇬🇩"
  },
  {
    "code": "GU",
    "name": "Guam",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇬🇺"
  },
  {
    "code": "GT",
    "name": "Guatemala",
    "currency": "GTQ",
    "region": "Americas",
    "flag": "🇬🇹"
  },
  {
    "code": "GG",
    "name": "Guernsey",
    "currency": "GBP",
    "region": "Europe",
    "flag": "🇬🇬"
  },
  {
    "code": "GN",
    "name": "Guinea",
    "currency": "GNF",
    "region": "Africa",
    "flag": "🇬🇳"
  },
  {
    "code": "GW",
    "name": "Guinea-Bissau",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇬🇼"
  },
  {
    "code": "GY",
    "name": "Guyana",
    "currency": "GYD",
    "region": "Americas",
    "flag": "🇬🇾"
  },
  {
    "code": "HT",
    "name": "Haiti",
    "currency": "HTG",
    "region": "Americas",
    "flag": "🇭🇹"
  },
  {
    "code": "HN",
    "name": "Honduras",
    "currency": "HNL",
    "region": "Americas",
    "flag": "🇭🇳"
  },
  {
    "code": "IS",
    "name": "Iceland",
    "currency": "ISK",
    "region": "Europe",
    "flag": "🇮🇸"
  },
  {
    "code": "IR",
    "name": "Iran",
    "currency": "IRR",
    "region": "Middle East",
    "flag": "🇮🇷"
  },
  {
    "code": "IQ",
    "name": "Iraq",
    "currency": "IQD",
    "region": "Middle East",
    "flag": "🇮🇶"
  },
  {
    "code": "IM",
    "name": "Isle of Man",
    "currency": "GBP",
    "region": "Europe",
    "flag": "🇮🇲"
  },
  {
    "code": "JM",
    "name": "Jamaica",
    "currency": "JMD",
    "region": "Americas",
    "flag": "🇯🇲"
  },
  {
    "code": "JE",
    "name": "Jersey",
    "currency": "GBP",
    "region": "Europe",
    "flag": "🇯🇪"
  },
  {
    "code": "JO",
    "name": "Jordan",
    "currency": "JOD",
    "region": "Middle East",
    "flag": "🇯🇴"
  },
  {
    "code": "KZ",
    "name": "Kazakhstan",
    "currency": "KZT",
    "region": "Asia & Pacific",
    "flag": "🇰🇿"
  },
  {
    "code": "KI",
    "name": "Kiribati",
    "currency": "AUD",
    "region": "Asia & Pacific",
    "flag": "🇰🇮"
  },
  {
    "code": "KG",
    "name": "Kyrgyzstan",
    "currency": "KGS",
    "region": "Asia & Pacific",
    "flag": "🇰🇬"
  },
  {
    "code": "LA",
    "name": "Laos",
    "currency": "LAK",
    "region": "Asia & Pacific",
    "flag": "🇱🇦"
  },
  {
    "code": "LV",
    "name": "Latvia",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇱🇻"
  },
  {
    "code": "LB",
    "name": "Lebanon",
    "currency": "LBP",
    "region": "Middle East",
    "flag": "🇱🇧"
  },
  {
    "code": "LS",
    "name": "Lesotho",
    "currency": "LSL",
    "region": "Africa",
    "flag": "🇱🇸"
  },
  {
    "code": "LR",
    "name": "Liberia",
    "currency": "LRD",
    "region": "Africa",
    "flag": "🇱🇷"
  },
  {
    "code": "LY",
    "name": "Libya",
    "currency": "LYD",
    "region": "Africa",
    "flag": "🇱🇾"
  },
  {
    "code": "LI",
    "name": "Liechtenstein",
    "currency": "CHF",
    "region": "Europe",
    "flag": "🇱🇮"
  },
  {
    "code": "LT",
    "name": "Lithuania",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇱🇹"
  },
  {
    "code": "LU",
    "name": "Luxembourg",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇱🇺"
  },
  {
    "code": "MO",
    "name": "Macau",
    "currency": "MOP",
    "region": "Asia & Pacific",
    "flag": "🇲🇴"
  },
  {
    "code": "MG",
    "name": "Madagascar",
    "currency": "MGA",
    "region": "Africa",
    "flag": "🇲🇬"
  },
  {
    "code": "MW",
    "name": "Malawi",
    "currency": "MWK",
    "region": "Africa",
    "flag": "🇲🇼"
  },
  {
    "code": "MY",
    "name": "Malaysia",
    "currency": "MYR",
    "region": "Asia & Pacific",
    "flag": "🇲🇾"
  },
  {
    "code": "MV",
    "name": "Maldives",
    "currency": "MVR",
    "region": "Asia & Pacific",
    "flag": "🇲🇻"
  },
  {
    "code": "ML",
    "name": "Mali",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇲🇱"
  },
  {
    "code": "MT",
    "name": "Malta",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇲🇹"
  },
  {
    "code": "MH",
    "name": "Marshall Islands",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇲🇭"
  },
  {
    "code": "MR",
    "name": "Mauritania",
    "currency": "MRU",
    "region": "Africa",
    "flag": "🇲🇷"
  },
  {
    "code": "MU",
    "name": "Mauritius",
    "currency": "MUR",
    "region": "Africa",
    "flag": "🇲🇺"
  },
  {
    "code": "FM",
    "name": "Micronesia",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇫🇲"
  },
  {
    "code": "MD",
    "name": "Moldova",
    "currency": "MDL",
    "region": "Europe",
    "flag": "🇲🇩"
  },
  {
    "code": "MC",
    "name": "Monaco",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇲🇨"
  },
  {
    "code": "MN",
    "name": "Mongolia",
    "currency": "MNT",
    "region": "Asia & Pacific",
    "flag": "🇲🇳"
  },
  {
    "code": "ME",
    "name": "Montenegro",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇲🇪"
  },
  {
    "code": "MA",
    "name": "Morocco",
    "currency": "MAD",
    "region": "Africa",
    "flag": "🇲🇦"
  },
  {
    "code": "MZ",
    "name": "Mozambique",
    "currency": "MZN",
    "region": "Africa",
    "flag": "🇲🇿"
  },
  {
    "code": "MM",
    "name": "Myanmar",
    "currency": "MMK",
    "region": "Asia & Pacific",
    "flag": "🇲🇲"
  },
  {
    "code": "NA",
    "name": "Namibia",
    "currency": "NAD",
    "region": "Africa",
    "flag": "🇳🇦"
  },
  {
    "code": "NR",
    "name": "Nauru",
    "currency": "AUD",
    "region": "Asia & Pacific",
    "flag": "🇳🇷"
  },
  {
    "code": "NI",
    "name": "Nicaragua",
    "currency": "NIO",
    "region": "Americas",
    "flag": "🇳🇮"
  },
  {
    "code": "NE",
    "name": "Niger",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇳🇪"
  },
  {
    "code": "MK",
    "name": "North Macedonia",
    "currency": "MKD",
    "region": "Europe",
    "flag": "🇲🇰"
  },
  {
    "code": "PW",
    "name": "Palau",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇵🇼"
  },
  {
    "code": "PS",
    "name": "Palestine",
    "currency": "ILS",
    "region": "Middle East",
    "flag": "🇵🇸"
  },
  {
    "code": "PA",
    "name": "Panama",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇵🇦"
  },
  {
    "code": "PG",
    "name": "Papua New Guinea",
    "currency": "PGK",
    "region": "Asia & Pacific",
    "flag": "🇵🇬"
  },
  {
    "code": "PY",
    "name": "Paraguay",
    "currency": "PYG",
    "region": "Americas",
    "flag": "🇵🇾"
  },
  {
    "code": "PR",
    "name": "Puerto Rico",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇵🇷"
  },
  {
    "code": "RU",
    "name": "Russia",
    "currency": "RUB",
    "region": "Europe",
    "flag": "🇷🇺"
  },
  {
    "code": "RW",
    "name": "Rwanda",
    "currency": "RWF",
    "region": "Africa",
    "flag": "🇷🇼"
  },
  {
    "code": "KN",
    "name": "Saint Kitts and Nevis",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇰🇳"
  },
  {
    "code": "LC",
    "name": "Saint Lucia",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇱🇨"
  },
  {
    "code": "VC",
    "name": "Saint Vincent and the Grenadines",
    "currency": "XCD",
    "region": "Americas",
    "flag": "🇻🇨"
  },
  {
    "code": "WS",
    "name": "Samoa",
    "currency": "WST",
    "region": "Asia & Pacific",
    "flag": "🇼🇸"
  },
  {
    "code": "SM",
    "name": "San Marino",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇸🇲"
  },
  {
    "code": "ST",
    "name": "São Tomé and Príncipe",
    "currency": "STN",
    "region": "Africa",
    "flag": "🇸🇹"
  },
  {
    "code": "SN",
    "name": "Senegal",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇸🇳"
  },
  {
    "code": "RS",
    "name": "Serbia",
    "currency": "RSD",
    "region": "Europe",
    "flag": "🇷🇸"
  },
  {
    "code": "SC",
    "name": "Seychelles",
    "currency": "SCR",
    "region": "Africa",
    "flag": "🇸🇨"
  },
  {
    "code": "SL",
    "name": "Sierra Leone",
    "currency": "SLE",
    "region": "Africa",
    "flag": "🇸🇱"
  },
  {
    "code": "SK",
    "name": "Slovakia",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇸🇰"
  },
  {
    "code": "SI",
    "name": "Slovenia",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇸🇮"
  },
  {
    "code": "SB",
    "name": "Solomon Islands",
    "currency": "SBD",
    "region": "Asia & Pacific",
    "flag": "🇸🇧"
  },
  {
    "code": "SO",
    "name": "Somalia",
    "currency": "SOS",
    "region": "Africa",
    "flag": "🇸🇴"
  },
  {
    "code": "SS",
    "name": "South Sudan",
    "currency": "SSP",
    "region": "Africa",
    "flag": "🇸🇸"
  },
  {
    "code": "SD",
    "name": "Sudan",
    "currency": "SDG",
    "region": "Africa",
    "flag": "🇸🇩"
  },
  {
    "code": "SR",
    "name": "Suriname",
    "currency": "SRD",
    "region": "Americas",
    "flag": "🇸🇷"
  },
  {
    "code": "SY",
    "name": "Syria",
    "currency": "SYP",
    "region": "Middle East",
    "flag": "🇸🇾"
  },
  {
    "code": "TJ",
    "name": "Tajikistan",
    "currency": "TJS",
    "region": "Asia & Pacific",
    "flag": "🇹🇯"
  },
  {
    "code": "TZ",
    "name": "Tanzania",
    "currency": "TZS",
    "region": "Africa",
    "flag": "🇹🇿"
  },
  {
    "code": "TL",
    "name": "Timor-Leste",
    "currency": "USD",
    "region": "Asia & Pacific",
    "flag": "🇹🇱"
  },
  {
    "code": "TG",
    "name": "Togo",
    "currency": "XOF",
    "region": "Africa",
    "flag": "🇹🇬"
  },
  {
    "code": "TO",
    "name": "Tonga",
    "currency": "TOP",
    "region": "Asia & Pacific",
    "flag": "🇹🇴"
  },
  {
    "code": "TT",
    "name": "Trinidad and Tobago",
    "currency": "TTD",
    "region": "Americas",
    "flag": "🇹🇹"
  },
  {
    "code": "TN",
    "name": "Tunisia",
    "currency": "TND",
    "region": "Africa",
    "flag": "🇹🇳"
  },
  {
    "code": "TM",
    "name": "Turkmenistan",
    "currency": "TMT",
    "region": "Asia & Pacific",
    "flag": "🇹🇲"
  },
  {
    "code": "TV",
    "name": "Tuvalu",
    "currency": "AUD",
    "region": "Asia & Pacific",
    "flag": "🇹🇻"
  },
  {
    "code": "UG",
    "name": "Uganda",
    "currency": "UGX",
    "region": "Africa",
    "flag": "🇺🇬"
  },
  {
    "code": "UA",
    "name": "Ukraine",
    "currency": "UAH",
    "region": "Europe",
    "flag": "🇺🇦"
  },
  {
    "code": "UY",
    "name": "Uruguay",
    "currency": "UYU",
    "region": "Americas",
    "flag": "🇺🇾"
  },
  {
    "code": "UZ",
    "name": "Uzbekistan",
    "currency": "UZS",
    "region": "Asia & Pacific",
    "flag": "🇺🇿"
  },
  {
    "code": "VU",
    "name": "Vanuatu",
    "currency": "VUV",
    "region": "Asia & Pacific",
    "flag": "🇻🇺"
  },
  {
    "code": "VA",
    "name": "Vatican City",
    "currency": "EUR",
    "region": "Europe",
    "flag": "🇻🇦"
  },
  {
    "code": "VE",
    "name": "Venezuela",
    "currency": "VES",
    "region": "Americas",
    "flag": "🇻🇪"
  },
  {
    "code": "VG",
    "name": "Virgin Islands (British)",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇻🇬"
  },
  {
    "code": "VI",
    "name": "Virgin Islands (U.S.)",
    "currency": "USD",
    "region": "Americas",
    "flag": "🇻🇮"
  },
  {
    "code": "YE",
    "name": "Yemen",
    "currency": "YER",
    "region": "Middle East",
    "flag": "🇾🇪"
  },
  {
    "code": "ZM",
    "name": "Zambia",
    "currency": "ZMW",
    "region": "Africa",
    "flag": "🇿🇲"
  },
  {
    "code": "ZW",
    "name": "Zimbabwe",
    "currency": "ZWG",
    "region": "Africa",
    "flag": "🇿🇼"
  }
];

export const POPULAR_COUNTRIES: Country[] = COUNTRIES.filter((c) => c.popular);

export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  "AED": {
    "code": "AED",
    "name": "United Arab Emirates Dirham",
    "symbol": "AED",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "AFN": {
    "code": "AFN",
    "name": "Afghan Afghani",
    "symbol": "AFN",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ALL": {
    "code": "ALL",
    "name": "Albanian Lek",
    "symbol": "ALL",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "AMD": {
    "code": "AMD",
    "name": "Armenian Dram",
    "symbol": "AMD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ANG": {
    "code": "ANG",
    "name": "Netherlands Antillean Guilder",
    "symbol": "ANG",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "AOA": {
    "code": "AOA",
    "name": "Angolan Kwanza",
    "symbol": "AOA",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ARS": {
    "code": "ARS",
    "name": "Argentine Peso",
    "symbol": "ARS",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "AUD": {
    "code": "AUD",
    "name": "Australian Dollar",
    "symbol": "A$",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "AWG": {
    "code": "AWG",
    "name": "Aruban Florin",
    "symbol": "AWG",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "AZN": {
    "code": "AZN",
    "name": "Azerbaijani Manat",
    "symbol": "AZN",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BAM": {
    "code": "BAM",
    "name": "Bosnia-Herzegovina Convertible Mark",
    "symbol": "BAM",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BBD": {
    "code": "BBD",
    "name": "Barbadian Dollar",
    "symbol": "BBD",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BDT": {
    "code": "BDT",
    "name": "Bangladeshi Taka",
    "symbol": "BDT",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "BGN": {
    "code": "BGN",
    "name": "Bulgarian Lev",
    "symbol": "BGN",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BHD": {
    "code": "BHD",
    "name": "Bahraini Dinar",
    "symbol": "BHD",
    "presets": [
      2000,
      5000,
      10000,
      25000,
      50000
    ],
    "minAmount": 500,
    "maxAmount": 100000,
    "step": 500,
    "defaultAmount": 10000
  },
  "BIF": {
    "code": "BIF",
    "name": "Burundian Franc",
    "symbol": "BIF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "BMD": {
    "code": "BMD",
    "name": "Bermudan Dollar",
    "symbol": "BMD",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "BND": {
    "code": "BND",
    "name": "Brunei Dollar",
    "symbol": "BND",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "BOB": {
    "code": "BOB",
    "name": "Bolivian Boliviano",
    "symbol": "BOB",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "BRL": {
    "code": "BRL",
    "name": "Brazilian Real",
    "symbol": "R$",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BSD": {
    "code": "BSD",
    "name": "Bahamian Dollar",
    "symbol": "BSD",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "BTN": {
    "code": "BTN",
    "name": "Bhutanese Ngultrum",
    "symbol": "BTN",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "BWP": {
    "code": "BWP",
    "name": "Botswanan Pula",
    "symbol": "BWP",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "BYN": {
    "code": "BYN",
    "name": "Belarusian Ruble",
    "symbol": "BYN",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "BZD": {
    "code": "BZD",
    "name": "Belize Dollar",
    "symbol": "BZD",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "CAD": {
    "code": "CAD",
    "name": "Canadian Dollar",
    "symbol": "CA$",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "CDF": {
    "code": "CDF",
    "name": "Congolese Franc",
    "symbol": "CDF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "CHF": {
    "code": "CHF",
    "name": "Swiss Franc",
    "symbol": "CHF",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "CLP": {
    "code": "CLP",
    "name": "Chilean Peso",
    "symbol": "CLP",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "CNY": {
    "code": "CNY",
    "name": "Chinese Yuan",
    "symbol": "CN¥",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "COP": {
    "code": "COP",
    "name": "Colombian Peso",
    "symbol": "COP",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "CRC": {
    "code": "CRC",
    "name": "Costa Rican Colón",
    "symbol": "CRC",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "CUP": {
    "code": "CUP",
    "name": "Cuban Peso",
    "symbol": "CUP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "CVE": {
    "code": "CVE",
    "name": "Cape Verdean Escudo",
    "symbol": "CVE",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "CZK": {
    "code": "CZK",
    "name": "Czech Koruna",
    "symbol": "CZK",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "DJF": {
    "code": "DJF",
    "name": "Djiboutian Franc",
    "symbol": "DJF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "DKK": {
    "code": "DKK",
    "name": "Danish Krone",
    "symbol": "DKK",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "DOP": {
    "code": "DOP",
    "name": "Dominican Peso",
    "symbol": "DOP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "DZD": {
    "code": "DZD",
    "name": "Algerian Dinar",
    "symbol": "DZD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "EGP": {
    "code": "EGP",
    "name": "Egyptian Pound",
    "symbol": "EGP",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "ERN": {
    "code": "ERN",
    "name": "Eritrean Nakfa",
    "symbol": "ERN",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ETB": {
    "code": "ETB",
    "name": "Ethiopian Birr",
    "symbol": "ETB",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "EUR": {
    "code": "EUR",
    "name": "Euro",
    "symbol": "€",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "FJD": {
    "code": "FJD",
    "name": "Fijian Dollar",
    "symbol": "FJD",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "GBP": {
    "code": "GBP",
    "name": "British Pound",
    "symbol": "£",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "GEL": {
    "code": "GEL",
    "name": "Georgian Lari",
    "symbol": "GEL",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "GHS": {
    "code": "GHS",
    "name": "Ghanaian Cedi",
    "symbol": "GHS",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "GIP": {
    "code": "GIP",
    "name": "Gibraltar Pound",
    "symbol": "GIP",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "GMD": {
    "code": "GMD",
    "name": "Gambian Dalasi",
    "symbol": "GMD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "GNF": {
    "code": "GNF",
    "name": "Guinean Franc",
    "symbol": "GNF",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "GTQ": {
    "code": "GTQ",
    "name": "Guatemalan Quetzal",
    "symbol": "GTQ",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "GYD": {
    "code": "GYD",
    "name": "Guyanaese Dollar",
    "symbol": "GYD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "HKD": {
    "code": "HKD",
    "name": "Hong Kong Dollar",
    "symbol": "HK$",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "HNL": {
    "code": "HNL",
    "name": "Honduran Lempira",
    "symbol": "HNL",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "HTG": {
    "code": "HTG",
    "name": "Haitian Gourde",
    "symbol": "HTG",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "HUF": {
    "code": "HUF",
    "name": "Hungarian Forint",
    "symbol": "HUF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "IDR": {
    "code": "IDR",
    "name": "Indonesian Rupiah",
    "symbol": "IDR",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "ILS": {
    "code": "ILS",
    "name": "Israeli New Shekel",
    "symbol": "₪",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "INR": {
    "code": "INR",
    "name": "Indian Rupee",
    "symbol": "₹",
    "presets": [
      100000,
      500000,
      1000000,
      2500000,
      5000000
    ],
    "minAmount": 50000,
    "maxAmount": 20000000,
    "step": 50000,
    "defaultAmount": 1000000
  },
  "IQD": {
    "code": "IQD",
    "name": "Iraqi Dinar",
    "symbol": "IQD",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "IRR": {
    "code": "IRR",
    "name": "Iranian Rial",
    "symbol": "IRR",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "ISK": {
    "code": "ISK",
    "name": "Icelandic Króna",
    "symbol": "ISK",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "JMD": {
    "code": "JMD",
    "name": "Jamaican Dollar",
    "symbol": "JMD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "JOD": {
    "code": "JOD",
    "name": "Jordanian Dinar",
    "symbol": "JOD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "JPY": {
    "code": "JPY",
    "name": "Japanese Yen",
    "symbol": "¥",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "KES": {
    "code": "KES",
    "name": "Kenyan Shilling",
    "symbol": "KES",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "KGS": {
    "code": "KGS",
    "name": "Kyrgyz Som",
    "symbol": "KGS",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "KHR": {
    "code": "KHR",
    "name": "Cambodian Riel",
    "symbol": "KHR",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "KMF": {
    "code": "KMF",
    "name": "Comorian Franc",
    "symbol": "KMF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "KRW": {
    "code": "KRW",
    "name": "South Korean Won",
    "symbol": "₩",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "KWD": {
    "code": "KWD",
    "name": "Kuwaiti Dinar",
    "symbol": "KWD",
    "presets": [
      2000,
      5000,
      10000,
      25000,
      50000
    ],
    "minAmount": 500,
    "maxAmount": 100000,
    "step": 500,
    "defaultAmount": 10000
  },
  "KYD": {
    "code": "KYD",
    "name": "Cayman Islands Dollar",
    "symbol": "KYD",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "KZT": {
    "code": "KZT",
    "name": "Kazakhstani Tenge",
    "symbol": "KZT",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "LAK": {
    "code": "LAK",
    "name": "Laotian Kip",
    "symbol": "LAK",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "LBP": {
    "code": "LBP",
    "name": "Lebanese Pound",
    "symbol": "LBP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "LKR": {
    "code": "LKR",
    "name": "Sri Lankan Rupee",
    "symbol": "LKR",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "LRD": {
    "code": "LRD",
    "name": "Liberian Dollar",
    "symbol": "LRD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "LSL": {
    "code": "LSL",
    "name": "Lesotho Loti",
    "symbol": "LSL",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "LYD": {
    "code": "LYD",
    "name": "Libyan Dinar",
    "symbol": "LYD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MAD": {
    "code": "MAD",
    "name": "Moroccan Dirham",
    "symbol": "MAD",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "MDL": {
    "code": "MDL",
    "name": "Moldovan Leu",
    "symbol": "MDL",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "MGA": {
    "code": "MGA",
    "name": "Malagasy Ariary",
    "symbol": "MGA",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "MKD": {
    "code": "MKD",
    "name": "Macedonian Denar",
    "symbol": "MKD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MMK": {
    "code": "MMK",
    "name": "Myanmar Kyat",
    "symbol": "MMK",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MNT": {
    "code": "MNT",
    "name": "Mongolian Tugrik",
    "symbol": "MNT",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "MOP": {
    "code": "MOP",
    "name": "Macanese Pataca",
    "symbol": "MOP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MRU": {
    "code": "MRU",
    "name": "Mauritanian Ouguiya",
    "symbol": "MRU",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MUR": {
    "code": "MUR",
    "name": "Mauritian Rupee",
    "symbol": "MUR",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MVR": {
    "code": "MVR",
    "name": "Maldivian Rufiyaa",
    "symbol": "MVR",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "MWK": {
    "code": "MWK",
    "name": "Malawian Kwacha",
    "symbol": "MWK",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "MXN": {
    "code": "MXN",
    "name": "Mexican Peso",
    "symbol": "MX$",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "MYR": {
    "code": "MYR",
    "name": "Malaysian Ringgit",
    "symbol": "MYR",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "MZN": {
    "code": "MZN",
    "name": "Mozambican Metical",
    "symbol": "MZN",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "NAD": {
    "code": "NAD",
    "name": "Namibian Dollar",
    "symbol": "NAD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "NGN": {
    "code": "NGN",
    "name": "Nigerian Naira",
    "symbol": "NGN",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "NIO": {
    "code": "NIO",
    "name": "Nicaraguan Córdoba",
    "symbol": "NIO",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "NOK": {
    "code": "NOK",
    "name": "Norwegian Krone",
    "symbol": "NOK",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "NPR": {
    "code": "NPR",
    "name": "Nepalese Rupee",
    "symbol": "NPR",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "NZD": {
    "code": "NZD",
    "name": "New Zealand Dollar",
    "symbol": "NZ$",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "OMR": {
    "code": "OMR",
    "name": "Omani Rial",
    "symbol": "OMR",
    "presets": [
      2000,
      5000,
      10000,
      25000,
      50000
    ],
    "minAmount": 500,
    "maxAmount": 100000,
    "step": 500,
    "defaultAmount": 10000
  },
  "PAB": {
    "code": "PAB",
    "name": "Panamanian Balboa",
    "symbol": "PAB",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "PEN": {
    "code": "PEN",
    "name": "Peruvian Sol",
    "symbol": "PEN",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "PGK": {
    "code": "PGK",
    "name": "Papua New Guinean Kina",
    "symbol": "PGK",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "PHP": {
    "code": "PHP",
    "name": "Philippine Peso",
    "symbol": "₱",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "PKR": {
    "code": "PKR",
    "name": "Pakistani Rupee",
    "symbol": "PKR",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "PLN": {
    "code": "PLN",
    "name": "Polish Zloty",
    "symbol": "PLN",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "PYG": {
    "code": "PYG",
    "name": "Paraguayan Guarani",
    "symbol": "PYG",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "QAR": {
    "code": "QAR",
    "name": "Qatari Riyal",
    "symbol": "QAR",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "RON": {
    "code": "RON",
    "name": "Romanian Leu",
    "symbol": "RON",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "RSD": {
    "code": "RSD",
    "name": "Serbian Dinar",
    "symbol": "RSD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "RUB": {
    "code": "RUB",
    "name": "Russian Ruble",
    "symbol": "RUB",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "RWF": {
    "code": "RWF",
    "name": "Rwandan Franc",
    "symbol": "RWF",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "SAR": {
    "code": "SAR",
    "name": "Saudi Riyal",
    "symbol": "SAR",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "SBD": {
    "code": "SBD",
    "name": "Solomon Islands Dollar",
    "symbol": "SBD",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "SCR": {
    "code": "SCR",
    "name": "Seychellois Rupee",
    "symbol": "SCR",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "SDG": {
    "code": "SDG",
    "name": "Sudanese Pound",
    "symbol": "SDG",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "SEK": {
    "code": "SEK",
    "name": "Swedish Krona",
    "symbol": "SEK",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "SGD": {
    "code": "SGD",
    "name": "Singapore Dollar",
    "symbol": "SGD",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "SLE": {
    "code": "SLE",
    "name": "Sierra Leonean Leone",
    "symbol": "SLE",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "SLL": {
    "code": "SLL",
    "name": "Sierra Leonean Leone (1964—2022)",
    "symbol": "SLL",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "SOS": {
    "code": "SOS",
    "name": "Somali Shilling",
    "symbol": "SOS",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "SRD": {
    "code": "SRD",
    "name": "Surinamese Dollar",
    "symbol": "SRD",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "SSP": {
    "code": "SSP",
    "name": "South Sudanese Pound",
    "symbol": "SSP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "STN": {
    "code": "STN",
    "name": "São Tomé & Príncipe Dobra",
    "symbol": "STN",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "SYP": {
    "code": "SYP",
    "name": "Syrian Pound",
    "symbol": "SYP",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "SZL": {
    "code": "SZL",
    "name": "Swazi Lilangeni",
    "symbol": "SZL",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "THB": {
    "code": "THB",
    "name": "Thai Baht",
    "symbol": "THB",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "TJS": {
    "code": "TJS",
    "name": "Tajikistani Somoni",
    "symbol": "TJS",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "TMT": {
    "code": "TMT",
    "name": "Turkmenistani Manat",
    "symbol": "TMT",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "TND": {
    "code": "TND",
    "name": "Tunisian Dinar",
    "symbol": "TND",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "TOP": {
    "code": "TOP",
    "name": "Tongan Paʻanga",
    "symbol": "TOP",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "TRY": {
    "code": "TRY",
    "name": "Turkish Lira",
    "symbol": "TRY",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "TTD": {
    "code": "TTD",
    "name": "Trinidad & Tobago Dollar",
    "symbol": "TTD",
    "presets": [
      20000,
      50000,
      100000,
      250000,
      500000
    ],
    "minAmount": 5000,
    "maxAmount": 1000000,
    "step": 5000,
    "defaultAmount": 100000
  },
  "TWD": {
    "code": "TWD",
    "name": "New Taiwan Dollar",
    "symbol": "NT$",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "TZS": {
    "code": "TZS",
    "name": "Tanzanian Shilling",
    "symbol": "TZS",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "UAH": {
    "code": "UAH",
    "name": "Ukrainian Hryvnia",
    "symbol": "UAH",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "UGX": {
    "code": "UGX",
    "name": "Ugandan Shilling",
    "symbol": "UGX",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "USD": {
    "code": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "presets": [
      5000,
      10000,
      25000,
      50000,
      100000
    ],
    "minAmount": 1000,
    "maxAmount": 250000,
    "step": 1000,
    "defaultAmount": 25000
  },
  "UYU": {
    "code": "UYU",
    "name": "Uruguayan Peso",
    "symbol": "UYU",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "UZS": {
    "code": "UZS",
    "name": "Uzbekistani Som",
    "symbol": "UZS",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "VES": {
    "code": "VES",
    "name": "Venezuelan Bolívar",
    "symbol": "VES",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "VND": {
    "code": "VND",
    "name": "Vietnamese Dong",
    "symbol": "₫",
    "presets": [
      50000000,
      100000000,
      250000000,
      500000000,
      1000000000
    ],
    "minAmount": 10000000,
    "maxAmount": 2500000000,
    "step": 10000000,
    "defaultAmount": 250000000
  },
  "VUV": {
    "code": "VUV",
    "name": "Vanuatu Vatu",
    "symbol": "VUV",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "WST": {
    "code": "WST",
    "name": "Samoan Tala",
    "symbol": "WST",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "XAF": {
    "code": "XAF",
    "name": "Central African CFA Franc",
    "symbol": "FCFA",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "XCD": {
    "code": "XCD",
    "name": "East Caribbean Dollar",
    "symbol": "EC$",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "XOF": {
    "code": "XOF",
    "name": "West African CFA Franc",
    "symbol": "F CFA",
    "presets": [
      500000,
      1000000,
      2500000,
      5000000,
      10000000
    ],
    "minAmount": 100000,
    "maxAmount": 30000000,
    "step": 100000,
    "defaultAmount": 2500000
  },
  "XPF": {
    "code": "XPF",
    "name": "CFP Franc",
    "symbol": "CFPF",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "YER": {
    "code": "YER",
    "name": "Yemeni Rial",
    "symbol": "YER",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ZAR": {
    "code": "ZAR",
    "name": "South African Rand",
    "symbol": "ZAR",
    "presets": [
      30000,
      75000,
      150000,
      300000,
      750000
    ],
    "minAmount": 10000,
    "maxAmount": 2500000,
    "step": 10000,
    "defaultAmount": 150000
  },
  "ZMW": {
    "code": "ZMW",
    "name": "Zambian Kwacha",
    "symbol": "ZMW",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  },
  "ZWG": {
    "code": "ZWG",
    "name": "Zimbabwean Gold",
    "symbol": "ZWG",
    "presets": [
      100000,
      250000,
      500000,
      1000000,
      2500000
    ],
    "minAmount": 25000,
    "maxAmount": 10000000,
    "step": 25000,
    "defaultAmount": 500000
  }
};

export const ALL_ACTIVE_CURRENCIES: CurrencyConfig[] = Object.values(CURRENCY_CONFIGS).sort((a, b) => a.code.localeCompare(b.code));

export function getCurrencyConfig(currencyCode: string): CurrencyConfig {
  if (CURRENCY_CONFIGS[currencyCode]) {
    return CURRENCY_CONFIGS[currencyCode];
  }
  let symbol = currencyCode;
  let name = currencyCode;
  try {
    const parts = new Intl.NumberFormat("en-US", { style: "currency", currency: currencyCode }).formatToParts(1);
    symbol = parts.find((p) => p.type === "currency")?.value || currencyCode;
    name = new Intl.DisplayNames(["en"], { type: "currency" }).of(currencyCode) || currencyCode;
  } catch {}

  return {
    code: currencyCode,
    name,
    symbol,
    presets: [5000, 10000, 25000, 50000, 100000],
    minAmount: 1000,
    maxAmount: 250000,
    step: 1000,
    defaultAmount: 25000,
  };
}

export function formatCurrencyAmount(
  amount: number,
  currencyCode: string,
  locale = "en-US"
): string {
  try {
    const loc = currencyCode === "INR" ? "en-IN" : locale;
    return new Intl.NumberFormat(loc, {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currencyCode} ${amount.toLocaleString()}`;
  }
}

export function formatPresetLabel(amount: number, currencyCode: string): string {
  if (currencyCode === "INR") {
    if (amount >= 10000000) return `₹${amount / 10000000} Cr`;
    if (amount >= 100000) return `₹${amount / 100000} Lakh${amount > 100000 ? "s" : ""}`;
    return `₹${amount.toLocaleString("en-IN")}`;
  }
  const config = getCurrencyConfig(currencyCode);
  const sym = config.symbol;
  if (amount >= 1000000000) return `${sym}${(amount / 1000000000).toFixed(0)}B`;
  if (amount >= 1000000) return `${sym}${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `${sym}${(amount / 1000).toFixed(0)}k`;
  return formatCurrencyAmount(amount, currencyCode);
}
