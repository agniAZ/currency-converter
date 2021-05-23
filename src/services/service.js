import axios from 'axios';

const errorScenario = `
<div class="col-12 row m-3 p-0"> 
    <i id="exclamationError" class="fas fa-exclamation-triangle col-1 p-0 d-flex justify-content-center"></i>
    <p class="m-0 p-0 col-10">
     Unfortunately something went wrong. Please try again, or <a href="https://www.adyen.com/contact" target="blank"> contact us</a>.
    </p>
</div>
`;

export async function currencyList() {
    try {
        const res = await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=d7e201abe75e487af5e1192fef7ba3c0&`)

        const currencyList = Object.keys(res.data.rates)
        return currencyList
    } catch (error) {
        document.querySelector("#currencyConverter").innerHTML = errorScenario;
    }
}

export async function exchangeRate(firstCurrency, secondCurrency, amount) {
    if (amount >= 1) {
        try {
            const res = await axios.get(`http://api.exchangeratesapi.io/v1/convert?access_key=d7e201abe75e487af5e1192fef7ba3c0&from=${firstCurrency}&to=${secondCurrency}&amount=${amount}`)
            const exchangeRates = res.data
            return exchangeRates
        } catch (error) {
            document.querySelector("#currencyConverter").innerHTML = errorScenario;
        }
    } else ''
}

export async function currencyHistory(firstCurrency, secondCurrency, date) {
    try {
        const res = await axios.get(`https://api.exchangeratesapi.io/v1/${date}?access_key=d7e201abe75e487af5e1192fef7ba3c0&base=${firstCurrency}&symbols=${secondCurrency}`)
        const currencyHistory = res.data

        return Object.values(currencyHistory.rates);
    } catch (error) {
        document.querySelector("#comparingRate").innerHTML = errorScenario;
        document.querySelector('#myChart').style.display = 'none'
    }
}