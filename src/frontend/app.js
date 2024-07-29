document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const resultContainer = document.getElementById("result-container");

    let substitutes = {};
    //get text from text file
    fetch('substitutes.txt')
        .then(response => response.text())
        .then(text => {
            const lines = text.split('\n');
            lines.forEach(line => {
                const [ingredient, substitute] = line.split(': ');
                if (ingredient && substitute) {
                    substitutes[ingredient.trim().toLowerCase()] = substitute.trim();
                }
            });
        })
        .catch(error => {
            console.error('Error fetching the substitutes:', error);
        });

    searchButton.addEventListener("click", () => {
        const ingredient = searchInput.value.trim().toLowerCase();
        if (ingredient) {
            findSubstitute(ingredient);
        }
    });
    //if not found 
    const findSubstitute = (ingredient) => {
        const substitute = substitutes[ingredient] || "No substitute found for this ingredient.";
        resultContainer.textContent = substitute;
    };
});
