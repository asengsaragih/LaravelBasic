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
            // session = authData;
            // location.href = "index.php";
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

//-------------FUNCTION ALL-----------------------------------
function getCategoryFlood(debit, level) {
    debit.replace(" L/m", "");
    level.replace(" cm", "");

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

// getCategoryFlood(1, 1);
// console.log("hai");
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
function showChartIOT1() {
    database.ref('Recent/Device1').orderByChild('miliestime').on('value' ,function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();

                var rawDebit = val.debit;
                var rawLevel = val.level;

                var debit = parseFloat(rawDebit.replace(" L/m", ""));
                var level = parseFloat(rawLevel.replace(" cm", ""));

                if (debit < 1) {
                    if (level < 2) {
                        console.log("Aman");
                    } else if (level <= 3.5) {
                        console.log("Siaga");
                    } else {
                        console.log("Siaga");
                    }
                } else if (debit < 2.5) {
                    if (level < 2) {
                        console.log("Aman");
                    } else if (level <= 3.5) {
                        console.log("Siaga");
                    } else {
                        console.log("Bahaya");
                    }
                } else {
                    if (level < 2) {
                        console.log("Aman");
                    } else if (level <= 3.5) {
                        console.log("Siaga");
                    } else {
                        console.log("Bahaya");
                    }
                }

            });
        }
    });
}

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

// end chart function

//-------JAVASCRIPT ANDROID PAGE------------------

function showDataAndroid1() {
    database.ref('Recent/Device1').orderByChild('miliestime').on('value' ,function (snapshot) {
        if (snapshot.exists()) {
            var content = '';
            snapshot.forEach(function (data) {
                var val = data.val();
                var category = val.category;

                content +='<tr>';
                content += '<td>' + val.date + " <b>" + val.time + "</b>" + '</td>';
                content += '<td>' + val.debit + '</td>';
                content += '<td>' + val.level + '</td>';

                if (category == 1) {
                    content += "<td >" + "<b style='color: #00ff00'>NORMAL</b>" + '</td>';
                } else if (category == 2) {
                    content += "<td>" + "<b style='color: #ffff00'>STANDBY</b>" + '</td>';
                } else if (category == 3) {
                    content += "<td>" + "<b style='color: #ff0000'>DANGER</b>" + '</td>';
                } else {
                    content += "<td>" + "<b>NO PARAMETER</b>" + '</td>';
                }

                content += "<td>" +
                    "<label class='switch switch-3d switch-secondary mr-3'>" +
                    "<input type='checkbox' class='switch-input' checked='true'>" +
                    "<span class='switch-label'></span>" +
                    "<span class='switch-handle'></span>" +
                    "</label>" +
                    "</td>";

                content += '</tr>';
            });
            $("#androidData1").append(content);
        }
    });
}

function showDataAndroid2() {
    database.ref('Recent/Device2').orderByChild('miliestime').on('value' ,function (snapshot) {
        if (snapshot.exists()) {
            var content = '';
            snapshot.forEach(function (data) {
                var key = data.key;
                var val = data.val();
                var category = val.category;

                content +='<tr>';
                content += '<td>' + val.date + " <b>" + val.time + "</b>" + '</td>';
                content += '<td>' + val.debit + '</td>';
                content += '<td>' + val.level + '</td>';

                if (category == 1) {
                    content += "<td >" + "<b style='color: #00ff00'>NORMAL</b>" + '</td>';
                } else if (category == 2) {
                    content += "<td>" + "<b style='color: #ffff00'>STANDBY</b>" + '</td>';
                } else if (category == 3) {
                    content += "<td>" + "<b style='color: #ff0000'>DANGER</b>" + '</td>';
                } else {
                    content += "<td>" + "<b>NO PARAMETER</b>" + '</td>';
                }

                content += "<td>" +
                    "<label class='switch switch-3d switch-secondary mr-3'>" +
                    "<input onclick='changeStatusData2()' id='keySwitch2' type='checkbox' checked='true' class='switch-input' value='"+data.key+"'" +">" +
                    // "<input onclick='changeStatusData2("+data.key+")' id='keySwitch2' type='checkbox' checked='true' class='switch-input'>" +
                    "<span class='switch-label'></span>" +
                    "<span class='switch-handle'></span>" +
                    "</label>" +
                    "</td>";

                content += '</tr>';
            });
            $("#androidData2").append(content);
        }
    });
}
