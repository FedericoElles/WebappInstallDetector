# WebappInstallDetector
Detects if an Webapp has been installed by either the native iOS method or by observing the viewport on Android.

##Usage

    <script src="WebappInstallDetector.js"></script>
    
    //optional: Add debug info
    //requires <div id="webappDetector-log"></div> tag in HTML
    webappInstallDetector.debug();
    
    webappInstallDetector.onNotInstalled(function(){
    	console.log('NOT INSTALLED');
    });
    
    webappInstallDetector.onInstalled(function(){
    	console.log('INSTALLED');
    });
    
##Limitations

* iOS: Either event fires immediatelly
* Android: You need to scroll inside the Webapp for one event to fire
