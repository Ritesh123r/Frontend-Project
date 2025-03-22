// API for exchange rates
const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdown = document.querySelectorAll("#dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector("#country");
const tocurr = document.querySelector("#countrys");
const equality = document.querySelector("#equality");

// dropdowns with currency codes
for (let select of dropdown) {
  for (let currcode in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = currcode;
    newoption.value = currcode;

    if (select.name === "from" && currcode === "USD") {
      newoption.selected = "selected";
    }

    if (select.name === "to" && currcode === "INR") {
      newoption.selected = "selected";
    }

    select.append(newoption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

// Function to update flag
const updateflag = (element) => {
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let img = element.parentElement.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};

// Fetch exchange rate and update UI
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("form input");
  let amtval = parseFloat(amount.value);

  if (isNaN(amtval) || amtval <= 0) {
    amtval = 1;
    amount.value = "1";
  }

  let fromValue = fromcurr.value;
  let toValue = tocurr.value;
  const URL = `${BASE_URL}${fromValue}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    let data = await response.json();
    let rate = data.rates[toValue];

    if (rate) {
      let convertedAmount = (amtval * rate).toFixed(2);
      equality.innerText = `1 ${fromValue} = ${rate} ${toValue}`;
      alert(`${amtval} ${fromValue} = ${convertedAmount} ${toValue}`);
    } else {
      alert("Invalid conversion data received.");
    }
  } catch (error) {
    alert("Failed to fetch exchange rate.");
    console.error(error);
  }
});

