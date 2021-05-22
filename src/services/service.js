export function currencyList() {
    let currencyList = fetch('http://api.exchangeratesapi.io/v1/latest?access_key=d7e201abe75e487af5e1192fef7ba3c0&')
        .then(response => response.json());
    return currencyList;
}

export function exchangeRate(firstCurrency, secondCurrency, amount) {
    if (amount >= 1) {
        let exchangeRates = fetch(`http://api.exchangeratesapi.io/v1/convert?access_key=d7e201abe75e487af5e1192fef7ba3c0&from=${firstCurrency}&to=${secondCurrency}&amount=${amount}`)
            .then(response => response.json());
        return exchangeRates
    } else ''
}

export function currencyHistory(firstCurrency, secondCurrency, date) {
    let currencyHistory = fetch(`https://api.exchangeratesapi.io/v1/${date}?access_key=d7e201abe75e487af5e1192fef7ba3c0&base=${firstCurrency}&symbols=${secondCurrency}`)
        .then(response => response.json());
    return currencyHistory;
}