const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultField = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

// Llenar los select con las opciones de monedas disponibles
const currencies = ["USD", "EUR", "GBP", "JPY", "MXN"]; // Puedes agregar más

currencies.forEach(currency => {
    let optionFrom = document.createElement('option');
    optionFrom.text = currency;
    optionFrom.value = currency;
    fromCurrency.appendChild(optionFrom);

    let optionTo = document.createElement('option');
    optionTo.text = currency;
    optionTo.value = currency;
    toCurrency.appendChild(optionTo);
});

// Función para realizar la conversión
convertBtn.addEventListener('click', async () => {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultField.textContent = 'Por favor ingrese una cantidad válida.';
        return;
    }

    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await response.json();
        const rate = data.rates[to];
        if (rate) {
            const result = (amount * rate).toFixed(2);
            resultField.textContent = `${amount} ${from} son ${result} ${to}`;
        } else {
            resultField.textContent = 'Moneda no soportada.';
        }
    } catch (error) {
        resultField.textContent = 'Error al obtener los datos de conversión.';
    }
});
