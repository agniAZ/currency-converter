import {
  currencyList,
  exchangeRate,
} from '../../services/service.js'

import {
  displayCurrencyHistory
} from '../currencyhistory/currencyHistoryTemplate.js'

const currencyConverterTemplate = document.getElementById('converter');

const currencyConverter = `
<div class="card p-4 mt-3">
  <div class="col-md-12 row m-0">
    <div class="row col-12">
      <h2>
      Currency converter
      </h2>
    </div>
    <div class="row mt-5 ml-1" id="errorMsg">
    </div>
    <div id="currencyConverter" class="row col-12 p-0">
      <div class="col-lg-10">
        <div class="currency row mt-5 mb-5 ">
          <div class="col-sm-10 d-flex justify-content-end">
            <input type="number" lang="en" step="0.01" id="fromAmount" placeholder="Currency I have" min="0" />
          </div>
          <div class="col-sm-1 row d-flex justify-content-end">
            <select id="selectfirstCurrency">
            </select>
          </div>
        </div>
        <div class="currency row mt-5 mb-5">
          <div class="col-sm-10 d-flex justify-content-end">
            <input type="number" id="toAmount" min="0" disabled/>
          </div>
          <div class="col-sm row d-flex justify-content-end">
            <select id="selectSecondCurrency">
            </select>
          </div>
        </div>
        
      </div>
      <div class="middle d-flex justify-content-center col-sm p-0">
          <span id="switchCurrencies">
            <i class="fas fa-exchange-alt"></i>
          </span>
      </div>
    </div>
  </div>
</div>
`;
currencyConverterTemplate.innerHTML = currencyConverter;

const firstCurrencyEl = document.getElementById('selectfirstCurrency');
const firstAmountEl = document.getElementById('fromAmount');
const secondCurrencyEl = document.getElementById('selectSecondCurrency');
const secondAmountEl = document.getElementById('toAmount');
const switchCurrencies = document.getElementById('switchCurrencies');

const defaultFirstCurrency = 'EUR';
const defaultSecondCurrency = 'USD';

const secondCurrencyInputPlaceholder = 'Currency I want'
const errorMsg = 'The amount you have entered is invalid'

firstCurrencyEl.addEventListener('change', createExchange);
firstAmountEl.addEventListener('input', createExchange);
secondCurrencyEl.addEventListener('change', createExchange);
secondAmountEl.addEventListener('input', createExchange);

switchCurrencies.addEventListener('click', () => {
  const switchCurrency = firstCurrencyEl.value;
  firstCurrencyEl.value = secondCurrencyEl.value;
  secondCurrencyEl.value = switchCurrency;
  createExchange();
});

async function populateOptionsList() {
  const listOfCurrencies = await currencyList()
  const firstCurrencyList = document.getElementById("selectfirstCurrency");
  const secondCurrencyList = document.getElementById("selectSecondCurrency");

  listOfCurrencies.forEach(function (item) {
    const optionObj = document.createElement("option");
    optionObj.textContent = item;
    firstCurrencyList.appendChild(optionObj)
  });
  listOfCurrencies.forEach(function (item) {
    const optionObj = document.createElement("option");
    optionObj.textContent = item;
    secondCurrencyList.appendChild(optionObj)
  });
  firstCurrencyList.value = defaultFirstCurrency
  secondCurrencyList.value = defaultSecondCurrency
}

populateOptionsList()

async function createExchange() {
  const amount = firstAmountEl.value
  if (amount >= 1) {
    const firstCurrency = firstCurrencyEl.value;
    const secondCurrency = secondCurrencyEl.value;
    const exchangeRates = await exchangeRate(firstCurrency, secondCurrency, amount)
    const conversionResult = exchangeRates.result
    secondAmountEl.value = conversionResult;
    displayCurrencyHistory(firstCurrency, secondCurrency, amount);
    document.getElementById("errorMsg").innerHTML = "";
  } 
  else if (amount < 0){
    document.getElementById("errorMsg").innerHTML= errorMsg;
  }
  else {
    secondAmountEl.value = ''
    secondAmountEl.placeholder = secondCurrencyInputPlaceholder;
    document.getElementById("currencyHistory").style.visibility = "hidden";
  }
}
createExchange();