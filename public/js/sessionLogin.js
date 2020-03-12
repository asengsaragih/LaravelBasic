auth.onAuthStateChanged(function (user) {
    if (user) {
        location.href = "/";
    }
});
