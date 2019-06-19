let go = 0;
let counter = 0;
let minuteCounter = 0;
let hourCounter = 0;
let hourHand = $("#hour");
let minuteHand = $("#minute");
let secondHand = $("#second");
let hourInput = $("#hourInput");
let minuteInput = $("#minuteInput");
let secondInput = $("#secondInput");
let dateInput = $("#dateInput");
let setBut = $("#setter");
let dateCounter = 0;

//Takes user input and sets appropriate time
let setTime = () => {
  if (parseInt(dateInput.val()) > 31 || parseInt(dateInput.val()) < 1 || dateInput.val() == "" || hourInput.val() == "" || minuteInput.val() == "" || secondInput.val() == "") {
    alert("Please fill in all the fields with valid inputs");
    return;
  }
  go = 1;
  counter = 0;
  setBut.attr("disabled", "true");
  let hoursVal = parseInt(hourInput.val());
  let minutesVal = parseInt(minuteInput.val());
  let secondsVal = parseInt(secondInput.val());
  let secondDeg = 6*secondsVal;
  let minuteDeg = 6*minutesVal + secondsVal/10;
  let hourDeg = 30*hoursVal + minutesVal/2 + secondsVal/120;
  let dateNum = parseInt(dateInput.val());
  let checker = 720;
  $("#datenum1").html(dateNum);
  hourHand.css("transform", "rotate(" + (hourDeg) + "deg)");
  minuteHand.css("transform", "rotate(" + (minuteDeg) + "deg)");
  secondHand.css("transform", "rotate(" + secondDeg + "deg)");
  let myInterval = setInterval(function() {
    if (go == 1) {
      counter+=6/20;
      minuteCounter=counter/60;
      hourCounter=counter/720;
      if (Math.floor(hourCounter + hourDeg) > checker) {
        checker+=720;
        dateNum++;
        if (dateNum == 32) {
          dateNum-=31;
        }
        newDate(dateNum);
      }
      secondHand.css("transform", "rotate(" + (secondDeg + counter) + "deg)");
      minuteHand.css("transform", "rotate(" + (minuteDeg + minuteCounter) + "deg)");
      hourHand.css("transform", "rotate(" + (hourDeg + hourCounter) + "deg)");
    } else {
      clearInterval(myInterval);
    }
  }, 50);
}

//Changes the date on the watch when it hits midnight
let newDate = (dateNum) => {
  $("#date").append("<h3 id='datenum2' class='datenum'>" + dateNum.toString() + "</h3>");
  $("#datenum1").animate({top: "-30px"}, 1000);
  $("#datenum2").animate({top: "-30px"}, 1000, function() {
    $("#datenum1").remove();
    $("#datenum2").attr("id", "datenum1");
    $("#datenum1").css({top: "0px"});
  });
}


//Resets time to 0:00 and date to 1;
let reset = () => {
  go = 0;
  setBut.attr("disabled", null);
  secondHand.css("transform", "rotate(0deg)");
  minuteHand.css("transform", "rotate(0deg)");
  hourHand.css("transform", "rotate(0deg)");
  $("#datenum1").html("1");
  dateNum = 1;
  secondInput.val("");
  minuteInput.val("");
  hourInput.val("");
  dateInput.val("");
}

//scroll down to watch face when page loads
let scrollHeight = document.getElementById("main").offsetTop;
window.onload = window.scroll({
  top: scrollHeight - (window.innerHeight/2 - $("#main").height()/2 - 15),
  behavior: "smooth"
});
