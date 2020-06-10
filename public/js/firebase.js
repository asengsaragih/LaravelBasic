var firebaseConfig = {
    apiKey: "AIzaSyC8UqvGD58zWI8MFs4YYtewXx4Tc4XmJDs",
    authDomain: "flood-monitoring-cba07.firebaseapp.com",
    databaseURL: "https://flood-monitoring-cba07.firebaseio.com",
    projectId: "flood-monitoring-cba07",
    storageBucket: "flood-monitoring-cba07.appspot.com",
    messagingSenderId: "361544530399",
    appId: "1:361544530399:web:0906dd4318fc449a546c6a",
    measurementId: "G-5FC6Y6LDFT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const database = firebase.database();

const CATEGORY_DANGER = "WARNING";
const CATEGORY_STANDBY = "STAND-BY";
const CATEGORY_NORMAL = "NORMAL";

var dashboardChart = "";

//-------------FUNCTION ALL-----------------------------------
function getCategoryFlood(rawDebit, rawLevel) {
    var debit = parseFloat(rawDebit.replace(" L/m", ""));
    var level = parseFloat(rawLevel.replace(" cm", ""));

    if (debit < 1) {
        if (level < 2) {
            return "<b style='color: #00ff00'>NORMAL</b>";
        } else if (level <= 3.5) {
            return "<b style='color: #ffff00'>STANDBY</b>";
        } else {
            return "<b style='color: #ffff00'>STANDBY</b>";
        }
    } else if (debit < 2.5) {
        if (level < 2) {
            return "<b style='color: #00ff00'>NORMAL</b>";
        } else if (level <= 3.5) {
            return "<b style='color: #ffff00'>STANDBY</b>";
        } else {
            return "<b style='color: #ff0000'>DANGER</b>";
        }
    } else {
        if (level < 2) {
            return "<b style='color: #00ff00'>NORMAL</b>";
        } else if (level <= 3.5) {
            return "<b style='color: #ffff00'>STANDBY</b>";
        } else {
            return "<b style='color: #ff0000'>DANGER</b>";
        }
    }
}

//-------------JAVASCRIPT LOGIN PAGE----------------------
function signIn() {
    var email = document.getElementById("email_field").value;
    var password = CryptoJS.MD5(document.getElementById("password_field").value).toString();

    if (email == "" || password == "d41d8cd98f00b204e9800998ecf8427e") {
        alert("Email dan Password Harus Diisi");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(function (authData) {

        })
        .catch(function (error) {
            alert(error.message);
        })
}



function signOut() {
    auth.signOut()
        .then(function () {
            location.href = "/login";
        })
        .catch(function (error) {
            alert(error.message);
        })
}

//-------------JAVASCRIPT DASHBOARD PAGE----------------------
function setFirstOpenDashboard() {
    database.ref('Marker').orderByChild("status").equalTo(1).limitToFirst(1).once('child_added', function (snapshot) {
        var keyMarker = snapshot.key;

        showDataTable(keyMarker);
        getLastNodeRecent(keyMarker);
        iotBiggestFlood(keyMarker);
        showChartIOT1(keyMarker);
    });
}
function getMarkerDataDashboard() {
    database.ref('Marker').once('value', function (snapshot) {
        var content = '';

        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                var key = data.key;
                if (val.status == 1) {
                    content += "<option " + "value='" + key + "'>" + val.name + "</option>"
                }
            });
        }
        $('#marker-dashboard').append(content);
    });
}

function dashboardChangeData() {
    dashboardChart.destroy();
    var table = $('.dataIOT1').DataTable();
    table.clear().draw();
    $('#recentDevice1').empty();
    $('#iot2Biggest').empty();
    $('#IOT1Chart').empty();

    var keyMarker = document.getElementById("marker-dashboard").value;
    showDataTable(keyMarker);
    getLastNodeRecent(keyMarker);
    iotBiggestFlood(keyMarker);
    showChartIOT1(keyMarker);
}

function showDataTable(keyMarker) {
    database.ref('Marker/' + keyMarker + '/recent/').orderByChild('miliestime').on('value' ,function (snapshot) {
        // console.log(snapshot.val());
        var table = $('.dataIOT1').DataTable();
        var content;
        var i = 1;
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                var cat = "";

                if (val.category == "1") {
                    cat = "<b style='color: #00ff00'>NORMAL</b>";
                } else if (val.category == "2") {
                    cat = "<b style='color: #ffff00'>STANDBY</b>";
                } else if (val.category == "3") {
                    cat = "<b style='color: #ff0000'>DANGER</b>";
                } else {
                    cat = "Null";
                }

                content = [i++, val.date, val.time, val.debit, val.level, cat];
                table.row.add(content).draw();
            });
        }
    });
}

function getLastNodeRecent(keyMarker) {
    database.ref('Marker/' + keyMarker + '/recent/').limitToLast(1).on('child_added', function (snapshot) {
        var content = '';

        var val = snapshot.val();
        var category = val.category;

        if (category == 1) {
            content += "<b style='color: #00ff00'>NORMAL</b>";
        } else if (category == 2) {
            content += "<b style='color: #ffff00'>STANDBY</b>";
        } else if (category == 3) {
            content += "<b style='color: #ff0000'>DANGER</b>";
        } else {
            content += "<b>NO PARAMETER</b>";
        }

        $('#recentDevice1').append(content);
    });
}

function iotBiggestFlood(keyMarker) {
    database.ref('Marker/' + keyMarker + '/recent/').orderByChild("level").limitToLast(1).on('child_added', function (snapshot) {
        var content = '';
        var val = snapshot.val();
        var category = val.category;

        content += val.level + " | " + val.debit;
        // console.log(val.level);
        $('#iot2Biggest').append(content);
    });
}

function showChartIOT1(keyMarker) {
    database.ref('Marker/' + keyMarker + '/recent/').orderByChild('miliestime').on('value' ,function (snapshot) {
        var dataArrayStatus = [];
        var dataArrayTime = [];
        var dataArrayDebit = [];
        var dataArrayLevel = [];

        snapshot.forEach(function (data) {
            var val = data.val();
            var date_time = val.date + " " + val.time;

            dataArrayStatus.push(val.category);
            dataArrayTime.push(date_time);
            dataArrayDebit.push(val.debit);
            dataArrayLevel.push(val.level);
        });

        chartCallback(dataArrayTime, dataArrayStatus, dataArrayDebit, dataArrayLevel, "IOT1Chart");
    });
}

// chart function
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function chartCallback(dataLabel, dataRaw, dataDebit, dataLevel, ctxID) {
    var ctx = document.getElementById(ctxID);
    dashboardChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataLabel,
            datasets: [{
                label: "Earnings",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: dataRaw,
            }],
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    left: 10,
                    right: 25,
                    top: 25,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        maxTicksLimit: 3,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            // return '$' + number_format(value);
                            // console.log(value + " test odng");
                            return setLabelChart(value);
                        }
                    },
                    gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                    }
                }],
            },
            legend: {
                display: false
            },
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                titleMarginBottom: 10,
                titleFontColor: '#6e707e',
                titleFontSize: 14,
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                intersect: false,
                mode: 'index',
                caretPadding: 10,
                callbacks: {
                    label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        // return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                        // return setLabelChart(tooltipItem.yLabel);
                        // return chart.datasets[tooltipItem.datasetIndex].dataLevel;
                        var positionValue = "0";

                        if (tooltipItem.index == "") {
                            positionValue = "0";
                        } else {
                            positionValue = "" + tooltipItem.index;
                        }
                        return "Debit : " + dataDebit[parseInt(positionValue)] + " | " + "Level : " + dataLevel[parseInt(positionValue)];
                    }
                }
            }
        }
    });
}

function setLabelChart(category) {
    if (category <= 1) {
        return CATEGORY_NORMAL;
    } else if (category <= 2) {
        return CATEGORY_STANDBY;
    } else {
        return CATEGORY_DANGER;
    }
}

// end chart function

//-------JAVASCRIPT ANDROID PAGE------------------

function getCurrentDataAndroid() {
    database.ref('Marker').once('value', function (snapshot) {
        var table = $('.currentAndroidData').DataTable();
        var content = "";
        var i = 1;
        var status = "";

        snapshot.forEach(function (data) {
            var val = data.val();
            var key = data.key;

            if (val.status == 1) {
                database.ref("Marker/" + key + "/recent").orderByChild('miliestime').once('value', function (snapshotRecent) {
                    snapshotRecent.forEach(function (dataRecent) {
                        var valRecent = dataRecent.val();
                        var keyRecent = dataRecent.key;

                        if (valRecent.status == 1) {
                            status = "<label class=\"switch\">\n" +
                                "  <input type=\"checkbox\" checked id='recent-" + keyRecent + "'" + "onclick=switchCheckRecent('" + key + "','" + keyRecent +"')"+">\n" +
                                "  <span class=\"slider round\"></span>\n" +
                                "</label>";
                        } else {
                            status = "<label class=\"switch\">\n" +
                                "  <input type=\"checkbox\" id='recent-" + keyRecent + "'" + "onclick=switchCheckRecent('" + key + "','" + keyRecent +"')"+">\n" +
                                "  <span class=\"slider round\"></span>\n" +
                                "</label>";
                        }

                        content = [i++, val.name, valRecent.date, valRecent.time, valRecent.debit, valRecent.level, getCategoryFlood(valRecent.debit, valRecent.level), status];
                        table.row.add(content).draw();
                    });
                });
            }
        });
    });
}

function switchCheckRecent(key, keyRecent) {
    var idCheckValue = document.getElementById("recent-" + keyRecent).checked;

    if (idCheckValue == true) {
        database.ref('Marker/' + key + "/recent/" + keyRecent).update({status : 1});
    } else {
        database.ref('Marker/' + key + "/recent/" + keyRecent).update({status : 0});
    }
}

//-------JAVASCRIPT IOT PAGE------------------
function getAllMarkerData() {
    database.ref('Marker').once('value', function (snapshot) {

        var table = $('.deviceIOT').DataTable();
        var content;
        var i = 1;
        var status = "";

        snapshot.forEach(function (data) {
            var val = data.val();
            var key = data.key;

            if (val.status == 1) {
                status = "<label class=\"switch\">\n" +
                    "  <input type=\"checkbox\" checked id='marker-" + key + "'" + "onclick=switchCheckMarker('" + key + "')"+">\n" +
                    "  <span class=\"slider round\"></span>\n" +
                    "</label>";
            } else {
                status = "<label class=\"switch\">\n" +
                    "  <input type=\"checkbox\" id='marker-" + key + "'" + "onclick=switchCheckMarker('" + key + "')"+">\n" +
                    "  <span class=\"slider round\"></span>\n" +
                    "</label>";
            }

            content = [i++, val.name, val.longitude, val.latitude, data.key, status];
            table.row.add(content).draw();
        });
    });
}

function switchCheckMarker(key) {
    var idCheckValue = document.getElementById("marker-" + key).checked;

    if (idCheckValue == true) {
        database.ref('Marker/' + key).update({status : 1});
    } else {
        database.ref('Marker/' + key).update({status : 0});
    }
}

function createNewMarker() {
    var name = document.getElementById("marker_name").value;
    var latitude = document.getElementById("marker_latitude").value;
    var longitude = document.getElementById("marker_longitude").value;

    if (name == "" || name == null || name == " ") {
        alert("Name must be filled");
        return;
    }

    if (latitude == "" || latitude == 0 || longitude == "" || longitude == 0) {
        alert("Location must be filled");
        return;
    }

    var newMarkerData = {
        alt: 15,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name: name,
        status: 0,
    };

    var push = database.ref("Marker/").push();

    push.set(newMarkerData);
    location.reload();
}

//-------JAVASCRIPT USER------------------
function createNewUser() {
    var name = document.getElementById("nu_fullname").value;
    var email = document.getElementById("nu_email").value;
    var password = CryptoJS.MD5(document.getElementById("nu_password").value).toString();
    var rePassword = CryptoJS.MD5(document.getElementById("nu_rePassword").value).toString();

    // validate variable
    var nullPassword = "d41d8cd98f00b204e9800998ecf8427e";
    var spacePass = "7215ee9c7d9dc229d2921a40e899ec5f";

    if (name == "" || name == " " || name == null || name.length <= 2) {
        alert("Name must be more than 3 characters");
        return;
    }

    if (!validateEmail(email) || email == null) {
        alert("Email not valid");
        return;
    }

    if (password == nullPassword || password == spacePass) {
        alert("Password cannot be empty");
        return;
    }

    if (password != rePassword) {
        alert("Password and Repassword fill must be same");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password).then((success) => {
        var userData = {
            Fullname: name,
            Email: email,
            Status: 1,
        };

        var push = database.ref('User/').push();
        push.set(userData);

        window.location.href = "/view-user";
    }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert("Error : " + errorMessage);
        return;
    });

}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function getAllUserData() {
    database.ref('User').once('value' ,function (snapshot) {
        // console.log(snapshot.val());
        var table = $('.dataUsers').DataTable();
        var content;
        var i = 1;
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                var key = data.key;

                var user = auth.currentUser;
                var deleteButton = "";
                if (user.email == val.Email) {
                    deleteButton = "";
                } else {
                    deleteButton = "<button class=\"btn btn-danger btn-icon-split\" onclick=removeUser('" + key +"')" +">\n" +
                        "                    <span class=\"icon text-white-50\">\n" +
                        "                      <i class=\"fas fa-trash\"></i>\n" +
                        "                    </span>\n" +
                        "                    <span class=\"text\">Delete User</span>\n" +
                        "                  </button>";
                }



                content = [i++, val.Fullname, val.Email, deleteButton];
                table.row.add(content).draw();
            });
        }
    });
}

function removeUser(key) {
    var txt;
    var r = confirm("Are you sure to delete " + key  + "?");
    if (r == true) {
        database.ref('User/' + key).remove();
        alert("User Removed");
        window.location.href = "/view-user";
    } else {
        return;
    }
}
