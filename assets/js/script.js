/* Author: Zishan Ansari */
let newRequest = new XMLHttpRequest(); // AJAX Request
let fetchedData, length;
let apiLink = './assets/json/recipe.json';

newRequest.open('GET', apiLink, true);
newRequest.send();
newRequest.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    // Stores the data fetched in fetchedData
    fetchedData = JSON.parse(this.responseText);
    length = fetchedData.length;
    displayList();
  }
}

// Function to Display Recipe Title List
let displayList = () => {
  let button = document.querySelectorAll('.recipe-list li');
  // Displays the Recipes List
  for (let i = 0; i < length; i++) {
    document.getElementById('recipe-list').innerHTML +=
    `<li onclick="displayRecipe(${i})">
      <a href="#FIXME" title="${fetchedData[i].recipeTitle}">${fetchedData[i].id}. ${fetchedData[i].recipeTitle}</a>
    </li>`;
  }
}

// Function to Display Recipe Detail
let displayRecipe = (x) => {
  let heading = document.querySelectorAll('.recipe-details h2');
  heading[0].style.display = 'block';
  // Displays the Recipes Details
  document.getElementById('details-area').innerHTML =
  `<div class="recipe-card">
    <ul class="details">
      <li>Recipe Title: <span>${fetchedData[x].recipeTitle}</span></li>
      <li>Meal Type: <span>${fetchedData[x].mealType}</span></li>
      <li>Number of People it Serves: <span>${fetchedData[x].serves}</span></li>
      <li>Difficulty Level: <span>${fetchedData[x].difficultyLevel}</span></li>
      <li>Ingredients: <span><ul id="ingredients" class="ingredients"></ul></span></li>
      <li>Preparation Steps: <span><ul id="preparation-steps" class="preparation-steps"></ul></span></li>
      <li>Photo:
        <figure>
          <img src="${fetchedData[x].image}" alt="${fetchedData[x].recipeTitle}">
        </figure>
      </li>
    </ul>
  </div>`;
  displayIngredients(fetchedData[x].ingredients);
  displaySteps(fetchedData[x].preparationSteps);
}

// Displays Ingredients
let displayIngredients = (x) => {
  let count = 1;
  let getIngredients, ingredientsLength;
  getIngredients = x;
  ingredientsLength = x.length;
  for (let i = 0; i < ingredientsLength; i++) {
    document.getElementById('ingredients').innerHTML +=
      `<li>${count}. ${getIngredients[i]}</li>`;
    count++;
  }
}

// Displays Preparation Steps
let displaySteps = (x) => {
  let count = 1;
  let getSteps, stepsLength;
  getSteps = x;
  stepsLength = x.length;
  for (let i = 0; i < stepsLength; i++) {
    document.getElementById('preparation-steps').innerHTML +=
      `<li>${count}. ${getSteps[i]}</li>`;
    count++;
  }
}

// Search Area Section
let searchButton = document.getElementById('search-button');
searchButton.onclick = searchRecipe;

// Function to search recipe
function searchRecipe() {
  let searchText = document.getElementById('search-text').value;
  let helper = document.getElementsByClassName('helper')[0];
  if (!searchText) {
    helper.style.opacity = '1';
    helper.style.transform = 'translateY(0)';
  } else {
    helper.style.opacity = '0';
    helper.style.transform = 'translateY(-6px)';
    console.log(searchText);
  }
}