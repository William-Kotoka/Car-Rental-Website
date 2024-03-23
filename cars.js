// Switching between car collections
const sportsCarsBtn = document.getElementById("sports-cars-btn");
const smallCarsBtn = document.getElementById("small-cars-btn");
const pickupTrucksBtn = document.getElementById("pickup-trucks-btn");
const suvsBtn = document.getElementById("suvs-btn");

const sportsCars = document.getElementsByClassName("container-1");
const smallCars = document.getElementsByClassName("container-2");
const pickupTrucks = document.getElementsByClassName("container-3");
const suvs = document.getElementsByClassName("container-4");

// Function to hide all elements in a collection
function hideAll(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

// Show sports cars only
sportsCarsBtn.addEventListener('click', () => {
    hideAll(smallCars);
    hideAll(pickupTrucks);
    hideAll(suvs);

    for (let i = 0; i < sportsCars.length; i++) {
        sportsCars[i].style.display = "block";
    }

    // Update button colors
    sportsCarsBtn.style.color = "var(--color-primary)";
    smallCarsBtn.style.color = "#000000";
    pickupTrucksBtn.style.color = "#000000";
    suvsBtn.style.color = "#000000";
});

// Show small cars only
smallCarsBtn.addEventListener('click', () => {
    hideAll(sportsCars);
    hideAll(pickupTrucks);
    hideAll(suvs);

    for (let i = 0; i < smallCars.length; i++) {
        smallCars[i].style.display = "block";
    }

    // Update button colors
    sportsCarsBtn.style.color = "#000000";
    smallCarsBtn.style.color = "var(--color-primary)";
    pickupTrucksBtn.style.color = "#000000";
    suvsBtn.style.color = "#000000";
});

// Show pick up trucks cars only
pickupTrucksBtn.addEventListener('click', () => {
    hideAll(sportsCars);
    hideAll(smallCars);
    hideAll(suvs);

    for (let i = 0; i < pickupTrucks.length; i++) {
        pickupTrucks[i].style.display = "block";
    }

    // Update button colors
    sportsCarsBtn.style.color = "#000000";
    smallCarsBtn.style.color = "#000000";
    pickupTrucksBtn.style.color = "var(--color-primary)";
    suvsBtn.style.color = "#000000";
});

// Show suvs cars only
suvsBtn.addEventListener('click', () => {
    hideAll(sportsCars);
    hideAll(smallCars);
    hideAll(pickupTrucks);

    for (let i = 0; i < suvs.length; i++) {
        suvs[i].style.display = "block";
    }

    // Update button colors
    sportsCarsBtn.style.color = "#000000";
    smallCarsBtn.style.color = "#000000";
    pickupTrucksBtn.style.color = "#000000";
    suvsBtn.style.color = "var(--color-primary)";
});


document.addEventListener('DOMContentLoaded', () => {
    const containerClassNames = ['container-1', 'container-2', 'container-3', 'container-4'];

    // Load cards data and create cards
    fetch('cardsData.json')
        .then(response => response.json())
        .then(data => createCards(data, containerClassNames))
        .catch(error => console.error('Error loading cards data:', error));
});


function createCards(cardsData, containerClassNames) {
    const cardContainerWrapper = document.getElementById('card-container-wrapper');

    // Clear existing content in the cardContainerWrapper
    cardContainerWrapper.innerHTML = '';

    cardsData.forEach((cardData) => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.classList.add(getContainerClassName(cardData.id));
        cardContainer.innerHTML = `
        <img src="${cardData.mainImageUrl}" alt="${cardData.name}">
        <h3>${cardData.name}</h3>
        <div>
            <p>${cardData.price}</p>
            <p>${cardData.location}</p>
        </div>
        <button data-card="${encodeURIComponent(JSON.stringify(cardData))}" onclick="openModalFromButton(this)">Book Now</button>
      `;

        // Add click event listener to open modal when card is clicked
        cardContainer.addEventListener('click', () => {
            openModal(cardData);
        });

        cardContainerWrapper.appendChild(cardContainer);
    });
}


// Function to get container class name based on card ID
function getContainerClassName(cardId) {
    if (cardId >= 1 && cardId <= 8) {
        return 'container-1';
    } else if (cardId >= 9 && cardId <= 16) {
        return 'container-2';
    } else if (cardId >= 17 && cardId <= 24) {
        return 'container-3';
    } else if (cardId >= 25 && cardId <= 32) {
        return 'container-4';
    } else {
        console.error(`Invalid card ID: ${cardId}`);
        return '';
    }
}


// Open modal with card details
function openModal(cardData) {
    if (!cardData) {
        console.error('Card data not found.');
        return;
    }

    const modal = document.getElementById('modal');
    const mainImage = document.getElementById('main-image');
    const imageGalleryContainer = document.getElementById('image-gallery-container');
    const descriptionContainer = document.getElementById('description-container');
    const formFieldsContainer = document.getElementById('form-fields-container');

    mainImage.src = cardData.mainImageUrl;
    descriptionContainer.textContent = cardData.description;

    // Create image gallery
    imageGalleryContainer.innerHTML = '';
    const mainImageGalleryItem = createGalleryItem(cardData.mainImageUrl, 'Main Image');
    mainImageGalleryItem.addEventListener('click', () => {
        mainImage.src = cardData.mainImageUrl;
    });
    imageGalleryContainer.appendChild(mainImageGalleryItem);

    cardData.imageGalleryUrls.forEach((url, index) => {
        const galleryItem = createGalleryItem(url, `Detail Image ${index + 1}`);
        galleryItem.addEventListener('click', () => {
            mainImage.src = url;
        });
        imageGalleryContainer.appendChild(galleryItem);
    });


    // Display price in the form fields
    document.getElementById('price-label').textContent = `${cardData.price}`;


    // Update form fields directly
    // document.getElementById('username').value = '';
    // document.getElementById('email').value = '';
    // document.getElementById('date').value = '';

    modal.style.display = 'block';
}


//Open modal from button
function openModalFromButton(button) {
    const encodedCardData = button.getAttribute('data-card');
    const cardData = JSON.parse(decodeURIComponent(encodedCardData));
    openModal(cardData);
}


// Create a gallery item with an image
function createGalleryItem(url, alt) {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    const galleryImage = document.createElement('img');
    galleryImage.src = url;
    galleryImage.alt = alt;
    galleryItem.appendChild(galleryImage);
    return galleryItem;
}


// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('cardsData.json')
        .then(response => response.json())
        .then(data => {
            createCards(data);
            createAllCardsModal(data);
        })
        .catch(error => console.error('Error loading cards data:', error));
});

// Function to create the modal structure for all 32 cards
function createAllCardsModal(cardsData) {
    const allCardsModal = document.getElementById('all-cards-modal');
    const allCardsContainer = document.getElementById('all-cards-container');

    // Loop through the cardsData and create card elements
    cardsData.forEach(cardData => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.innerHTML = `
        <img src="${cardData.mainImageUrl}" alt="${cardData.name}">
        <h3>${cardData.name}</h3>
        <div>
            <p>${cardData.price}</p>
            <p>${cardData.location}</p>
        </div>
        <button data-card="${encodeURIComponent(JSON.stringify(cardData))}" onclick="openModalFromButton(this)">Book Now</button>
      `;

        // Add click event listener to open modal when card is clicked
        cardContainer.addEventListener('click', () => {
            openModal(cardData);
        });

        allCardsContainer.appendChild(cardContainer);
    });

}

// Function to open the modal containing all 32 cards
function openAllCardsModal() {
    const allCardsModal = document.getElementById('all-cards-modal');
    allCardsModal.style.display = 'block';
}

// Function to close the modal
function closeAllCardsModal() {
    const closeButton = document.getElementsByClassName('close-all-cars-button');
    const allCardsModal = document.getElementById('all-cards-modal');
    allCardsModal.style.display = 'none';
}














