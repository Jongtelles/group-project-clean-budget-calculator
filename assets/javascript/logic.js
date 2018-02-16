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

    // Get and Set local storage functions 
    var getBudgetItemFromStorage = function () {

        var budgetObject = localStorage.getItem('budObject');
        //console.log(budetObject.spendingMoney);
        if (budgetObject != null) {
            budgetInfo = JSON.parse(budgetObject);
            console.log(budgetInfo.spendingMoney);
        }

        // where & which fields from a saved budgetInfo object need to be displayed ? 
        // that could go here, or call a function here to do it
        //
        //
        //

    }

    var setBudgetItemFromStorage = function () {

        // clear ? 
        // localStorage.clear()

        // clears all local storage, not just our "budObject"  -- this way, without clear((),// should just  
        // replace, which should be adequate 

        budgetInfo.spendingMoney+= 1000;
        localStorage.setItem('budObject', JSON.stringify(budgetInfo));
        
       // where will this need to be called, so that data is saved on exit ?   bottom of last on click  ? 
    }


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
        $("#radioButtons").toggle();
    });
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#no").on("click", function () {
        budgetInfo.trackingPercents = false;
        $("#yesNoButtons").toggle();
        $("#userInputDollars").toggle();
        $("#radioButtons").toggle();
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
    // if tracking percentages, need to display categories they've selected with percentages that automatically add up to 100% and also display the $ amount based on the percentage selected and then update budgetItems object with the percentages set by user
    // Update Outputter function to check for "trackingPercentages" variable and adjust output
    //If trackingPercents = true update Output with category, dollarAmount based on assigned percentage for that category, and remaining total spendingMoney

    // END OF PAGELOAD FUNCTION
    budgetInfo.spendingMoney = 5000;

    // SHOULD BE AT END 
    setBudgetItemFromStorage();

    // SHOULD BE FIRST 
    getBudgetItemFromStorage();

});