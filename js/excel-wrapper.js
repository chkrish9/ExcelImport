function handleFile(e) {
    //Get the files from Upload control
    var files = e.target.files;
    var i, f;
    //Loop through files
    for (i = 0, f = files[i]; i != files.length; ++i) {
        var reader = new FileReader();
        var name = f.name;
        reader.readAsBinaryString(f);
        reader.onload = function (e) {
            $("#dvOutput").html("");
            var data = e.target.result;
            var result=[];
            //reading data from excel
            var workbook = XLSX.read(data, { type: 'binary' });
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