$(document).ready(function () {

  function addTodoLi(todoItem) {
    var liItem = $("<li>").text(todoItem.todo);
    var liInput = $("<input type='checkbox'>");
    if (todoItem.completed) {
      liItem.css("text-decoration", "line-through");
      liInput.attr("checked", true);
    } else {
      liItem.css("text-decoration", "none");
      liInput.attr("checked", false);
    }
    liItem.append(liInput);
    liItem.addClass("checked-todo");
    
    liItem.attr("id", todoItem.id).appendTo("ul");
  }
  // var todoFieldInput = $("input");

  $("form").submit(function(e) {
    e.preventDefault();
    $.post("/newtodo", { todo: $("input").val() }, function(response) {
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

    $.post("/updatetodo", { id: parentLi.id, completed: checkedBool });
  });

  $("li img").click(function(e) {
    var todoImg = $(e.target);
  });

  $.getJSON("/new", function(response) {
    $.each(response, function(index, todoItem) {
      addTodoLi(todoItem);
    });
  });
});