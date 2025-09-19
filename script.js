const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultParagraph = document.getElementById('result');

const currenciesURL = 'https://currencycalculator-d9d0b-default-rtdb.europe-west1.firebasedatabase.app/currencies.json';
const exchangeRateURLs = {
  EUR: 'https://currencycalculator-d9d0b-default-rtdb.europe-west1.firebasedatabase.app/EUR.json',
  PLN: 'https://currencycalculator-d9d0b-default-rtdb.europe-west1.firebasedatabase.app/PLN.json',
  UAH: 'https://currencycalculator-d9d0b-default-rtdb.europe-west1.firebasedatabase.app/UAH.json',
  USD: 'https://currencycalculator-d9d0b-default-rtdb.europe-west1.firebasedatabase.app/USD.json',
};

fetch(currenciesURL)
  .then(response => response.json())
  .then(currencies => {
    const currencyArray = currencies.split(',');
    currencyArray.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      toCurrencySelect.appendChild(option2);
    });
  })
  .catch(error => console.error('Error loading currencies:', error));

convertBtn.addEventListener('click', () => {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount)) {
    resultParagraph.textContent = 'Invalid amount';
    return;
  }

  fetch(exchangeRateURLs[fromCurrency])
    .then(response => response.json())
    .then(exchangeRates => {
      const exchangeRate = exchangeRates[toCurrency];
      if (exchangeRate) {
        const convertedAmount = amount * exchangeRate;
        resultParagraph.textContent = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      } else {
        resultParagraph.textContent = 'Invalid currency selection';
      }
    })
    .catch(error => console.error('Error loading exchange rates:', error));
});
