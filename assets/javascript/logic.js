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
        $("#prompt").html("<h2>No problem! Let's get to tracking your budget. What'd you buy?</h2>");
    });

    $("#percentageAllocatorButton").on("click", function () {
        $("#percentageAllocator").toggle();
        $("#submit").toggle();
        $("#percentageAllocatorButton").toggle();
        $("#radioButtons").toggle();
        $("#userInputDollars").toggle();
        $("#prompt").html("<h2>Great! Let's get to tracking your budget. What'd you buy?</h2>");
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
            var stageThreeCost = $("#userInputDollars").val();
            // defineCat();
            addBudgetItem(stageThreeCat, stageThreeCost);
            outPutter(stageThreeCat, stageThreeCost);
            console.log("food? " + $("radioFood").prop("checked"));
        }
    });

    //TODO:

    //     var toggler = function(toggleMe){
    //         $(toggleMe).toggle();
    //     };

    //     toggler(this);
    // // takes argument of
    //     var funk = function(cat){
    //         if (budgetInfo.categories[cat].isTracked === true)
    //     }
    // // use this to set percent values in the object, pass it a variable that's set to the .val() of a jquery selector, and the user's input for the percentNumber
    //     var percentSetter = function (whichCatAreYou, percentNumber) {
    //         budgetInfo.categories[whichCatAreYou].percentage = percentNumber;
    //     };

    //     var categoryFinder = function(whichCatAreYou){
    //         budgetInfo.categories[whichCatAreYou]
    // return whichCatAreYou
    //     }
    //     finds which categories are tracked

    //     budgetInfo.budgetItems.categories

    //     function roundPercentageTotals(numArr) {

    //         // Total of all numbers passed.
    //         for loop that adds a numArr[] for each tracked category
    //         var total = numArr[0] + numArr[1] + numArr[2];

    //         // Percentage representations of each number (out of 100).
    //         var num1Percent = Math.round((numArr[0] / total) * 100);
    //         var num2Percent = Math.round((numArr[1] / total) * 100);
    //         var num3Percent = Math.round((numArr[2] / total) * 100);

    //         // Total percent of the 3 numbers combined (doesnt always equal 100%).
    //         var totalPercentage = num1Percent + num2Percent + num3Percent;

    //         // If not 100%, then we need to work around it by subtracting from the largest number (not as accurate but works out).
    //         if (totalPercentage != 100) {
    //             // Get the index of the largest number in the array.
    //             var index = getLargestNumInArrayIndex(numArr);

    //             // Take the difference away from the largest number.
    //             numArr[index] = numArr[index] - (totalPercentage - 100);

    //             // Re-run this method recursively, until we get a total percentage of 100%.
    //             return roundPercentageTotals(numArr);
    //         }

    //         // Return the percentage version of the array passed in.
    //         return [num1Percent, num2Percent, num3Percent];
    //     }

    //     function getLargestNumInArrayIndex(array) {
    //         return array.indexOf(Math.max.apply(Math, array));
    //     }


    // if tracking percentages, need to display categories they've selected with percentages that automatically add up to 100% and also display the $ amount based on the percentage selected and then update budgetItems object with the percentages set by user
    // Update Outputter function to check for "trackingPercentages" variable and adjust output
    //If trackingPercents = true update Output with category, dollarAmount based on assigned percentage for that category, and remaining total spendingMoney

    // END OF PAGELOAD FUNCTION
});