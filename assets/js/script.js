/* Author: Zishan Ansari */
let fetchedData, length;
let searchResult;
let recipeLink = './assets/json/recipe.json';

// Fetching API
fetch(recipeLink)
  .then(response => response.json())
  .then(data => {
    fetchedData = data;
    displayRecipeList();
  });

// Function to Display Recipe Title List
let displayRecipeList = () => {
  length = fetchedData.length;
  for (let i = 0; i < length; i++) {
    document.getElementById('recipe-list').innerHTML +=
      `<li onclick="displayRecipeCard(${i})">
      <a title="${fetchedData[i].recipeTitle}">${fetchedData[i].id}. ${fetchedData[i].recipeTitle}</a>
    </li>`;
  }
}

// Function to Display Recipe Card
function displayRecipeCard(x) {
  let heading = document.querySelectorAll('.recipe-details h2');
  heading[0].style.display = 'block';
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
let fetchedRecipe, fetchedLength, searchText;

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
    searchedRecipeList();
  }
}

let searchedRecipeList = () => {
  // AJAX Request
  searchText = document.getElementById('search-text').value;
  let apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  // Fetching API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      fetchedRecipe = data;
      searchedResponse();
    });
}

let searchedResponse = () => {
  searchResult = fetchedRecipe;
  if (fetchedRecipe.meals === null) {
    document.getElementById('searched-list').innerHTML =
      `<li class="not-found">
          <a title="${searchText} Not Found">${searchText} Not Found</a>
        </li>`;
  } else {
    fetchedLength = fetchedRecipe.meals.length;
    // Displays the Recipes List
    document.getElementById('searched-list').innerHTML = '';
    let count = 1;
    for (let i = 0; i < fetchedLength; i++) {
      document.getElementById('searched-list').innerHTML +=
        `<li onclick='displaySearchedRecipeCard(${i})'>
            <a title="${fetchedRecipe.meals[i].strMeal}">${count}. ${fetchedRecipe.meals[i].strMeal}</a>
          </li>`;
      count++;
    }
  }
}

// Function to display searched recipe card
let displaySearchedRecipeCard = (x) => {
  let heading = document.querySelectorAll('.searched-recipe-details h2');
  heading[0].style.display = 'block';
  // Displays the Recipes Details
  document.getElementById('searched-details-area').innerHTML =
    `<div class="recipe-card">
    <ul class="details">
      <li>Recipe Title: <span>${searchResult.meals[x].strMeal}</span></li>
      <li>Meal Origin: <span>${searchResult.meals[x].strArea}</span></li>
      <li>Category: <span>${searchResult.meals[x].strCategory}</span></li>
      <li>Recipe Link:
        <a href="${searchResult.meals[x].strSource}" target="_blank" rel="noopener">
          <span>Click Here</span>
        </a>
      </li>
      <li>Video Link:
        <a href="${searchResult.meals[x].strYoutube}" target="_blank" rel="noopener">
          <span>Watch Video</span>
        </a>
      </li>
      <li>Preparation Steps: <span>${searchResult.meals[x].strInstructions}</span></li>
      <li>Photo:
        <figure>
          <img src="${searchResult.meals[x].strMealThumb}" alt="${searchResult.meals[x].strMeal}">
        </figure>
      </li>
    </ul>
    <div class="save-control">
      <button type="button" onclick="onSave(${x})">Save</button>
    </div>
  </div>`;
}

// On Save Function
let onSave = (x) => {
  let saveData = JSON.stringify(searchResult.meals[x]);
  console.log(saveData);
}