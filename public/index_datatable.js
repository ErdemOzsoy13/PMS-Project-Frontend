var editor;

function format(d) {
  return `<table>
  <tbody>
      <tr class="odd"> 
        <th>rtdate: </th>
        <td>${d.rtdate}</td>
        <th>rtreportno: </th>
        <td>${d.rtreportno}</td>
        <th>rtresult: </th>
        <td>${d.rtresult}</td>
      </tr>
      <tr class="even">
        <th>penalty: </th>
        <td>${d.penalty}</td>
        <th>tpno: </th>
        <td>${d.tpno}</td>
        <th>cancel: </th>
        <td>${d.cancel}</td>
      </tr>
      <tr class="odd">
        <th>pwhtrate: </th>
        <td>${d.pwhtrate}</td>
        <th>rtrate: </th>
        <td>${d.rtrate}</td>
      </tr>
      </tbody>
    </table>`;
}

$(function () {
  editor = new $.fn.dataTable.Editor({
    ajax: "http://localhost:8000/api/weldlogs/",
    table: "#myTable",
    idSrc: "id",
    fields: [
      { label: "line", name: "line" },
      { label: "isometry", name: "isometry" },
      { label: "spool", name: "spool" },
      { label: "joint", name: "joint" },
      { label: "dia", name: "dia" },
      { label: "mat1", name: "mat1" },
      { label: "p1", name: "p1" },
      { label: "mat2", name: "mat2" },
      { label: "p2", name: "p2" },
      { label: "fitupdate", name: "fitupdate" },
      { label: "fitupresult", name: "fitupresult" },
      { label: "weldclass", name: "weldclass" },
      { label: "pwht", name: "pwht" },
      { label: "wps", name: "wps" },
      { label: "location", name: "location" },
      { label: "weldtype", name: "weldtype" },
      { label: "welder", name: "welder" },
      { label: "vtdate", name: "vtdate" },
      { label: "vtreport", name: "vtreport" },
      { label: "pwhtdate", name: "pwhtdate" },
      { label: "pwhtreport", name: "pwhtreport" },
    ],
  });

  var table = $("#myTable")
    // .on("xhr.dt", function (e, settings, json, xhr) {
    //   // $('#status').html( json.status );
    //   console.log(json);
    // })
    .on("error.dt", function (e, settings, techNote, message) {
      console.log("An error has been reported by DataTables: ", message);
    })
    .DataTable({
      // processing: true,
      // serverSide: true,
      language: {
        emptyTable:
          "No customers have submitted documents with this application.",
        zeroRecords: "No weld data matches your search.",
      },
      ajax: "http://localhost:8000/api/weldlogs/",
      beforeSend: function (jqXHR) {
        console.log("beforesend func");
        // Do something before send
      },

      error: function (jqXHR, textStatus, errorThrown) {
        // Note: You can use "textStatus" to describe the error.
        // Custom
        switch (jqXHR.status) {
          case 404:
            alert("Requested page not found. [404]");
            break;

          case 500:
            alert("Internal Server Error [500]");
            break;

          default:
            alert("Unexpected unknow error");
            break;
        }

        // Global
        if (jqXHR.status != 0) {
          alert("A system error has occurred (More information).");
          // Or you can invoke modal bootstrap rather than a java alert.
        }
      },

      complete: function (jqXHR) {
        console.log("complete func");
        // Do something when complete
      },
      dom: "lBfrtip",
      rowId: "id",
      columns: [
        {
          data: null,
          class: "edit center",
          orderable: false,
          defaultContent:
            '<button type="button" id="btn-edit" class="btn btn-sm btn-info">Edit Row</button>',
        },
        {
          data: null,
          class: "details-control",
          orderable: false,
          defaultContent: "",
        },
        { data: "line" },
        { data: "isometry" },
        { data: "spool" },
        { data: "joint" },
        { data: "dia" },
        { data: "mat1" },
        { data: "p1" },
        { data: "mat2" },
        { data: "p2" },
        { data: "fitupdate" },
        { data: "fitupresult" },
        { data: "weldclass" },
        { data: "pwht" },
        { data: "wps" },
        { data: "location" },
        { data: "weldtype" },
        { data: "welder" },
        { data: "vtdate" },
        { data: "vtreport" },
        { data: "pwhtdate" },
        { data: "pwhtreport" },
        {
          data: null,
          class: "action center",
          orderable: false,
          defaultContent:
            '<button type="button" id="btn-delete" class="btn btn-sm btn-danger mr-1"><i class="fa-solid fa-trash"></i> Delete</button><button type="button" id="btn-cancel" class="btn btn-sm btn-dark">Cancel</button>',
        },
      ],
      order: [[3, "asc"]],
      // pageLength: 8,
      // lengthMenu: [8, 10, 20, 50, 100, 200, 500],
      buttons: [
        { extend: "colvis" },
        { extend: "create", editor: editor, text: "New Record" },
      ],
      keys: {
        editor: editor,
      },
    });
  // ----Denemeler------------------------------------
  $.fn.dataTable.ext.errMode = () =>
    alert("Error while loading the table data. Please refresh");

  editor.error("An error has occurred");
  setTimeout(function () {
    editor.error("");
  }, 5000);
  // $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
  //   console.log(message);
  // };

  // $.fn.dataTable.ext.errMode = "throw";
  // ------------------------------------
  $("#toastme").trigger(function () {
    $(".toast").toggleClass("hide");
    $(".toast").toggleClass("show");
  });

  editor.on("postSubmit", function (e, json, data, action) {
    console.log("postSubmit");
    console.log(json);
    console.log(data);

    if (!json.error && !json.fieldErrors) {
      console.log("not error");
      if (action === "edit") {
        console.log("edit");
        var timeout1;
        $(".toast1").css("display", "block");
        $(".toast1").animate({ opacity: 0.85 }, 1500, function () {
          timeout1 = setTimeout(() => {
            $(this).animate({ opacity: 0 }, 1500, function () {
              $(this).css("display", "none");
            });
          }, 3000);
        });
        // setTimeout(() => {
        //   clearTimeout(timeout1);
        //   $(".toast1").animate(
        //     { backgroundColor: "#28a745" },
        //     1500,
        //     function () {
        //       $(".toast1 .toast-body").text("Weldlog Updated");
        //       setTimeout(() => {
        //         $(this).animate({ opacity: 0 }, 1500, function () {
        //           $(this).css("display", "none");
        //         });
        //       }, 3000);
        //     }
        //   );
        // }, 3000);
        setTimeout(() => {
          $(".toast2").css("display", "block");
          $(".toast2").animate({ opacity: 0.85 }, 1500, function () {
            setTimeout(() => {
              $(this).animate({ opacity: 0 }, 1500, function () {
                $(this).css("display", "none");
              });
            }, 3000);
            4;
          });
        }, 3000);
      }
    }
    if (json.error || json.fieldErrors) {
      // toastr.error(json.fieldErrors.name.status);
      // toastr.error(json.error);
      if (json.error) {
        alert(json.error);
      }
    }
  });

  $("#myTable tbody").on("click", "tr td #btn-edit", function () {
    // editor.title("Edit record").buttons("Update").edit(this);
    editor.inline(table.cells(this.parentNode.parentNode, "*").nodes(), {
      // sunmit: "allIfChanged",
      submitTrigger: 0,
      submitHtml:
        '<button type="button" class="btn btn-sm btn-success">Update Row</button>',
    });
  });

  $("#myTable tbody").on("click", "tr td #btn-delete", function (e) {
    editor.remove(this.parentNode.parentNode, {
      title: "Delete record",
      message: "Are you sure you wish to delete this record?",
      buttons: "Delete",
    });
  });

  // ------------------------------------------------------
  $("a.toggle-vis").on("click", function (e) {
    e.preventDefault();

    // Get the column API object
    var column = table.column($(this).attr("data-column"));
    // ------------------------------------------------------
    // Toggle the visibility
    column.visible(!column.visible());
  });
  // ------------------------------------------------------
  // Multiple rows selection
  $("#myTable tbody").on(
    "click",
    "tr.odd td:not(.details-control):not(.edit):not(.action), tr.even td:not(.details-control):not(.edit):not(.action)",
    function () {
      $(this.parentNode).toggleClass("selected");
    }
  );

  // ------------------------------------------------------
  // Array to track the ids of the details displayed rows
  var detailRows = [];

  $("#myTable tbody").on("click", "tr td.details-control", function () {
    var tr = $(this).closest("tr");
    var row = table.row(tr);
    var idx = detailRows.indexOf(tr.attr("id"));

    if (row.child.isShown()) {
      tr.removeClass("details");
      row.child.hide();

      // Remove from the 'open' array
      detailRows.splice(idx, 1);
    } else {
      tr.addClass("details");
      row.child(format(row.data())).show();

      // Add to the 'open' array
      if (idx === -1) {
        detailRows.push(tr.attr("id"));
      }
    }
  });

  // On each draw, loop over the `detailRows` array and show any child rows
  table.on("draw", function () {
    detailRows.forEach(function (id, i) {
      $("#" + id + " td.details-control").trigger("click");
    });
  });
});
