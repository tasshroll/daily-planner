src="https://cdn.jsdelivr.net/npm/dayjs@1.11.3/dayjs.min.js"
integrity="sha256-iu/zLUB+QgISXBLCW/mcDi/rnf4m4uEDO0wauy76x7U="
crossorigin="anonymous"

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {



$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // Listen for saveBtn
$(".saveBtn").on("click", function() {
  // Pull user text from textarea
  var userInput = $(this).siblings(".description").val();
  // Get the id of the containing time-block element
  var blockId = $(this).parent().attr("id");
  // Save the user input to local storage using the blockId as a key
  localStorage.setItem(blockId, userInput);
});

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

const now = dayjs(); // Get the current time

console.log("Current time is:", now.format('h:mm A')); // Print out the current time

time = now.format('HH:mm:ss');
console.log ("Current time is", time);

currentHour = now.format('HH');
console.log ("Current hour is", currentHour);

// Cycle thru id's in HTML for blocks of hour-9 through hour-17
// If currrentHour>now, set attribute to class = "past"
// If  currrentHour=now, set attribute to class = "present"
// If currrentHour>now, set attribute to class "future"
for (let i = 9; i <= 17; i++) {
  const timeBlock = document.getElementById(`hour-${i}`);
  const blockHour = parseInt(timeBlock.id.split("-")[1]);
  console.log ("blockHour is", blockHour);

  // Add past class if current hour is greater than block hour
  if (currentHour > blockHour) {
    timeBlock.children[1].classList.add("past");
    console.log("Applying past class");
  }

  // Add present class if current hour is equal to block hour
  else if (currentHour === blockHour) {
    timeBlock.children[1].classList.add("present");
  }

  // Add future class if current hour is less than block hour
  else {
    timeBlock.children[1].classList.add("future");
  }
}

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
});


  // TODO: Add code to display the current date in the header of the page.
var today = dayjs();
$('#currentDay').text(today.format('dddd, MMM D, YYYY'));

})
