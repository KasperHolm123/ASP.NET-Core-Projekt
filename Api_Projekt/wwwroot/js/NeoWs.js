$(document).ready(function () {
    if (document.title == "Near Earth Objects") {
        getLocalAsteroids();
    }
    else if (document.title == "Nasa Response") {
        getNasaAsteroids();

        $('#DT_load').on('click', 'tbody td.dt-control', function () {
            var tr = $(this).closest('tr');
            var row = dataTable.row(tr);
            console.log(row.data());

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
            } else {
                // Open this row
                row.child(formatChild(row.data())).show();
            }
        })
    }
});

function formatChild(d) {
    // `d` is the original data object for the row
    return (
        '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>ID:</td>' +
        '<td>' +
        d.id +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Diameter (kilometers):</td>' +
        '<td>' +
        d.estimated_diameter['kilometers']['estimated_diameter_max'] +
        '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Extra info:</td>' +
        '<td>And any further details here (images etc)...</td>' +
        '</tr>' +
        '</table>'
    );
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
    var apiData = await callNeoApi();
    dataTable = $('#DT_load').DataTable({
        data: apiData['rows'],
        rowid: "id",
        statesave: true,
        "columns": [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { "data": "name", "width": "20%" },
            { "data": "is_potentially_hazardous_asteroid", "width": "20%" },
            { "data": "close_approach_data.0.close_approach_date", "width": "20%" },
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

async function callNeoApi () {
    let data = await fetch('https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-8&api_key=gNuLkRkZgZS1zdx0AQr8CUVvqQxfXWTTCSVTeDXx')
        .then((response) => response.json())
        .then((data) => {
            var asteroids = [];
            for (var key in data['near_earth_objects']) {
                for (var i = 0; i < data['near_earth_objects'][key].length; i++) {
                    asteroids.push(data['near_earth_objects'][key][i])
                }
            }
            var jsonData = [];
            jsonData.rows = asteroids;
            return jsonData;
        });
    return data;
}