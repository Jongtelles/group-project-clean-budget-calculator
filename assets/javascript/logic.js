// On page load
$(document).ready(function () {
    // budgetInfo object contains all necessary variables
    var budgetInfo = {
        //user inputs total amount of $ to track
        spendingMoney: undefined,
        trackingPercents: false,
        //user will determine which categories to track, and % of spendingMoney allocated
        categories: {
            catFood: {
                name: "Food",
                isTracked: false,
                percentage: 0
            },
            catClothing: {
                name: "Clothing",
                isTracked: false,
                percentage: 0
            },
            catEntertainment: {
                name: "Entertainment",
                isTracked: false,
                percentage: 0
            },
            catTravel: {
                name: "Travel",
                isTracked: false,
                percentage: 0
            },
            catTransportation: {
                name: "Transportation",
                isTracked: false,
                percentage: 0
            },
            catOther: {
                name: "Other",
                isTracked: false,
                percentage: 0
            },
        },
        //array for user inputted budgetItems
        budgetItems: [],
        incomeSubmitted: false,
    //budgetInfo object end
    };

    //function that allows user to add items to the budget based on category and dollar amount
    function addBudgetItem(cat, dollars) {
        budgetInfo.budgetItems.push({
            category: cat,
            dollarAmount: dollars
        })
        //TODO:
        //If trackingPercents = false add functionality to change the prompt "Do you wanna add something else?" and updates Output with category, dollarAmount, and remaining total spendingMoney
        //Else change the prompt "Do you wanna add something else?" and updates Output with category, dollarAmount based on assigned percentage for that category, and remaining total spendingMoney
    };

    // this is my solution to the category picker. In the final version it will involve replacing the input section with a dropdown or scroll menu, like the one in the password generator, that includes our bategories.
    //it will likely make the funciton i wrote to take user input for categoires unecessary
    $(".dropdown-item").on("click", function(event){

        if(this.innerHTML.includes("Food") == true){
            // $("#food").addClass("is-active");
            budgetInfo.categories.catFood.isTracked = true;
            console.log("catFood is being tracked " + budgetInfo.categories.catFood.isTracked);
        };
        if(this.innerHTML.includes("Clothing") == true){
            budgetInfo.categories.catClothing.isTracked = true;
            console.log("catClothing is being tracked " + budgetInfo.categories.catClothing.isTracked);
        };        
        if(this.innerHTML.includes("Entertainment") == true){
            budgetInfo.categories.catEntertainment.isTracked = true;
            console.log("catEntertainment is being tracked " + budgetInfo.categories.catEntertainment.isTracked);
        }
        if(this.innerHTML.includes("Travel") == true){
            budgetInfo.categories.catTravel.isTracked = true;
            console.log("catTravel is being tracked " + budgetInfo.categories.catTravel.isTracked);
        }
        if(this.innerHTML.includes("Transportation") == true){
            budgetInfo.categories.catTransportation.isTracked = true;
            console.log("catTransportation is being tracked " + budgetInfo.categories.catTransportation.isTracked);
        }
        if(this.innerHTML.includes("Other") == true){
            budgetInfo.categories.catOther.isTracked = true;
            console.log("catOther is being tracked " + budgetInfo.categories.catOther.isTracked);
        }
    });

    //** TESTING function functionality
    addBudgetItem(budgetInfo.categories.catFood.name, 100);
    addBudgetItem("Other", 500);
    console.log(budgetInfo.budgetItems[0], budgetInfo.budgetItems[1]);
    
    // records user input as category 
    var recordCategory = function(){
        var userCategory = $("#userInput").val();
        console.log("category: " + userCategory);
        localStorage.setItem("category", userCategory);
    }

    // records user input as income
    var recordIncome = function() {
        budgetInfo.spendingMoney = $("#userInput").val();
        console.log("income: " + budgetInfo.spendingMoney);
        localStorage.setItem("income", budgetInfo.spendingMoney);
        budgetInfo.incomeSubmitted = true;
    }

    // calls recordIncome or recordCategory based on whether or not the income has been recorded
    $("#submit").on("click", function(event) {
        event.preventDefault();
        if(budgetInfo.incomeSubmitted == false) {
            recordIncome();
            }
        else{
            recordCategory()
        }
    })
    // END OF PAGELOAD FUNCTION
});

