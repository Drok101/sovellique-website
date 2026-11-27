(function () {
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

  var code = merged.get("code");
  var query = new URLSearchParams();
  ["access_token", "token_hash"].forEach(function (key) {
    var value = merged.get(key);
    if (value) query.set(key, value);
  });

  if (!code && !query.toString()) return;

  var queryString = query.toString();
  var link;
  if (code) {
    var encoded = encodeURIComponent(code);
    if (/Android/i.test(navigator.userAgent)) {
      link = "intent://reset-password/" + encoded;
      if (queryString) link += "?" + queryString;
      link += "#Intent;scheme=sovellique;package=com.sovellique.app;end";
    } else {
      link = "sovellique://reset-password/" + encoded;
      if (queryString) link += "?" + queryString;
    }
  } else {
    link = "sovellique://reset-password?" + queryString;
  }

  var button = document.getElementById("open-app");
  if (button) button.href = link;
  window.location = link;
})();
