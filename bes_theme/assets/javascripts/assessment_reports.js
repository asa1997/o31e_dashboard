function constructTable(selector, list) {

  document.getElementById("checks_h3").innerHTML = "Checks"

  console.log("construct table container");
  // Getting the all column names
  var cols = Headers(list, selector);

  // Traversing the JSON data
  for (var i = 0; i < list.length; i++) {
    var row = $('<tr/>');
    for (var colIndex = 0; colIndex < cols.length; colIndex++)
    {
      // console.log("cols:"+cols)

      // if (cols[colIndex] == "documentation") {
      //   continue;
      // }
      var val = list[i][cols[colIndex]];
      
      // console.log("var:" + val);
      // If there is any key, which is matching
      // with the column name
      if (val == null) val = "";
        row.append($('<td/>').html(val));
    }
    
    // Adding each row to the table
    $(selector).append(row);
  }
  return row;
}

function Headers(list, selector) {
  var columns = [];
  var header = $('<tr/>');
  
  for (var i = 0; i < list.length; i++) {
    var row = list[i];
    for (var k in row) {
      if ($.inArray(k, columns) == -1) {
        console.log("k:"+k);
        if (k == "documentation") {
          continue;
          
        }
        columns.push(k);
        
        // Creating the header
        header.append($('<th/>').html(k));
      }
    }
  }
  
  // Appending the header to the table
  $(selector).append(header);
    return columns;
}	
function print_checks(data)
{
  json_data = JSON.stringify(data);
  // console.log(json_data);
  json_object = JSON.parse(json_data);
  // console.log("checks:"+json_object[0].name);
  var table = "<table border='1'>"
  for (let i in json_object) {
    table += "<tr><td> name : " + json_object[i].name + "</tr></td>"
    table += "<tr><td> score : " + json_object[i].score + "</tr></td>"
    table += "<tr><td> reason : " + json_object[i].reason + "</tr></td>"
    table += "<tr><td> details : " + json_object[i].details + "</tr></td>"
    table += "<tr><td></tr></td>"
    table += "<tr><td></tr></td>"

  }
  table += "</table>"

  document.getElementById("checks").innerHTML = table;
}
function print_summary(data)
{
  json_data = JSON.stringify(data);
  // console.log(json_data);
  json_object = JSON.parse(json_data);
  var table = "<table>"
  table += "<tr><td>Date : " + json_object.date + "</tr></td>"
  table += "<tr><td>Scorecard version : " + json_object.scorecard.version + "</tr></td>"
  table += "<tr><td>OSSP : " + json_object.repo.name + "</tr></td>"
  table += "<tr><td>Commit : " + json_object.repo.commit + "</tr></td>"
  table += "<tr><td>Score : " + json_object.score + "</tr></td>"    
  table += "</table>"
  document.getElementById("reports").innerHTML = table;
  // print_checks(json_object.checks);
}

function fetch_json()
{
  var version = localStorage["version"];
  var ossp_name = localStorage["ossp_name"].toLowerCase();
  var report = localStorage["report"];
  console.log(ossp_name);
  document.getElementById("report_name").innerHTML = report + " report - " + localStorage["ossp_name"];
  fetch('https://raw.githubusercontent.com/Be-Secure/besecure-assessment-datastore/main/'+ ossp_name + '/' + version + '/' + report + '/' + ossp_name+ '-' + version + '-' + report + '-report.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // console.log(data);
    print_summary(data);
    constructTable('#table', data.checks)
  })
  .catch(function (err) {
    const p = document.createElement("p");
    const para = document.createTextNode("Assessment report not available at the moment");
    p.appendChild(para)
    div_tag = document.getElementById("reports");
    div_tag.appendChild(p);
    console.dir(err);

  });

}
