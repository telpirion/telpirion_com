// Define a debugging class.
var debug = (function () {

	var output;

	// Write a message to the output div.
	function writeLine(message) {

		if (!output) {
			initialize();
		}
		output.innerHTML +=
			message + "<br/>";
	}

	// Get a reference to the output div.
	function initialize() {
		
		var outputStyle = "height:200px;" + 
			"overflow-y:scroll;" +
			"background-color:gray";
		
		document.body.appendChild(document.createElement("hr"));
		document.body.appendChild(document.createElement("br"));
		
		var callstack = document.createElement("div");
		callstack.appendChild(document.createElement("br"));
		callstack.appendChild(document.createTextNode("Show callstack: "));
		
		var callstackBox = document.createElement("input");
		callstackBox.setAttribute("type", "checkbox");
		callstackBox.setAttribute("id", "callstack");
		callstack.appendChild(callstackBox);
		callstack.appendChild(document.createElement("br"));
		callstack.appendChild(document.createElement("br"));
		document.body.appendChild(callstack);
		
		var outputDiv = document.createElement("div");
		var outputTitle = document.createElement("span");
		outputTitle.innerHTML = "<b>Output</b><br/>";
		outputDiv.appendChild(outputTitle);
		
		output = document.createElement("div");
		output.setAttribute("id", "output");
		output.setAttribute("style", outputStyle);
		outputDiv.appendChild(output);
		document.body.appendChild(outputDiv);

	}
	
	function showCallstack(methodName) {

		if (!output) {
			initialize();
		}
		
		var checkCallstack = document.getElementById("callstack");
		if (checkCallstack.checked == true) {
			writeLine(methodName + " called");
		}
	}

	// Expose methods to calling code.
	return {
		writeLine : writeLine,
		showCallstack: showCallstack
	};

})();