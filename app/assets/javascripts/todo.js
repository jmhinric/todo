$(document).ready(function () {

  function addTodoLi(todoItem) {
    var liItem = $("<li>").text(todoItem.todo);
    var liInput = $("<input type='checkbox'>");
    var button = $("<button>").text("x");

    $("li input").on("change", setLineThrough);
    
    button.addClass("delete");
    $("li button").on("click", deleteAction);
    
    if (todoItem.completed) {
      liItem.css("text-decoration", "line-through");
      liInput.attr("checked", true);
    } else {
      liItem.css("text-decoration", "none");
      liInput.attr("checked", false);
    }
    liItem.append(liInput);
    liItem.addClass("checked-todo");
    liItem.append(button);
    liItem.attr("id", todoItem.id).appendTo("ul");
  }


  function deleteAction(e) {
    var todoLi = e.target.parentElement;
    $.ajax({
      url: "/tasks/" + todoLi.id + "",
      type: "delete",
    });
    todoLi.remove();
  }

  function setLineThrough(e) {
    var parentLi = e.target.parentElement;
    var checkedBool;

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
  }

  $.getJSON("/tasks/new", function(response) {
    $.each(response, function(index, todoItem) {
      addTodoLi(todoItem);
    });
  });

  $("form").submit(function(e) {
    e.preventDefault();
    $.post("/tasks", { todo: $("input").val() }, function(response) {
      addTodoLi(response);
    });
    this.reset();
  });

});