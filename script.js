document.addEventListener('DOMContentLoaded', function() {
    const content = document.getElementById('content');

    // Initial load - show portfolio
    loadPortfolio();

    // Event listeners for tabs
    document.getElementById('portfolio-tab').addEventListener('click', loadPortfolio);
    document.getElementById('contact-tab').addEventListener('click', loadContact);

    function loadPortfolio() {
        content.innerHTML = `
            <h2>portfolio</h2>
            <p>this is the portfolio page</p>
        `;
    }

    function loadContact() {
        content.innerHTML = `
            <h2>contact</h2>
            <p>this is the contact page</p>
        `;
    }
});
