//the code here is adapted and changed from the add employee table exercise

  var config = {
    apiKey: "AIzaSyB8vQGsKSlYIl-awwROxPnuWzyB6oRr5vc",
    authDomain: "week7homework-deae3.firebaseapp.com",
    databaseURL: "https://week7homework-deae3.firebaseio.com",
    projectId: "week7homework-deae3",
    storageBucket: "week7homework-deae3.appspot.com",
    messagingSenderId: "535174173216"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var startTime = "";
  var frequency = 0;

 
  $('#add-train-btn').on("click", function(event){
    event.preventDefault();
    trainName = $('#train-name-input').val().trim();
        $('#train-name-input').val("");
    destination = $('#destination-input').val().trim();
        $('#destination-input').val("");
    startTime = $('#train-start-input').val().trim();
        $('#train-start-input').val("");
    frequency= $('#frequency-input').val().trim();
        $('#frequency-input').val("");
    database.ref().push({
        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    });

    database.ref().on("child_added", function(snapshot, prevChildKey){
        var newTrain = snapshot.val().trainName;
        var newDestination = snapshot.val().destination;
        var newStart = snapshot.val().startTime;
        var newFrequency = snapshot.val().frequency;


        //This is adapted and changed from the moments snippet sent out 10/28/17

        // First Time (pushed back 1 year to make sure it comes before current time)
        var newStartConverted = moment(newStart, "hh:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(newStartConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % newFrequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = newFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm A");


        $("table tbody").append(`<tr>
        <td>${newTrain}</td>
        <td>${newDestination}</td>
        <td>${newFrequency}</td>
        <td>${nextTrain}</td>
        <td>${tMinutesTillTrain}</td>
        </tr>`);
    });

  });

