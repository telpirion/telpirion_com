var loader = (function () {
	
	// Check to see if the script is already loaded.
	function hasScript(scriptName) {
		if (document.getElementById(scriptName)) {
			return true;
		}
		return false;
	}
	
	// Asynchronous. Load JS scripts into memory.
	function loadScripts(scripts, callback) {
		debug.showCallstack("loadScripts");
		
		// Create a state variable to store
		// the info about the loading process.
		var state = {
			scripts: scripts,
			counter: 0,
			scriptCount: scripts.length,
			callback: callback
		}
		
		loadAsset(state);
	}
	
	// Load an individual script into memory.
	function loadAsset(state) {
	
		var script = state.scripts[state.counter],
			scriptName = script.replace(".js", "");
	
		// Make sure that the script hasn't already
		// been loaded into the document.
		if (!hasScript(scriptName)) {
		
			// Create a new script element and 
			// add it to the page head.  
			var newScript = dom.createNode("script",
				[["src", "Scripts/" + script],
				["id", scriptName]],
				null);
		
			newScript.onload = function () {
				//debug.writeLine(scriptName + " loaded");
				
				state.counter++;
				
				if (state.counter < state.scriptCount) {
					
					loadAsset(state);
					
				}
				else {
					if (state.callback) { state.callback() }
				}
			}
		
			document.head.appendChild(newScript);
		}
	}
	
	// Asynchronous. Load images into memory and 
	// returns the images to the calling code.
	function loadImages(imageList, callback) {
		debug.showCallstack("loadImages");
		
		var state = {
			imageList: imageList,
			images: [],
			counter: 0,
			imageCount: imageList.length,
			callback: callback
		}
		
		loadImage(state);
	}
	
	// Load an individual image into memory.
	function loadImage(state) {
		debug.showCallstack("loadImage");
		//debug.writeLine("loadImage called");
		
		// Create a new image object.
		var img = new Image(),
			imgUri = state.imageList[state.counter];
		
		// Define a callback to load the next
		// image in the list.
		img.onload = function () {
			//debug.writeLine(imgUri + " loaded");
			
			// Add the image object onto the array.
			state.images.push(img);
			state.counter++;
			
			// If there are more images to load,
			// load the next image. Otherwise, return
			// the image array in the callback.
			if (state.counter < state.imageCount) {
				loadImage(state);
			}
			else {
				if (state.callback) { state.callback(
					{ images: state.images }
				)}
			}
		}
		
		// Load the image from the specified URI.
		img.src = imgUri;
	}
	
	// Remove a script from the document.
	function removeScript(id) {
		debug.showCallstack("removeScript: " + id);
		
		if (hasScript(id)) {
			var script = document.getElementById(id);
			document.head.removeChild(script);
			//debug.writeLine(id + " script removed.");
		}
	}
	
	return {
		loadScripts: loadScripts,
		loadImages: loadImages,
		removeScript: removeScript
	};
})();