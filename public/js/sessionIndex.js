auth.onAuthStateChanged(function (user) {
    if (user == null) {
        location.href = "/login";
    }
});
