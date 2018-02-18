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
                html += '<thead><tr><th style="font-weight:normal">Category</th><th style="font-weight:normal">Cost</th></tr></thead > ';
            }
            html += '<tbody> ';

            for (var i = 0; i < bArr.length; i++) {

                // append each row of the table 
                html += "<tr><td>" + bArr[i].category + " </td><td>" + bArr[i].dollarAmount + "</td></tr>";
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
        displaySavedBudgetInfo(true, false);
        //
        //
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


    var radioToggler = function(){
        if(budgetInfo.categories.catFood.isTracked == true){
            $(".foodR").toggle()
        }
        if(budgetInfo.categories.catClothing.isTracked == true){
            $(".clothingR").toggle()
        } 
        if(budgetInfo.categories.catEntertainment.isTracked == true){
            $(".entertainmentR").toggle()
        } 
        if(budgetInfo.categories.catSavings.isTracked == true){
            $(".savingsR").toggle()
        } 
        if(budgetInfo.categories.catTransportation.isTracked == true){
            $(".transportationR").toggle()
        } 
        if(budgetInfo.categories.catOther.isTracked == true){
            $(".otherR").toggle()
        } 
    };
    var allocationToggler = function(){
        if(budgetInfo.categories.catFood.isTracked == true){
            $(".foodP").toggle()
        }
        if(budgetInfo.categories.catClothing.isTracked == true){
            $(".clothingP").toggle()
        } 
        if(budgetInfo.categories.catEntertainment.isTracked == true){
            $(".entertainmentP").toggle()
        } 
        if(budgetInfo.categories.catSavings.isTracked == true){
            $(".savingsP").toggle()
        } 
        if(budgetInfo.categories.catTransportation.isTracked == true){
            $(".transportationP").toggle()
        } 
        if(budgetInfo.categories.catOther.isTracked == true){
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
         setBudgetInfoToStorage();
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
        $("#additionalInfo").html("You've spent $" + catTotalDollarAmount + " total in " + appendCategory + " so far.");
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
        allocationToggler();
        $("#percentageAllocatorButton").toggle();
        $("#prompt").html("<h2>How much of your budget would you like allocated to each category (adding up to 100)?</h2>");
    });
    // sets value of trackingPercents based on button click and adjusts display of input elements
    $("#no").on("click", function () {
        budgetInfo.trackingPercents = false;
        $("#yesNoButtons").toggle();
        $("#userInputDollars").toggle();
        radioToggler();
        $("#submit").toggle();
        $("#prompt").html("<h2>No problem! Let's get to tracking your budget. What'd you buy and how much did you spend?</h2>");
    });

    // new button for allocating percents, only displayed if user selects "yes" when asked if they want to track percents
    $("#percentageAllocatorButton").on("click", function () {
        // set local variable percentTotal to the total amount entered in the percentage allocator fields, each input defaults to 0
        var percentTotal = (parseInt($("#catFoodInput").val(), 10) + parseInt($("#catClothingInput").val(), 10) + parseInt($("#catEntertainmentInput").val(), 10) + parseInt($("#catSavingsInput").val(), 10) + parseInt($("#catTransportationInput").val(), 10) + parseInt($("#catOtherInput").val(), 10));
        // if the percents total more than 100, display error message and return
        if (percentTotal > 100) {
            $("#prompt").html("<h2>Please ensure total equals 100%</h2>");
            console.log(percentTotal);
            return;
        } else {
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
            setBudgetInfoToStorage();
        }
    });

    // END OF PAGELOAD FUNCTION

   // SHOULD BE FIRST -- 
   // this function reads the BudgetInfo object from local storage 
   
   getBudgetInfoFromStorage();
    
/*     USED FOR TESTING - MAY BE NEEDED AGAIN 

    budgetInfo.spendingMoney = 5000;

    addBudgetItem("Food", 100);
    addBudgetItem("Savings", 200);
    addBudgetItem("Other", 300); 
    
*/

// SHOULD BE AT END 
// setBudgetInfoToStorage();



});