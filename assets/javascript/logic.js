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

    function categoryPicker(){
        //TODO:
        // display to the user the list of categories and have them select which they want to track
        //based on user selection of categories, set budgetInfo.categories.catX.isTracked = true
        //ask user if they want to track categories, if yes set trackingPercents = true and ask for user input to select percentages of spendingMoney
        //update budgetInfo.categories.catX.percentage to user input
    };

    //** TESTING function functionality
    addBudgetItem(budgetInfo.categories.catFood.name, 100);
    addBudgetItem("Other", 500);
    console.log(budgetInfo.budgetItems[0], budgetInfo.budgetItems[1]);

    // END OF PAGELOAD FUNCTION
});