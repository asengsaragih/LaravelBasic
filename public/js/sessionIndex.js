auth.onAuthStateChanged(function (user) {
    if (user == null) {
        location.href = "/login";
    } else {
        var email = user.email;
        document.getElementById("emailDisplay").innerHTML = email;
    }
});
