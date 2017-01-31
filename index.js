
let req = new XMLHttpRequest();
req.open('GET', 'http://javascript.kiev.ua/attach/icalendar/google_events.json', false);
req.send();
String.prototype.byteLength = function(){
        let str = this;
        let length = str.length;
        let count = 0, i = 0, ch = 0;
        for(i; i < length; i++){
            ch = str.charCodeAt(i);
            if(ch <= 127){
                count++;
            }else if(ch <= 2047){
                count += 2;
            }else if(ch <= 65535){
                count += 3;
            }else if(ch <= 2097151){
                count += 4;
            }else if(ch <= 67108863){
                count += 5;
            }else{
                count += 6;
            }
        }
        return count;
    };
if (req.status !== 200) {
    console.log( req.status + ': ' + req.statusText );
} else {
    let parsedData = JSON.parse(req.responseText);
    let calendar = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:s.kravchenko.org.ua\n";
    parsedData.forEach(function(element, i, arr) {
       calendar+=("BEGIN:VEVENT\nSUMMARY:"+textSplit(element.title)+"\nLOCATION:"+textSplit(element.location)+"\nURL:"
           +textSplit(element.url)+"\nDTSTAMP:"+dateDtstamp()+"\nDTSTART:"+dateIcs(element.start)+"\nDTEND:"+dateIcs(element.end)
            +"\nUID:"+element.id+"\nEND:VEVENT\n");
        if(i == arr.length-1){calendar+="END:VCALENDAR\n"}
    });
	
    function textSplit(string) {
        if ((string.byteLength())>60){		
		let space = " ";
		let newString = "";
		let count = 60;
		for (i=0; i<string.length; i++){
			let symbol = string.charAt(i);	
			if ((newString.byteLength()+symbol.byteLength()) < (count-space.byteLength())){
				newString+=symbol;
			}else {
				newString+="\n"+ space;
				space+=" ";
				count+=60;
			}	
		}
		return newString;
		
        } else return string;
    }
    function dateIcs(string){
        let str = string.replace(/[^a-zA-Z0-9]/g, '').slice(0,-4);
        if(str.length<15){
            str+=0
        }else return str;

    }
    function dateDtstamp(){
        let dateStamp = new Date();
        return dateIcs(dateStamp.toISOString());

    }
    




    // console.log(parsedData);
    console.log(calendar);
    alert("Результат в консоли");


}



