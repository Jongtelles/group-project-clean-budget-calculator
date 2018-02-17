// On page load
$(document).ready(function () {
    // budgetInfo object contains all necessary variables
    var budgetInfo = {
        //user inputs total amount of $ to track
        spendingMoney: undefined,
        trackingPercents: undefined,
        //array for user inputted budgetItems
        budgetItems: [],
        incomeSubmitted: false,
        categoriesSelected: false,
        //user will determine which categories to track, and % of spendingMoney allocated
        categories: {
            catFood: {
                name: "Food",
                isTracked: false,
                totalSpent: 0,
                percentage: 0
            },
            catClothing: {
                name: "Clothing",
                isTracked: false,
                totalSpent: 0,
                percentage: 0
            },
            catEntertainment: {
                name: "Entertainment",
                isTracked: false,
                totalSpent: 0,
                percentage: 0
            },
            catSavings: {
                name: "Savings",
                isTracked: false,
                totalSpent: 0,
                percentage: 0
            },
            catTransportation: {
                name: "Transportation",
                isTracked: false,
                totalSpent: 0,
                percentage: 0
            },
            catOther: {
                name: "Other",
                isTracked: false,
                totalSpent: 0,
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
        // based on category of new budget item, set totalSpent value of that category to current value + cost of new budget item (this will keep a running tally of each category right in the budgetInfo categories object)
        if (cat === "Food") {
            budgetInfo.categories.catFood.totalSpent += dollars;
        } else if (cat === "Clothing") {
            budgetInfo.categories.catClothing.totalSpent += dollars;
        } else if (cat === "Entertainment") {
            budgetInfo.categories.catEntertainment.totalSpent += dollars;
        } else if (cat === "Savings") {
            budgetInfo.categories.catSavings.totalSpent += dollars;
        } else if (cat === "Transportation") {
            budgetInfo.categories.catTransportation.totalSpent += dollars;
        } else if (cat === "Other") {
            budgetInfo.categories.catOther.totalSpent += dollars;
        }
        $("#prompt").html("<h2>Got it! Wanna add anything else?</h2>");
    };

    var catTotalDollarAmount;
    //function outputs basic user input to output field, not including percentage tracking
    var outPutter = function (appendCategory, appendCost) {
        // based on category, set variable that will be displayed to user to totalSpent in that category
        if (appendCategory === "Food") {
            catTotalDollarAmount = budgetInfo.categories.catFood.totalSpent;
        } else if (appendCategory === "Clothing") {
            catTotalDollarAmount = budgetInfo.categories.catClothing.totalSpent;
        } else if (appendCategory === "Entertainment") {
            catTotalDollarAmount = budgetInfo.categories.catEntertainment.totalSpent;
        } else if (appendCategory === "Savings") {
            catTotalDollarAmount = budgetInfo.categories.catSavings.totalSpent;
        } else if (appendCategory === "Transportation") {
            catTotalDollarAmount = budgetInfo.categories.catTransportation.totalSpent;
        } else if (appendCategory === "Other") {
            catTotalDollarAmount = budgetInfo.categories.catOther.totalSpent;
        }
        $("#output").append("Category: " + appendCategory + " ");
        $("#output").append("Cost: " + "$" + appendCost + "<br\>");
        $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory);
    };

    //sets the variables in the budgetInfo object
    var checkboxChecker = function (whichCheckboxAreYou, isTrackedBool) {
        budgetInfo.categories[whichCheckboxAreYou].isTracked = isTrackedBool;
    };

    // listens for any changes to a element with the checkbox class, determines the value of the checkbox input and if it is checked or unchecked, and passes those values to the checkboxChecker function
    $(".checkbox").change(function () {
        var whichCheckboxAreYou = $(this).val();
        var isTrackedBool = $(this).prop("checked");
        checkboxChecker(whichCheckboxAreYou, isTrackedBool);
    });
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#yes").on("click", function () {
        budgetInfo.trackingPercents = true;
        $("#yesNoButtons").toggle();
        $("#percentageAllocator").toggle();
        $("#percentageAllocatorButton").toggle();
        $("#prompt").html("<h2>How much of your budget would you like allocated to each category (adding up to 100)?</h2>");
    });
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#no").on("click", function () {
        budgetInfo.trackingPercents = false;
        $("#yesNoButtons").toggle();
        $("#userInputDollars").toggle();
        $("#radioButtons").toggle();
        $("#submit").toggle();
        $("#prompt").html("<h2>No problem! Let's get to tracking your budget. What'd you buy and how much did you spend?</h2>");
    });

    $("#percentageAllocatorButton").on("click", function () {
        $("#percentageAllocator").toggle();
        $("#submit").toggle();
        $("#percentageAllocatorButton").toggle();
        $("#radioButtons").toggle();
        $("#userInputDollars").toggle();
        $("#prompt").html("<h2>Great! Let's get to tracking your budget. What'd you buy and how much did you spend?</h2>");
        // foo a bunch of stuff
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
            $("#submit").toggle();
            $("#prompt").html("<h2>Do you want to enable more robust budget tracking and allocate percentages to each category?</h2>");
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === true) {
            // sets the variable "stageThreeCat" according to which radio button is selected and that is pushed to outputter() and addBudgetItem()
            if ($("#radioFood").prop("checked") == true) {
                var stageThreeCat = "Food"
            } else if ($("#radioClothing").prop("checked") == true) {
                var stageThreeCat = "Clothing"
            } else if ($("#radioEntertainment").prop("checked") == true) {
                var stageThreeCat = "Entertainment"
            } else if ($("#radioSavings").prop("checked") == true) {
                var stageThreeCat = "Savings"
            } else if ($("#radioTransportation").prop("checked") == true) {
                var stageThreeCat = "Transportation"
            } else if ($("#radioOther").prop("checked") == true) {
                var stageThreeCat = "Other"
            };
            var stageThreeCost = parseInt($("#userInputDollars").val(), 10);
            // defineCat();
            addBudgetItem(stageThreeCat, stageThreeCost);
            outPutter(stageThreeCat, stageThreeCost);
            console.log("food? " + $("radioFood").prop("checked"));
        }
    });

    // END OF PAGELOAD FUNCTION
});