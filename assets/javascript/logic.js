// On page load
$(document).ready(function () {
    // budgetInfo object contains all necessary variables
    var budgetInfo = {
        //user inputs total amount of $ to track
        spendingMoney: undefined,
        trackingPercents: false,
        //array for user inputted budgetItems
        budgetItems: [],
        incomeSubmitted: false,
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
        //budgetInfo object end
    };

    //function that allows user to add items to the budget array based on category and dollar amount
    var addBudgetItem = function (cat, dollars) {
        budgetInfo.budgetItems.push({
            category: cat,
            dollarAmount: dollars
        });
        $("#prompt").html("<h2>Got it! Wanna add anything else?</h2>");
    };
    //function outputs basic user input to output field, not including percentage tracking
    var outPutter = function (appendCategory, appendCost) {
        $("#output").append("Category: " + appendCategory + " ");
        $("#output").append("Cost: " + "$" + appendCost + "<br\>");
    };

    //when button is clicked, pass userInput values as arguments through both above functions, adding input to the budgetItems array and pushing to DOM
    $("#submit").on("click", function () {
        var tempCategory = $("#userInput").val();
        var tempDollars = $("#userInputDollars").val();
        addBudgetItem(tempCategory, tempDollars);
        outPutter(tempCategory, tempDollars);
        console.log(budgetInfo.budgetItems);
    });
    //TODO:
    //If trackingPercents = false add functionality to change the prompt "Do you wanna add something else?" and updates Output with category, dollarAmount, and remaining total spendingMoney
    //Else change the prompt "Do you wanna add something else?" and updates Output with category, dollarAmount based on assigned percentage for that category, and remaining total spendingMoney

    // function categoryPicker() {
    //     //TODO:
    //     // display to the user the list of categories and have them select which they want to track
    //     //based on user selection of categories, set budgetInfo.categories.catX.isTracked = true
    //     //ask user if they want to track categories, if yes set trackingPercents = true and ask for user input to select percentages of spendingMoney
    //     //update budgetInfo.categories.catX.percentage to user input
    // };

    //** TESTING function functionality


    // records user input as category
    // var recordCategory = function () {
    //     var userCategory = $("#userInput").val();
    //     console.log("category: " + userCategory);
    //     localStorage.setItem("category", userCategory);
    // }

    // // records user input as income
    // var recordIncome = function () {
    //     budgetInfo.spendingMoney = $("#userInput").val();
    //     console.log("income: " + budgetInfo.spendingMoney);
    //     localStorage.setItem("income", budgetInfo.spendingMoney);
    //     budgetInfo.incomeSubmitted = true;
    // }

    // // calls recordIncome or recordCategory based on whether or not the income has been recorded
    // $("#submit").on("click", function (event) {
    //     if (budgetInfo.incomeSubmitted == false) {
    //         recordIncome();
    //     } else {
    //         recordCategory()
    //     }
    // })
    // END OF PAGELOAD FUNCTION
});