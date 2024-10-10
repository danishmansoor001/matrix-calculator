class MatrixCalculator {
    constructor() {
        this.matrixA = [];
        this.matrixB = [];
        this.size = 0;
    }

    createMatrices() {
        const sizeInput = document.getElementById("matrixSize");
        this.size = parseInt(sizeInput.value);
        
        if (isNaN(this.size) || this.size < 1) {
            alert("Please enter a valid matrix size.");
            return;
        }

        const matricesContainer = document.getElementById("matrices");
        matricesContainer.innerHTML = ""; // Clear existing matrices

        this.matrixA = this.createMatrixInputs("A");
        this.matrixB = this.createMatrixInputs("B");
    }

    createMatrixInputs(matrixName) {
        const matrixDiv = document.createElement("div");
        matrixDiv.className = "matrix";
        const title = document.createElement("h2");
        title.textContent = `Matrix ${matrixName}`;
        matrixDiv.appendChild(title);

        const inputs = [];
        for (let i = 0; i < this.size; i++) {
            const rowDiv = document.createElement("div");
            for (let j = 0; j < this.size; j++) {
                const input = document.createElement("input");
                input.type = "number";
                input.className = `matrix-input`;
                input.value = 0;
                rowDiv.appendChild(input);
                inputs.push(input);
            }
            matrixDiv.appendChild(rowDiv);
        }
        document.getElementById("matrices").appendChild(matrixDiv);
        return inputs;
    }

    rebuildMatrices() {
        this.matrixA = [];
        this.matrixB = [];
        
        const aInputs = document.querySelectorAll('#matrices .matrix:nth-child(1) .matrix-input');
        const bInputs = document.querySelectorAll('#matrices .matrix:nth-child(2) .matrix-input');

        for (let i = 0; i < this.size; i++) {
            this.matrixA[i] = [];
            this.matrixB[i] = [];
            for (let j = 0; j < this.size; j++) {
                this.matrixA[i][j] = parseFloat(aInputs[i * this.size + j].value) || 0;
                this.matrixB[i][j] = parseFloat(bInputs[i * this.size + j].value) || 0;
            }
        }
    }

    addMatrix() {
        this.rebuildMatrices();
        const result = this.matrixA.map((row, i) =>
            row.map((value, j) => (value + this.matrixB[i][j]).toFixed(2))
        );
        this.displayResult(result);
    }

    subtractMatrix() {
        this.rebuildMatrices();
        const result = this.matrixA.map((row, i) =>
            row.map((value, j) => (value - this.matrixB[i][j]).toFixed(2))
        );
        this.displayResult(result);
    }

    clearMatrices() {
        const inputs = document.querySelectorAll('.matrix-input');
        inputs.forEach(input => input.value = 0);
        this.displayResult([]);
    }

    displayResult(result) {
        const resultContainer = document.getElementById("resultMatrix");
        resultContainer.innerHTML = ""; // Clear previous result
        const resultDiv = document.createElement("div");
        resultDiv.className = "matrix";
        resultDiv.appendChild(document.createElement("h2")).textContent = "Result Matrix";

        if (result.length === 0) {
            resultDiv.textContent = "No result to display.";
        } else {
            result.forEach(row => {
                const rowDiv = document.createElement("div");
                row.forEach(value => {
                    const resultInput = document.createElement("span");
                    resultInput.textContent = value;
                    resultInput.style.margin = "5px";
                    rowDiv.appendChild(resultInput);
                });
                resultDiv.appendChild(rowDiv);
            });
        }
        resultContainer.appendChild(resultDiv);
    }
}

const mc = new MatrixCalculator();
