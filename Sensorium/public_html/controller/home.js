
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAvbL0rY4qEe1lYwu7HG0Y8JARtjgChAcM",
    authDomain: "psicproject.firebaseapp.com",
    databaseURL: "https://psicproject.firebaseio.com",
    projectId: "psicproject",
    storageBucket: "psicproject.appspot.com",
    messagingSenderId: "409925314100"
};
firebase.initializeApp(config);

//var database = firebase.database();
//var user = firebase.auth().currentUser;
//var uid = user.uid;
//var name = user.displayName;
//var email = user.email;
//var photo = user.photoURL;



// AUTHENTICATION USER
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        showHourDate();
        checkUser();
    } else {
        // Error
    }
});



// VERIFY IF USER EXIST
// Ignore this funcition
function checkUser() {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var uid = user.uid;

    var refer = database.ref("psic/" + uid);
    if (user !== null) {
        console.log("USER FULL");
        refer.on("value", function (snapshot) {
            var data = snapshot.val();
            if (data !== null) {
                console.log("DATA FULL");
            } else {
                console.log("DATA NULL");
                addUserUID();
            }
        });
    } else {
        console.log("USER NULL");
    }
}



// ADD USER UID TO DATA BASE
// Ignore this function
function addUserUID() {
    var database = firebase.database();
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    var email = user.email;
    var refer = database.ref("psic/" + uid + "/personalInfo/");
    var obj = {
        email: email
    };
    refer.update(obj);
    console.log("User added with email");
    console.log("Email --> " + email);
}



// LOGOUT FUNCTION
function logOut() {
    console.log("Logging out...");
    firebase.auth().signOut().then(function () {
        window.location = "login.html";
    }, function (error) {
        // An error happened.
    });
}



// CURRENT DATE AND CURRENT TIME FUNCTION
function showHourDate() {
    var meses = new Array(
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
            );
    var diasSemana = new Array(
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            );
    var fechaCompleta = new Date();
    var ampm;

    today = new Date();
    hour = today.getHours();
    minute = today.getMinutes();
    second = today.getSeconds();
    minute = checkTime(minute);
    second = checkTime(second);

    if (hour > 12) {
        hour = hour - 12;
        ampm = "pm";
    } else {
        ampm = "am";
        if (hour === 0) {
            hour = 12;
        }
    }

    var fechaCompleta = (diasSemana[fechaCompleta.getDay()] + " " + meses[fechaCompleta.getMonth()] + " " + fechaCompleta.getDate() + ", " + fechaCompleta.getFullYear()).toString();
    var horaCompleta = (hour + ":" + minute + ":" + second + " " + ampm);

    document.getElementById('date').innerHTML = fechaCompleta;
    document.getElementById('hour').innerHTML = horaCompleta;

    t = setTimeout('showHourDate()', 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}