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
    var radioToggler = function () {
        if (budgetInfo.categories.catFood.isTracked == true) {
            $(".foodR").toggle()
        }
        if (budgetInfo.categories.catClothing.isTracked == true) {
            $(".clothingR").toggle()
        }
        if (budgetInfo.categories.catEntertainment.isTracked == true) {
            $(".entertainmentR").toggle()
        }
        if (budgetInfo.categories.catSavings.isTracked == true) {
            $(".savingsR").toggle()
        }
        if (budgetInfo.categories.catTransportation.isTracked == true) {
            $(".transportationR").toggle()
        }
        if (budgetInfo.categories.catOther.isTracked == true) {
            $(".otherR").toggle()
        }
    };
    var allocationToggler = function () {
        if (budgetInfo.categories.catFood.isTracked == true) {
            $(".foodP").toggle()
        }
        if (budgetInfo.categories.catClothing.isTracked == true) {
            $(".clothingP").toggle()
        }
        if (budgetInfo.categories.catEntertainment.isTracked == true) {
            $(".entertainmentP").toggle()
        }
        if (budgetInfo.categories.catSavings.isTracked == true) {
            $(".savingsP").toggle()
        }
        if (budgetInfo.categories.catTransportation.isTracked == true) {
            $(".transportationP").toggle()
        }
        if (budgetInfo.categories.catOther.isTracked == true) {
            $(".otherP").toggle()
        }
    }
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
        $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's %" + ((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catFood.percentage * 0.01)) * 100) + " of your allocation for that category, you have $" + ((budgetInfo.spendingMoney * (budgetInfo.categories.catFood.percentage * 0.01) - catTotalDollarAmount)) + " remaining in that category."));
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

    // new button for allocating percents, only displayed if user selects "yes" when asked if they want to track percents
    $("#percentageAllocatorButton").on("click", function () {
        // set local variable percentTotal to the total amount entered in the percentage allocator fields, each input defaults to 0
        var percentTotal = (parseInt($("#catFoodInput").val(), 10) + parseInt($("#catClothingInput").val(), 10) + parseInt($("#catEntertainmentInput").val(), 10) + parseInt($("#catSavingsInput").val(), 10) + parseInt($("#catTransportationInput").val(), 10) + parseInt($("#catOtherInput").val(), 10));
        // if the percents total more than 100, display error message and return
        if (percentTotal != 100) {
            $("#prompt").html("<h2>Please ensure total equals 100%</h2>");
            console.log(percentTotal);
            return;
        } else {
            budgetInfo.trackingPercents = true;
            $("#percentageAllocator").toggle();
            $("#submit").toggle();
            $("#percentageAllocatorButton").toggle();
            radioToggler();
            $("#userInputDollars").toggle();
            $("#prompt").html("<h2>Great! Let's get to tracking your budget. What'd you buy and how much did you spend?</h2>");
            // converts entered values to integers and sets the allocated percentages in the budgetInfo object. since default values are set to 0, when we only display categories the user has selected to track this functionality should remain intact
            budgetInfo.categories.catFood.percentage = parseInt($("#catFoodInput").val(), 10);
            budgetInfo.categories.catClothing.percentage = parseInt($("#catClothingInput").val(), 10);
            budgetInfo.categories.catEntertainment.percentage = parseInt($("#catEntertainmentInput").val(), 10);
            budgetInfo.categories.catSavings.percentage = parseInt($("#catSavingsInput").val(), 10);
            budgetInfo.categories.catTransportation.percentage = parseInt($("#catTransportationInput").val(), 10);
            budgetInfo.categories.catOther.percentage = parseInt($("#catOtherInput").val(), 10);
        }
    });

    // when button is clicked, pass userInput values as arguments through both above functions, adding input to the budgetItems array and pushing to DOM
    $("#submit").on("click", function () {
        if (budgetInfo.incomeSubmitted === false) {
            // convert user input from string to integer, using base 10 radix (ensures it converts to the decimal system we humans use)
            budgetInfo.spendingMoney = parseInt($("#userInputDollars").val(), 10);
            budgetInfo.incomeSubmitted = true;
            $("#categoryCheckbox").toggle();
            $("#userInputDollars").toggle();
            $("#prompt").html("<h2>What categories would you like to keep track of?</h2>");
            //this does not call a function because all of it's functionality  happens in like 99 in the ".change" function that calls checkboxchecker
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === false) {
            budgetInfo.categoriesSelected = true;
            $("#categoryCheckbox").toggle();
            $("#submit").toggle();
            $("#percentageAllocator").toggle();
            $("#percentageAllocatorButton").toggle();
            $("#prompt").html("<h2>How much of your budget would you like allocated to each category (adding up to 100)?</h2>");
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === true && budgetInfo.trackingPercents === true) {
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