var recordCategory = function(){
    var userCategory = $("#userInput").val();
    console.log("category: " + userCategory);
    localStorage.setItem("category", userCategory);
    console.log(incomeSubmitted);

}

var recordIncome = function() {
    var userIncome = $("#userInput").val();
    console.log("income: " + userIncome);
    localStorage.setItem("income", userIncome);
    incomeSubmitted = true;
}
$("#submit").on("click", function(event) {
 if(incomeSubmitted == false) {
    recordIncome();
    }
else{
    recordCategory()
}
});