var $javarants = jQuery.noConflict(true);
$javarants(document).ready(function($) {
  var wordlist;
  var itemString = localStorage.getItem("wordlist");
  if (itemString) {
    wordlist = JSON.parse(itemString);
  } else {
    wordlist = [
      "damn", "shit", "freaking", "fuck", "ass", "asshole", "fucking",
      "freakin", "hell", "dick", "cunt", "fag", "gay", "goddamn", "shitty",
      "crap", "crappy", "slut"
    ];
    localStorage.setItem("wordlist", JSON.stringify(wordlist));
  }
  function replacetext(node) {
    if (node.nodeType == 3 && node.parentNode.nodeName != "SCRIPT") {
      if (node.nodeValue.replace(/\s/g, '') == "") {
        return;
      }
      $(wordlist).each(function() {
        node.nodeValue = node.nodeValue.replace(new RegExp("\\b" + this + "\\b", "igm"), this.substring(0, 1) + "***");
      });
    }
  }
  $("*").each(function() {
    this.addEventListener('DOMSubtreeModified', function(e) {
      e.stopPropagation();
      $(e.target).find("*").contents().each(function() {
        replacetext(this);
      });
    }, false);
    $(this).contents().each(function() {
      replacetext(this);
    });
  });
});
