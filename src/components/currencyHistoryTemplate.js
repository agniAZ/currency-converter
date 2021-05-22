import {
    currencyHistory
} from './../services/service.js';

import {
    formatDate
} from '../util/util.js';


let currencyHistoryChartTemplate = document.getElementById('currencyHistory');

let currencyHistoryChart = `
  
      <div class="card p-4 mt-3">
      <div>
        <h3>
        Currency history
        </h3>
        <p id="comparingRate">
        </p>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
  `;

const defaultFirstCurrency = 'EUR';
const defaultSecondCurrency = 'USD';

export async function displayCurrencyHistory(firstCurrency, secondCurrency, amount) {
    let dateToday = formatDate()[0];
    let dateYesterday = formatDate()[1];
    let dateLastWeek = formatDate()[2];
    let dateLastMonth = formatDate()[3];
    let dateLastYear = formatDate()[4];

    if (amount >=1) {
        currencyHistoryChartTemplate.innerHTML = currencyHistoryChart;
        document.getElementById("currencyHistory").style.visibility="visible"

        let historyToday = (Object.values((await currencyHistory(firstCurrency || defaultFirstCurrency, secondCurrency || defaultSecondCurrency, dateToday)).rates)).toString();
        let historyYesterday = Object.values((await currencyHistory(firstCurrency || defaultFirstCurrency, secondCurrency || defaultSecondCurrency, dateYesterday)).rates);
        let historyLastWeek = Object.values((await currencyHistory(firstCurrency || defaultFirstCurrency, secondCurrency || defaultSecondCurrency, dateLastWeek)).rates);
        let historyLastMonth = Object.values((await currencyHistory(firstCurrency || defaultFirstCurrency, secondCurrency || defaultSecondCurrency, dateLastMonth)).rates);
        let historyLastYear = (Object.values((await currencyHistory(firstCurrency || defaultFirstCurrency, secondCurrency || defaultSecondCurrency, dateLastYear)).rates)).toString();
        
        historyChart(secondCurrency, historyToday, historyYesterday, historyLastWeek, historyLastMonth, historyLastYear);
        
        comparingRate.innerText = `Comparing ${secondCurrency} to 1 ${firstCurrency}`
    } else ''
}

function historyChart(secondCurrency, historyToday, historyYesterday, historyLastWeek, historyLastMonth, historyLastYear) {
    let maxValue = (parseFloat(historyToday)+1)
    const labels = [
        'Rate last year',
        'Rate last month',
        'Rate last week',
        'Rate yesterday',
        'Rate today',
    ];
    const data = {
        labels: labels,
        datasets: [{
            label: `${secondCurrency}`,
            backgroundColor: '#0abf53',
            borderColor: '#00112c',
            data: [historyLastYear, historyLastMonth, historyLastWeek, historyYesterday, historyToday, maxValue],
        }]
    };
    const config = {
        type: 'line',
        data,
        options: {}
    };
    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}