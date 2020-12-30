class Section {
	constructor(key, value, small=0) {
		this.key = key;
		this.value = value;
		this.small = small;
	}
}

class M3u8 {
	constructor(title) {
		this.sections = [];
		this.title = title;
	}
	addSection(section) {
		this.sections.push(section);
	}
}

function format() {
	// Create the result container if it doesn't exist
	let elem = document.getElementById("result");
	if (elem === "undefined" || elem == null) {
		let container = document.getElementById("result-container");
		container.innerHTML = `<div class="container" id="result"></div>`;
	}
	let resultBox = document.getElementById("result");

	// Get the formatted m3u8 object
	let input = document.getElementById("in-box").value
	let m3u8 = getFormattedM3u8(input);

	// Add all the sections to the dom
	for (let i = 0; i < m3u8.sections.length; i++) {
		resultBox.insertAdjacentHTML("beforeend", 
			`<p class="section">
			<strong class="section-title">${m3u8.sections[i].key}</strong>
			${m3u8.sections[i].value}
			${m3u8.sections[i].small === 0 ? '' : ('<br /><small>' + m3u8.sections[i].small + '</small>')}</p>`
		);
	}
}

function getFormattedM3u8(raw) {
	let sections = raw.split("#");
	let obj = new M3u8(sections[0]);
	obj.title = sections[1];
	for (let i = 2; i < sections.length; i++) {
		let splits = sections[i].split(":");
		let key = splits[0];
		let entireValue = splits.slice(1).join(":");
		entireValue = entireValue.replaceAll(",", ", ");

		let newlineIndex = entireValue.indexOf("\n");
		if (newlineIndex !== -1 && newlineIndex !== entireValue.length - 1) {
			console.log(entireValue);
			console.log(newlineIndex);
			let small = entireValue.substring(newlineIndex + 1);
			entireValue = entireValue.substring(0, newlineIndex);
			obj.addSection(new Section(key, entireValue, small));
		} else {
			obj.addSection(new Section(key, entireValue));
		}
	}
	return obj;
}