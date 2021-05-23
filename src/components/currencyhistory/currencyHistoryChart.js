//generates graph populated with data that is being pased in the function with argument(s)
export function historyChart(secondCurrency, historyToday, historyYesterday, historyLastWeek, historyLastMonth, historyLastYear) {
    const maxValue = (parseFloat(historyToday)+1)
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
    const myChart = new Chart(
        document.querySelector('#myChart'),
        config
    );
}