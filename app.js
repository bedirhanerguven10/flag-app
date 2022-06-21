
const fetchCountry = async (name) => {
	const url = `https://restcountries.com/v3.1/name/${name}`
	try {
		const res = await fetch(url);
		if (!res.ok) {
			renderError('Sth went wrong! : '+ res.status);
			throw new Error();
		}
		const data = await res.json();
		renderCountry(data[0]);
		
	} catch (error) {
		console.log(error)
	}
	
}

const renderError = (err) => {
	const countriesDiv = document.querySelector('.countries');
	countriesDiv.innerHTML += `
	<h1 class="text-danger">${err}</h1>
	<img src="https://www.webtekno.com/images/editor/default/0003/49/68674529551899935909208749f998525f2ebf13.jpeg" alt="" >  `
};

const renderCountry = (country) => {
	console.log(country);
	const countriesDiv = document.querySelector(".countries");
  
	const {
	  capital,
	  name: { common },
	  region,
	  flags: { svg },
	  languages,
	  currencies,
	} = country;
  
	countriesDiv.innerHTML = `
	<div class="card shadow-lg" style="width: 18rem;">
	  <img src="${svg}" class="card-img-top" alt="...">
	  <div class="card-body">
		<h5 class="card-title">${common}</h5>
		<p class="card-text">${region}</p>
	  </div>
	  <ul class="list-group list-group-flush">
		<li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
		<li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
		  languages
		)}</li>
		<li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
		  Object.values(currencies)[0].name
		} (${Object.values(currencies)[0].symbol}) </li>
	  </ul>
	</div>
	`;
  };

  const countriesDiv = document.querySelector(".countries");

  const getCountry = async () => {
	const lands = await fetch("https://restcountries.com/v3.1/all");
	if (!lands.ok) {
	  renderError(`Something went wrong: ${lands.status}`);
	  throw new Error();
	}
	const data = await lands.json();
	const countryNamesVar = await data.map(function (item, index) {
	  return item["name"].common;
	});
	// console.log(countryNamesVar);
	const countryNames = countryNamesVar.sort()
	// console.log(countryNames);
	countryNames.forEach((x) => {
	  nameSelector.innerHTML += `<option value=${x}>${x}</option>`
	});
  };
  
  const nameSelector = document.querySelector(".nameSelection");
  getCountry();
  
  nameSelector.addEventListener("change", (e) => {
	fetchCountry(nameSelector.value)
  })

  fetchCountry('Australia')