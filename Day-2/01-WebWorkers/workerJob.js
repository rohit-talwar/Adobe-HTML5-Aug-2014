function doWork(){
	for(var i=0;i<10000;i++){
		for(var j=0;j<10000;j++)
			for(var k=0;k<100;k++){

			}
		if (i % 100 === 0){
			var percentCompleted = i / 100;
			self.postMessage({type : "progress", percentCompleted : percentCompleted});
		}
	}
	console.log("work completed");
}
self.addEventListener("message", function(){
	doWork();	
	self.postMessage({type : "complete"});
});
