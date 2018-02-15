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


    // this is my solution to the category picker. In the final version it will involve replacing the input section with a dropdown or scroll menu, like the one in the password generator, that includes our bategories.
    //it will likely make the funciton i wrote to take user input for categoires unecessary
    $(".dropdown-item").on("click", function(event){
        if($(this).attr("id") === "food"){
            // $("#food").addClass("is-active");
            budgetInfo.categories.catFood.isTracked = true;
            console.log("catFood is being tracked " + budgetInfo.categories.catFood.isTracked);
        };
        if($(this).attr("id") === "clothing"){
            budgetInfo.categories.catClothing.isTracked = true;
            console.log("catClothing is being tracked " + budgetInfo.categories.catClothing.isTracked);
        };
        if($(this).attr("id") === "entertainment"){
            budgetInfo.categories.catEntertainment.isTracked = true;
            console.log("catEntertainment is being tracked " + budgetInfo.categories.catEntertainment.isTracked);
        }
        if($(this).attr("id") === "savings"){
            budgetInfo.categories.catSavings.isTracked = true;
            console.log("catSavings is being tracked " + budgetInfo.categories.catSavings.isTracked);
        }
        if($(this).attr("id") === "transportation"){
            budgetInfo.categories.catTransportation.isTracked = true;
            console.log("catTransportation is being tracked " + budgetInfo.categories.catTransportation.isTracked);
        }
        if($(this).attr("id") === "other"){
            budgetInfo.categories.catOther.isTracked = true;
            console.log("catOther is being tracked " + budgetInfo.categories.catOther.isTracked);
        }
    });

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
