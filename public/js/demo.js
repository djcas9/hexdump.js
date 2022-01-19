$(function () {
  $("#menu-bar").css("opacity", "0.955");

  var placeholder =
    "䉁䅃䍂AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "䉁䅃䍂䉁䅃䍂䉁䅃䉁䅃䍂AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
    "䉁䅃䍂䉁䅃䍂䉁䅃䉁䅃䍂䉁䅃䍂䉁䅃䉁䅃䍂䉁䅃䍂䍂䉁䅃䍂䉁䅃A";

  $("textarea#payload").attr("value", placeholder);

  var selectedArray = [];

  $("#hexdump span[data-hex-id]").dblclick(function () {
    $("span").removeClass("ui-selected");
    var string = $(this).text();

    $("#hexdump span[data-hex-id]").each(function (index) {
      if ($(this).text() == string) {
        var tempID = $(this).attr("data-hex-id");
        $(this).addClass("ui-selected");
        $('span[data-string-id="' + tempID + '"]').addClass("ui-selected");
      }
    });
  });

  function hexdump(base, width, spacing, linenumbers, html, ascii) {
    var data = $("textarea#payload").attr("value");
    var options = {
      container: "hexdump",
      width: width,
      byteGrouping: spacing,
      ascii: ascii,
      html: html,
      lineNumber: linenumbers,
      base: base,
      style: {
        lineNumberLeft: "",
        lineNumberRight: ":",
        stringLeft: "|",
        stringRight: "|",
        hexLeft: "",
        hexRight: "",
        hexNull: ".",
        nonPrintable: ".",
        stringNull: " ",
      },
    };

    console.log(options);

    new Hexdump(data, options);

    reselect();
  }

  function reselect() {
    if (selectedArray.length > 0) {
      for (var i = 0; i < selectedArray.length; i++) {
        $('span[data-string-id="' + selectedArray[i] + '"]').addClass(
          "ui-selected"
        );
        $('span[data-hex-id="' + selectedArray[i] + '"]').addClass(
          "ui-selected"
        );
      }
    }
  }

  function hValue() {
    var values = {
      base: $("form select#form-base :selected").html(),
      width: $("form select#form-width :selected").html(),
      byteGrouping: $("form select#form-spacing :selected").html(),
      numbers: $("form input#linenumbers").is(":checked"),
      html: $("form input#html").is(":checked"),
      ascii: $("form input#ascii").is(":checked"),
    };
    return values;
  }

  $(
    "input#linenumbers, input#html, select#form-width, select#form-base, input#ascii, select#form-spacing"
  ).live("change", function () {
    hexdump(
      hValue().base,
      hValue().width,
      hValue().byteGrouping,
      hValue().numbers,
      hValue().html,
      hValue().ascii
    );
  });

  $("textarea#payload").live("keydown", function () {
    if ($("textarea#payload").attr("value").length > 0) {
      hexdump(
        hValue().base,
        hValue().width,
        hValue().byteGrouping,
        hValue().numbers,
        hValue().html,
        hValue().ascii
      );
    }
  });

  $("#hexdump").selectable({
    autoRefresh: true,
    filter: "span[data-hex-id]",
    selected: function (event, ui) {
      $("#hexdump span.ui-selecting")
        .removeClass("ui-selecting")
        .addClass("ui-selected");
      var stringId = ui.selected.attributes[0].value;

      if (selectedArray.indexOf(stringId) == -1) {
        selectedArray.push(stringId);
      }

      $('span[data-string-id="' + stringId + '"]').addClass("ui-selected");
    },
    unselected: function (event, ui) {
      var stringId = ui.unselected.attributes[0].value;

      $('span[data-string-id="' + stringId + '"]').removeClass("ui-selected");

      selectedArray.splice(selectedArray.indexOf(stringId), 1);
    },
  });

  hexdump(
    hValue().base,
    hValue().width,
    hValue().byteGrouping,
    hValue().numbers,
    hValue().html,
    hValue().ascii
  );
});
