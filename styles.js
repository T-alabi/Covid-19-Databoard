
// DROPDOWN MENU EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function () {
    // Select all elements with the "data-bs-toggle" attribute
    var toggleElements = document.querySelectorAll('[data-bs-toggle="collapse"]');

    // Add click event listeners to the elements
    toggleElements.forEach(function (element) {
        element.addEventListener('click', function () {
            // Get the target element to collapse
            var targetId = this.getAttribute('data-bs-target');
            var targetElement = document.querySelector(targetId);

            // Toggle the collapse state
            var isCollapsed = targetElement.classList.contains('show');
            if (isCollapsed) {
                targetElement.classList.remove('show');
            } else {
                targetElement.classList.add('show');
            }
        });
    });
});

//FILE UPLOAD PROMPT and LISTENER
/*
document.addEventListener('DOMContentLoaded', function () {
    var csvButton =  document.getElementById("csvUploadButton");
    csvButton.addEventListener('click', function() {
      var popupContent1 = `
          <div class="csvUpload d-none" id="ShowCSVUpload">
          <form id = "CSVForm" action="upload.php" method="post" enctype="multipart/form-data" >
              Uplaod a CSV file:
              <input type="file" class = "fileToUpload"name = "fileToUpload" id="fileToUpload">
              <input type="submit" value="Ok" name="submit">
          </form>
      </div>`;
      var popupWindow = window.open('', 'PopupWindow', 'width=600,height=400');
            
      popupWindow.document.write(popupContent1);
    })
});
*/
var loggedin = false;

//USER LOGIN POPUP PAGE
  document.addEventListener('DOMContentLoaded', function() {
    var DBloginButton = document.getElementById("DBloginButton");
    DBloginButton.addEventListener('click', function() {
      var popupContent = `
            <h1>User Login</h1>
           <!--LOGIN TO DB BUTTON-->
            <div class="DBlogin d-none" id="ShowDBLogin">
          <form id="DBLoginForm" action="DBCheck.php" method="post">Enter your DB login Credentials
              Username: <input type="text" placeholder="username" name="uname" required>
              
              Password: <input type="password" placeholder="Your Password" name="pword" required>

              <input type="submit" value="Ok" name="submit2">
          </form>
      </div>
            
            `;
            var popupWindow = window.open('', 'PopupWindow', 'width=600,height=400');
            popupWindow.document.write(popupContent);
            loggedin = true;
    } );
  });

//INFO button Event listender
document.addEventListener('DOMContentLoaded', function () {
  var infoButton =  document.getElementById("infoButton");
  infoButton.addEventListener('click', function() {
    var popupContent1 = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Information</title>
    </head>
    <body>
      <div class="text-center">
        <h1>Information:</h1>
        <p>Oluwatunmise Alabi</p>
        <p>2023F CPS4757 / 5745</p>
        <p>October 29, 2023</p>
        <p>Here is Report 1</p>
        <a href="https://docs.google.com/document/d/e/2PACX-1vQKpeKxnihlGc_ycOY7juc4tyPYrVA38nO6FUA2Oat1goTu7QsOcrYFQleBZvfrG-1wk_I4VHlqq10y/pub">Report 1</a>
      </div>
    </body>
    </html>
    `;

    var popupWindow = window.open('', 'PopupWindow', 'width=300,height=300');
    popupWindow.document.write(popupContent1);
  })
});

//client popup button
document.addEventListener('DOMContentLoaded', function (){
  var clientButton = document.getElementById("clientButton");
  clientButton.addEventListener('click', function() {
    var browserInfo = "Browser: " + navigator.userAgent + "<br/>";
    var osInfo = "OS: " + navigator.platform + "<br/>";
    var javaEnabled = "Java Enabled: " + navigator.javaEnabled() + "<br/>";
    var cookiesEnabled = "Cookies Enabled: " + navigator.cookieEnabled + "<br/>";      
    var infoText = browserInfo + "\n" + osInfo + "\n" + cookiesEnabled + "\n" + javaEnabled + "<br/>";

    var popupContent = '<h1>Client Information</h1>' + infoText;
    var popupWindow = window.open('', 'PopupWindow', 'width=300,height=300');
    popupWindow.document.write(popupContent);
  });
});
//manual popup button
document.addEventListener('DOMContentLoaded', function() {
  console.log("Pressed");
  var manualButton = document.getElementById("ManualButton");
manualButton.addEventListener('click', function() {
var popupContentManual = `
<!DOCTYPE html>
<html>
<head>
  <title>Information</title>
</head>
<body>
  <div class="text-center">
    <h1>Technical manual:</h1>
    <p>Click the link for access</p>
    <a href="https://docs.google.com/document/d/e/2PACX-1vTtm6864h75h3eS5cufKgeCpfs2dYEUV_ysgOhqZibRTFgN_4L_rkXErDmUe1GYHTRyVuXOGaHhQU16/pub">Manual Link</a>
  </div>
</body>
</html>
`;
var popupwindowManual = window.open('', 'PopupWindow', 'width=300, height=300');
popupwindowManual.document.write(popupContentManual);
});
})


function fetchUserInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'CheckUserCookie.php', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var userInfo = xhr.responseText; // No JSON parsing
      displayUserInfo(userInfo);
    }
  };
  xhr.send();
}
// Function to display user information in the popup
function displayUserInfo(userInfo) {
  var popupContent1 = `
    <h1>User Information: </h1>
    <div id="UserInfoDiv" class="text-center">
      ${userInfo}
    </div>
    
    `;

  var popupWindow = window.open('', 'PopupWindow', 'width=300,height=300');
  popupWindow.document.write(popupContent1);
}


// User info popup
document.addEventListener('DOMContentLoaded', function () {
  var UserInfoButton =  document.getElementById("UserInfoButton");
  UserInfoButton.addEventListener('click', function() {
      fetchUserInfo(); // Perform the XHR request when the button is clicked
  });
});


// logout db button
document.addEventListener('DOMContentLoaded', function () {
  var logoutButton =  document.getElementById("LogoutDBButton");
  logoutButton.addEventListener('click', function() {
      var confirmed = window.confirm("Are you sure you want to log out?");
      if (confirmed) {
          // Clear user information from the browser
          document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

          // Display a message indicating successful logout
          document.getElementById("DBLoginDisplay").innerHTML = "";
          document.getElementById("returnMessage").innerHTML = "Successful logout";
      }
  });
});

//This is for the geo chart stuff
document.addEventListener('DOMContentLoaded', function () {
  var geoChartButton = document.getElementById("geoChartButton");
  geoChartButton.addEventListener('click', function() {
    //general stuff we keep for both things 
    createGeoChart();
  });
});


//EXIT BUTTON
//global is DB loaded var
let isDBloaded = false;
var tableTitle = '';
var color = '';
var tetsingSendData;
document.addEventListener('DOMContentLoaded', function() {
  //load DB data 1 even listener
  document.getElementById("DBData1").addEventListener('click', function() {
    console.log("Db 1 pressed");
    tableTitle = '2020 NJ Covid Case Count';
    color = 'red';
    sendtoPHP('loadDBData1');
  });

  //Load DB data 1 event listener
  document.getElementById("DBData2").addEventListener('click', function() {
    console.log("Db 2 pressed");
    tableTitle = '2020 NJ Covid Death Count';
    color = 'green';
    sendtoPHP('loadDBData2');
  });


  function sendtoPHP(buttonId) {
    // Send data to PHP using AJAX
    $.ajax({
        type: 'POST',
        url: 'loadDbData.php', 
        data: { action: buttonId }, // Send the button ID to PHP
        dataType: 'json',
        success: function(response) {
          isDBloaded = true;
            //document.getElementById("DBLoginDisplay").innerHTML +=  response;
            if (response.error) {
                        alert(response.error);
                    } else {
                        console.log("Received data:", response);
                        processData(response); //THIS ALSO SHOWS GOOGLE TABLE!
                        tetsingSendData = response;//we call this function so it can get the data to the HTML page
                        //displayGoogleChart(response);
                    }
        },
        error: function(error) {
            // Handle errors if any
            console.error("Error:", error);
            alert("There was an error");

        }
    });
}

});
var dataTable;
function processData(data){
  //because the data will ALWAYS follow these column names, we can hardcode this

  var typeMapData = {
    0: "date",
    1: "string",
    2: "string",
    3: "number",
    4: "number",
};

var headers = {
  0: "date",
  1: "County",
  2: "State",
  3: "fips",
  4: "count",
};

//console.log("this is data", data);
  for(var i = 0; i<data.length; i++){
    //for each data type in 3-4 indexes, trasnform string integer to actual inetegr using Parseint
    for(let j=3; j<=4; j++){
      data[i][j] = parseInt(data[i][j]);
    }
  }
  //now we load the google charts here
  google.charts.load('current', {'packages':['table']});
  google.charts.setOnLoadCallback(googleTable);

  function googleTable() {
     dataTable = new google.visualization.DataTable();

    //adding headers and data types
    for (var colIndex in headers){
      dataTable.addColumn(typeMapData[colIndex], headers[colIndex]);
    }
    //adding rows now that we have the headers
    data.forEach(function(row) {
      var formattedRow = [];
      for (var colIndex in headers) {
        if (typeMapData[colIndex] === "date") {
          // Convert date strings to JavaScript Date objects
          formattedRow.push(new Date(row[colIndex]));
        } else{
          formattedRow.push(row[colIndex]);
        }
      }
      dataTable.addRow(formattedRow);
    });
   
    let columnSum = 0;
    for (let i = 0; i < data.length; i++) {
      columnSum += data[i][4];
    }
    const averageLastColumn = Math.ceil(columnSum / data.length);

    document.getElementById('googleTableTitle').innerHTML = tableTitle; //set table title so user isnt confused
    var table = new google.visualization.Table(document.getElementById('googleTableContainer'));


    //conditonal formattting portion
    var formatter1 = new google.visualization.ColorFormat();
    formatter1.addRange(parseInt(averageLastColumn),null, 'white', color );
    console.log(averageLastColumn);
    formatter1.format(dataTable, 4);
    table.draw(dataTable, {allowHtml: true, showRowNumber: true, width: '100%', height: '100%'});

    //return the final data table here?? Datatable vsriable maybe
  }

}
// now we can set start making graphs with DB data here
//function to send datatable to index.html for charts
console.log(isDBloaded);
function sendDatatable(){
  return tetsingSendData;
}


// Set the dimensions of the map
var width = 800;
var height = 600;

// Create an SVG element to contain the map
var svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define a projection for New Jersey
var projection = d3.geoMercator()
  .center([-74.4057, 40.0583])
  .scale(8000)
  .translate([width / 2, height / 2]);

// Create a path generator
var path = d3.geoPath().projection(projection);

// Declare the covidData variable at a higher scope
var covidData;
var njData;

// Function to create the color legend
function createColorLegend(svg, colorScale, width, height) {
  var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate(50, " + (height - 20) + ")");

  // Create a linear gradient
  legend.append("linearGradient")
    .attr("id", "color-gradient")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .selectAll("stop")
    .data(colorScale.ticks(6))
    .enter().append("stop")
    .attr("offset", function (d, i) { return i / (colorScale.ticks(6).length - 1); })
    .attr("stop-color", colorScale);

  // Append a rectangle filled with the gradient
  legend.append("rect")
    .attr("x", 0)
    .attr("width", width - 100)
    .attr("height", 10)
    .style("fill", "url(#color-gradient");

  // Append axis labels
  legend.append("text")
    .attr("class", "caption")
    .attr("x", 0)
    .attr("y", -6)
    .text("Low");

  legend.append("text")
    .attr("class", "caption")
    .attr("x", width - 100)
    .attr("y", -6)
    .text("High");
}

// Function to create Geo Chart using CSV data
function createGeoChartCSV() {
  d3.csv("uploads/CountyTotals1.csv")
    .then(function (data) {
      // Load the GeoJSON data for New Jersey
      d3.json("new_jersey.geojson")
        .then(function (njData) {
          // Match the COVID-19 data to GeoJSON features
          njData.features.forEach(function (feature) {
            var countyName = feature.properties.county;
            var countyData = data.find(function (d) {
              return d.County === countyName;
            });
            if (countyData) {
              feature.properties.covidCases = +countyData.caseNum;
            }
          });

          // Continue with rendering the map and displaying the data
          var colorScale = d3.scaleSequential(d3.interpolateBlues)
            .domain([0, d3.max(njData.features, function (d) {
              return d.properties.covidCases;
            })]);

          var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

          svg.selectAll("path")
            .data(njData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
              return colorScale(d.properties.covidCases);
            })
            .style("stroke", "white")
            .style("stroke-width", 1);

          // Create a color legend
          createColorLegend(svg, colorScale, width, height);

          // Add mouseover and mouseout events for the map paths
          svg.selectAll("path")
            .on("mouseover", function (event, d) {
              showTooltip(d);
            })
            .on("mouseout", function () {
              hideTooltip();
            });
        });
    })
    .catch(function (error) {
      console.error("Error loading CSV data:", error);
    });
}

// Function to create the Geo Chart
function createGeoChart() {
// Assuming DBData is your array
if (isDBloaded) {
  d3.json("new_jersey.geojson")
    .then(function (njData) {
      // Match the COVID-19 data to GeoJSON features
      njData.features.forEach(function (feature) {
        var countyName = feature.properties.county;
        var countyData = tetsingSendData.find(function (row) {
          return row[1] === countyName;
        });
        if (countyData) {
          console.log("County data", countyData);
          feature.properties.covidCases = +countyData[4];
        }
      });

      // Now your GeoJSON features have COVID-19 data associated with them
      // Continue with rendering the map and displaying the data
      var colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain([0, d3.max(njData.features, function (d) {
          return d.properties.covidCases;
        })]);

      var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

      svg.selectAll("path")
        .data(njData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .style("fill", function (d) {
          return colorScale(d.properties.covidCases);
        })
        .style("stroke", "white")
        .style("stroke-width", 1);

      // Create a color legend
      createColorLegend(svg, colorScale, width, height);

      // Add mouseover and mouseout events for the map paths
      svg.selectAll("path")
        .on("mouseover", function (event, d) {
          showTooltip(d);
        })
        .on("mouseout", function () {
          hideTooltip();
        });
    })
    .catch(function (error) {
      console.error("Error loading GeoJSON data:", error);
    });
} else {
  console.log("DB not loaded");
  createGeoChartCSV();
}

}

// Define a tooltip function
function showTooltip(d) {
  if (d && d.properties) {
    var countyName = d.properties.county;
    var covidCases = d.properties.covidCases;
    var event = d3.event || window.event;

    var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("left", (event.pageX || event.clientX) + "px")
      .style("top", (event.pageY || event.clientY) + "px");

    tooltip.html("<strong>" + countyName + "</strong><br>Cases: " + covidCases)
      .style("opacity", 0.9);
  } else {
    console.error("Invalid data for tooltip:", d);
  }
}

// Define a function to hide the tooltip
function hideTooltip() {
  d3.select(".tooltip").remove();
}