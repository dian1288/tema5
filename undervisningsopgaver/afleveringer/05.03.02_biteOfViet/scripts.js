let retter = [];
let filter = "menu";


document.addEventListener("DOMContentLoaded", start);

function start() {

	hentJson();

	// het JSON fil i asynkron function
	async function hentJson() {
		//henter data filen
		let jsonData = await fetch("https://mandalskeawebspace.dk/claude_php/clean_up_spreadsheet.php?id=1PPbP0cyzwGjNo1hDRNzMisxBzaGMuRjCLv_9F0-wpQ0");
		//Hvis man skulle hente data udefra
		// alternativ for at hente json filen: let jsonData = await fetch("dyrene.json");



		console.log(jsonData);
		retter = await jsonData.json()
		console.log(retter);
		retter.sort((a, b) => {
			return a.navn.localeCompare(b.id);
		})
		visRetter();
	}


	let dest = document.querySelector("#menu-container");

	function visRetter() {
		dest.innerHTML = "";
		retter.forEach(ret => {
			if (filter == "menu" || filter == ret.kategori) {
				let template = `

				<article class="menu-container">
				<img src="img//${ret.billede}.jpg" alt="${ret.navn}">
				<div class="ret-child">
				<h3>${ret.navn}</h3>
				<p>${ret.kort}</p>
				<p>Pris: ${ret.pris} ,-</p>
				</div>
				</article>`;


				dest.insertAdjacentHTML("beforeend", template),
					dest.lastElementChild.addEventListener("click", () => {
						location.href = "singleSide.html?id=" + ret.id;
					});

			}
		});

	}

	document.querySelectorAll(".filter").forEach(elm => {
		elm.addEventListener("click", filtrering);
	})

	function filtrering() {
		filter = this.getAttribute("data-hold");


		document.querySelectorAll(".filter").forEach(elm => {
			elm.classList.remove("valgt");
		})
		this.classList.add("valgt");
		visRetter();
	}

}
