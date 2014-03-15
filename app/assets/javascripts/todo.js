var todoFieldInput = $("input");

$("form").submit(function(e) {
	e.preventDefault();
	$.post("/newtodo", { todo: todoFieldInput.val() })
	$("<li>").text(todoFieldInput.val()).append('<input type="checkbox">').appendTo("ul");
	this.reset();
});

$.getJSON("/new", function(response) {
	$.each(response, function(index, text) {
		$("<li>").text(text.todo).appendTo("ul"); 
	});
});

// $('input:checkbox').live('change', function(){
//     if($(this).is(':checked')){
//         alert('checked');
//     } else {
//         alert('un-checked');
//     }
// });