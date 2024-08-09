export function renderHeaderBar() {
    const headerElement = document.getElementById("vision");
    headerElement.innerHTML = `
        <div id="heading-container">
            <img width="80px" alt="Logo" height="80px" src="Photos/logo.png">
            <div id="heading-text-container">
                <h1>Find the best substitutes for your recipe ingredients!</h1>
            </div>
        </div>
    `;
}
