
import React, { useEffect, useState } from "react";
import "./PopUpForm.css"; // Assuming you have the CSS file for styling
import "./FoodMealManager.css";

const FoodMealManager = () => {
    const [foodItems, setFoodItems] = useState([]); // State to hold food items
    const [foodItem, setFoodItem] = useState({ name: "", description: "" });
    const [mealInfo, setMealInfo] = useState({
        date: "",
        status: "B", // Default status (Breakfast)
        foodId: "", // To hold the selected food ID
        description: "", // To hold the meal description
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [activeForm, setActiveForm] = useState("addFood"); // State to track active form
    const [showMealForm, setShowMealForm] = useState(false); // State to toggle pop-up form visibility
    const [todaysMeals, setTodaysMeals] = useState([]);  // State to hold the list of today's meals
    const [mealCounts, setMealCounts] = useState({});    // State to hold the count of meals (e.g., DINNER, BREAKFAST, LUNCH)
    // Fetch food items from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost:8160/auth/admin/food/menu")
            .then((response) => response.json())
            .then((data) => {
                setFoodItems(data); // Set the fetched food items
            })
            .catch((error) => {
                console.error("Error fetching food items:", error);
            });
    }, []);


    const fetchTodaysMeals = () => {
        fetch("http://localhost:8160/auth/admin/today")
            .then((response) => response.json())
            .then((data) => setTodaysMeals(data))
            .catch((error) => console.error("Error fetching today's meals:", error));
    };
    
    const fetchTodaysMealCounts = () => {
        fetch("http://localhost:8160/auth/admin/countToday")
            .then((response) => response.json())
            .then((data) => setMealCounts(data))
            .catch((error) => console.error("Error fetching today's meal count:", error));
    };
    
    const handleFoodItemChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFoodItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveFood = () => {
        fetch("http://localhost:8160/auth/admin/food/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(foodItem),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to add food item");
            })
            .then((data) => {
                console.log("Food Item Added:", data);
                setSuccessMessage("Food item added successfully!");
                setFoodItems((prev) => [...prev, data]); // Add the new food item to the list
                setFoodItem({ name: "", description: "" }); // Reset the form
                clearSuccessMessage(); // Clear the message after a delay
            })
            .catch((error) => {
                console.error("Error adding food item:", error);
                setSuccessMessage("");
            });
    };

    const handleMealInfoChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setMealInfo((prev) => ({ ...prev, [name]: value }));
    };
    const handleDeleteMeal = (mealId) => {
        console.log("Meal ID is "+mealId);
        fetch("http://localhost:8160/auth/admin/meals/"+mealId, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                alert("Meal deleted successfully!");
                fetchTodaysMeals(); // Refresh meal list after deletion
            } else {
                alert("Failed to delete meal!");
            }
        })
        .catch((error) => {
            console.error("Error deleting meal:", error);
            alert("Error occurred while deleting meal.");
        });
    };
    

    const handleSaveMeal = () => {
        fetch("http://localhost:8160/auth/admin/meals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mealInfo),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to add meal");
            })
            .then((data) => {
                console.log("Meal Added:", data);
                setSuccessMessage("Meal added successfully!");
                // Delay closing the form to show success message
                setTimeout(() => {
                    clearMealForm(); // Close the pop-up form after the message is shown
                }, 2000); // Adjust this time for how long you want the message to be visible
                clearSuccessMessage(); // Clear the message after 3 seconds
            })
            .catch((error) => {
                console.error("Error adding meal:", error);
                setSuccessMessage("");
            });
    };

    const clearSuccessMessage = () => {
        setTimeout(() => {
            setSuccessMessage(""); // Clear the success message after 3 seconds
        }, 3000);
    };
    const toggleForm = (form) => {
        setActiveForm(form);
        setSuccessMessage(""); // Clear success message when toggling forms
        if (form === "todaysMeals") {
            fetchTodaysMeals(); // Fetch today's meals when switching to Today's Meals view
        } else if (form === "mealCounts") {
            fetchTodaysMealCounts(); // Fetch meal counts when switching to Today's Meal Counts view
        }
    };


    const handleAddMealClick = (foodId) => {
        // When clicking "Add Meal", show the pop-up form with prefilled values
        setMealInfo((prev) => ({ ...prev, foodId }));
        setShowMealForm(true);
    };

    const clearMealForm = () => {
        setMealInfo({ date: "", status: "B", foodId: "", description: "" }); // Reset form fields
        setShowMealForm(false); // Close the pop-up form
    };

    return (
        <div>
         

           
            <div className="button-container">
                <button onClick={() => toggleForm("addFood")} className={activeForm === "addFood" ? "active" : ""}>
                    Add Food Item
                </button>
                <button onClick={() => toggleForm("createMeal")} className={activeForm === "createMeal" ? "active" : ""}>
                    Create Meal
                </button>
                <button onClick={() => toggleForm("todaysMeals")} className={activeForm === "todaysMeals" ? "active" : ""}>
                    Today's Meals
                </button>
                <button onClick={() => toggleForm("mealCounts")} className={activeForm === "mealCounts" ? "active" : ""}>
                    Today's Meal Counts
                </button>
               
            </div>



 {/* Today's Meals Display */}
{activeForm === "todaysMeals" && (
    <div>
        <h3>Today's Meals</h3>
        {todaysMeals.length > 0 ? (
            <div>
                {["B", "L", "D"].map((mealType) => {
                    const filteredMeals = todaysMeals.filter((meal) => meal.status === mealType);
                    return filteredMeals.length > 0 ? (
                        <div key={mealType}>
                            <h4>{mealType === "B" ? "Breakfast" : mealType === "L" ? "Lunch" : "Dinner"}</h4>
                            <ul>
                                {filteredMeals.map((meal) => (
                                    <li key={meal.mpId}>
                                        {meal.food.name} ({meal.status}) 
                                        <button 
                                            onClick={() => handleDeleteMeal(meal.mpId)} 
                                            style={{ marginLeft: "10px", color: "white", cursor: "pointer" }}
                                        >
                                             Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null;
                })}
            </div>
        ) : (
            <p>Meal not added</p>
        )}
    </div>
)}

{/* Today's Meal Counts Display */}
{activeForm === "mealCounts" && (
    <div>
        <h3>Today's Meal Counts</h3>
        {Object.keys(mealCounts).length > 0 ? (
            <ul>
                {Object.keys(mealCounts).map((mealType) => (
                    <li key={mealType}>
                        {mealType}: {mealCounts[mealType]}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Currently No One Selected the Meals</p>
        )}
    </div>
)}



            {activeForm === "addFood" && (
                <div>
                    <h3>Add Food Item</h3>
                    <label htmlFor="foodName">Food Name:</label>
                    <input
                        id="foodName"
                        name="name"
                        type="text"
                        placeholder="Enter food name"
                        value={foodItem.name}
                        onChange={handleFoodItemChange}
                    />
                    <br />
                    <label htmlFor="foodDescription">Description:</label>
                    <input
                        id="foodDescription"
                        name="description"
                        type="text"
                        placeholder="Enter food description"
                        value={foodItem.description}
                        onChange={handleFoodItemChange}
                    />
                    <br />
                    <button onClick={handleSaveFood}>Save Food Item</button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </div>
            )}

            {/* Create Meal Form */}
            {activeForm === "createMeal" && (
               <div>
               <h3>Select Food Item to Add Meal</h3>
               <ul style={{ listStyleType: "none", padding: 0 }}>
                   {foodItems.map((item) => (
                       <li 
                           key={item.foodId} 
                           style={{ 
                               display: "flex", 
                               alignItems: "center", 
                               justifyContent: "space-between", 
                               padding: "8px", 
                               borderBottom: "1px solid #ddd" 
                           }}
                       >
                           <div style={{ 
                               display: "flex", 
                               alignItems: "center", 
                               flexGrow: 1 
                           }}>
                               <span 
                                   style={{ 
                                       minWidth: "150px", 
                                       fontWeight: "bold", 
                                       whiteSpace: "nowrap", 
                                       overflow: "hidden", 
                                       textOverflow: "ellipsis" 
                                   }}
                               >
                                   {item.name}
                               </span>
                               <span style={{ marginLeft: "10px", flexGrow: 1 }}>
                                   {item.description}
                               </span>
                           </div>
                           <button 
                               onClick={() => handleAddMealClick(item.foodId)} 
                               style={{ 
                                   padding: "6px 12px", 
                                   backgroundColor: "darkblue", 
                                   color: "white", 
                                   border: "none", 
                                   borderRadius: "4px", 
                                   cursor: "pointer" 
                               }}
                           >
                               Add Meal
                           </button>
                       </li>
                   ))}
               </ul>
           </div>
           
            )}

            {/* Pop-up form for creating a meal */}
            {showMealForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3 className="text-dark">Create Meal</h3>
                        <label className="text-dark" htmlFor="mealDate">Meal Date:</label>
                        <input
                            id="mealDate"
                            name="date"
                            type="date"
                            value={mealInfo.date}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleMealInfoChange}
                        />
                        <br />
                        <label className="text-dark" htmlFor="mealStatus">Meal Type:</label>
                        <select
                            id="mealStatus"
                            name="status"
                            value={mealInfo.status}
                            onChange={handleMealInfoChange}
                        >
                            <option value="B">Breakfast</option>
                            <option value="L">Lunch</option>
                            <option value="D">Dinner</option>
                        </select>
                        <br />
                        <label className="text-dark" htmlFor="foodId">Food Item:</label>
                        <input
                            type="text"
                            value={foodItems.find(item => item.foodId === mealInfo.foodId)?.name || ''}
                            readOnly
                        />
                        <br />
                        <label className="text-dark" htmlFor="mealDescription">Description:</label>
                        <input
                            id="mealDescription"
                            name="description"
                            type="text"
                            placeholder="Enter meal description"
                            value={mealInfo.description}
                            onChange={handleMealInfoChange}
                        />
                        <br />
                        <button onClick={handleSaveMeal}>Save Meal</button>
                        <button onClick={clearMealForm}>Close</button>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodMealManager;
