// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {

  const startWorkDay = 9;
  const endWorkDay = 17; // 5pm

  // Listen for saveBtn
  $(".saveBtn").on("click", function () {
    console.log("Button clicked");
    // User has entered data (userInput) in one of the timeblocks and clickced Save Button
    // Locate the userInput
    //     Each save button has a sibling selector. It is a <textarea> with class "description"
    //     Retreive the value in this arera next to the button that was clicked
    var userInput = $(this).siblings(".description").val();
    console.log("user Input is", userInput);
    // Retreive the hour block that contains userInput
    //     Each hour-id is a <#id tag> wrapped in a parent <div>
    var id = $(this).parent().attr("id");
    // Save the user input to local storage using the id as a key
    //     EX: hour-id  (ex: hour-9 where id=9 and indicates 9am)
    localStorage.setItem(id, userInput);
  });



  function evaluatePlannerColors() {
    // Apply the past, present, or future class to each time
  currentHour = dayjs().format("HH");
    // console.log("Current hour is", currentHour);

    // Cycle thru id's in HTML for blocks of hour-9 through hour-17
    // If currrentHour > plannerHour, set attribute class to "past" - grey
    // If  currrentHour == now, set attribute class to "present" - red
    // If currrentHour>now, set attribute class to "future" - green
    for (let i = startWorkDay; i <= endWorkDay; i++) {
      // Select each div in HTML for the hour, get the id
      //     Ex:  id=hour-10, retreive 10
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



  function pullFromLocalStorage() {
    // get user input saved in localStorage
    // set the corresponding textarea elements using the id on the key of "hour-id"
    console.log("inside Pull From Local Storage");
    for (let i = startWorkDay; i <= endWorkDay; i++) {
      let hour = ('hour-' + i);
      // console.log("hour block is ", hour);
      const storedData = (localStorage.getItem(hour));
      console.log("stored data for ", hour, " is ", storedData);
      // Render to the text area for the id hour block
      if (storedData) {
        $("#" + hour).children("textarea").eq(0).val(storedData);
      }
    }
  } // END pullFromLocalStorage

  function updateDate() {
    // Display the current date in header of page.
    var today = dayjs();
    $('#currentDay').text(today.format('dddd, MMM D, YYYY'));
  }

  // Update the date and planner color coding every minute
  setInterval(function () {
    console.log("Checking Time");
    updateDate();
    evaluatePlannerColors();
  }, 6000);




  function init() {
    console.log("initializing")
    updateDate;
    evaluatePlannerColors();
    pullFromLocalStorage();
  }

  init();

}); //END OF document.ready WRAPPER
