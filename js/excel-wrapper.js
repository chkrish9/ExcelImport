function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}
function handleFile(e) {
    //Get the files from Upload control
    var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";
    var files = e.target.files;
    var i, f;
    //Loop through files
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        if(rABS) reader.readAsBinaryString(f);
	    else reader.readAsArrayBuffer(f);
        reader.onload = function (e) {
            $("#dvOutput").html("");
            var data = e.target.result;
            var result=[];
            var arr = rABS ? data : btoa(fixdata(data));
            //reading data from excel
            var workbook = XLSX.read(arr, { type: rABS ? 'binary' : 'base64' });
            //Getting the sheet names
            var sheet_name_list = workbook.SheetNames;
            var count=0;
            sheet_name_list.forEach(function (y) { /* iterate through sheets */
                //Convert the cell value to Json
                var roa = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                if (roa.length > 0) {
                    //result[count] = roa;
                     $("#dvOutput").append(
                     "<div class='col-sm-4'>"+
                        "<div>Sheet Name :" +workbook.SheetNames[count]+"</div>"+
                        "<div>"+
                            "<pre>"+JSON.stringify(roa, null, 4)+"</pre>"+
                        "</div>"+
                     "</div>"
                    );
                    count++;
                }
            });
            //Get the first column first cell value
            //alert(result);
            //$("#dvOutput").html(JSON.stringify(result));
            $("#files").val("");
        };
    }
}

  //Change event to dropdownlist
  $(document).ready(function(){
    $('#files').change(handleFile);
  });