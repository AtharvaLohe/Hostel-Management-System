// import React, { useEffect, useState } from "react";
// import "./FoodMealManager.css"; // Assuming you have the CSS file for styling

// const FoodMealManager = () => {
//     const [foodItems, setFoodItems] = useState([]); // State to hold food items
//     const [foodItem, setFoodItem] = useState({ name: "", description: "" });
//     const [mealInfo, setMealInfo] = useState({
//         date: "",
//         status: "B", // Default status (Breakfast)
//         foodId: "", // To hold the selected food ID
//         description: "", // To hold the meal description
//     });
//     const [successMessage, setSuccessMessage] = useState("");
//     const [activeForm, setActiveForm] = useState("addFood"); // State to track active form

//     // Fetch food items from the backend when the component mounts
//     useEffect(() => {
//         fetch("http://localhost:8080/admin/food/menu")
//             .then((response) => response.json())
//             .then((data) => {
//                 setFoodItems(data); // Set the fetched food items
//             })
//             .catch((error) => {
//                 console.error("Error fetching food items:", error);
//             });
//     }, []);

//     const handleFoodItemChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setFoodItem((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSaveFood = () => {
//         fetch("http://localhost:8080/admin/food/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(foodItem),
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error("Failed to add food item");
//             })
//             .then((data) => {
//                 console.log("Food Item Added:", data);
//                 setSuccessMessage("Food item added successfully!");
//                 setFoodItems((prev) => [...prev, data]); // Add the new food item to the list
//                 setFoodItem({ name: "", description: "" }); // Reset the form
//                 clearSuccessMessage(); // Clear the message after a delay
//             })
//             .catch((error) => {
//                 console.error("Error adding food item:", error);
//                 setSuccessMessage("");
//             });
//     };

//     const handleMealInfoChange = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;
//         setMealInfo((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSaveMeal = () => {
//         fetch("http://localhost:8080/admin/meals", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(mealInfo),
//         })
//             .then((response) => {
//                 if (response.ok) {
//                     return response.json();
//                 }
//                 throw new Error("Failed to add meal");
//             })
//             .then((data) => {
//                 console.log("Meal Added:", data);
//                 setSuccessMessage("Meal added successfully!");
//                 // Reset the form
//                 setMealInfo({ date: "", status: "B", foodId: "", description: "" });
//                 clearSuccessMessage(); // Clear the message after a delay
//             })
//             .catch((error) => {
//                 console.error("Error adding meal:", error);
//                 setSuccessMessage("");
//             });
//     };

//     const clearSuccessMessage = () => {
//         setTimeout(() => {
//             setSuccessMessage(""); // Clear the success message after 3 seconds
//         }, 3000);
//     };

//     const toggleForm = (form) => {
//         setActiveForm(form);
//         setSuccessMessage(""); // Clear success message when toggling forms
//     };

//     return (
//         <div className="container">
//             <h1>Food Meal Manager</h1>

//             {/* Buttons to toggle between forms */}
//             <div className="button-container">
//                 <button onClick={() => toggleForm("addFood")} className={activeForm === "addFood" ? "active" : ""}>
//                     Add Food Item
//                 </button>
//                 <button onClick={() => toggleForm("createMeal")} className={ activeForm === "createMeal" ? "active" : ""}>
//                     Create Meal
//                 </button>
//             </div>

//             {/* Add Food Item Form */}
//             {activeForm === "addFood" && (
//                 <div>
//                     <h3>Add Food Item</h3>
//                     <label htmlFor="foodName">Food Name:</label>
//                     <input
//                         id="foodName"
//                         name="name"
//                         type="text"
//                         placeholder="Enter food name"
//                         value={foodItem.name}
//                         onChange={handleFoodItemChange}
//                     />
//                     <br />
//                     <label htmlFor="foodDescription">Description:</label>
//                     <input
//                         id="foodDescription"
//                         name="description"
//                         type="text"
//                         placeholder="Enter food description"
//                         value={foodItem.description}
//                         onChange={handleFoodItemChange}
//                     />
//                     <br />
//                     <button onClick={handleSaveFood}>Save Food Item</button>
//                     {successMessage && <p className="success-message">{successMessage}</p>}
//                 </div>
//             )}

//             {/* Create Meal Form */}
//             {activeForm === "createMeal" && (
//                 <div>
//                     <h3>Create Meal</h3>
//                     <label htmlFor="mealDate">Meal Date:</label>
//                     <input
//                         id="mealDate"
//                         name="date"
//                         type="date"
//                         value={mealInfo.date}
//                         onChange={handleMealInfoChange}
//                     />
//                     <br />
//                     <label htmlFor="mealStatus">Meal Type:</label>
//                     <select
//                         id="mealStatus"
//                         name="status"
//                         value={mealInfo.status}
//                         onChange={handleMealInfoChange}
//                     >
//                         <option value="B">Breakfast</option>
//                         <option value="L">Lunch</option>
//                         <option value="D">Dinner</option>
//                     </select>
//                     <br />
//                     <label htmlFor="foodId">Select Food Item:</label>
//                     <select
//                         id="foodId"
//                         name="foodId"
//                         value={mealInfo.foodId}
//                         onChange={handleMealInfoChange}
//                     >
//                         <option value="">Select a food item</option>
//                         {foodItems.map((item) => (
//                             <option key={item.foodId} value={item.foodId}>
//                                 {item.name}
//                             </option>
//                         ))}
//                     </select>
//                     <br />
//                     <label htmlFor="mealDescription">Description:</label>
//                     <input
//                         id="mealDescription"
//                         name="description"
//                         type="text"
//                         placeholder="Enter meal description"
//                         value={mealInfo.description}
//                         onChange={handleMealInfoChange}
//                     />
//                     <br />
//                     <button onClick={handleSaveMeal}>Save Meal</button>
//                     {successMessage && <p className="success-message">{successMessage}</p>}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FoodMealManager;
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

    // Fetch food items from the backend when the component mounts
    useEffect(() => {
        fetch("http://localhost:8080/admin/food/menu")
            .then((response) => response.json())
            .then((data) => {
                setFoodItems(data); // Set the fetched food items
            })
            .catch((error) => {
                console.error("Error fetching food items:", error);
            });
    }, []);

    const handleFoodItemChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFoodItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveFood = () => {
        fetch("http://localhost:8080/admin/food/add", {
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

    const handleSaveMeal = () => {
        fetch("http://localhost:8080/admin/meals", {
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
        <div className="container">
            <h1>Food Meal Manager</h1>

           
            <div className="button-container">
                <button onClick={() => toggleForm("addFood")} className={activeForm === "addFood" ? "active" : ""}>
                    Add Food Item
                </button>
                <button onClick={() => toggleForm("createMeal")} className={activeForm === "createMeal" ? "active" : ""}>
                    Create Meal
                </button>
            </div>

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
                    <ul>
                        {foodItems.map((item) => (
                            <li key={item.foodId}>
                                {item.name} - {item.description}
                                <button onClick={() => handleAddMealClick(item.foodId)}>Add Meal</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Pop-up form for creating a meal */}
            {showMealForm && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Create Meal</h3>
                        <label htmlFor="mealDate">Meal Date:</label>
                        <input
                            id="mealDate"
                            name="date"
                            type="date"
                            value={mealInfo.date}
                            onChange={handleMealInfoChange}
                        />
                        <br />
                        <label htmlFor="mealStatus">Meal Type:</label>
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
                        <label htmlFor="foodId">Food Item:</label>
                        <input
                            type="text"
                            value={foodItems.find(item => item.foodId === mealInfo.foodId)?.name || ''}
                            readOnly
                        />
                        <br />
                        <label htmlFor="mealDescription">Description:</label>
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
