export function renderSearch() {
    const searchSection = document.getElementById("search");
    searchSection.innerHTML = `
        <h2>Search for Ingredient Substitutes</h2>
        <div class="search-container">
            <input type="text" id="search-input" placeholder="Enter ingredient">
            <button id="search-button">Search</button>
        </div>
        <div id="result-container"></div>
    `;
}

export function renderAddItem() {
    const addItemSection = document.getElementById("add-items");
    addItemSection.innerHTML = `
        <h2>Add Items</h2>
        <p>Instructions on how to add items will go here.</p>
    `;
}
