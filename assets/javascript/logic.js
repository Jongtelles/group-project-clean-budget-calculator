/*
   GWU 1st Group Project - good & simple budget tracker

   Jon Telles, Marcus Hilaire, Nate Schubert, Al Curry

   February 20, 2018

    logic.js - main javascript logic file invoked by index.html

*/

// On page load
$(document).ready(function () {
    // budgetInfo object contains all necessary variables
    var budgetInfo = {
        //user inputs total amount of $ to track
        spendingMoney: 0,
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
                isTracked: true,
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

    var displaySavedBudgetInfo = function (inclHdr, makeTable) {
        var bArr = budgetInfo.budgetItems;
        var html = "";
        console.log("dsbi : " + bArr.length);

        // maybe a simple table looks better than what existing outPutter() does  ?    AC 02/17/2018
        /*   for (var i = 0; i < bArr.length; i++) {
            outPutter(bArr[i][0], bArr[i][1]);
        } */

        // we have budget items
        if (bArr.length > 0) {
            radioToggler();
            $("#prompt").html("<h2>Welcome back! Buy something new?</h2>");
            if (!makeTable) {

                for (var i = 0; i < bArr.length; i++) {

                    $("#output").append("Category: " + bArr[i].category + " ");
                    $("#output").append("Cost: " + "$" + bArr[i].dollarAmount + "<br\>");

                    console.log("budgetCategory: " + bArr[i].category + "   budgetAmount: " + bArr[i].dollarAmount);
                }

            } else {

                // write the table header to html string
                // note with bulma class "table", which presents well but
                // seems to default to white background - may need modification
                html = '<table class="table">'
                if (inclHdr) {
                    html += '<thead><tr><th style="font-weight:normal">Category</th><th style="font-weight:normal;text-align:right">Cost</th></tr></thead > ';
                }
                html += '<tbody> ';

                for (var i = 0; i < bArr.length; i++) {

                    // append each row of the table
                    html += '<tr><td>' + bArr[i].category + '</td><td style="text-align:right">' + '$' + bArr[i].dollarAmount + '</td></tr>';
                    console.log("budgetCategory: " + bArr[i].category + "   budgetAmount: " + bArr[i].dollarAmount);
                }

                // end the table
                html += "</tbody></table>";

                // and append the html to output div -- jquery append closes tags
                // ergo multiple cals to append do not work correctly in this scenario
                $("#output").append(html);
            }
        }
    }

    // Get and Set local storage functions
    var getBudgetInfoFromStorage = function () {

        var budgetObject = localStorage.getItem('budObject');
        //console.log(budetObject.spendingMoney);
        if (budgetObject != null) {
            budgetInfo = JSON.parse(budgetObject);
            console.log("spend : " + budgetInfo.spendingMoney);
        }

        // where & which fields from a saved budgetInfo object need to be displayed ?
        // that could go here, or call a function here to do it
        displaySavedBudgetInfo(true, true);
        // argument 1 - include a header, only for a table
        // arguemnt 2 - display in table format
        //


    }

    var setBudgetInfoToStorage = function () {

        // clear ?
        // localStorage.clear()

        // clears all local storage, not just our "budObject"  -- this way, without clear((),// should just
        // replace, which should be adequate

        localStorage.setItem('budObject', JSON.stringify(budgetInfo));

        // where will this need to be called, so that data is saved on exit ?   bottom of last on click  ?
    }

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
        } else if (cat === "Transportation") {
            budgetInfo.categories.catTransportation.totalSpent += dollars;
        } else if (cat === "Other") {
            budgetInfo.categories.catOther.totalSpent += dollars;
        }
        $("#prompt").html("<h2>Got it! Wanna add anything else?</h2>");
        setBudgetInfoToStorage();
    };
    // global variable
    var catTotalDollarAmount;
    var outPutter = function (appendCategory, appendCost) {
        // based on category and cost of last budget item, output the following information: total $ spent in that category, what % of total allocation has been spent so far, and $ remaining for that category
        if (appendCategory === "Food") {
            catTotalDollarAmount = budgetInfo.categories.catFood.totalSpent;
            $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's " + Math.floor((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catFood.percentage * 0.01)) * 100)) + "% of your allocation for that category, you have $" + (budgetInfo.spendingMoney * (budgetInfo.categories.catFood.percentage * 0.01) - catTotalDollarAmount) + " remaining in that category.");
        } else if (appendCategory === "Clothing") {
            catTotalDollarAmount = budgetInfo.categories.catClothing.totalSpent;
            $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's " + Math.floor((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catClothing.percentage * 0.01)) * 100)) + "% of your allocation for that category, you have $" + (budgetInfo.spendingMoney * (budgetInfo.categories.catClothing.percentage * 0.01) - catTotalDollarAmount) + " remaining in that category.");
        } else if (appendCategory === "Entertainment") {
            catTotalDollarAmount = budgetInfo.categories.catEntertainment.totalSpent;
            $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's " + Math.floor((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catEntertainment.percentage * 0.01)) * 100)) + "% of your allocation for that category, you have $" + (budgetInfo.spendingMoney * (budgetInfo.categories.catEntertainment.percentage * 0.01) - catTotalDollarAmount) + " remaining in that category.");
        } else if (appendCategory === "Transportation") {
            catTotalDollarAmount = budgetInfo.categories.catTransportation.totalSpent;
            $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's " + Math.floor((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catTransportation.percentage * 0.01)) * 100)) + "% of your allocation for that category, you have $" + (budgetInfo.spendingMoney * (budgetInfo.categories.catTransportation.percentage * 0.01) - catTotalDollarAmount) + " remaining in that category.");
        } else if (appendCategory === "Other") {
            catTotalDollarAmount = budgetInfo.categories.catOther.totalSpent;
            $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far. That's " + Math.floor((catTotalDollarAmount / (budgetInfo.spendingMoney * (budgetInfo.categories.catOther.percentage * 0.01)) * 100)) + "% of your allocation for that category, you have $" + (budgetInfo.spendingMoney * (budgetInfo.categories.catOther.percentage * 0.01) - catTotalDollarAmount) + " remaining in that category.");
        }
        // always display last added budget item's category and cost
        $("#output").append("Category: " + appendCategory + " ");
        $("#output").append("Cost: " + "$" + appendCost + "<br\>");
    };

    //sets the variables in the budgetInfo object
    var checkboxChecker = function (whichCheckboxAreYou, isTrackedBool) {
        budgetInfo.categories[whichCheckboxAreYou].isTracked = isTrackedBool;
    };
    // listens to the inputs of each percentage allocater field, when user presses a key in each percentage allocater input fields, convert what they've typed to the correct $ amount and display it in the span for that category
    $(".inputP").keyup(function () {
        if ($(this).prop("id") === "catSavingsInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catSavingsConverted").html("$" + conversion);
        }
        if ($(this).prop("id") === "catFoodInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catFoodConverted").html("$" + conversion);
        }
        if ($(this).prop("id") === "catClothingInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catClothingConverted").html("$" + conversion);
        }
        if ($(this).prop("id") === "catEntertainmentInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catEntertainmentConverted").html("$" + conversion);
        }
        if ($(this).prop("id") === "catTransportationInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catTransportationConverted").html("$" + conversion);
        }
        if ($(this).prop("id") === "catOtherInput") {
            var conversion = Math.floor((budgetInfo.spendingMoney * ($(this).val() * 0.01)));
            $("#catOtherConverted").html("$" + conversion);
        }
    });

    $("#reset").on("click", function () {
        var reset = confirm("Are you sure? This will reset all stored data.");
        if (reset == true) {
            localStorage.clear();
            budgetInfo.spendingMoney = 0;
            budgetInfo.budgetItems = [];
            budgetInfo.incomeSubmitted = false;
            budgetInfo.categoriesSelected = false;
            budgetInfo.trackingPercents = false;
            $("#output").empty();
            $(".radioB").hide();
            $("#prompt").html("<h2>After fixed costs, how much do you have leftover to spend?</h2>");
        }
    });
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
            $("#prompt").html("<h2>Please ensure total allocation equals 100%</h2>");
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
            // set the "totalSpent" of the Savings category based on allocated percentage
            budgetInfo.categories.catSavings.totalSpent = (budgetInfo.spendingMoney * (budgetInfo.categories.catSavings.percentage * 0.01));
            // $("#spendingMoney").html("Total spending money remaining: $" + budgetInfo.spendingMoney);
        }

        setBudgetInfoToStorage();
    });
    // when button is clicked, pass userInput values as arguments through both above functions, adding input to the budgetItems array and pushing to DOM
    $("#submit").on("click", function () {
        if (budgetInfo.incomeSubmitted === false) {
            // convert user input from string to integer, using base 10 radix (ensures it converts to the decimal system we humans use)
            budgetInfo.spendingMoney = parseInt($("#userInputDollars").val(), 10);
            budgetInfo.incomeSubmitted = true;
            $("#categoryCheckbox").toggle();
            $("#userInputDollars").toggle();
            // $("#spendingMoney").html("Total spending money remaining: $" + budgetInfo.spendingMoney);
            $("#prompt").html("<h2>What categories would you like to keep track of?</h2>");
            //this does not call a function because all of it's functionality  happens in like 99 in the ".change" function that calls checkboxchecker
        } else if (budgetInfo.incomeSubmitted === true && budgetInfo.categoriesSelected === false) {
            budgetInfo.categoriesSelected = true;
            $("#categoryCheckbox").toggle();
            $("#submit").toggle();
            allocationToggler();
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
            } else if ($("#radioTransportation").prop("checked") == true) {
                var stageThreeCat = "Transportation"
            } else if ($("#radioOther").prop("checked") == true) {
                var stageThreeCat = "Other"
            };
            var stageThreeCost = parseInt($("#userInputDollars").val(), 10);
            addBudgetItem(stageThreeCat, stageThreeCost);
            outPutter(stageThreeCat, stageThreeCost);
            console.log("food? " + $("radioFood").prop("checked"));
        }
        setBudgetInfoToStorage();
    });

    // END OF PAGELOAD FUNCTION
    // SHOULD BE FIRST --
    // this function reads the BudgetInfo object from local storage

    getBudgetInfoFromStorage();

    /*   USED FOR TESTING - MAY BE NEEDED AGAIN

        budgetInfo.spendingMoney = 5000;
        addBudgetItem("Food", 10);
        addBudgetItem("Savings", 2000);
        addBudgetItem("Other", 300);
         */


    // this may need to be called here - or other places near
    // the end of various functions - for now there are 3 calls
    // interspersed above, testing to finalize
    // setBudgetInfoToStorage();

});