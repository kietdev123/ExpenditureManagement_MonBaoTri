import axios from 'axios';

const APIService = {
  parseExchangeRate: responseData => {
    return responseData.rates;
  },

  loadExchangeRate: async () => {
    try {
      const exchangeRateUrl = 'https://api.exchangerate.host/latest';
      const exchangeRateResponse = await axios.get(exchangeRateUrl);

      if (exchangeRateResponse.status === 200) {
        return APIService.parseExchangeRate(exchangeRateResponse.data);
      } else {
        throw new Error('Failed to load exchange rate data');
      }
    } catch (error) {
      console.error(error);
    }
  },

  parseCountry: async responseData => {
    const listSymbol = await APIService.getSymbolCurrency();

    const list = responseData.countries.country.map(e => {
      const item = {};
      const symbol = listSymbol.find(
        element => element.abbreviation === e.currencyCode,
      );

      item.countryName = e.countryName;
      item.currencyCode = e.currencyCode;
      item.symbol = symbol ? symbol.symbol : '';

      if (!item.symbol) {
        item.symbol = '';
      }

      return item;
    });

    return list;
  },

  loadCountries: async () => {
    try {
      const countriesUrl =
        'https://gist.githubusercontent.com/ngoctienUIT/e81b1119d12c6dadfa3b7902a80e0928/raw/f621703926fc13be4f618fb4a058d0454177cceb/countries.json';
      const countriesResponse = await axios.get(countriesUrl);

      if (countriesResponse.status === 200) {
        return await APIService.parseCountry(countriesResponse.data);
      } else {
        throw new Error('Failed to load countries data');
      }
    } catch (error) {
      console.error(error);
    }
  },

  getSymbolCurrency: async () => {
    try {
      const url =
        'https://gist.githubusercontent.com/ngoctienUIT/dcc4088614d668816352eb1b2b16a5c8/raw/28d6e58f99ba242b7f798a27877e2afce75a5dca/currency-symbols.json';
      const response = await axios.get(url);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to load symbol currency data');
      }
    } catch (error) {
      console.error(error);
    }

    return [];
  },
};

export default APIService;
