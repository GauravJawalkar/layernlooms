/**
 * Complete Worldwide Currencies & Countries Dataset for LayerNlooms Partner Commission Calculator
 * Supports all active ISO 4217 currencies and territories across all 6 continents.
 */

export interface WorldCurrency {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencyName: string;
  currencySymbol: string;
  flag: string;
  displayLabel: string;
  searchIndex: string;
}

export const WORLD_CURRENCIES: WorldCurrency[] = [
  {
    "countryCode": "IN",
    "countryName": "India",
    "currencyCode": "INR",
    "currencyName": "Indian Rupee",
    "currencySymbol": "₹",
    "flag": "🇮🇳",
    "displayLabel": "🇮🇳 India – Indian Rupee (INR ₹)",
    "searchIndex": "india indian rupee inr ₹"
  },
  {
    "countryCode": "US",
    "countryName": "United States",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇺🇸",
    "displayLabel": "🇺🇸 United States – US Dollar (USD $)",
    "searchIndex": "united states us dollar usd $"
  },
  {
    "countryCode": "GB",
    "countryName": "United Kingdom",
    "currencyCode": "GBP",
    "currencyName": "British Pound",
    "currencySymbol": "£",
    "flag": "🇬🇧",
    "displayLabel": "🇬🇧 United Kingdom – British Pound (GBP £)",
    "searchIndex": "united kingdom british pound gbp £"
  },
  {
    "countryCode": "EU",
    "countryName": "European Union",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇪🇺",
    "displayLabel": "🇪🇺 European Union – Euro (EUR €)",
    "searchIndex": "european union euro eur €"
  },
  {
    "countryCode": "AE",
    "countryName": "United Arab Emirates",
    "currencyCode": "AED",
    "currencyName": "UAE Dirham",
    "currencySymbol": "د.إ",
    "flag": "🇦🇪",
    "displayLabel": "🇦🇪 United Arab Emirates – UAE Dirham (AED د.إ)",
    "searchIndex": "united arab emirates uae dirham aed د.إ"
  },
  {
    "countryCode": "CA",
    "countryName": "Canada",
    "currencyCode": "CAD",
    "currencyName": "Canadian Dollar",
    "currencySymbol": "CA$",
    "flag": "🇨🇦",
    "displayLabel": "🇨🇦 Canada – Canadian Dollar (CAD CA$)",
    "searchIndex": "canada canadian dollar cad ca$"
  },
  {
    "countryCode": "AU",
    "countryName": "Australia",
    "currencyCode": "AUD",
    "currencyName": "Australian Dollar",
    "currencySymbol": "A$",
    "flag": "🇦🇺",
    "displayLabel": "🇦🇺 Australia – Australian Dollar (AUD A$)",
    "searchIndex": "australia australian dollar aud a$"
  },
  {
    "countryCode": "SG",
    "countryName": "Singapore",
    "currencyCode": "SGD",
    "currencyName": "Singapore Dollar",
    "currencySymbol": "S$",
    "flag": "🇸🇬",
    "displayLabel": "🇸🇬 Singapore – Singapore Dollar (SGD S$)",
    "searchIndex": "singapore singapore dollar sgd s$"
  },
  {
    "countryCode": "SA",
    "countryName": "Saudi Arabia",
    "currencyCode": "SAR",
    "currencyName": "Saudi Riyal",
    "currencySymbol": "ر.س",
    "flag": "🇸🇦",
    "displayLabel": "🇸🇦 Saudi Arabia – Saudi Riyal (SAR ر.س)",
    "searchIndex": "saudi arabia saudi riyal sar ر.س"
  },
  {
    "countryCode": "DE",
    "countryName": "Germany",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇩🇪",
    "displayLabel": "🇩🇪 Germany – Euro (EUR €)",
    "searchIndex": "germany euro eur €"
  },
  {
    "countryCode": "JP",
    "countryName": "Japan",
    "currencyCode": "JPY",
    "currencyName": "Japanese Yen",
    "currencySymbol": "¥",
    "flag": "🇯🇵",
    "displayLabel": "🇯🇵 Japan – Japanese Yen (JPY ¥)",
    "searchIndex": "japan japanese yen jpy ¥"
  },
  {
    "countryCode": "CH",
    "countryName": "Switzerland",
    "currencyCode": "CHF",
    "currencyName": "Swiss Franc",
    "currencySymbol": "CHF",
    "flag": "🇨🇭",
    "displayLabel": "🇨🇭 Switzerland – Swiss Franc (CHF CHF)",
    "searchIndex": "switzerland swiss franc chf chf"
  },
  {
    "countryCode": "CN",
    "countryName": "China",
    "currencyCode": "CNY",
    "currencyName": "Chinese Yuan",
    "currencySymbol": "¥",
    "flag": "🇨🇳",
    "displayLabel": "🇨🇳 China – Chinese Yuan (CNY ¥)",
    "searchIndex": "china chinese yuan cny ¥"
  },
  {
    "countryCode": "FR",
    "countryName": "France",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇫🇷",
    "displayLabel": "🇫🇷 France – Euro (EUR €)",
    "searchIndex": "france euro eur €"
  },
  {
    "countryCode": "NL",
    "countryName": "Netherlands",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇳🇱",
    "displayLabel": "🇳🇱 Netherlands – Euro (EUR €)",
    "searchIndex": "netherlands euro eur €"
  },
  {
    "countryCode": "QA",
    "countryName": "Qatar",
    "currencyCode": "QAR",
    "currencyName": "Qatari Riyal",
    "currencySymbol": "ر.ق",
    "flag": "🇶🇦",
    "displayLabel": "🇶🇦 Qatar – Qatari Riyal (QAR ر.ق)",
    "searchIndex": "qatar qatari riyal qar ر.ق"
  },
  {
    "countryCode": "KW",
    "countryName": "Kuwait",
    "currencyCode": "KWD",
    "currencyName": "Kuwaiti Dinar",
    "currencySymbol": "د.ك",
    "flag": "🇰🇼",
    "displayLabel": "🇰🇼 Kuwait – Kuwaiti Dinar (KWD د.ك)",
    "searchIndex": "kuwait kuwaiti dinar kwd د.ك"
  },
  {
    "countryCode": "BH",
    "countryName": "Bahrain",
    "currencyCode": "BHD",
    "currencyName": "Bahraini Dinar",
    "currencySymbol": ".د.ب",
    "flag": "🇧🇭",
    "displayLabel": "🇧🇭 Bahrain – Bahraini Dinar (BHD .د.ب)",
    "searchIndex": "bahrain bahraini dinar bhd .د.ب"
  },
  {
    "countryCode": "OM",
    "countryName": "Oman",
    "currencyCode": "OMR",
    "currencyName": "Omani Rial",
    "currencySymbol": "ر.ع.",
    "flag": "🇴🇲",
    "displayLabel": "🇴🇲 Oman – Omani Rial (OMR ر.ع.)",
    "searchIndex": "oman omani rial omr ر.ع."
  },
  {
    "countryCode": "NZ",
    "countryName": "New Zealand",
    "currencyCode": "NZD",
    "currencyName": "New Zealand Dollar",
    "currencySymbol": "NZ$",
    "flag": "🇳🇿",
    "displayLabel": "🇳🇿 New Zealand – New Zealand Dollar (NZD NZ$)",
    "searchIndex": "new zealand new zealand dollar nzd nz$"
  },
  {
    "countryCode": "IE",
    "countryName": "Ireland",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇮🇪",
    "displayLabel": "🇮🇪 Ireland – Euro (EUR €)",
    "searchIndex": "ireland euro eur €"
  },
  {
    "countryCode": "SE",
    "countryName": "Sweden",
    "currencyCode": "SEK",
    "currencyName": "Swedish Krona",
    "currencySymbol": "kr",
    "flag": "🇸🇪",
    "displayLabel": "🇸🇪 Sweden – Swedish Krona (SEK kr)",
    "searchIndex": "sweden swedish krona sek kr"
  },
  {
    "countryCode": "NO",
    "countryName": "Norway",
    "currencyCode": "NOK",
    "currencyName": "Norwegian Krone",
    "currencySymbol": "kr",
    "flag": "🇳🇴",
    "displayLabel": "🇳🇴 Norway – Norwegian Krone (NOK kr)",
    "searchIndex": "norway norwegian krone nok kr"
  },
  {
    "countryCode": "DK",
    "countryName": "Denmark",
    "currencyCode": "DKK",
    "currencyName": "Danish Krone",
    "currencySymbol": "kr",
    "flag": "🇩🇰",
    "displayLabel": "🇩🇰 Denmark – Danish Krone (DKK kr)",
    "searchIndex": "denmark danish krone dkk kr"
  },
  {
    "countryCode": "ZA",
    "countryName": "South Africa",
    "currencyCode": "ZAR",
    "currencyName": "South African Rand",
    "currencySymbol": "R",
    "flag": "🇿🇦",
    "displayLabel": "🇿🇦 South Africa – South African Rand (ZAR R)",
    "searchIndex": "south africa south african rand zar r"
  },
  {
    "countryCode": "MY",
    "countryName": "Malaysia",
    "currencyCode": "MYR",
    "currencyName": "Malaysian Ringgit",
    "currencySymbol": "RM",
    "flag": "🇲🇾",
    "displayLabel": "🇲🇾 Malaysia – Malaysian Ringgit (MYR RM)",
    "searchIndex": "malaysia malaysian ringgit myr rm"
  },
  {
    "countryCode": "ID",
    "countryName": "Indonesia",
    "currencyCode": "IDR",
    "currencyName": "Indonesian Rupiah",
    "currencySymbol": "Rp",
    "flag": "🇮🇩",
    "displayLabel": "🇮🇩 Indonesia – Indonesian Rupiah (IDR Rp)",
    "searchIndex": "indonesia indonesian rupiah idr rp"
  },
  {
    "countryCode": "TH",
    "countryName": "Thailand",
    "currencyCode": "THB",
    "currencyName": "Thai Baht",
    "currencySymbol": "฿",
    "flag": "🇹🇭",
    "displayLabel": "🇹🇭 Thailand – Thai Baht (THB ฿)",
    "searchIndex": "thailand thai baht thb ฿"
  },
  {
    "countryCode": "PH",
    "countryName": "Philippines",
    "currencyCode": "PHP",
    "currencyName": "Philippine Peso",
    "currencySymbol": "₱",
    "flag": "🇵🇭",
    "displayLabel": "🇵🇭 Philippines – Philippine Peso (PHP ₱)",
    "searchIndex": "philippines philippine peso php ₱"
  },
  {
    "countryCode": "VN",
    "countryName": "Vietnam",
    "currencyCode": "VND",
    "currencyName": "Vietnamese Dong",
    "currencySymbol": "₫",
    "flag": "🇻🇳",
    "displayLabel": "🇻🇳 Vietnam – Vietnamese Dong (VND ₫)",
    "searchIndex": "vietnam vietnamese dong vnd ₫"
  },
  {
    "countryCode": "KR",
    "countryName": "South Korea",
    "currencyCode": "KRW",
    "currencyName": "South Korean Won",
    "currencySymbol": "₩",
    "flag": "🇰🇷",
    "displayLabel": "🇰🇷 South Korea – South Korean Won (KRW ₩)",
    "searchIndex": "south korea south korean won krw ₩"
  },
  {
    "countryCode": "HK",
    "countryName": "Hong Kong",
    "currencyCode": "HKD",
    "currencyName": "Hong Kong Dollar",
    "currencySymbol": "HK$",
    "flag": "🇭🇰",
    "displayLabel": "🇭🇰 Hong Kong – Hong Kong Dollar (HKD HK$)",
    "searchIndex": "hong kong hong kong dollar hkd hk$"
  },
  {
    "countryCode": "TW",
    "countryName": "Taiwan",
    "currencyCode": "TWD",
    "currencyName": "New Taiwan Dollar",
    "currencySymbol": "NT$",
    "flag": "🇹🇼",
    "displayLabel": "🇹🇼 Taiwan – New Taiwan Dollar (TWD NT$)",
    "searchIndex": "taiwan new taiwan dollar twd nt$"
  },
  {
    "countryCode": "IL",
    "countryName": "Israel",
    "currencyCode": "ILS",
    "currencyName": "Israeli New Shekel",
    "currencySymbol": "₪",
    "flag": "🇮🇱",
    "displayLabel": "🇮🇱 Israel – Israeli New Shekel (ILS ₪)",
    "searchIndex": "israel israeli new shekel ils ₪"
  },
  {
    "countryCode": "TR",
    "countryName": "Turkey",
    "currencyCode": "TRY",
    "currencyName": "Turkish Lira",
    "currencySymbol": "₺",
    "flag": "🇹🇷",
    "displayLabel": "🇹🇷 Turkey – Turkish Lira (TRY ₺)",
    "searchIndex": "turkey turkish lira try ₺"
  },
  {
    "countryCode": "BR",
    "countryName": "Brazil",
    "currencyCode": "BRL",
    "currencyName": "Brazilian Real",
    "currencySymbol": "R$",
    "flag": "🇧🇷",
    "displayLabel": "🇧🇷 Brazil – Brazilian Real (BRL R$)",
    "searchIndex": "brazil brazilian real brl r$"
  },
  {
    "countryCode": "MX",
    "countryName": "Mexico",
    "currencyCode": "MXN",
    "currencyName": "Mexican Peso",
    "currencySymbol": "$",
    "flag": "🇲🇽",
    "displayLabel": "🇲🇽 Mexico – Mexican Peso (MXN $)",
    "searchIndex": "mexico mexican peso mxn $"
  },
  {
    "countryCode": "EG",
    "countryName": "Egypt",
    "currencyCode": "EGP",
    "currencyName": "Egyptian Pound",
    "currencySymbol": "E£",
    "flag": "🇪🇬",
    "displayLabel": "🇪🇬 Egypt – Egyptian Pound (EGP E£)",
    "searchIndex": "egypt egyptian pound egp e£"
  },
  {
    "countryCode": "NG",
    "countryName": "Nigeria",
    "currencyCode": "NGN",
    "currencyName": "Nigerian Naira",
    "currencySymbol": "₦",
    "flag": "🇳🇬",
    "displayLabel": "🇳🇬 Nigeria – Nigerian Naira (NGN ₦)",
    "searchIndex": "nigeria nigerian naira ngn ₦"
  },
  {
    "countryCode": "KE",
    "countryName": "Kenya",
    "currencyCode": "KES",
    "currencyName": "Kenyan Shilling",
    "currencySymbol": "KSh",
    "flag": "🇰🇪",
    "displayLabel": "🇰🇪 Kenya – Kenyan Shilling (KES KSh)",
    "searchIndex": "kenya kenyan shilling kes ksh"
  },
  {
    "countryCode": "GH",
    "countryName": "Ghana",
    "currencyCode": "GHS",
    "currencyName": "Ghanaian Cedi",
    "currencySymbol": "GH₵",
    "flag": "🇬🇭",
    "displayLabel": "🇬🇭 Ghana – Ghanaian Cedi (GHS GH₵)",
    "searchIndex": "ghana ghanaian cedi ghs gh₵"
  },
  {
    "countryCode": "BD",
    "countryName": "Bangladesh",
    "currencyCode": "BDT",
    "currencyName": "Bangladeshi Taka",
    "currencySymbol": "৳",
    "flag": "🇧🇩",
    "displayLabel": "🇧🇩 Bangladesh – Bangladeshi Taka (BDT ৳)",
    "searchIndex": "bangladesh bangladeshi taka bdt ৳"
  },
  {
    "countryCode": "PK",
    "countryName": "Pakistan",
    "currencyCode": "PKR",
    "currencyName": "Pakistani Rupee",
    "currencySymbol": "₨",
    "flag": "🇵🇰",
    "displayLabel": "🇵🇰 Pakistan – Pakistani Rupee (PKR ₨)",
    "searchIndex": "pakistan pakistani rupee pkr ₨"
  },
  {
    "countryCode": "LK",
    "countryName": "Sri Lanka",
    "currencyCode": "LKR",
    "currencyName": "Sri Lankan Rupee",
    "currencySymbol": "₨",
    "flag": "🇱🇰",
    "displayLabel": "🇱🇰 Sri Lanka – Sri Lankan Rupee (LKR ₨)",
    "searchIndex": "sri lanka sri lankan rupee lkr ₨"
  },
  {
    "countryCode": "NP",
    "countryName": "Nepal",
    "currencyCode": "NPR",
    "currencyName": "Nepalese Rupee",
    "currencySymbol": "₨",
    "flag": "🇳🇵",
    "displayLabel": "🇳🇵 Nepal – Nepalese Rupee (NPR ₨)",
    "searchIndex": "nepal nepalese rupee npr ₨"
  },
  {
    "countryCode": "AL",
    "countryName": "Albania",
    "currencyCode": "ALL",
    "currencyName": "Albanian Lek",
    "currencySymbol": "L",
    "flag": "🇦🇱",
    "displayLabel": "🇦🇱 Albania – Albanian Lek (ALL L)",
    "searchIndex": "albania albanian lek all l"
  },
  {
    "countryCode": "AD",
    "countryName": "Andorra",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇦🇩",
    "displayLabel": "🇦🇩 Andorra – Euro (EUR €)",
    "searchIndex": "andorra euro eur €"
  },
  {
    "countryCode": "AM",
    "countryName": "Armenia",
    "currencyCode": "AMD",
    "currencyName": "Armenian Dram",
    "currencySymbol": "֏",
    "flag": "🇦🇲",
    "displayLabel": "🇦🇲 Armenia – Armenian Dram (AMD ֏)",
    "searchIndex": "armenia armenian dram amd ֏"
  },
  {
    "countryCode": "AT",
    "countryName": "Austria",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇦🇹",
    "displayLabel": "🇦🇹 Austria – Euro (EUR €)",
    "searchIndex": "austria euro eur €"
  },
  {
    "countryCode": "AZ",
    "countryName": "Azerbaijan",
    "currencyCode": "AZN",
    "currencyName": "Azerbaijani Manat",
    "currencySymbol": "₼",
    "flag": "🇦🇿",
    "displayLabel": "🇦🇿 Azerbaijan – Azerbaijani Manat (AZN ₼)",
    "searchIndex": "azerbaijan azerbaijani manat azn ₼"
  },
  {
    "countryCode": "BY",
    "countryName": "Belarus",
    "currencyCode": "BYN",
    "currencyName": "Belarusian Ruble",
    "currencySymbol": "Br",
    "flag": "🇧🇾",
    "displayLabel": "🇧🇾 Belarus – Belarusian Ruble (BYN Br)",
    "searchIndex": "belarus belarusian ruble byn br"
  },
  {
    "countryCode": "BE",
    "countryName": "Belgium",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇧🇪",
    "displayLabel": "🇧🇪 Belgium – Euro (EUR €)",
    "searchIndex": "belgium euro eur €"
  },
  {
    "countryCode": "BA",
    "countryName": "Bosnia and Herzegovina",
    "currencyCode": "BAM",
    "currencyName": "Bosnia-Herzegovina Convertible Mark",
    "currencySymbol": "KM",
    "flag": "🇧🇦",
    "displayLabel": "🇧🇦 Bosnia and Herzegovina – Bosnia-Herzegovina Convertible Mark (BAM KM)",
    "searchIndex": "bosnia and herzegovina bosnia-herzegovina convertible mark bam km"
  },
  {
    "countryCode": "BG",
    "countryName": "Bulgaria",
    "currencyCode": "BGN",
    "currencyName": "Bulgarian Lev",
    "currencySymbol": "лв",
    "flag": "🇧🇬",
    "displayLabel": "🇧🇬 Bulgaria – Bulgarian Lev (BGN лв)",
    "searchIndex": "bulgaria bulgarian lev bgn лв"
  },
  {
    "countryCode": "HR",
    "countryName": "Croatia",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇭🇷",
    "displayLabel": "🇭🇷 Croatia – Euro (EUR €)",
    "searchIndex": "croatia euro eur €"
  },
  {
    "countryCode": "CY",
    "countryName": "Cyprus",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇨🇾",
    "displayLabel": "🇨🇾 Cyprus – Euro (EUR €)",
    "searchIndex": "cyprus euro eur €"
  },
  {
    "countryCode": "CZ",
    "countryName": "Czech Republic",
    "currencyCode": "CZK",
    "currencyName": "Czech Koruna",
    "currencySymbol": "Kč",
    "flag": "🇨🇿",
    "displayLabel": "🇨🇿 Czech Republic – Czech Koruna (CZK Kč)",
    "searchIndex": "czech republic czech koruna czk kč"
  },
  {
    "countryCode": "EE",
    "countryName": "Estonia",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇪🇪",
    "displayLabel": "🇪🇪 Estonia – Euro (EUR €)",
    "searchIndex": "estonia euro eur €"
  },
  {
    "countryCode": "FO",
    "countryName": "Faroe Islands",
    "currencyCode": "DKK",
    "currencyName": "Danish Krone",
    "currencySymbol": "kr",
    "flag": "🇫🇴",
    "displayLabel": "🇫🇴 Faroe Islands – Danish Krone (DKK kr)",
    "searchIndex": "faroe islands danish krone dkk kr"
  },
  {
    "countryCode": "FI",
    "countryName": "Finland",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇫🇮",
    "displayLabel": "🇫🇮 Finland – Euro (EUR €)",
    "searchIndex": "finland euro eur €"
  },
  {
    "countryCode": "GE",
    "countryName": "Georgia",
    "currencyCode": "GEL",
    "currencyName": "Georgian Lari",
    "currencySymbol": "₾",
    "flag": "🇬🇪",
    "displayLabel": "🇬🇪 Georgia – Georgian Lari (GEL ₾)",
    "searchIndex": "georgia georgian lari gel ₾"
  },
  {
    "countryCode": "GI",
    "countryName": "Gibraltar",
    "currencyCode": "GIP",
    "currencyName": "Gibraltar Pound",
    "currencySymbol": "£",
    "flag": "🇬🇮",
    "displayLabel": "🇬🇮 Gibraltar – Gibraltar Pound (GIP £)",
    "searchIndex": "gibraltar gibraltar pound gip £"
  },
  {
    "countryCode": "GR",
    "countryName": "Greece",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇬🇷",
    "displayLabel": "🇬🇷 Greece – Euro (EUR €)",
    "searchIndex": "greece euro eur €"
  },
  {
    "countryCode": "GG",
    "countryName": "Guernsey",
    "currencyCode": "GBP",
    "currencyName": "British Pound",
    "currencySymbol": "£",
    "flag": "🇬🇬",
    "displayLabel": "🇬🇬 Guernsey – British Pound (GBP £)",
    "searchIndex": "guernsey british pound gbp £"
  },
  {
    "countryCode": "HU",
    "countryName": "Hungary",
    "currencyCode": "HUF",
    "currencyName": "Hungarian Forint",
    "currencySymbol": "Ft",
    "flag": "🇭🇺",
    "displayLabel": "🇭🇺 Hungary – Hungarian Forint (HUF Ft)",
    "searchIndex": "hungary hungarian forint huf ft"
  },
  {
    "countryCode": "IS",
    "countryName": "Iceland",
    "currencyCode": "ISK",
    "currencyName": "Icelandic Króna",
    "currencySymbol": "kr",
    "flag": "🇮🇸",
    "displayLabel": "🇮🇸 Iceland – Icelandic Króna (ISK kr)",
    "searchIndex": "iceland icelandic króna isk kr"
  },
  {
    "countryCode": "IM",
    "countryName": "Isle of Man",
    "currencyCode": "GBP",
    "currencyName": "British Pound",
    "currencySymbol": "£",
    "flag": "🇮🇲",
    "displayLabel": "🇮🇲 Isle of Man – British Pound (GBP £)",
    "searchIndex": "isle of man british pound gbp £"
  },
  {
    "countryCode": "IT",
    "countryName": "Italy",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇮🇹",
    "displayLabel": "🇮🇹 Italy – Euro (EUR €)",
    "searchIndex": "italy euro eur €"
  },
  {
    "countryCode": "JE",
    "countryName": "Jersey",
    "currencyCode": "GBP",
    "currencyName": "British Pound",
    "currencySymbol": "£",
    "flag": "🇯🇪",
    "displayLabel": "🇯🇪 Jersey – British Pound (GBP £)",
    "searchIndex": "jersey british pound gbp £"
  },
  {
    "countryCode": "XK",
    "countryName": "Kosovo",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇽🇰",
    "displayLabel": "🇽🇰 Kosovo – Euro (EUR €)",
    "searchIndex": "kosovo euro eur €"
  },
  {
    "countryCode": "LV",
    "countryName": "Latvia",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇱🇻",
    "displayLabel": "🇱🇻 Latvia – Euro (EUR €)",
    "searchIndex": "latvia euro eur €"
  },
  {
    "countryCode": "LI",
    "countryName": "Liechtenstein",
    "currencyCode": "CHF",
    "currencyName": "Swiss Franc",
    "currencySymbol": "CHF",
    "flag": "🇱🇮",
    "displayLabel": "🇱🇮 Liechtenstein – Swiss Franc (CHF CHF)",
    "searchIndex": "liechtenstein swiss franc chf chf"
  },
  {
    "countryCode": "LT",
    "countryName": "Lithuania",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇱🇹",
    "displayLabel": "🇱🇹 Lithuania – Euro (EUR €)",
    "searchIndex": "lithuania euro eur €"
  },
  {
    "countryCode": "LU",
    "countryName": "Luxembourg",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇱🇺",
    "displayLabel": "🇱🇺 Luxembourg – Euro (EUR €)",
    "searchIndex": "luxembourg euro eur €"
  },
  {
    "countryCode": "MT",
    "countryName": "Malta",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇲🇹",
    "displayLabel": "🇲🇹 Malta – Euro (EUR €)",
    "searchIndex": "malta euro eur €"
  },
  {
    "countryCode": "MD",
    "countryName": "Moldova",
    "currencyCode": "MDL",
    "currencyName": "Moldovan Leu",
    "currencySymbol": "L",
    "flag": "🇲🇩",
    "displayLabel": "🇲🇩 Moldova – Moldovan Leu (MDL L)",
    "searchIndex": "moldova moldovan leu mdl l"
  },
  {
    "countryCode": "MC",
    "countryName": "Monaco",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇲🇨",
    "displayLabel": "🇲🇨 Monaco – Euro (EUR €)",
    "searchIndex": "monaco euro eur €"
  },
  {
    "countryCode": "ME",
    "countryName": "Montenegro",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇲🇪",
    "displayLabel": "🇲🇪 Montenegro – Euro (EUR €)",
    "searchIndex": "montenegro euro eur €"
  },
  {
    "countryCode": "MK",
    "countryName": "North Macedonia",
    "currencyCode": "MKD",
    "currencyName": "Macedonian Denar",
    "currencySymbol": "ден",
    "flag": "🇲🇰",
    "displayLabel": "🇲🇰 North Macedonia – Macedonian Denar (MKD ден)",
    "searchIndex": "north macedonia macedonian denar mkd ден"
  },
  {
    "countryCode": "PL",
    "countryName": "Poland",
    "currencyCode": "PLN",
    "currencyName": "Polish Zloty",
    "currencySymbol": "zł",
    "flag": "🇵🇱",
    "displayLabel": "🇵🇱 Poland – Polish Zloty (PLN zł)",
    "searchIndex": "poland polish zloty pln zł"
  },
  {
    "countryCode": "PT",
    "countryName": "Portugal",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇵🇹",
    "displayLabel": "🇵🇹 Portugal – Euro (EUR €)",
    "searchIndex": "portugal euro eur €"
  },
  {
    "countryCode": "RO",
    "countryName": "Romania",
    "currencyCode": "RON",
    "currencyName": "Romanian Leu",
    "currencySymbol": "lei",
    "flag": "🇷🇴",
    "displayLabel": "🇷🇴 Romania – Romanian Leu (RON lei)",
    "searchIndex": "romania romanian leu ron lei"
  },
  {
    "countryCode": "RU",
    "countryName": "Russia",
    "currencyCode": "RUB",
    "currencyName": "Russian Ruble",
    "currencySymbol": "₽",
    "flag": "🇷🇺",
    "displayLabel": "🇷🇺 Russia – Russian Ruble (RUB ₽)",
    "searchIndex": "russia russian ruble rub ₽"
  },
  {
    "countryCode": "SM",
    "countryName": "San Marino",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇸🇲",
    "displayLabel": "🇸🇲 San Marino – Euro (EUR €)",
    "searchIndex": "san marino euro eur €"
  },
  {
    "countryCode": "RS",
    "countryName": "Serbia",
    "currencyCode": "RSD",
    "currencyName": "Serbian Dinar",
    "currencySymbol": "дин.",
    "flag": "🇷🇸",
    "displayLabel": "🇷🇸 Serbia – Serbian Dinar (RSD дин.)",
    "searchIndex": "serbia serbian dinar rsd дин."
  },
  {
    "countryCode": "SK",
    "countryName": "Slovakia",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇸🇰",
    "displayLabel": "🇸🇰 Slovakia – Euro (EUR €)",
    "searchIndex": "slovakia euro eur €"
  },
  {
    "countryCode": "SI",
    "countryName": "Slovenia",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇸🇮",
    "displayLabel": "🇸🇮 Slovenia – Euro (EUR €)",
    "searchIndex": "slovenia euro eur €"
  },
  {
    "countryCode": "ES",
    "countryName": "Spain",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇪🇸",
    "displayLabel": "🇪🇸 Spain – Euro (EUR €)",
    "searchIndex": "spain euro eur €"
  },
  {
    "countryCode": "UA",
    "countryName": "Ukraine",
    "currencyCode": "UAH",
    "currencyName": "Ukrainian Hryvnia",
    "currencySymbol": "₴",
    "flag": "🇺🇦",
    "displayLabel": "🇺🇦 Ukraine – Ukrainian Hryvnia (UAH ₴)",
    "searchIndex": "ukraine ukrainian hryvnia uah ₴"
  },
  {
    "countryCode": "VA",
    "countryName": "Vatican City",
    "currencyCode": "EUR",
    "currencyName": "Euro",
    "currencySymbol": "€",
    "flag": "🇻🇦",
    "displayLabel": "🇻🇦 Vatican City – Euro (EUR €)",
    "searchIndex": "vatican city euro eur €"
  },
  {
    "countryCode": "AG",
    "countryName": "Antigua and Barbuda",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇦🇬",
    "displayLabel": "🇦🇬 Antigua and Barbuda – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "antigua and barbuda east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "AR",
    "countryName": "Argentina",
    "currencyCode": "ARS",
    "currencyName": "Argentine Peso",
    "currencySymbol": "$",
    "flag": "🇦🇷",
    "displayLabel": "🇦🇷 Argentina – Argentine Peso (ARS $)",
    "searchIndex": "argentina argentine peso ars $"
  },
  {
    "countryCode": "AW",
    "countryName": "Aruba",
    "currencyCode": "AWG",
    "currencyName": "Aruban Florin",
    "currencySymbol": "ƒ",
    "flag": "🇦🇼",
    "displayLabel": "🇦🇼 Aruba – Aruban Florin (AWG ƒ)",
    "searchIndex": "aruba aruban florin awg ƒ"
  },
  {
    "countryCode": "BS",
    "countryName": "Bahamas",
    "currencyCode": "BSD",
    "currencyName": "Bahamian Dollar",
    "currencySymbol": "B$",
    "flag": "🇧🇸",
    "displayLabel": "🇧🇸 Bahamas – Bahamian Dollar (BSD B$)",
    "searchIndex": "bahamas bahamian dollar bsd b$"
  },
  {
    "countryCode": "BB",
    "countryName": "Barbados",
    "currencyCode": "BBD",
    "currencyName": "Barbadian Dollar",
    "currencySymbol": "Bds$",
    "flag": "🇧🇧",
    "displayLabel": "🇧🇧 Barbados – Barbadian Dollar (BBD Bds$)",
    "searchIndex": "barbados barbadian dollar bbd bds$"
  },
  {
    "countryCode": "BZ",
    "countryName": "Belize",
    "currencyCode": "BZD",
    "currencyName": "Belize Dollar",
    "currencySymbol": "BZ$",
    "flag": "🇧🇿",
    "displayLabel": "🇧🇿 Belize – Belize Dollar (BZD BZ$)",
    "searchIndex": "belize belize dollar bzd bz$"
  },
  {
    "countryCode": "BM",
    "countryName": "Bermuda",
    "currencyCode": "BMD",
    "currencyName": "Bermudian Dollar",
    "currencySymbol": "$",
    "flag": "🇧🇲",
    "displayLabel": "🇧🇲 Bermuda – Bermudian Dollar (BMD $)",
    "searchIndex": "bermuda bermudian dollar bmd $"
  },
  {
    "countryCode": "BO",
    "countryName": "Bolivia",
    "currencyCode": "BOB",
    "currencyName": "Bolivian Boliviano",
    "currencySymbol": "Bs.",
    "flag": "🇧🇴",
    "displayLabel": "🇧🇴 Bolivia – Bolivian Boliviano (BOB Bs.)",
    "searchIndex": "bolivia bolivian boliviano bob bs."
  },
  {
    "countryCode": "KY",
    "countryName": "Cayman Islands",
    "currencyCode": "KYD",
    "currencyName": "Cayman Islands Dollar",
    "currencySymbol": "CI$",
    "flag": "🇰🇾",
    "displayLabel": "🇰🇾 Cayman Islands – Cayman Islands Dollar (KYD CI$)",
    "searchIndex": "cayman islands cayman islands dollar kyd ci$"
  },
  {
    "countryCode": "CL",
    "countryName": "Chile",
    "currencyCode": "CLP",
    "currencyName": "Chilean Peso",
    "currencySymbol": "$",
    "flag": "🇨🇱",
    "displayLabel": "🇨🇱 Chile – Chilean Peso (CLP $)",
    "searchIndex": "chile chilean peso clp $"
  },
  {
    "countryCode": "CO",
    "countryName": "Colombia",
    "currencyCode": "COP",
    "currencyName": "Colombian Peso",
    "currencySymbol": "$",
    "flag": "🇨🇴",
    "displayLabel": "🇨🇴 Colombia – Colombian Peso (COP $)",
    "searchIndex": "colombia colombian peso cop $"
  },
  {
    "countryCode": "CR",
    "countryName": "Costa Rica",
    "currencyCode": "CRC",
    "currencyName": "Costa Rican Colón",
    "currencySymbol": "₡",
    "flag": "🇨🇷",
    "displayLabel": "🇨🇷 Costa Rica – Costa Rican Colón (CRC ₡)",
    "searchIndex": "costa rica costa rican colón crc ₡"
  },
  {
    "countryCode": "CW",
    "countryName": "Curaçao",
    "currencyCode": "ANG",
    "currencyName": "Netherlands Antillean Guilder",
    "currencySymbol": "ƒ",
    "flag": "🇨🇼",
    "displayLabel": "🇨🇼 Curaçao – Netherlands Antillean Guilder (ANG ƒ)",
    "searchIndex": "curaçao netherlands antillean guilder ang ƒ"
  },
  {
    "countryCode": "DM",
    "countryName": "Dominica",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇩🇲",
    "displayLabel": "🇩🇲 Dominica – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "dominica east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "DO",
    "countryName": "Dominican Republic",
    "currencyCode": "DOP",
    "currencyName": "Dominican Peso",
    "currencySymbol": "RD$",
    "flag": "🇩🇴",
    "displayLabel": "🇩🇴 Dominican Republic – Dominican Peso (DOP RD$)",
    "searchIndex": "dominican republic dominican peso dop rd$"
  },
  {
    "countryCode": "EC",
    "countryName": "Ecuador",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇪🇨",
    "displayLabel": "🇪🇨 Ecuador – US Dollar (USD $)",
    "searchIndex": "ecuador us dollar usd $"
  },
  {
    "countryCode": "SV",
    "countryName": "El Salvador",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇸🇻",
    "displayLabel": "🇸🇻 El Salvador – US Dollar (USD $)",
    "searchIndex": "el salvador us dollar usd $"
  },
  {
    "countryCode": "GD",
    "countryName": "Grenada",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇬🇩",
    "displayLabel": "🇬🇩 Grenada – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "grenada east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "GT",
    "countryName": "Guatemala",
    "currencyCode": "GTQ",
    "currencyName": "Guatemalan Quetzal",
    "currencySymbol": "Q",
    "flag": "🇬🇹",
    "displayLabel": "🇬🇹 Guatemala – Guatemalan Quetzal (GTQ Q)",
    "searchIndex": "guatemala guatemalan quetzal gtq q"
  },
  {
    "countryCode": "GY",
    "countryName": "Guyana",
    "currencyCode": "GYD",
    "currencyName": "Guyanese Dollar",
    "currencySymbol": "G$",
    "flag": "🇬🇾",
    "displayLabel": "🇬🇾 Guyana – Guyanese Dollar (GYD G$)",
    "searchIndex": "guyana guyanese dollar gyd g$"
  },
  {
    "countryCode": "HT",
    "countryName": "Haiti",
    "currencyCode": "HTG",
    "currencyName": "Haitian Gourde",
    "currencySymbol": "G",
    "flag": "🇭🇹",
    "displayLabel": "🇭🇹 Haiti – Haitian Gourde (HTG G)",
    "searchIndex": "haiti haitian gourde htg g"
  },
  {
    "countryCode": "HN",
    "countryName": "Honduras",
    "currencyCode": "HNL",
    "currencyName": "Honduran Lempira",
    "currencySymbol": "L",
    "flag": "🇭🇳",
    "displayLabel": "🇭🇳 Honduras – Honduran Lempira (HNL L)",
    "searchIndex": "honduras honduran lempira hnl l"
  },
  {
    "countryCode": "JM",
    "countryName": "Jamaica",
    "currencyCode": "JMD",
    "currencyName": "Jamaican Dollar",
    "currencySymbol": "J$",
    "flag": "🇯🇲",
    "displayLabel": "🇯🇲 Jamaica – Jamaican Dollar (JMD J$)",
    "searchIndex": "jamaica jamaican dollar jmd j$"
  },
  {
    "countryCode": "NI",
    "countryName": "Nicaragua",
    "currencyCode": "NIO",
    "currencyName": "Nicaraguan Córdoba",
    "currencySymbol": "C$",
    "flag": "🇳🇮",
    "displayLabel": "🇳🇮 Nicaragua – Nicaraguan Córdoba (NIO C$)",
    "searchIndex": "nicaragua nicaraguan córdoba nio c$"
  },
  {
    "countryCode": "PA",
    "countryName": "Panama",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇵🇦",
    "displayLabel": "🇵🇦 Panama – US Dollar (USD $)",
    "searchIndex": "panama us dollar usd $"
  },
  {
    "countryCode": "PY",
    "countryName": "Paraguay",
    "currencyCode": "PYG",
    "currencyName": "Paraguayan Guaraní",
    "currencySymbol": "₲",
    "flag": "🇵🇾",
    "displayLabel": "🇵🇾 Paraguay – Paraguayan Guaraní (PYG ₲)",
    "searchIndex": "paraguay paraguayan guaraní pyg ₲"
  },
  {
    "countryCode": "PE",
    "countryName": "Peru",
    "currencyCode": "PEN",
    "currencyName": "Peruvian Sol",
    "currencySymbol": "S/",
    "flag": "🇵🇪",
    "displayLabel": "🇵🇪 Peru – Peruvian Sol (PEN S/)",
    "searchIndex": "peru peruvian sol pen s/"
  },
  {
    "countryCode": "PR",
    "countryName": "Puerto Rico",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇵🇷",
    "displayLabel": "🇵🇷 Puerto Rico – US Dollar (USD $)",
    "searchIndex": "puerto rico us dollar usd $"
  },
  {
    "countryCode": "KN",
    "countryName": "Saint Kitts and Nevis",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇰🇳",
    "displayLabel": "🇰🇳 Saint Kitts and Nevis – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "saint kitts and nevis east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "LC",
    "countryName": "Saint Lucia",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇱🇨",
    "displayLabel": "🇱🇨 Saint Lucia – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "saint lucia east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "VC",
    "countryName": "Saint Vincent and the Grenadines",
    "currencyCode": "XCD",
    "currencyName": "East Caribbean Dollar",
    "currencySymbol": "EC$",
    "flag": "🇻🇨",
    "displayLabel": "🇻🇨 Saint Vincent and the Grenadines – East Caribbean Dollar (XCD EC$)",
    "searchIndex": "saint vincent and the grenadines east caribbean dollar xcd ec$"
  },
  {
    "countryCode": "SR",
    "countryName": "Suriname",
    "currencyCode": "SRD",
    "currencyName": "Surinamese Dollar",
    "currencySymbol": "$",
    "flag": "🇸🇷",
    "displayLabel": "🇸🇷 Suriname – Surinamese Dollar (SRD $)",
    "searchIndex": "suriname surinamese dollar srd $"
  },
  {
    "countryCode": "TT",
    "countryName": "Trinidad and Tobago",
    "currencyCode": "TTD",
    "currencyName": "Trinidad and Tobago Dollar",
    "currencySymbol": "TT$",
    "flag": "🇹🇹",
    "displayLabel": "🇹🇹 Trinidad and Tobago – Trinidad and Tobago Dollar (TTD TT$)",
    "searchIndex": "trinidad and tobago trinidad and tobago dollar ttd tt$"
  },
  {
    "countryCode": "TC",
    "countryName": "Turks and Caicos Islands",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇹🇨",
    "displayLabel": "🇹🇨 Turks and Caicos Islands – US Dollar (USD $)",
    "searchIndex": "turks and caicos islands us dollar usd $"
  },
  {
    "countryCode": "UY",
    "countryName": "Uruguay",
    "currencyCode": "UYU",
    "currencyName": "Uruguayan Peso",
    "currencySymbol": "$U",
    "flag": "🇺🇾",
    "displayLabel": "🇺🇾 Uruguay – Uruguayan Peso (UYU $U)",
    "searchIndex": "uruguay uruguayan peso uyu $u"
  },
  {
    "countryCode": "VG",
    "countryName": "British Virgin Islands",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇻🇬",
    "displayLabel": "🇻🇬 British Virgin Islands – US Dollar (USD $)",
    "searchIndex": "british virgin islands us dollar usd $"
  },
  {
    "countryCode": "VI",
    "countryName": "U.S. Virgin Islands",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇻🇮",
    "displayLabel": "🇻🇮 U.S. Virgin Islands – US Dollar (USD $)",
    "searchIndex": "u.s. virgin islands us dollar usd $"
  },
  {
    "countryCode": "AF",
    "countryName": "Afghanistan",
    "currencyCode": "AFN",
    "currencyName": "Afghan Afghani",
    "currencySymbol": "؋",
    "flag": "🇦🇫",
    "displayLabel": "🇦🇫 Afghanistan – Afghan Afghani (AFN ؋)",
    "searchIndex": "afghanistan afghan afghani afn ؋"
  },
  {
    "countryCode": "BT",
    "countryName": "Bhutan",
    "currencyCode": "BTN",
    "currencyName": "Bhutanese Ngultrum",
    "currencySymbol": "Nu.",
    "flag": "🇧🇹",
    "displayLabel": "🇧🇹 Bhutan – Bhutanese Ngultrum (BTN Nu.)",
    "searchIndex": "bhutan bhutanese ngultrum btn nu."
  },
  {
    "countryCode": "BN",
    "countryName": "Brunei",
    "currencyCode": "BND",
    "currencyName": "Brunei Dollar",
    "currencySymbol": "B$",
    "flag": "🇧🇳",
    "displayLabel": "🇧🇳 Brunei – Brunei Dollar (BND B$)",
    "searchIndex": "brunei brunei dollar bnd b$"
  },
  {
    "countryCode": "KH",
    "countryName": "Cambodia",
    "currencyCode": "KHR",
    "currencyName": "Cambodian Riel",
    "currencySymbol": "៛",
    "flag": "🇰🇭",
    "displayLabel": "🇰🇭 Cambodia – Cambodian Riel (KHR ៛)",
    "searchIndex": "cambodia cambodian riel khr ៛"
  },
  {
    "countryCode": "IQ",
    "countryName": "Iraq",
    "currencyCode": "IQD",
    "currencyName": "Iraqi Dinar",
    "currencySymbol": "ع.د",
    "flag": "🇮🇶",
    "displayLabel": "🇮🇶 Iraq – Iraqi Dinar (IQD ع.د)",
    "searchIndex": "iraq iraqi dinar iqd ع.د"
  },
  {
    "countryCode": "JO",
    "countryName": "Jordan",
    "currencyCode": "JOD",
    "currencyName": "Jordanian Dinar",
    "currencySymbol": "د.ا",
    "flag": "🇯🇴",
    "displayLabel": "🇯🇴 Jordan – Jordanian Dinar (JOD د.ا)",
    "searchIndex": "jordan jordanian dinar jod د.ا"
  },
  {
    "countryCode": "KZ",
    "countryName": "Kazakhstan",
    "currencyCode": "KZT",
    "currencyName": "Kazakhstani Tenge",
    "currencySymbol": "₸",
    "flag": "🇰🇿",
    "displayLabel": "🇰🇿 Kazakhstan – Kazakhstani Tenge (KZT ₸)",
    "searchIndex": "kazakhstan kazakhstani tenge kzt ₸"
  },
  {
    "countryCode": "KG",
    "countryName": "Kyrgyzstan",
    "currencyCode": "KGS",
    "currencyName": "Kyrgyzstani Som",
    "currencySymbol": "сом",
    "flag": "🇰🇬",
    "displayLabel": "🇰🇬 Kyrgyzstan – Kyrgyzstani Som (KGS сом)",
    "searchIndex": "kyrgyzstan kyrgyzstani som kgs сом"
  },
  {
    "countryCode": "LA",
    "countryName": "Laos",
    "currencyCode": "LAK",
    "currencyName": "Lao Kip",
    "currencySymbol": "₭",
    "flag": "🇱🇦",
    "displayLabel": "🇱🇦 Laos – Lao Kip (LAK ₭)",
    "searchIndex": "laos lao kip lak ₭"
  },
  {
    "countryCode": "LB",
    "countryName": "Lebanon",
    "currencyCode": "LBP",
    "currencyName": "Lebanese Pound",
    "currencySymbol": "ل.ل",
    "flag": "🇱🇧",
    "displayLabel": "🇱🇧 Lebanon – Lebanese Pound (LBP ل.ل)",
    "searchIndex": "lebanon lebanese pound lbp ل.ل"
  },
  {
    "countryCode": "MO",
    "countryName": "Macau",
    "currencyCode": "MOP",
    "currencyName": "Macanese Pataca",
    "currencySymbol": "MOP$",
    "flag": "🇲🇴",
    "displayLabel": "🇲🇴 Macau – Macanese Pataca (MOP MOP$)",
    "searchIndex": "macau macanese pataca mop mop$"
  },
  {
    "countryCode": "MV",
    "countryName": "Maldives",
    "currencyCode": "MVR",
    "currencyName": "Maldivian Rufiyaa",
    "currencySymbol": "Rf",
    "flag": "🇲🇻",
    "displayLabel": "🇲🇻 Maldives – Maldivian Rufiyaa (MVR Rf)",
    "searchIndex": "maldives maldivian rufiyaa mvr rf"
  },
  {
    "countryCode": "MN",
    "countryName": "Mongolia",
    "currencyCode": "MNT",
    "currencyName": "Mongolian Tögrög",
    "currencySymbol": "₮",
    "flag": "🇲🇳",
    "displayLabel": "🇲🇳 Mongolia – Mongolian Tögrög (MNT ₮)",
    "searchIndex": "mongolia mongolian tögrög mnt ₮"
  },
  {
    "countryCode": "MM",
    "countryName": "Myanmar",
    "currencyCode": "MMK",
    "currencyName": "Myanmar Kyat",
    "currencySymbol": "K",
    "flag": "🇲🇲",
    "displayLabel": "🇲🇲 Myanmar – Myanmar Kyat (MMK K)",
    "searchIndex": "myanmar myanmar kyat mmk k"
  },
  {
    "countryCode": "PS",
    "countryName": "Palestine",
    "currencyCode": "ILS",
    "currencyName": "Israeli New Shekel",
    "currencySymbol": "₪",
    "flag": "🇵🇸",
    "displayLabel": "🇵🇸 Palestine – Israeli New Shekel (ILS ₪)",
    "searchIndex": "palestine israeli new shekel ils ₪"
  },
  {
    "countryCode": "TJ",
    "countryName": "Tajikistan",
    "currencyCode": "TJS",
    "currencyName": "Tajikistani Somoni",
    "currencySymbol": "ЅМ",
    "flag": "🇹🇯",
    "displayLabel": "🇹🇯 Tajikistan – Tajikistani Somoni (TJS ЅМ)",
    "searchIndex": "tajikistan tajikistani somoni tjs ѕм"
  },
  {
    "countryCode": "TL",
    "countryName": "Timor-Leste",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇹🇱",
    "displayLabel": "🇹🇱 Timor-Leste – US Dollar (USD $)",
    "searchIndex": "timor-leste us dollar usd $"
  },
  {
    "countryCode": "TM",
    "countryName": "Turkmenistan",
    "currencyCode": "TMT",
    "currencyName": "Turkmenistani Manat",
    "currencySymbol": "T",
    "flag": "🇹🇲",
    "displayLabel": "🇹🇲 Turkmenistan – Turkmenistani Manat (TMT T)",
    "searchIndex": "turkmenistan turkmenistani manat tmt t"
  },
  {
    "countryCode": "UZ",
    "countryName": "Uzbekistan",
    "currencyCode": "UZS",
    "currencyName": "Uzbekistani Som",
    "currencySymbol": "soʻm",
    "flag": "🇺🇿",
    "displayLabel": "🇺🇿 Uzbekistan – Uzbekistani Som (UZS soʻm)",
    "searchIndex": "uzbekistan uzbekistani som uzs soʻm"
  },
  {
    "countryCode": "YE",
    "countryName": "Yemen",
    "currencyCode": "YER",
    "currencyName": "Yemeni Rial",
    "currencySymbol": "﷼",
    "flag": "🇾🇪",
    "displayLabel": "🇾🇪 Yemen – Yemeni Rial (YER ﷼)",
    "searchIndex": "yemen yemeni rial yer ﷼"
  },
  {
    "countryCode": "DZ",
    "countryName": "Algeria",
    "currencyCode": "DZD",
    "currencyName": "Algerian Dinar",
    "currencySymbol": "د.ج",
    "flag": "🇩🇿",
    "displayLabel": "🇩🇿 Algeria – Algerian Dinar (DZD د.ج)",
    "searchIndex": "algeria algerian dinar dzd د.ج"
  },
  {
    "countryCode": "AO",
    "countryName": "Angola",
    "currencyCode": "AOA",
    "currencyName": "Angolan Kwanza",
    "currencySymbol": "Kz",
    "flag": "🇦🇴",
    "displayLabel": "🇦🇴 Angola – Angolan Kwanza (AOA Kz)",
    "searchIndex": "angola angolan kwanza aoa kz"
  },
  {
    "countryCode": "BJ",
    "countryName": "Benin",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇧🇯",
    "displayLabel": "🇧🇯 Benin – West African CFA Franc (XOF CFA)",
    "searchIndex": "benin west african cfa franc xof cfa"
  },
  {
    "countryCode": "BW",
    "countryName": "Botswana",
    "currencyCode": "BWP",
    "currencyName": "Botswana Pula",
    "currencySymbol": "P",
    "flag": "🇧🇼",
    "displayLabel": "🇧🇼 Botswana – Botswana Pula (BWP P)",
    "searchIndex": "botswana botswana pula bwp p"
  },
  {
    "countryCode": "BF",
    "countryName": "Burkina Faso",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇧🇫",
    "displayLabel": "🇧🇫 Burkina Faso – West African CFA Franc (XOF CFA)",
    "searchIndex": "burkina faso west african cfa franc xof cfa"
  },
  {
    "countryCode": "BI",
    "countryName": "Burundi",
    "currencyCode": "BIF",
    "currencyName": "Burundian Franc",
    "currencySymbol": "FBu",
    "flag": "🇧🇮",
    "displayLabel": "🇧🇮 Burundi – Burundian Franc (BIF FBu)",
    "searchIndex": "burundi burundian franc bif fbu"
  },
  {
    "countryCode": "CV",
    "countryName": "Cabo Verde",
    "currencyCode": "CVE",
    "currencyName": "Cape Verdean Escudo",
    "currencySymbol": "Esc",
    "flag": "🇨🇻",
    "displayLabel": "🇨🇻 Cabo Verde – Cape Verdean Escudo (CVE Esc)",
    "searchIndex": "cabo verde cape verdean escudo cve esc"
  },
  {
    "countryCode": "CM",
    "countryName": "Cameroon",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇨🇲",
    "displayLabel": "🇨🇲 Cameroon – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "cameroon central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "CF",
    "countryName": "Central African Republic",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇨🇫",
    "displayLabel": "🇨🇫 Central African Republic – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "central african republic central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "TD",
    "countryName": "Chad",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇹🇩",
    "displayLabel": "🇹🇩 Chad – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "chad central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "KM",
    "countryName": "Comoros",
    "currencyCode": "KMF",
    "currencyName": "Comorian Franc",
    "currencySymbol": "CF",
    "flag": "🇰🇲",
    "displayLabel": "🇰🇲 Comoros – Comorian Franc (KMF CF)",
    "searchIndex": "comoros comorian franc kmf cf"
  },
  {
    "countryCode": "CD",
    "countryName": "Congo (DRC)",
    "currencyCode": "CDF",
    "currencyName": "Congolese Franc",
    "currencySymbol": "FC",
    "flag": "🇨🇩",
    "displayLabel": "🇨🇩 Congo (DRC) – Congolese Franc (CDF FC)",
    "searchIndex": "congo (drc) congolese franc cdf fc"
  },
  {
    "countryCode": "CG",
    "countryName": "Congo (Republic)",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇨🇬",
    "displayLabel": "🇨🇬 Congo (Republic) – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "congo (republic) central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "CI",
    "countryName": "Côte d'Ivoire",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇨🇮",
    "displayLabel": "🇨🇮 Côte d'Ivoire – West African CFA Franc (XOF CFA)",
    "searchIndex": "côte d'ivoire west african cfa franc xof cfa"
  },
  {
    "countryCode": "DJ",
    "countryName": "Djibouti",
    "currencyCode": "DJF",
    "currencyName": "Djiboutian Franc",
    "currencySymbol": "Fdj",
    "flag": "🇩🇯",
    "displayLabel": "🇩🇯 Djibouti – Djiboutian Franc (DJF Fdj)",
    "searchIndex": "djibouti djiboutian franc djf fdj"
  },
  {
    "countryCode": "GQ",
    "countryName": "Equatorial Guinea",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇬🇶",
    "displayLabel": "🇬🇶 Equatorial Guinea – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "equatorial guinea central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "ER",
    "countryName": "Eritrea",
    "currencyCode": "ERN",
    "currencyName": "Eritrean Nakfa",
    "currencySymbol": "Nfk",
    "flag": "🇪🇷",
    "displayLabel": "🇪🇷 Eritrea – Eritrean Nakfa (ERN Nfk)",
    "searchIndex": "eritrea eritrean nakfa ern nfk"
  },
  {
    "countryCode": "SZ",
    "countryName": "Eswatini",
    "currencyCode": "SZL",
    "currencyName": "Swazi Lilangeni",
    "currencySymbol": "E",
    "flag": "🇸🇿",
    "displayLabel": "🇸🇿 Eswatini – Swazi Lilangeni (SZL E)",
    "searchIndex": "eswatini swazi lilangeni szl e"
  },
  {
    "countryCode": "ET",
    "countryName": "Ethiopia",
    "currencyCode": "ETB",
    "currencyName": "Ethiopian Birr",
    "currencySymbol": "Br",
    "flag": "🇪🇹",
    "displayLabel": "🇪🇹 Ethiopia – Ethiopian Birr (ETB Br)",
    "searchIndex": "ethiopia ethiopian birr etb br"
  },
  {
    "countryCode": "GA",
    "countryName": "Gabon",
    "currencyCode": "XAF",
    "currencyName": "Central African CFA Franc",
    "currencySymbol": "FCFA",
    "flag": "🇬🇦",
    "displayLabel": "🇬🇦 Gabon – Central African CFA Franc (XAF FCFA)",
    "searchIndex": "gabon central african cfa franc xaf fcfa"
  },
  {
    "countryCode": "GM",
    "countryName": "Gambia",
    "currencyCode": "GMD",
    "currencyName": "Gambian Dalasi",
    "currencySymbol": "D",
    "flag": "🇬🇲",
    "displayLabel": "🇬🇲 Gambia – Gambian Dalasi (GMD D)",
    "searchIndex": "gambia gambian dalasi gmd d"
  },
  {
    "countryCode": "GN",
    "countryName": "Guinea",
    "currencyCode": "GNF",
    "currencyName": "Guinean Franc",
    "currencySymbol": "FG",
    "flag": "🇬🇳",
    "displayLabel": "🇬🇳 Guinea – Guinean Franc (GNF FG)",
    "searchIndex": "guinea guinean franc gnf fg"
  },
  {
    "countryCode": "GW",
    "countryName": "Guinea-Bissau",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇬🇼",
    "displayLabel": "🇬🇼 Guinea-Bissau – West African CFA Franc (XOF CFA)",
    "searchIndex": "guinea-bissau west african cfa franc xof cfa"
  },
  {
    "countryCode": "LS",
    "countryName": "Lesotho",
    "currencyCode": "LSL",
    "currencyName": "Lesotho Loti",
    "currencySymbol": "L",
    "flag": "🇱🇸",
    "displayLabel": "🇱🇸 Lesotho – Lesotho Loti (LSL L)",
    "searchIndex": "lesotho lesotho loti lsl l"
  },
  {
    "countryCode": "LR",
    "countryName": "Liberia",
    "currencyCode": "LRD",
    "currencyName": "Liberian Dollar",
    "currencySymbol": "L$",
    "flag": "🇱🇷",
    "displayLabel": "🇱🇷 Liberia – Liberian Dollar (LRD L$)",
    "searchIndex": "liberia liberian dollar lrd l$"
  },
  {
    "countryCode": "LY",
    "countryName": "Libya",
    "currencyCode": "LYD",
    "currencyName": "Libyan Dinar",
    "currencySymbol": "ل.د",
    "flag": "🇱🇾",
    "displayLabel": "🇱🇾 Libya – Libyan Dinar (LYD ل.د)",
    "searchIndex": "libya libyan dinar lyd ل.د"
  },
  {
    "countryCode": "MG",
    "countryName": "Madagascar",
    "currencyCode": "MGA",
    "currencyName": "Malagasy Ariary",
    "currencySymbol": "Ar",
    "flag": "🇲🇬",
    "displayLabel": "🇲🇬 Madagascar – Malagasy Ariary (MGA Ar)",
    "searchIndex": "madagascar malagasy ariary mga ar"
  },
  {
    "countryCode": "MW",
    "countryName": "Malawi",
    "currencyCode": "MWK",
    "currencyName": "Malawian Kwacha",
    "currencySymbol": "MK",
    "flag": "🇲🇼",
    "displayLabel": "🇲🇼 Malawi – Malawian Kwacha (MWK MK)",
    "searchIndex": "malawi malawian kwacha mwk mk"
  },
  {
    "countryCode": "ML",
    "countryName": "Mali",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇲🇱",
    "displayLabel": "🇲🇱 Mali – West African CFA Franc (XOF CFA)",
    "searchIndex": "mali west african cfa franc xof cfa"
  },
  {
    "countryCode": "MR",
    "countryName": "Mauritania",
    "currencyCode": "MRU",
    "currencyName": "Mauritanian Ouguiya",
    "currencySymbol": "UM",
    "flag": "🇲🇷",
    "displayLabel": "🇲🇷 Mauritania – Mauritanian Ouguiya (MRU UM)",
    "searchIndex": "mauritania mauritanian ouguiya mru um"
  },
  {
    "countryCode": "MU",
    "countryName": "Mauritius",
    "currencyCode": "MUR",
    "currencyName": "Mauritian Rupee",
    "currencySymbol": "₨",
    "flag": "🇲🇺",
    "displayLabel": "🇲🇺 Mauritius – Mauritian Rupee (MUR ₨)",
    "searchIndex": "mauritius mauritian rupee mur ₨"
  },
  {
    "countryCode": "MA",
    "countryName": "Morocco",
    "currencyCode": "MAD",
    "currencyName": "Moroccan Dirham",
    "currencySymbol": "د.م.",
    "flag": "🇲🇦",
    "displayLabel": "🇲🇦 Morocco – Moroccan Dirham (MAD د.م.)",
    "searchIndex": "morocco moroccan dirham mad د.م."
  },
  {
    "countryCode": "MZ",
    "countryName": "Mozambique",
    "currencyCode": "MZN",
    "currencyName": "Mozambican Metical",
    "currencySymbol": "MT",
    "flag": "🇲🇿",
    "displayLabel": "🇲🇿 Mozambique – Mozambican Metical (MZN MT)",
    "searchIndex": "mozambique mozambican metical mzn mt"
  },
  {
    "countryCode": "NA",
    "countryName": "Namibia",
    "currencyCode": "NAD",
    "currencyName": "Namibian Dollar",
    "currencySymbol": "N$",
    "flag": "🇳🇦",
    "displayLabel": "🇳🇦 Namibia – Namibian Dollar (NAD N$)",
    "searchIndex": "namibia namibian dollar nad n$"
  },
  {
    "countryCode": "NE",
    "countryName": "Niger",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇳🇪",
    "displayLabel": "🇳🇪 Niger – West African CFA Franc (XOF CFA)",
    "searchIndex": "niger west african cfa franc xof cfa"
  },
  {
    "countryCode": "RW",
    "countryName": "Rwanda",
    "currencyCode": "RWF",
    "currencyName": "Rwandan Franc",
    "currencySymbol": "FRw",
    "flag": "🇷🇼",
    "displayLabel": "🇷🇼 Rwanda – Rwandan Franc (RWF FRw)",
    "searchIndex": "rwanda rwandan franc rwf frw"
  },
  {
    "countryCode": "ST",
    "countryName": "São Tomé and Príncipe",
    "currencyCode": "STN",
    "currencyName": "São Tomé and Príncipe Dobra",
    "currencySymbol": "Db",
    "flag": "🇸🇹",
    "displayLabel": "🇸🇹 São Tomé and Príncipe – São Tomé and Príncipe Dobra (STN Db)",
    "searchIndex": "são tomé and príncipe são tomé and príncipe dobra stn db"
  },
  {
    "countryCode": "SN",
    "countryName": "Senegal",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇸🇳",
    "displayLabel": "🇸🇳 Senegal – West African CFA Franc (XOF CFA)",
    "searchIndex": "senegal west african cfa franc xof cfa"
  },
  {
    "countryCode": "SC",
    "countryName": "Seychelles",
    "currencyCode": "SCR",
    "currencyName": "Seychellois Rupee",
    "currencySymbol": "₨",
    "flag": "🇸🇨",
    "displayLabel": "🇸🇨 Seychelles – Seychellois Rupee (SCR ₨)",
    "searchIndex": "seychelles seychellois rupee scr ₨"
  },
  {
    "countryCode": "SL",
    "countryName": "Sierra Leone",
    "currencyCode": "SLE",
    "currencyName": "Sierra Leonean Leone",
    "currencySymbol": "Le",
    "flag": "🇸🇱",
    "displayLabel": "🇸🇱 Sierra Leone – Sierra Leonean Leone (SLE Le)",
    "searchIndex": "sierra leone sierra leonean leone sle le"
  },
  {
    "countryCode": "SO",
    "countryName": "Somalia",
    "currencyCode": "SOS",
    "currencyName": "Somali Shilling",
    "currencySymbol": "Sh",
    "flag": "🇸🇴",
    "displayLabel": "🇸🇴 Somalia – Somali Shilling (SOS Sh)",
    "searchIndex": "somalia somali shilling sos sh"
  },
  {
    "countryCode": "SS",
    "countryName": "South Sudan",
    "currencyCode": "SSP",
    "currencyName": "South Sudanese Pound",
    "currencySymbol": "£",
    "flag": "🇸🇸",
    "displayLabel": "🇸🇸 South Sudan – South Sudanese Pound (SSP £)",
    "searchIndex": "south sudan south sudanese pound ssp £"
  },
  {
    "countryCode": "SD",
    "countryName": "Sudan",
    "currencyCode": "SDG",
    "currencyName": "Sudanese Pound",
    "currencySymbol": "ج.س.",
    "flag": "🇸🇩",
    "displayLabel": "🇸🇩 Sudan – Sudanese Pound (SDG ج.س.)",
    "searchIndex": "sudan sudanese pound sdg ج.س."
  },
  {
    "countryCode": "TZ",
    "countryName": "Tanzania",
    "currencyCode": "TZS",
    "currencyName": "Tanzanian Shilling",
    "currencySymbol": "TSh",
    "flag": "🇹🇿",
    "displayLabel": "🇹🇿 Tanzania – Tanzanian Shilling (TZS TSh)",
    "searchIndex": "tanzania tanzanian shilling tzs tsh"
  },
  {
    "countryCode": "TG",
    "countryName": "Togo",
    "currencyCode": "XOF",
    "currencyName": "West African CFA Franc",
    "currencySymbol": "CFA",
    "flag": "🇹🇬",
    "displayLabel": "🇹🇬 Togo – West African CFA Franc (XOF CFA)",
    "searchIndex": "togo west african cfa franc xof cfa"
  },
  {
    "countryCode": "TN",
    "countryName": "Tunisia",
    "currencyCode": "TND",
    "currencyName": "Tunisian Dinar",
    "currencySymbol": "د.ت",
    "flag": "🇹🇳",
    "displayLabel": "🇹🇳 Tunisia – Tunisian Dinar (TND د.ت)",
    "searchIndex": "tunisia tunisian dinar tnd د.ت"
  },
  {
    "countryCode": "UG",
    "countryName": "Uganda",
    "currencyCode": "UGX",
    "currencyName": "Ugandan Shilling",
    "currencySymbol": "USh",
    "flag": "🇺🇬",
    "displayLabel": "🇺🇬 Uganda – Ugandan Shilling (UGX USh)",
    "searchIndex": "uganda ugandan shilling ugx ush"
  },
  {
    "countryCode": "ZM",
    "countryName": "Zambia",
    "currencyCode": "ZMW",
    "currencyName": "Zambian Kwacha",
    "currencySymbol": "ZK",
    "flag": "🇿🇲",
    "displayLabel": "🇿🇲 Zambia – Zambian Kwacha (ZMW ZK)",
    "searchIndex": "zambia zambian kwacha zmw zk"
  },
  {
    "countryCode": "ZW",
    "countryName": "Zimbabwe",
    "currencyCode": "ZWG",
    "currencyName": "Zimbabwean ZiG",
    "currencySymbol": "ZiG",
    "flag": "🇿🇼",
    "displayLabel": "🇿🇼 Zimbabwe – Zimbabwean ZiG (ZWG ZiG)",
    "searchIndex": "zimbabwe zimbabwean zig zwg zig"
  },
  {
    "countryCode": "FJ",
    "countryName": "Fiji",
    "currencyCode": "FJD",
    "currencyName": "Fijian Dollar",
    "currencySymbol": "FJ$",
    "flag": "🇫🇯",
    "displayLabel": "🇫🇯 Fiji – Fijian Dollar (FJD FJ$)",
    "searchIndex": "fiji fijian dollar fjd fj$"
  },
  {
    "countryCode": "PF",
    "countryName": "French Polynesia",
    "currencyCode": "XPF",
    "currencyName": "CFP Franc",
    "currencySymbol": "₣",
    "flag": "🇵🇫",
    "displayLabel": "🇵🇫 French Polynesia – CFP Franc (XPF ₣)",
    "searchIndex": "french polynesia cfp franc xpf ₣"
  },
  {
    "countryCode": "GU",
    "countryName": "Guam",
    "currencyCode": "USD",
    "currencyName": "US Dollar",
    "currencySymbol": "$",
    "flag": "🇬🇺",
    "displayLabel": "🇬🇺 Guam – US Dollar (USD $)",
    "searchIndex": "guam us dollar usd $"
  },
  {
    "countryCode": "KI",
    "countryName": "Kiribati",
    "currencyCode": "AUD",
    "currencyName": "Australian Dollar",
    "currencySymbol": "A$",
    "flag": "🇰🇮",
    "displayLabel": "🇰🇮 Kiribati – Australian Dollar (AUD A$)",
    "searchIndex": "kiribati australian dollar aud a$"
  },
  {
    "countryCode": "NC",
    "countryName": "New Caledonia",
    "currencyCode": "XPF",
    "currencyName": "CFP Franc",
    "currencySymbol": "₣",
    "flag": "🇳🇨",
    "displayLabel": "🇳🇨 New Caledonia – CFP Franc (XPF ₣)",
    "searchIndex": "new caledonia cfp franc xpf ₣"
  },
  {
    "countryCode": "NR",
    "countryName": "Nauru",
    "currencyCode": "AUD",
    "currencyName": "Australian Dollar",
    "currencySymbol": "A$",
    "flag": "🇳🇷",
    "displayLabel": "🇳🇷 Nauru – Australian Dollar (AUD A$)",
    "searchIndex": "nauru australian dollar aud a$"
  },
  {
    "countryCode": "PG",
    "countryName": "Papua New Guinea",
    "currencyCode": "PGK",
    "currencyName": "Papua New Guinean Kina",
    "currencySymbol": "K",
    "flag": "🇵🇬",
    "displayLabel": "🇵🇬 Papua New Guinea – Papua New Guinean Kina (PGK K)",
    "searchIndex": "papua new guinea papua new guinean kina pgk k"
  },
  {
    "countryCode": "WS",
    "countryName": "Samoa",
    "currencyCode": "WST",
    "currencyName": "Samoan Tala",
    "currencySymbol": "WS$",
    "flag": "🇼🇸",
    "displayLabel": "🇼🇸 Samoa – Samoan Tala (WST WS$)",
    "searchIndex": "samoa samoan tala wst ws$"
  },
  {
    "countryCode": "SB",
    "countryName": "Solomon Islands",
    "currencyCode": "SBD",
    "currencyName": "Solomon Islands Dollar",
    "currencySymbol": "SI$",
    "flag": "🇸🇧",
    "displayLabel": "🇸🇧 Solomon Islands – Solomon Islands Dollar (SBD SI$)",
    "searchIndex": "solomon islands solomon islands dollar sbd si$"
  },
  {
    "countryCode": "TO",
    "countryName": "Tonga",
    "currencyCode": "TOP",
    "currencyName": "Tongan Paʻanga",
    "currencySymbol": "T$",
    "flag": "🇹🇴",
    "displayLabel": "🇹🇴 Tonga – Tongan Paʻanga (TOP T$)",
    "searchIndex": "tonga tongan paʻanga top t$"
  },
  {
    "countryCode": "TV",
    "countryName": "Tuvalu",
    "currencyCode": "AUD",
    "currencyName": "Australian Dollar",
    "currencySymbol": "A$",
    "flag": "🇹🇻",
    "displayLabel": "🇹🇻 Tuvalu – Australian Dollar (AUD A$)",
    "searchIndex": "tuvalu australian dollar aud a$"
  },
  {
    "countryCode": "VU",
    "countryName": "Vanuatu",
    "currencyCode": "VUV",
    "currencyName": "Vanuatu Vatu",
    "currencySymbol": "VT",
    "flag": "🇻🇺",
    "displayLabel": "🇻🇺 Vanuatu – Vanuatu Vatu (VUV VT)",
    "searchIndex": "vanuatu vanuatu vatu vuv vt"
  }
];

export const DEFAULT_CURRENCY: WorldCurrency = WORLD_CURRENCIES[0]; // India (INR ₹)

/**
 * Baseline fallback exchange rates against 1 INR.
 * Fetched from official ISO exchange rate feed; used offline or if network is unavailable.
 */
export const FALLBACK_EXCHANGE_RATES: Record<string, number> = {
  "INR": 1,
  "AED": 0.03927,
  "AFN": 0.700505,
  "ALL": 0.880831,
  "AMD": 3.861705,
  "ANG": 0.01914,
  "AOA": 10.131797,
  "ARS": 16.662233,
  "AUD": 0.015912,
  "AWG": 0.01914,
  "AZN": 0.018199,
  "BAM": 0.019079,
  "BBD": 0.021386,
  "BDT": 1.332259,
  "BGN": 0.019079,
  "BHD": 0.004021,
  "BIF": 32.145631,
  "BMD": 0.010693,
  "BND": 0.013798,
  "BOB": 0.125239,
  "BRL": 0.062208,
  "BSD": 0.010693,
  "BTN": 1,
  "BWP": 0.154287,
  "BYN": 0.032143,
  "BZD": 0.021386,
  "CAD": 0.015324,
  "CDF": 24.894737,
  "CHF": 0.009017,
  "CLF": 0.000269,
  "CLP": 10.634423,
  "CNH": 0.071353,
  "CNY": 0.071324,
  "COP": 35.4611,
  "CRC": 4.764026,
  "CUP": 0.256631,
  "CVE": 1.075638,
  "CZK": 0.237942,
  "DJF": 1.900364,
  "DKK": 0.07292,
  "DOP": 0.647832,
  "DZD": 1.468674,
  "EGP": 0.575435,
  "ERN": 0.160394,
  "ETB": 1.733508,
  "EUR": 0.009756,
  "FJD": 0.024625,
  "FKP": 0.008133,
  "FOK": 0.07292,
  "GBP": 0.008131,
  "GEL": 0.027762,
  "GGP": 0.008133,
  "GHS": 0.126125,
  "GIP": 0.008133,
  "GMD": 0.800943,
  "GNF": 94.771031,
  "GTQ": 0.081804,
  "GYD": 2.241706,
  "HKD": 0.083969,
  "HNL": 0.287822,
  "HRK": 0.073499,
  "HTG": 1.405945,
  "HUF": 3.592715,
  "IDR": 194.916841,
  "ILS": 0.034925,
  "IMP": 0.008133,
  "IQD": 16.230392,
  "IRR": 20705.970149,
  "ISK": 1.336438,
  "JEP": 0.008133,
  "JMD": 1.699389,
  "JOD": 0.007581,
  "JPY": 1.705286,
  "KES": 1.39237,
  "KGS": 0.936768,
  "KHR": 43.565789,
  "KID": 0.01591,
  "KMF": 4.799158,
  "KRW": 14.243858,
  "KWD": 0.003327,
  "KYD": 0.008911,
  "KZT": 4.752767,
  "LAK": 239.363395,
  "LBP": 957.020281,
  "LKR": 3.560268,
  "LRD": 1.79829,
  "LSL": 0.184352,
  "LYD": 0.069245,
  "MAD": 0.106676,
  "MDL": 0.195901,
  "MGA": 49.41791,
  "MKD": 0.597542,
  "MMK": 22.491838,
  "MNT": 38.511435,
  "MOP": 0.08648,
  "MRU": 0.436865,
  "MUR": 0.510908,
  "MVR": 0.165413,
  "MWK": 18.684639,
  "MXN": 0.199914,
  "MYR": 0.044047,
  "MZN": 0.683103,
  "NAD": 0.184352,
  "NGN": 14.485679,
  "NIO": 0.393947,
  "NOK": 0.103673,
  "NPR": 1.6,
  "NZD": 0.019467,
  "OMR": 0.004111,
  "PAB": 0.010693,
  "PEN": 0.036622,
  "PGK": 0.04814,
  "PHP": 0.680637,
  "PKR": 2.961826,
  "PLN": 0.043043,
  "PYG": 66.987509,
  "QAR": 0.038922,
  "RON": 0.05217,
  "RSD": 1.147554,
  "RUB": 0.881644,
  "RWF": 15.843011,
  "SAR": 0.040099,
  "SBD": 0.085988,
  "SCR": 0.156795,
  "SDG": 4.791606,
  "SEK": 0.10879,
  "SGD": 0.013799,
  "SHP": 0.008133,
  "SLE": 0.245183,
  "SLL": 245.182724,
  "SOS": 6.131481,
  "SRD": 0.402504,
  "SSP": 61.537703,
  "STN": 0.238998,
  "SYP": 1.303101,
  "SZL": 0.184352,
  "THB": 0.363406,
  "TJS": 0.098512,
  "TMT": 0.037456,
  "TND": 0.032642,
  "TOP": 0.025665,
  "TRY": 0.539931,
  "TTD": 0.072493,
  "TVD": 0.01591,
  "TWD": 0.352473,
  "TZS": 28.43419,
  "UAH": 0.484421,
  "UGX": 45.011664,
  "USD": 0.010694,
  "UYU": 0.434898,
  "UZS": 127.977349,
  "VES": 9.813755,
  "VND": 275.491381,
  "VUV": 1.299274,
  "WST": 0.029844,
  "XAF": 6.398877,
  "XCD": 0.028871,
  "XCG": 0.01914,
  "XDR": 0.007966,
  "XOF": 6.398877,
  "XPF": 1.164087,
  "YER": 2.532721,
  "ZAR": 0.184371,
  "ZMW": 0.220954,
  "ZWG": 0.284047,
  "ZWL": 0.284047
};

/**
 * Fetch live exchange rates against 1 INR with fallback to baseline.
 */
export async function fetchLiveRates(): Promise<Record<string, number>> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/INR', {
      headers: { Accept: 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data && data.rates && typeof data.rates.USD === 'number') {
      return data.rates;
    }
  } catch {
    // Return fallback silently if offline or blocked
  }
  return FALLBACK_EXCHANGE_RATES;
}

/**
 * Convert an amount from base INR to the selected currency.
 */
export function convertFromINR(inrAmount: number, targetCurrencyCode: string, rates: Record<string, number>): number {
  if (targetCurrencyCode === 'INR') return inrAmount;
  const rate = rates[targetCurrencyCode] || FALLBACK_EXCHANGE_RATES[targetCurrencyCode];
  if (!rate || rate <= 0) return inrAmount;
  return inrAmount * rate;
}

/**
 * Format a numeric amount in the target currency with proper international formatting.
 */
export function formatWorldCurrency(amount: number, currency: WorldCurrency): string {
  try {
    // Determine proper fraction digits
    const zeroDecimalCurrencies = ['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'PYG', 'UGX', 'RWF', 'BIF', 'KMF', 'DJF', 'GNF', 'VUV', 'XAF', 'XOF', 'XPF', 'HUF'];
    const isZeroDecimal = zeroDecimalCurrencies.includes(currency.currencyCode);

    // Formatter
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.currencyCode,
      currencyDisplay: 'symbol',
      minimumFractionDigits: isZeroDecimal ? 0 : 0,
      maximumFractionDigits: isZeroDecimal ? 0 : 2
    }).format(amount);
  } catch {
    return `${currency.currencySymbol} ${Math.round(amount).toLocaleString()}`;
  }
}
