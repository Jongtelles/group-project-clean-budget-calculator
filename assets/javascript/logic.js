// On page load
$(document).ready(function () {
    // budgetInfo object contains all necessary variables
    var budgetInfo = {
        //user inputs total amount of $ to track
        spendingMoney: undefined,
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
    };

    //function that allows user to add items to the budget based on category and dollar amount
    function addBudgetItem(cat, dollars) {
        budgetInfo.budgetItems.push({
            category: cat,
            dollarAmount: dollars
        })
    };
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
    if(budgetInfo.incomeSubmitted == false) {
        recordIncome();
        }
    else{
        recordCategory()
    }
    })
    // END OF PAGELOAD FUNCTION
});

