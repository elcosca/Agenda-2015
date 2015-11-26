

function avisar(queavisar){
   alert(queavisar)
 
}

var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();


var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {

	

    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            todoDate: "task-date",
			todoHour: "task-hour",
            todoDescription: "task-description",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#completed",
            "2" : "#completed0",
            "3" : "#completed1",
            "4" : "#completed2",
            "5" : "#completed3",
            "6" : "#completed4",
            "7" : "#completed5",
			"8" : "#completed6",
        };



    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });

        // Adding drop function to each category of task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            object = data[id];

                            // Removing old element
                            removeElement(object);

                            // Changing object code
                            object.code = index;

                            // Generating new element
                            generateElement(object);
 
                            // Updating Local Storage
                            data[id] = object;
                            localStorage.setItem("todoData", JSON.stringify(data));

                            // Hiding Delete Area
                            $("#" + defaults.deleteDiv).hide();
                    }
            });
        });

        // Adding drop function to delete div
        $("#" + options.deleteDiv).droppable({
            drop: function(event, ui) {
                var element = ui.helper,
                    css_id = element.attr("id"),
                    id = css_id.replace(options.taskId, ""),
                    object = data[id];

                // Removing old element
                removeElement(object);

                // Updating local storage
                delete data[id];
                localStorage.setItem("todoData", JSON.stringify(data));

                // Hiding Delete Area
                $("#" + defaults.deleteDiv).hide();
            }
        })

    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDate,
            "text": params.date
        }).appendTo(wrapper);

		$("<div />", {
            "class" : defaults.todoHour,
            "text": params.hour
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoDescription,
            "text": params.description
        }).appendTo(wrapper);

	    wrapper.draggable({
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
	        revert: "invalid",
	        revertDuration : 200
        });

    };

    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Titulo no puede estar vacio",
            id, title, description, date, hour, tempData;

        if (inputs.length !== 6) {
			
		console.log(inputs);
            return;
        }

        title = inputs[0].value;
        description = inputs[1].value;
        date = inputs[2].value;
		hour = inputs[3].value;

        if (!title) {
            generateDialog(errorMessage);
            return;
        }


        id = new Date().getTime();

        tempData = {
            id : id,
            code: "1",
            title: title,
            date: date,
			hour: hour,
            description: description
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        // Reset Form
        inputs[0].value = "";
        inputs[1].value = "";
        inputs[2].value = "";
		inputs[3].value = "";
    };

    var generateDialog = function (message) {
        var responseId = "response-dialog",
            title = "Messaage",
            responseDialog = $("#" + responseId),
            buttonOptions;

        if (!responseDialog.length) {
            responseDialog = $("<div />", {
                    title: title,
                    id: responseId
            }).appendTo($("body"));
        }

        responseDialog.html(message);

        buttonOptions = {
            "Ok" : function () {
                responseDialog.dialog("close");
            }
        };

	    responseDialog.dialog({
            autoOpen: true,
            width: 400,
            modal: true,
            closeOnEscape: true,
            buttons: buttonOptions
        });
    };

    todo.clear = function () {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));////
        $("." + defaults.todoTask).remove();
    };

function chequearSiHayCosasParaAvisar(){
	console.log(data)

	for (var key in data) {
	   if (data.hasOwnProperty(key)) {
		   var obj = data[key];
		   console.log(obj.date);
		   
		}
	}

	//for (data.get("hour") > currentdate){
	//$('#enviaremail').click(function() {
  /*$.ajax({
    type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'AfJDT9HBpBp7WE6aOznXew',
    'message': {
      'from_email': 'fedeelcosca230@gmail.com',
      'to': [
          {
            'email': 'fedeelcosca230@gmail.com',
            'name': 'RECIPIENT NAME (OPTIONAL)',
            'type': 'to'
          },
          {
            'email': 'fedeelcosca230@gmail.com',
            'name': 'ANOTHER RECIPIENT NAME (OPTIONAL)',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': 'Evento',
      'html': 'Ahora mismo tenes un evento'
    }
  }
 }).done(function(response) {
   console.log(response); // if you're into that sorta thing
  });
});

}*/
}

setInterval(function() {
    chequearSiHayCosasParaAvisar();
},  60*1000);	


})(todo, data, jQuery);
