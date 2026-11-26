(function () {
  var triggers = { code: true, access_token: true, token_hash: true };
  var merged = new URLSearchParams();

  function absorb(raw) {
    if (!raw) return;
    var text = raw.replace(/^[?#]/, "");
    if (!text) return;
    new URLSearchParams(text).forEach(function (value, key) {
      merged.set(key, value);
    });
  }

  absorb(window.location.search);
  absorb(window.location.hash);

  var found = false;
  merged.forEach(function (value, key) {
    if (triggers[key] && value) found = true;
  });
  if (!found) return;

  var link = "sovellique://reset-password?" + merged.toString();
  var button = document.getElementById("open-app");
  if (button) button.href = link;
  window.location = link;
})();
