let errorScenario = `
<div class="col-12 row m-3 p-0"> 
    <i id="exclamationError" class="fas fa-exclamation-triangle col-1 p-0 d-flex justify-content-center"></i>
    <p class="m-0 p-0 col-10">
     Unfortunately something went wrong. Please try again, or <a href="https://www.adyen.com/contact" target="blank"> contact us</a>.
    </p>
</div>
`;

export async function currencyList() {
    try {
        let res = await axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=d7e201abe75e487af5e1192fef7ba3c0&')

        let currencyList = Object.keys(res.data.rates)
        return currencyList
    } catch (error) {
        document.getElementById("currencyConverter").innerHTML= errorScenario;
    }
}

export async function exchangeRate(firstCurrency, secondCurrency, amount) {
    if (amount >= 1) {
        try {
            let res = await axios.get(`http://api.exchangeratesapi.io/v1/convert?access_key=d7e201abe75e487af5e1192fef7ba3c0&from=${firstCurrency}&to=${secondCurrency}&amount=${amount}`)
            let exchangeRates = res.data
            return exchangeRates
        } catch (error) {
            document.getElementById("currencyConverter").innerHTML= errorScenario;
        }
    } else ''
}

export async function currencyHistory(firstCurrency, secondCurrency, date) {
    try {
        let res = await axios.get(`https://api.exchangeratesapi.io/v1/${date}?access_key=d7e201abe75e487af5e1192fef7ba3c0&base=${firstCurrency}&symbols=${secondCurrency}`)
        let currencyHistory = res.data

        return currencyHistory;
    } catch (error) {
        document.getElementById("comparingRate").innerHTML= errorScenario;
        document.getElementById('myChart').style.display = 'none'
    }
}