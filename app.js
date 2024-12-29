const firstInput = document.querySelector("#firstInput");
const secondInput = document.querySelector("#secondInput");
const firstSelect = document.querySelector("#firstSelect");
const secondSelect = document.querySelector("#secondSelect");
const icon = document.querySelector("#icon");


runEventListeners();

function runEventListeners() {
    firstInput.addEventListener("input", exchangeFirst)
    secondInput.addEventListener("input", exchangeSecond)
    icon.addEventListener("click", changeSelectItem)
}
function changeSelectItem() {
    let temp;
    temp = firstSelect.value;
    firstSelect.value = secondSelect.value;
    secondSelect.value = temp;
}
function exchangeFirst() {
    const amount = firstInput.value;
    const firstOptionValue = firstSelect.options[firstSelect.selectedIndex].textContent;
    const secondOptionValue = secondSelect.options[secondSelect.selectedIndex].textContent;

    currency(amount, firstOptionValue, secondOptionValue)
        .then((result) => {
            secondInput.value = result;
        })
}
function exchangeSecond() {
    const amount = secondInput.value;
    const firstOptionValue = firstSelect.options[firstSelect.selectedIndex].textContent;
    const secondOptionValue = secondSelect.options[secondSelect.selectedIndex].textContent;

    currency(amount, secondOptionValue, firstOptionValue)
        .then((result) => {
            firstInput.value = result;
        })
}
async function currency(amount, firstOptionValue, secondOptionValue) {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=`;

    const response = await fetch(`${url}${firstOptionValue}`);
    const result = await response.json();
    const exchangedResult = (amount * result.data[secondOptionValue].value).toFixed(4);
    return exchangedResult;

}