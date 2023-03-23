// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
console.log("Code executing")
$(document).ready(function () {

  const startWorkDay = 9;
  const endWorkDay = 21;

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // Listen for saveBtn
  $(".saveBtn").on("click", function () {
    console.log("Button clicked");
    // User has entered data into one of the timeblocks and clickced Save
    // Pull the data (sibling element) next to the button element
    // All the save buttons  have a sibling text area with class "description"
    var userInput = $(this).siblings(".description").val();
    console.log("user Input is", userInput);
    // Get id of the containing time-block element
    // the parent is a div with a unique hour-# id. The id is the unique hour
    var id = $(this).parent().attr("id");
    // Save the user input to local storage using the id as a key
    // EX: hour-9 where id=9 and indicates 9am
    localStorage.setItem(id, userInput);
  });



  function evaluatePlannerColors() {
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //

    // let now = dayjs(); 
    // Get the current time
    console.log("Current time is:", dayjs().format('h:mm a')); // Print out the current time
    time = dayjs().format('HH:mm:ss');
    console.log("Current time is", time);

    currentHour = dayjs().format("HH");
    console.log("Current hour is", currentHour);

    // Cycle thru id's in HTML for blocks of hour-9 through hour-17
    // If currrentHour > plannerHour, set attribute class = "past" - grey
    // If  currrentHour == now, set attribute class = "present" - red
    // If currrentHour>now, set attribute class "future" - green
    // 9-17 is 9am-5pm, use 21 for testing
    for (let i = startWorkDay; i <= endWorkDay; i++) {
      // Select each div in HTML for each hour, get the id
      // Ex:  id=hour-10, retreive 10
      const plannerHourID = document.getElementById(`hour-${i}`);
      const plannerHour = parseInt(plannerHourID.id.split("-")[1]);
      // console.log ("plannerHour is", plannerHour);

      if (currentHour > plannerHour) {
        // Add past class if current hour is greater than planner hour
        plannerHourID.children[1].classList.add("past");
      } else if (currentHour == plannerHour) {
        // Add present class if current hour is equal to planner hour
        plannerHourID.children[1].classList.add("present");
      } else {
        // Add future class if current hour is less than plannerr hour
        plannerHourID.children[1].classList.add("future");
      }
    }
  } // END evaluatePlannerColors



    function getUserData () {
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    for (let i = startWorkDay; i <= endWorkDay; i++) {
      const storedData = (localStorage.getItem(`hour-${i}`));
      // debugger;
      // if (storedData && storedData.userInput) {
      if (storedData != null) {
        console.log("storedData is", storedData);
        // Send the data to the textarea element 
        // textarea is a child of <div> thaht has #hour-5
        // $("#hour-4").find('.textarea').val("hello");
        $('#hour-' + i).find('.textarea').val(storedData);
        // $('#hour-${i}').textarea(storedData);
        // $(`#hour-${i}`).val(storedData.userInput);
        // let output = $('#hour-${i}').val(storedData.userInput);

        // console.log ("output is", output);
      }
    }
  } // END getUserData



  // Update the planner color coding every minute
  // var hourInterval = 
 setInterval(function () {
    console.log("Checking Time");
    evaluatePlannerColors();
    getUserData();
  },1000);
  // evaluatePlannerColors();



  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs();
  $('#currentDay').text(today.format('dddd, MMM D, YYYY'));

  function init() {
    localStorage.clear();
    clearInterval(time);
  }

  // init();

}); //END OF document.ready WRAPPER


// no need to parse or stringify

// Tucker gave us this on Monday night
// $(".time-block").each(function () {
//   const timeBlock = $(this);
  // const hour = timeBlock.attr("id").split("-").pop();
  // const hour = timeBlock
    // hour-9
    // .attr("id")
    // 'hour', '9'
    // .split("-")
    //returns 9
    // .pop();

  // timeBlock.addClass("future")
// })
