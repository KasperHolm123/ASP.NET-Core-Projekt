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
            "url": "/neows/nasagetall",
            "type": "GET",
            "datatype": "json",
        },
        "columns": [
            { "result": "near_earth_objects.2015-09-08.0.name", "width": "20%" },
            { "result": "near_earth_objects.2015-09-08.0.is_potentially_hazardous_asteroid", "width": "20%" },
            { "result": "near_earth_objects.2015-09-08.0.close_approach_data.0.close_approach_date", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                        <a href="/NeoWs/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:70px;'>
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