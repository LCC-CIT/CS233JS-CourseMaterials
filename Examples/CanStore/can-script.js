// We replace the top-level .then() chain with an async function 'start'.
// This fetches the data once and then kicks off the app.
async function start() {
  try {
    const response = await fetch('products.json');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const json = await response.json();
    initialize(json);

  } catch (err) {
    console.error(`Fetch problem: ${err.message}`);
  }
}

// Call the start function to begin
start();

// sets up the app logic, declares required variables, contains all the other functions
function initialize(products) {
  // grab the UI elements that we need to manipulate
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');

  // keep a record of what the last category and search term entered were
  let lastCategory = category.value;
  // no search has been made yet
  let lastSearch = '';

  // these contain the results of filtering by category, and search term
  let categoryGroup;
  let finalGroup;

  // To start with, set finalGroup to equal the entire products database
  // then run updateDisplay(), so ALL products are displayed initially.
  finalGroup = products;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  categoryGroup = [];
  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of products we want to display
  searchBtn.addEventListener('click', selectCategory);

  // NOTE: This function remains SYNCHRONOUS because it only filters
  // the array we already have in memory. No 'await' is needed here.
  function selectCategory(e) {
    e.preventDefault();

    categoryGroup = [];
    finalGroup = [];

    if (category.value === lastCategory && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();

      if (category.value === 'All') {
        categoryGroup = products;
        selectProducts();
      } else {
        const lowerCaseType = category.value.toLowerCase();
        categoryGroup = products.filter(product => product.type === lowerCaseType);
        selectProducts();
      }
    }
  }

  // NOTE: This function also remains synchronous.
  function selectProducts() {
    if (searchTerm.value.trim() === '') {
      finalGroup = categoryGroup;
    } else {
      const lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      finalGroup = categoryGroup.filter(product => product.name.includes(lowerCaseSearchTerm));
    }
    updateDisplay();
  }

  // start the process of updating the display with the new set of products
  function updateDisplay() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if (finalGroup.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    } else {
      for (const product of finalGroup) {
        fetchBlob(product);
      }
    }
  }

  // REFACTORED: Converted to async/await
  // This needs to be async because it makes a network request for the image.
  async function fetchBlob(product) {
    const url = `images/${product.image}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const blob = await response.blob();
      showProduct(blob, product);

    } catch (err) {
      console.error(`Fetch problem: ${err.message}`);
    }
  }

  // Display a product inside the <main> element
  function showProduct(blob, product) {
    const objectURL = URL.createObjectURL(blob);
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const image = document.createElement('img');

    section.setAttribute('class', product.type);

    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    para.textContent = `$${product.price.toFixed(2)}`;

    image.src = objectURL;
    image.alt = product.name;

    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}