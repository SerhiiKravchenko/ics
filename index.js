

let req = new XMLHttpRequest();
req.open('GET', 'http://javascript.kiev.ua/attach/icalendar/google_events.json', false);
req.send();
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
        if (string.byteLength>60){
            let stringNew = string;
            let tabs = "\t";
            let stringEnd = "";
            for (let i=0; i=stringNew.length-1; i++){
                let numb = 0;
                let stringTmp = stringNew.slice(numb,i+1);
                if(stringTmp.byteLength==60){
                    numb = i;
                    stringEnd+=tabs+stringTmp+"\n";
                    tabs+="\t";
                }else break;
            }

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




    // console.log(parsedData);
    console.log(calendar);
    alert("Результат в консоли");


}

