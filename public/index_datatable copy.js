var editor;

function format(d) {
  return `<table>
  <tbody>
      <tr class="odd"> 
        <th>First name: </th>
        <td>${d.first_name}</td>
        <th>Last name: </th>
        <td>${d.last_name}</td>
      </tr>
      <tr class="even">
        <th>Start Date: </th>
        <td>${d.start_date}</td>
        <th>Salary: </th>
        <td>${d.salary}</td>
      </tr>
      </tbody>
    </table>`;
}

$(function () {
  editor = new $.fn.dataTable.Editor({
    ajax: "http://localhost:8000/api/users/",
    table: "#myTable",
    fields: [
      {
        label: "First name:",
        name: "first_name",
      },
      {
        label: "Last name:",
        name: "last_name",
      },
      {
        label: "Position:",
        name: "position",
      },
      {
        label: "Office:",
        name: "office",
      },
    ],
  });

  var table = $("#myTable").DataTable({
    // processing: true,
    // serverSide: true,
    ajax: "http://localhost:8000/api/users/",
    dom: "lBfrtip",
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
      { data: "first_name" },
      { data: "last_name" },
      { data: "position" },
      { data: "office" },
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

  $("#toastme").trigger(function () {
    $(".toast").toggleClass("hide");
    $(".toast").toggleClass("show");
  });

  editor.on("postSubmit", function (e, json, data, action) {
    console.log("postSubmit");
    if (!json.error && !json.fieldErrors) {
      console.log("not error");
      if (action === "edit") {
        console.log("edit");
        const script = document.createElement("div");
        // script.style =
        //   "position: absolute; top: 20px; right: 20px; z-index: 4;";
        // script.innerHTML = `
        // `;
        // document.body.appendChild(script);
        // $(".toast").toggleClass("hide");
        // $(".toast").toggleClass("show");
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
    }
  });

  $("#myTable tbody").on("click", "tr td #btn-edit", function () {
    // editor.title("Edit record").buttons("Update").edit(this);
    editor.inline(table.cells(this.parentNode.parentNode, "*").nodes(), {
      sunmit: "allIfChanged",
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
