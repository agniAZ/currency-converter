import {
    currencyHistory
} from '../../services/service.js';

import {
    formatDate
} from '../../util/util.js';

import {historyChart} from './currencyHistoryChart.js'

const currencyHistoryChartTemplate = document.querySelector('#currencyHistory');

const currencyHistoryChart = `
  
      <div class='card p-4 mt-3'>
      <div>
        <h2>
        Currency history
        </h2>
        <p id='comparingRate'>
        </p>
        <canvas id='myChart'></canvas>
      </div>
  `;
const defaultFirstCurrency = 'EUR';
const defaultSecondCurrency = 'USD';

//displays the currency history and if the input amount has a value of at least 1, generates graph
export async function displayCurrencyHistory(firstCurrency, secondCurrency, amount) {
    const dateToday = formatDate()[0];
    const dateYesterday = formatDate()[1];
    const dateLastWeek = formatDate()[2];
    const dateLastMonth = formatDate()[3];
    const dateLastYear = formatDate()[4];
    
    const first = firstCurrency || defaultFirstCurrency;
    const second = secondCurrency || defaultSecondCurrency;

    const historyToday =  (await currencyHistory(first, second, dateToday)).toString();
    const historyYesterday = (await currencyHistory(first, second, dateYesterday)).toString();
    const historyLastWeek = (await currencyHistory(first, second, dateLastWeek)).toString();
    const historyLastMonth = (await currencyHistory(first, second, dateLastMonth)).toString();
    const historyLastYear = (await currencyHistory(first, second, dateLastYear)).toString();
    
    if (amount >=1) {
        currencyHistoryChartTemplate.innerHTML = currencyHistoryChart;
        document.querySelector('#currencyHistory').style.visibility='visible';
        comparingRate.innerText = `Comparing ${secondCurrency} to 1 ${firstCurrency}`;
        historyChart(secondCurrency, historyToday, historyYesterday, historyLastWeek, historyLastMonth, historyLastYear);
    } else ''
}
