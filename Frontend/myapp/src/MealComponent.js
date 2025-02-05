import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const MealComponent = () => {
    const [meals, setMeals] = useState([]);
    const [groupedMeals, setGroupedMeals] = useState({});
    const [selectedMeals, setSelectedMeals] = useState([]);
    const hostlerId = useSelector(state => state?.user?.userDetails?.hostler?.hostlerid); // Get hostlerId from Redux
    const [currentHour, setCurrentHour] = useState(new Date().getHours());
   const location = useLocation();
 

  
    // Fetch meals
    const fetchMeals = () => {
        fetch("http://localhost:8080/admin/today")
            .then((response) => response.json())
            .then((data) => {
                // Group meals by status
                const grouped = data.reduce((acc, meal) => {
                    if (!acc[meal.status]) {
                        acc[meal.status] = { names: [], count: 0 };
                    }
                    acc[meal.status].names.push(meal.food.name);
                    acc[meal.status].count++;
                    return acc;
                }, {});

                setGroupedMeals(grouped);
                setMeals(data);
            })
            .catch((error) => {
                console.error("Error fetching meals:", error);
            });
    };


    // Fetch selected meals
    const fetchSelectedMeals = () => {
        if (!hostlerId) {
            console.log("HostlerId not present");
            return;
        }
        fetch(`http://localhost:8080/admin/getSelectedMeal/${hostlerId}`)
            .then((response) => response.json())  // Use response.json() for JSON arrays
            .then((data) => {
                console.log(data); // This will log the array of selected meals, like ["BREAKFAST", "DINNER", "LUNCH"]
                setSelectedMeals(data); // Directly set the selectedMeals array
            })
            .catch((error) => {
                console.error("Error fetching selected meals:", error);
            });
    };
    

    console.log("Selected Meals:", selectedMeals);

    // Function to check if the meal is selected by the hostler
    const isMealSelected = (status) => {
        // Map backend status to full meal name

        const statusToMealName = {
            "B": "BREAKFAST",
            "D": "DINNER",
            "L": "LUNCH"
        };
        const mealName = statusToMealName[status];
        return selectedMeals.includes(mealName);
    };

    // Function to check if the meal selection is allowed based on time restrictions
    const isSelectionAllowed = (status) => {
        
         const hours = currentHour;
    
        // Before 8 AM: all meals allowed
        if (hours < 8) return true;
    
        // From 8 AM to 12 PM: allow only Lunch and Dinner
        if (hours >= 8 && hours < 12) {
            return status === "L" || status === "D";
        }
    
        // From 12 PM to 7 PM: allow only Dinner
        if (hours >= 12 && hours < 19) {
            return status === "D";
        }
    
        // After 7 PM: no meal selection allowed
        if (hours >= 19) return false;
    
        // Fallback (shouldn't reach here)
        return false;
    };
    

    // Fetch selected meals every hour at the top of the hour
    useEffect(() => {
        setCurrentHour(new Date().getHours());
        fetchMeals(); // Fetch meals on initial load
        fetchSelectedMeals(); // Fetch selected meals on initial load
       
      
        const interval = setInterval(() => {
            setCurrentHour(new Date().getHours());
        },60000); // Update every minute (60,000 milliseconds)
    
        
        return () => clearInterval(interval); // Cleanup on unmount
    },[location]); // Re-run when hostlerId changes

    // Function to handle meal selection
    const handleMealSelection = (status) => {
        if (!hostlerId) return;

        // Send request to select meal
        fetch("http://localhost:8080/admin/MealAllocation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hostlerId,
                mealType: status === "B" ? "BREAKFAST" : status === "L" ? "LUNCH" : "DINNER",
            }),
        })
        .then((data) => {
            console.log("Meal selection successful");
            fetchSelectedMeals(); // Re-fetch selected meals
        })
        .catch((error) => {
            console.error("Error selecting meal:", error);
        });
    };
    console.log("Selected Meals:", selectedMeals);
console.log("Is Breakfast Selected:", isMealSelected("B")); // Check if breakfast is selected
console.log("Is Lunch Selected:", isMealSelected("L")); // Check if lunch is selected
console.log("Is Dinner Selected:", isMealSelected("D")); // Check if dinner is selected

    return (
        <div>
            <h2>Today's Meals</h2>
            {Object.entries(groupedMeals).map(([status, meal]) => (
                <div key={status} style={{ marginBottom: "20px", padding: "10px", border: "1px solid black" }}>
                    <h3>
                        {status === "B" ? "Breakfast" : status === "L" ? "Lunch" : "Dinner"}
                    </h3>
                    <p>{meal.names.join(", ")}</p>
                    <p><strong>Total Items:</strong> {meal.count}</p>
                    <button
            disabled={isMealSelected(status) || !isSelectionAllowed(status)}
            onClick={() => handleMealSelection(status)}
            style={{
                backgroundColor: isMealSelected(status) ? "green" : "gray",
                color: "white",
                padding: "5px 10px",
                cursor: (!isMealSelected(status) && isSelectionAllowed(status)) ? "pointer" : "not-allowed"
            }}
        >
            {isMealSelected(status) 
                ? "Already Selected" 
                : !isSelectionAllowed(status) 
                    ? "Time Over" 
                    : "Select Meal"}
        </button>
                </div>
            ))}
        </div>
    );
};

export default MealComponent;
