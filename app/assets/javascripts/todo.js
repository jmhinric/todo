$(document).ready(function () {

  function addTodoLi(todoItem) {
    var liItem = $("<li>").text(todoItem.todo);
    var liInput = $("<input type='checkbox'>");
    var link = $("<a><img src='http://icons.iconseeker.com/png/fullsize/refresh-cl/symbols-delete.png' alt='x' ></a>");
    if (todoItem.completed) {
      liItem.css("text-decoration", "line-through");
      liInput.attr("checked", true);
    } else {
      liItem.css("text-decoration", "none");
      liInput.attr("checked", false);
    }
    liItem.append(liInput);
    liItem.addClass("checked-todo");
    liItem.append(link);
    // liItem.append("<a>").text("<img src='http://icons.iconseeker.com/png/fullsize/refresh-cl/symbols-delete.png' alt='x' >");
    liItem.attr("id", todoItem.id).appendTo("ul");
  }
  // var todoFieldInput = $("input");

  $("form").submit(function(e) {
    e.preventDefault();
    $.post("/tasks", { todo: $("input").val() }, function(response) {
      addTodoLi(response);
    });
    this.reset();
  });

  $("ul").on("change", function(e) {
    var parentLi = e.target.parentElement;
    
    var checkedBool;
     // = setLineThrough(e.target.checked, );

    if (e.target.checked) {
      $(parentLi).css("text-decoration", "line-through");
      checkedBool = true;
    } else {
      $(parentLi).css("text-decoration", "none");
      checkedBool = false;
    }

    $.ajax({
      url: "/tasks/" + parentLi.id + "",
      type: "patch",
      data: { completed: checkedBool }
    });
  });

  $("ul").on("click", function(e) {
    var todoLi = e.target.parentElement.parentElement;
    $.ajax({
      url: "/tasks/" + todoLi.id + "",
      type: "delete",
    });
    todoLi.remove();
  });

  $.getJSON("/tasks/new", function(response) {
    $.each(response, function(index, todoItem) {
      addTodoLi(todoItem);
    });
  });
});