localStorage.reallyClear = localStorage.clear;
localStorage.clear = function() {
  console.warn(
    "`localStorage.clear()` was just called. We're ignoring that so you don't lose your data."
  );
  console.log(
    "if you called `localStorage.clear()` intentionally, it's been reassigned to `localStorage.reallyClear()`"
  );
};

$(function() {
  const pageIsProfilePage = $("#p_profile").length > 0;

  // Profile Pages
  if (pageIsProfilePage) {
    _OKCP.getAnswers(); // get answers and add categories
  }
});
