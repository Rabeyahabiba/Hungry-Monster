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
         <div class = "recipe-meal-img">
           <img src = "${meal.strMealThumb}" alt = "">
         </div> 
        <h1 class = "recipe-title">${meal.strMeal}</h1>        
        <div>
         <h2>Ingredients</h2>                       
            <h4>${meal.strMeasure1} ${meal.strIngredient1}</h4>  
            <h4>${meal.strMeasure2} ${meal.strIngredient2}</h4>
            <h4>${meal.strMeasure3} ${meal.strIngredient3}</h4>
            <h4>${meal.strMeasure4} ${meal.strIngredient4}</h4>
            <h4>${meal.strMeasure5} ${meal.strIngredient5}</h4>
            <h4>${meal.strMeasure6} ${meal.strIngredient6}</h4>
            <h4>${meal.strMeasure7} ${meal.strIngredient7}</h4>
            <h4>${meal.strMeasure8} ${meal.strIngredient8}</h4>
            <h4>${meal.strMeasure9} ${meal.strIngredient9}</h4>
            <h4>${meal.strMeasure10} ${meal.strIngredient10}</h4>
            <h4>${meal.strMeasure11} ${meal.strIngredient11}</h4>
            <h4>${meal.strMeasure12} ${meal.strIngredient12}</h4>
            <h4>${meal.strMeasure13} ${meal.strIngredient13}</h4>
            <h4>${meal.strMeasure14} ${meal.strIngredient14}</h4>
            <h4>${meal.strMeasure15} ${meal.strIngredient15}</h4>
            
        </div>       
   `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showIngredient');
};



