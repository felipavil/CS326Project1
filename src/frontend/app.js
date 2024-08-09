document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const resultContainer = document.getElementById("result-container");

    searchButton.addEventListener("click", async () => {
        const ingredient = searchInput.value.trim().toLowerCase();
        resultContainer.innerHTML = ""; // Clear previous results
        if (ingredient) {
            const response = await fetch(`/api/substitutes?ingredient=${ingredient}`);
            const data = await response.json();
            if (data.substitute === "No substitute found for this ingredient.") {
                resultContainer.textContent = data.substitute;
                createNewSubstituteInput(ingredient); // Add the new input fields
            } else {
                resultContainer.textContent = data.substitute;
            }
        } else {
            resultContainer.textContent = "Please enter an ingredient.";
        }
    });

    function createNewSubstituteInput(ingredient) {
        const newSubstituteContainer = document.createElement("div");
        newSubstituteContainer.id = "new-substitute-container";
        newSubstituteContainer.innerHTML = `
            <p>Would you like to add a substitute for "${ingredient}"?</p>
            <input type="text" id="new-substitute-input" placeholder="Enter the substitute">
            <button id="submit-substitute-button">Submit</button>
        `;

        resultContainer.appendChild(newSubstituteContainer);

        const submitButton = document.getElementById("submit-substitute-button");
        submitButton.addEventListener("click", async () => {
            const newSubstitute = document.getElementById("new-substitute-input").value.trim();
            if (newSubstitute) {
                const response = await fetch('/api/add-substitute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ingredient: ingredient,
                        substitute: newSubstitute
                    })
                });
                const result = await response.json();
                if (result.status === "ok") {
                    resultContainer.innerHTML = `Substitute for "${ingredient}" added successfully!`;
                } else {
                    resultContainer.innerHTML = `Error adding substitute: ${result.error}`;
                }
            } else {
                alert("Please enter a substitute before submitting.");
            }
        });
    }
});
