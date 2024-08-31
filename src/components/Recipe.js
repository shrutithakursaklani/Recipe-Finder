import React, { useEffect, useState } from "react";

const Recipe = () => {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState(''); // Initialized as a string
  const [selectedRecipe, setSelectedRecipe] = useState(null); // New state to store the selected recipe

  useEffect(() => {
    if (input) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCategories(data.meals || []);
        })
        .catch((error) => console.error(error));
    }
  }, [input]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <h1 className="title">Recipe Finder</h1>
      <p className="description">Enter the first letter of the meal you’re looking for to get a list of delicious recipes!</p>

      {!selectedRecipe ? (
        <>
          <div className="input-box mb-3 d-flex">
            <input
              type="search"
              className="form-control"
              value={input}
              placeholder="Search by first letter"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="recipes-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map((item) => (
              <div key={item.idMeal} className="recipe-card" onClick={() => handleRecipeClick(item)} style={{ cursor: 'pointer' }}>
                <h2>{item.strMeal}</h2>
                <img src={item.strMealThumb} alt={item.strMeal} className="recipe-image" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="recipe-detail">
          <button onClick={handleBackClick} className="back-button">Back to Recipes</button>
          <h2>{selectedRecipe.strMeal}</h2>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} className="recipe-detail-image" />
          <h3>Instructions</h3>
          <p>{selectedRecipe.strInstructions}</p>
          <h3>Ingredients</h3>
          <ul>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
              const ingredient = selectedRecipe[`strIngredient${index}`];
              const measure = selectedRecipe[`strMeasure${index}`];
              return ingredient && (
                <li key={index}>
                  {ingredient} - {measure}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Recipe;