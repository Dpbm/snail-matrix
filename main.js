const defaultValue = '1';

const sideText = document.getElementById('side-text');
const slider = document.getElementById('side');
const matrixElement = document.getElementById('matrix');

const buildSideText = (x) => `side: ${x}`;

const log = (x) => console.log(`[!] ${x}`);
const logTable = (table) => console.table(table);
const reverse = (x) => x * -1;

function calculateMatrix(side) {
	if (side == 1) return [[1]];

	const matrix = Array.from(Array(side), () => new Array(side));

	let currentSize = side - 1;
	let counter = 0;
	let currentValue = side;

	let i = 1;
	let j = side - 1;

	let iRelativeDir = 1;
	let jRelativeDir = -1;

	//first row
	for (let curr = 0; curr < side; curr++) {
		matrix[0][curr] = currentValue;
		currentValue += side;
	}

	while (counter <= 2 && currentSize >= 1) {
		if (counter == 2) {
			counter = 0;
			currentSize--;
			continue;
		}

		const dir = counter;

		if (dir == 0) {
			//vertical
			for (let curr = 0; curr < currentSize; curr++) {
				matrix[i][j] = currentValue;
				currentValue += side;
				i += iRelativeDir;
			}

			iRelativeDir = reverse(iRelativeDir);
			i += iRelativeDir;
			j += jRelativeDir;
		} else {
			//horizontal
			for (let curr = 0; curr < currentSize; curr++) {
				matrix[i][j] = currentValue;
				currentValue += side;
				j += jRelativeDir;
			}

			jRelativeDir = reverse(jRelativeDir);

			i += iRelativeDir;
			j += jRelativeDir;
		}

		counter++;
	}

	return matrix;
}

function draw(matrix) {
	matrixElement.innerHTML = '';

	for (let row of matrix) {
		const rowContainer = document.createElement('div');
		rowContainer.className = 'matrix-row';

		for (let col of row) {
			const elementContainer = document.createElement('div');
			elementContainer.className = 'value-container';

			const value = document.createElement('p');
			value.innerText = String(col);

			elementContainer.appendChild(value);
			rowContainer.appendChild(elementContainer);
		}
		matrixElement.appendChild(rowContainer);
	}
}

// init default values
slider.value = defaultValue;
sideText.innerText = buildSideText(defaultValue);
draw(calculateMatrix(parseInt(defaultValue)));

slider.addEventListener('change', (event) => {
	const value = event.target.value;
	log(`changed slider to ${value}`);

	sideText.innerHTML = buildSideText(value);

	log(`calculating matrix side ${value}`);
	const matrix = calculateMatrix(parseInt(value));
	logTable(matrix);

	draw(matrix);
});
