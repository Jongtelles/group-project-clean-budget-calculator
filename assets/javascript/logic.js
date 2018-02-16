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
        categoriesSelected: false,
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
            catSavings: {
                name: "Savings",
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

    // budgetInfo.budgetItems[budgetInfo.budgetItems.length - 1] (making note of the solution)

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
    //sets the variables in the budgetInfo object
    var checkboxChecker = function (whichCheckboxAreYou, isTrackedBool) {
        budgetInfo.categories[whichCheckboxAreYou].isTracked = isTrackedBool;
    };

    // this is my solution to the category picker. In the final version it will involve replacing the input section with a dropdown or scroll menu, like the one in the password generator, that includes our bategories.
    //it will likely make the funciton i wrote to take user input for categoires unecessary
    // $(".dropdown-item").on("click", function (event) {
    //     if ($(this).attr("id") === "food") {
    //         // $("#food").addClass("is-active");
    //         budgetInfo.categories.catFood.isTracked = true;
    //         console.log("catFood is being tracked " + budgetInfo.categories.catFood.isTracked);
    //     };

    // });

    // listens for any changes to a element with the checkbox class, determines the value of the checkbox input and if it is checked or unchecked, and passes those values to the checkboxChecker function
    $(".checkbox").change(function () {
        var whichCheckboxAreYou = $(this).val();
        var isTrackedBool = $(this).prop("checked");
        checkboxChecker(whichCheckboxAreYou, isTrackedBool);
    })
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#yes").on("click", function () {
        budgetInfo.trackingPercents = true;
        $("#yesNoButtons").toggle();
        $("#userInputDollars").toggle();
    });
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#no").on("click", function () {
        budgetInfo.trackingPercents = false;
        $("#yesNoButtons").toggle();
        $("#userInputDollars").toggle();
    });

    //when button is clicked, pass userInput values as arguments through both above functions, adding input to the budgetItems array and pushing to DOM
    $("#submit").on("click", function () {
        if (budgetInfo.incomeSubmitted === false) {
            //just in case, convert user input from string to integer, using base 10 radix (ensures it converts to the decimal system we humans use)
            budgetInfo.spendingMoney = parseInt($("#userInputDollars").val(), 10);
            budgetInfo.incomeSubmitted = true;
            $("#categoryCheckbox").toggle();
            $("#userInputDollars").toggle();
            $("#prompt").html("<h2>What categories would you like to keep track of?</h2>");
            //this does not call a function because all of it's functionality  happens in like 99 in the ".change" function that calls checkboxchecker
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === false) {
            budgetInfo.categoriesSelected = true;
            $("#categoryCheckbox").toggle();
            $("#yesNoButtons").toggle();
            $("#prompt").html("<h2>Do you want to enable more robust budget tracking and allocate percentages to each category?</h2>");
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === true) {
            // below line will be re-written based on category selector solution
            var tempCategory = $("#userInput").val();
            var tempDollars = $("#userInputDollars").val();
            addBudgetItem(tempCategory, tempDollars);
            outPutter(tempCategory, tempDollars);
            console.log(budgetInfo.budgetItems);
        }
    });

    //TODO:
    // if tracking percentages, need to display categories they've selected with percentages that automatically add up to 100% and also display the $ amount based on the percentage selected and then update budgetItems object with the percentages set by user
    // Update Outputter function to check for "trackingPercentages" variable and adjust output
    //If trackingPercents = true update Output with category, dollarAmount based on assigned percentage for that category, and remaining total spendingMoney

    // END OF PAGELOAD FUNCTION
});