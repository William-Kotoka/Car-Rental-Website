// menu items display
const navLinks = document.querySelector(".nav-links");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const links = navLinks.querySelectorAll("a");
const searchBox = document.getElementById('search-box')

menuBtn.addEventListener('click', () => {
    navLinks.style.display = 'block';
    menuBtn.style.display = 'none';
    closeBtn.style.display = 'block';
    searchBox.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
    navLinks.style.display = 'none';
    menuBtn.style.display = 'block';
    closeBtn.style.display = 'none';
    searchBox.style.display = 'block';
});


// Media query for screens with a maximum width of 769px
const mediaQuery = window.matchMedia('(max-width: 769px)');

// Function to handle media query changes
function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
        navLinks.style.display = 'none';
        menuBtn.style.display = 'block';
        closeBtn.style.display = 'none';
        searchBox.style.display = 'block';


        links.forEach(function (link) {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
                menuBtn.style.display = 'block';
                closeBtn.style.display = 'none';
                searchBox.style.display = 'block';
            });
        });
    } else {
        navLinks.style.display = 'block';
        menuBtn.style.display = 'none';
        closeBtn.style.display = 'none';

        links.forEach(function (link) {
            link.addEventListener('click', () => {
                navLinks.style.display = 'block';
                menuBtn.style.display = 'none';
                closeBtn.style.display = 'none';
            });
        });
    }
}

// Initial check and event listener for media query changes
handleMediaQueryChange(mediaQuery);
mediaQuery.addListener(handleMediaQueryChange);


function toggleAccordion(section) {
    // Toggle the active class to expand/collapse the accordion section
    section.classList.toggle('active');

    // Hide/show the content within the clicked section
    let content = section.querySelector('.accordion-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';

    // Close other open sections
    let allSections = document.querySelectorAll('.accordion-section');
    allSections.forEach(function (otherSection) {
        if (otherSection !== section && otherSection.classList.contains('active')) {
            otherSection.classList.remove('active');
            otherSection.querySelector('.accordion-content').style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {

    setTimeout(function () {
        let element1 = document.getElementsByClassName('element1');
        Array.from(element1).forEach(function (element) {
            element.classList.add('active');
        });
    }, 100);

    setTimeout(function () {
        let element2 = document.getElementsByClassName('element2');
        Array.from(element2).forEach(function (element) {
            element.classList.add('active');
        });
    }, 100);

    setTimeout(function () {
        let element3 = document.getElementsByClassName('element3');
        Array.from(element3).forEach(function (element) {
            element.classList.add('active');
        });
    }, 100);


    let revealElements = document.querySelectorAll('.reveal-element');

    function revealOnScroll() {
        revealElements.forEach(function (element) {
            let elementTop = element.getBoundingClientRect().top;
            let windowHeight = window.innerHeight;

            // If the element is in the viewport, add the "active" class
            if (elementTop < windowHeight) {
                element.classList.add('active');
            }
        });
    }

    // Initial check on page load
    revealOnScroll();

    // Add event listener for the scroll event
    window.addEventListener('scroll', revealOnScroll);
});


// Open search modal
function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.style.display = 'block';
}

// Close search modal
function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.style.display = 'none';
}


// SEARCH FUNCTIONALITY
fetch('cardsData.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('searchInput').addEventListener('input', function (event) {
            const searchTerm = event.target.value.toLowerCase();
            const searchResultsElement = document.getElementById('searchResults');
            searchResultsElement.innerHTML = '';

            const searchMessage = document.createElement('div')
            searchMessage.classList.add('search-messages')

            if (searchTerm === '') {
                searchMessage.textContent = 'Please enter a search term';
                searchResultsElement.appendChild(searchMessage);
            } else {
                const results = search(data, searchTerm);
                if (results.length === 0) {
                    searchMessage.textContent = 'Oops! No results found';
                    searchResultsElement.appendChild(searchMessage);
                } else {
                    results.forEach(item => {
                        const itemElement = document.createElement('div');
                        itemElement.classList.add('card-container');
                        itemElement.innerHTML = `
                        <img src="${item.mainImageUrl}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <div>
                            <p>${item.price}</p>
                            <p>${item.location}</p>
                        </div>
                        <button data-card="${encodeURIComponent(JSON.stringify(item))}" onclick="openModalFromButton(this)">Book Now</button>
                      `

                        itemElement.addEventListener('click', () => {
                            openModal(item);
                            searchModal.style.display = 'none';
                        });

                        searchResultsElement.appendChild(itemElement);
                    });
                }
            }
        });
    })
    .catch(error => console.error('Error loading JSON data:', error));



// Search function
function search(data, searchTerm) {
    return data.filter(item => {
        // Check if the name matches the search term or contains the search term
        return item.name.toLowerCase().includes(searchTerm);
    });
}
