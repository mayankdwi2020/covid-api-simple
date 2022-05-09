//Selecting elements
const lastUpdated = document.getElementById("lu");
const newCases = document.getElementById("nc");
const newDeaths = document.getElementById("nd");
const totalCases = document.getElementById("tc");
const totalDeaths = document.getElementById("td");
const totalRecovered = document.getElementById("tr");

//Fetch & Async/Await
async function covidData() {
  const response = await fetch(
    "https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true"
  );
  const data = await response.json();

  const stats = (key, value) => {
    key.innerText = data[value];
  };

  console.log(data);
  //Trimming date
  let updatedDate = new Date(data.lastUpdatedAtApify);
  let newUpdatedDate = updatedDate.toISOString().slice(0, 10);
  lastUpdated.innerHTML = newUpdatedDate;

  stats(newCases, "activeCasesNew");
  stats(newDeaths, "deathsNew");

  //Converting numbers to comma separated thousand place numbers
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const deathsTotal = numberWithCommas(data.deaths);
  const recoveredTotal = numberWithCommas(data.recovered);
  const casesTotal = numberWithCommas(data.activeCases);
  totalDeaths.innerHTML = deathsTotal;
  totalRecovered.innerHTML = recoveredTotal;
  totalCases.innerHTML = casesTotal;
}
covidData();
