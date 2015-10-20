
var webappInstallDetector = (function(window){
	'use strict';
	var self = {
			l: function(){} //dummy
		}, 
	    cbOnInstalled = function(){}, //dummy callback
		flagOnInstalled = false, //detected app is installed
		cbOnNotInstalled = function(){}, //dummy callback
		flagOnNotInstalled = false, //detected app is not installed
	    iniH, // initial view port height
	    newH, // new view port height
	    initScreenH = screen.height || window.outerHeight;	 //initial screen height
	
	//
	// API
	//
	
	//Enable debug mode
	self.debug = function(){
		var $log = document.getElementById('webappDetector-log');
		self.l = function(txt){
			if ($log){
				$log.innerHTML = $log.innerHTML + '<br>' + txt;
			}
		}
		self.l('Initializing...');
		isNative(true);
	}
	
	//Register onInstalled Callback
	self.onInstalled = function(cb){
		if (flagOnInstalled){
		  cb();
		} else {
		  cbOnInstalled = cb;	
		}
	}
	
	//Register onNotInstalled Callback
	self.onNotInstalled = function(cb){
		if (flagOnNotInstalled){
		  cb();
		} else {
		  cbOnNotInstalled = cb;	
		}		
	}	
	
	
	//
	// INTERNAL
	//
	
	function triggerOnInstalled(){
		flagOnInstalled = true;
		cbOnInstalled();
		clearListener();
	}
	
	function triggerOnNotInstalled(){
		flagOnNotInstalled = true;
		cbOnNotInstalled();
		clearListener();
	}	
	
    function clearListener(){
		window.removeEventListener("resize", updateH, false);
		window.removeEventListener("scroll", updateH, false);
	}
		
	function getH(){return window.innerHeight;}
	
	function init(){
		self.l('init/ orientation change  h:' + iniH);
		iniH = newH = getH();
	}
	

	
	function updateH(){
		var newScreenW = screen.width || window.outerWidth;
		//detect rotation
		if (initScreenH === newScreenW){
			self.l('rotation detected - old sh:' + initScreenH + ' === sw:' + newScreenW);
			initScreenH = screen.height || window.outerHeight;
			init();
			return false;
		}
		
		//detect scroll without viewport height change
		if (window.scrollY >= screen.height/2){
			self.l('Installed since scrolled over 50% without innerheight change');
			triggerOnInstalled();
			return false;
		}
		
		newH = getH();
		self.l('updateH executed: ' + 'innerHeight:' + newH + ' (initial: ' + iniH + ') [outer: ' + window.outerHeight + ']');  	
		if (iniH !== newH){
			self.l('not installed detected - ih:' + iniH + ' != h:' + newH);
			triggerOnNotInstalled();
		}
	}
	
	//Check if native method is available
	function isNative(debug){
		//iOS support available
		if (typeof window.navigator.standalone !== 'undefined'){
			if (window.navigator.standalone === true){
				if (!debug){
					self.l('window.navigator.standalone is true');
				}
				triggerOnInstalled();
				
			} else {
				if (!debug){			
					self.l('window.navigator.standalone is FALSE');	
				}
				triggerOnNotInstalled();
			}
			return true;
		} else {
			self.l('window.navigator.standalone is undefined');
			return false;
		}
	}
	
	
	//Start detection
	if (!isNative(false)){
		init();
		window.addEventListener("resize", updateH, false);
		window.addEventListener("scroll", updateH, false);	
	}
	
	return self;
  
})(window);
