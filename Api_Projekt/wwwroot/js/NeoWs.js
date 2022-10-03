$(document).ready(function () {
    if (document.title == "Near Earth Objects") {
        getLocalAsteroids();
    }
    else if (document.title == "Nasa Response") {
        getNasaAsteroids();
        //loadTable(getNasaData(), document.querySelector("table"));
    }
});

async function loadTable(url, table) {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");
    const { headers, rows } = await url;

    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    for (const headerText of headers) {
        const headerElement = document.createElement("th");

        headerElement.textContent = headerText;
        tableHead.querySelector("tr").appendChild(headerElement);
    }

    for (const row of rows) {
        const rowElement = document.createElement("tr");
        const cellElement = document.createElement("p");


        cellElement.textContent = row["name"];
        rowElement.appendChild(cellElement);

        tableBody.appendChild(rowElement);
    }
}


var dataTable;
function getLocalAsteroids() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/neows/getall",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "hazadous", "width": "20%" },
            { "data": "close approach date", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/BookList/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Edit
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' style='cursor:pointer; width:70px;'
                            onclick=Delete('/BookList/Delete?id='+${data})>
                            Delete
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no entries found"
        },
        "width": "100%"
    });
}

async function getNasaAsteroids() {
    dataTable = $('#DT_load').DataTable({
        "data": [
            {
                "id": 1,
                "name": "Tiger Nixon",
                "position": "System Architect",
                "salary": "$3,120",
                "start_date": "2011/04/25",
                "office": "Edinburgh",
                "extn": 5421
            },
            {
                "id": 2,
                "name": "Garrett Winters",
                "position": "Director",
                "salary": "5300",
                "start_date": "2011/07/25",
                "office": "Edinburgh",
                "extn": "8422"
            },
        ],
        //"ajax": {
        //    "url": await getNasaData(),
        //    "type": "GET",
        //    "datatype": "json"
        //},
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "position", "width": "20%" },
            { "data": "start_date", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/NeoWs/ApiView?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
                            Add
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no entries found"
        },
        "width": "100%"
    });
}

async function getNasaData () {
    let data = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-8&api_key=gNuLkRkZgZS1zdx0AQr8CUVvqQxfXWTTCSVTeDXx')
        .then((response) => response.json())
        .then((data) => {
            var asteroids = [];
            for (var key in data['near_earth_objects']) {
                for (var i = 0; i < data['near_earth_objects'][key].length; i++) {
                    asteroids.push(data['near_earth_objects'][key][i])
                }
            }
            var jsonData = new Object();
            jsonData.headers = ["Name", "Hazardous", "Close Approach Date"];
            jsonData.rows = asteroids;
            //console.log(jsonData);
            return jsonData;
        });
    return data;
}