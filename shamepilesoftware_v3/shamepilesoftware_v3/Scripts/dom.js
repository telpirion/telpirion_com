var dom = (function() {
	
	// Removes a class from a node.
	function removeClass(node, className) {
		//debug.writeLine("removeClass called");
		
		// Check to see if the element has the class.
		if (node.className) {
			var hasClass = node.className.indexOf(className);
			
			if (hasClass > -1) {
				var classes = getClasses(node);
				
				// Iterate over the classes to find the
				// one to remove.
				for (var i = 0; i < classes.length; i++) {
					if (className == classes[i]) {
					
						// Remove the item with the
						// class to remove.
						classes.splice(i, 1);
						break;
					}
				}
				
				applyClasses(node, classes);
			}
		}
	}
	
	// Get all of the classes from a node
	// and return it as an array.
	function getClasses(node) {
		//debug.writeLine("getClasses called");
		
		var classes = node.className.split(" ");
		//debug.writeLine("Classes: " + classes.toString());
		
		return classes;
	}
	
	// Add a class to a node.
	function addClass(node, className) {
		//debug.writeLine("addClass called.");
		
		// Check whether the node already has a class applied.
		if (node.className) {
		
			// Check to see if it has the new class already.
			var hasClass = node.className.indexOf(className);
			if (hasClass == -1) {
			
				// Get the classes of the node.
				var classes = getClasses(node);
				classes.push(className);
				
				applyClasses(node, classes);
			}
		}
		else {
			//node.setAttribute("class", className);
			applyClasses(node, [className]);
		}
	}
	
	// Applies new class settings to a node.
	function applyClasses(node, classes) {
		//debug.writeLine("applyClasses called");
		
		// Convert the array to a string, replace the 
		// delimiter, and then reapply the classes,
		var newClasses = classes.toString().replace(",", " ");
		node.setAttribute("class", newClasses);
		//debug.writeLine("New class: " + newClasses);
	}
	
	// Returns a node from the document.
	function getNode(id) {
		//debug.writeLine("getNode called");
		
		var node = document.getElementById(id);
		return node;
	}
	
	// Creates a new HTML element and 
	// returns it to the calling code.
	function createNode(type, attributes, text) {
		//debug.writeLine("createNode");
		
		var node = document.createElement(type);
		
		// If attributes ar present, apply to the element.
		if (attributes != null){
			for (var i = 0; i < attributes.length; i++){
				node.setAttribute(attributes[i][0], 
					attributes[i][1])
			}
		}

		// If the element has text, add text to element.
		if (text != null) {
			node.innerHTML = text;
		}
		
		return node;
	}
	
	return {
		createNode: createNode,
		getNode : getNode,
		removeClass : removeClass,
		addClass: addClass
	};
})();