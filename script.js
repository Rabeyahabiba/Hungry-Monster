const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showIngredient');
});


//  meal list that matches with name //
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "ingredient-btn">Get Ingredient</a>
                        </div>
                    </div>
                `;
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            mealList.innerHTML = html;

        });

}


// get ingredients of the meal  //
function getMealRecipe(recipe) {
    recipe.preventDefault();
    if (recipe.target.classList.contains('ingredient-btn')) {
        let mealItem = recipe.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(res => res.json())
            .then(data => mealRecipeModal(data.meals));
    }
}


// create a modal  //
const mealRecipeModal = meal => {
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div>
         <h2>Ingredients:</h2>                       
            <h5>${meal.strIngredient1}</h5>
            <h5>${meal.strIngredient2}</h5>
            <h5>${meal.strIngredient3}</h5>
            <h5>${meal.strIngredient4}</h5>
            <h5>${meal.strIngredient5}</h5>
            <h5>${meal.strIngredient6}</h5>
            <h5>${meal.strIngredient7}</h5>
            <h5>${meal.strIngredient8}</h5>
            <h5>${meal.strIngredient9}</h5>
            <h5>${meal.strIngredient10}</h5>
            <h5>${meal.strIngredient11}</h5>
            <h5>${meal.strIngredient12}</h5>
            <h5>${meal.strIngredient13}</h5>
            <h5>${meal.strIngredient14}</h5>
        </div>
        <div class = "recipe-meal-img">
          <img src = "${meal.strMealThumb}" alt = "">
        </div>  
   `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showIngredient');
};



