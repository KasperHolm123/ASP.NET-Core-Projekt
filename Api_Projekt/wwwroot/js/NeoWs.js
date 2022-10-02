$(document).ready(function () {
    if (document.title == "Near Earth Objects") {
        getLocalAsteroids();
    }
    else if (document.title == "Nasa Response") {
        getNasaAsteroids();
    }
});

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

function getNasaAsteroids() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "neows/nasagetall",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "position", "width": "20%" },
            { "data": "start_date", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/NeoWs/ApiView" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
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

function getNasaData () {
    fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-8&api_key=gNuLkRkZgZS1zdx0AQr8CUVvqQxfXWTTCSVTeDXx')
        .then((response) => response.json())
        .then((data) => {
            var asteroids = [];
            for (var key in data['near_earth_objects']) {
                for (var i = 0; i < data['near_earth_objects'][key].length; i++) {
                    asteroids.push(data['near_earth_objects'][key][i])
                }
            }
            var jsonData = {};
            jsonData.data = asteroids;
            console.log(JSON.stringify(jsonData, undefined, 4));
            return JSON.stringify(jsonData);
        });
}