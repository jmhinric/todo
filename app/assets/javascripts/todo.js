var todoFieldInput = $("input");

$("form").submit(function(e) {
	e.preventDefault();
	$.post("/newtodo", { todo: todoFieldInput.val() }, function(response) {
    addTodoLi(response);
  });
	this.reset();
});

$.getJSON("/new", function(response) {
	$.each(response, function(index, todoItem) {
		addTodoLi(todoItem);
	});
});

function addTodoLi(todoItem) {
  var liItem = $("<li>").text(todoItem.todo).append("<input type='checkbox'>");
  liItem.attr("id", "todo-" + todoItem.id).appendTo("ul");
}

// $('input:checkbox').live('change', function(){
//     if($(this).is(':checked')){
//         alert('checked');
//     } else {
//         alert('un-checked');
//     }
// });