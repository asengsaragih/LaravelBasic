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

//-------------FUNCTION ALL-----------------------------------
function getCategoryFlood(rawDebit, rawLevel) {
    var debit = parseFloat(rawDebit.replace(" L/m", ""));
    var level = parseFloat(rawLevel.replace(" cm", ""));

    if (debit < 1) {
        if (level < 2) {
            return "NORMAL";
        } else if (level <= 3.5) {
            return "STANDBY";
        } else {
            return "STANDBY";
        }
    } else if (debit < 2.5) {
        if (level < 2) {
            return "NORMAL";
        } else if (level <= 3.5) {
            return "STANDBY";
        } else {
            return "DANGER";
        }
    } else {
        if (level < 2) {
            return "NORMAL";
        } else if (level <= 3.5) {
            return "STANDBY";
        } else {
            return "DANGER";
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
function showData1() {
    database.ref('Recent/Device1').orderByChild('miliestime').on('value' ,function (snapshot) {
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

function showData2() {
    database.ref('Recent/Device2').orderByChild('miliestime').on('value' ,function (snapshot) {
        // console.log(snapshot.val());
        var table = $('.dataIOT2').DataTable();
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

function getLastNodeRecentIOT1() {
    database.ref("Recent/Device1").limitToLast(1).on('child_added', function (snapshot) {
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

function getLastNodeRecentIOT2() {
    database.ref("Recent/Device2").limitToLast(1).on('child_added', function (snapshot) {
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

        $('#recentDevice2').append(content);
    });
}

function iot1BiggestFlood() {
    database.ref('Recent/Device1').orderByChild("level").limitToLast(1).on('child_added', function (snapshot) {
        var content = '';
        var val = snapshot.val();
        var category = val.category;

        content += val.level + " | " + val.debit;
        // console.log(val.level);
        $('#iot1Biggest').append(content);
    });
}

function iot2BiggestFlood() {
    database.ref('Recent/Device2').orderByChild("level").limitToLast(1).on('child_added', function (snapshot) {
        var content = '';
        var val = snapshot.val();
        var category = val.category;

        content += val.level + " | " + val.debit;
        // console.log(val.level);
        $('#iot2Biggest').append(content);
    });
}

// chart function
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function showChartIOT1() {
    database.ref('Recent/Device1').orderByChild('miliestime').on('value' ,function (snapshot) {
        var dataArrayStatus = [];
        var dataArrayTime = [];

        snapshot.forEach(function (data) {
            var val = data.val();
            var date_time = val.date + " " + val.time;

            dataArrayStatus.push(val.category);
            dataArrayTime.push(date_time);
        });

        chartCallback(dataArrayTime, dataArrayStatus, "IOT1Chart");
    });
}

function showChartIOT2() {
    database.ref('Recent/Device2').orderByChild('miliestime').on('value' ,function (snapshot) {
        var dataArrayStatus = [];
        var dataArrayTime = [];

        snapshot.forEach(function (data) {
            var val = data.val();
            var date_time = val.date + " " + val.time;

            dataArrayStatus.push(val.category);
            dataArrayTime.push(date_time);
        });

        chartCallback(dataArrayTime, dataArrayStatus, "IOT2Chart");
    });
}

function chartCallback(dataLabel, dataRaw, ctxID) {
    var ctx = document.getElementById(ctxID);
    var myLineChart = new Chart(ctx, {
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
                            console.log(value + " test odng");
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
                        return setLabelChart(tooltipItem.yLabel);
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

function showDataAndroid1() {
    database.ref('Recent/Device1').orderByChild('miliestime').once('value', function (snapshot) {
        // console.log(snapshot.val());
        var table = $('.androidData1').DataTable();
        var content;
        var i = 1;
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                var key = data.key;
                var cat = "";
                var status = "";

                if (val.category == "1") {
                    cat = "<b style='color: #00ff00'>NORMAL</b>";
                } else if (val.category == "2") {
                    cat = "<b style='color: #ffff00'>STANDBY</b>";
                } else if (val.category == "3") {
                    cat = "<b style='color: #ff0000'>DANGER</b>";
                } else {
                    cat = "Null";
                }

                if (val.status == 1) {
                    status = "<label class=\"switch\">\n" +
                        "  <input type=\"checkbox\" checked id='iot1-" + key + "'" + "onclick=switchCheckIOT1('" + key + "')"+">\n" +
                        "  <span class=\"slider round\"></span>\n" +
                        "</label>";
                } else {
                    status = "<label class=\"switch\">\n" +
                        "  <input type=\"checkbox\" id='iot1-" + key + "'" + "onclick=switchCheckIOT1('" + key + "')"+">\n" +
                        "  <span class=\"slider round\"></span>\n" +
                        "</label>";
                }

                content = [i++, val.date, val.time, val.debit, val.level, cat, status];
                table.row.add(content).draw();
            });
        }
    });
}

function showDataAndroid2() {
    database.ref('Recent/Device2').orderByChild('miliestime').once('value' ,function (snapshot) {
        // console.log(snapshot.val());
        var table = $('.androidData2').DataTable();
        var content;
        var i = 1;
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                var key = data.key;
                var cat = "";
                var status = "";

                if (val.category == "1") {
                    cat = "<b style='color: #00ff00'>NORMAL</b>";
                } else if (val.category == "2") {
                    cat = "<b style='color: #ffff00'>STANDBY</b>";
                } else if (val.category == "3") {
                    cat = "<b style='color: #ff0000'>DANGER</b>";
                } else {
                    cat = "Null";
                }

                if (val.status == 1) {
                    status = "<label class=\"switch\">\n" +
                        "  <input type=\"checkbox\" checked id='iot2-" + key + "'" + "onclick=switchCheckIOT2('" + key + "')"+">\n" +
                        "  <span class=\"slider round\"></span>\n" +
                        "</label>";
                } else {
                    status = "<label class=\"switch\">\n" +
                        "  <input type=\"checkbox\" id='iot2-" + key + "'" + "onclick=switchCheckIOT2('" + key + "')"+">\n" +
                        "  <span class=\"slider round\"></span>\n" +
                        "</label>";
                }

                content = [i++, val.date, val.time, val.debit, val.level, cat, status];
                table.row.add(content).draw();
            });
        }
    });
}

function switchCheckIOT1(key) {
    var idCheckValue = document.getElementById("iot1-" + key).checked;

    if (idCheckValue == true) {
        database.ref('Recent/Device1/' + key).update({status : 1});
    } else {
        database.ref('Recent/Device1/' + key).update({status : 0});
    }
}

function switchCheckIOT2(key) {
    var idCheckValue = document.getElementById("iot2-" + key).checked;

    if (idCheckValue == true) {
        database.ref('Recent/Device2/' + key).update({status : 1});
    } else {
        database.ref('Recent/Device2/' + key).update({status : 0});
    }
}

//-------JAVASCRIPT USER------------------
function AddingUser(email, password) {

}
