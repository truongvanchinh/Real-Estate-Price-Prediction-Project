function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i in uiBathrooms) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function getBHKValue() {
    var uiBhk = document.getElementsByName("uiBHK");
    for (var i in uiBhk) {
        if (uiBhk[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1;
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked")
    var num_bath = getBathValue();
    var num_bhk = getBHKValue();
    var total_sqft = parseFloat(document.getElementById("uiSqft").value);
    var location = "location_" + document.getElementById("uiLocations").value;
    var estimatePrice = document.getElementById("uiEstimatePrice");

    var url = "http://127.0.0.1:5000/predict_home_price";
    // var url = "/api/predict_home_price";

    $.post(url, {
        total_sqft: total_sqft,
        bhk: num_bhk,
        bath: num_bath,
        location: location
    }, function (data, status) {
        console.log("post response for predict_home_price request");
        if (data) {
            var estamatedPrice = data.estimated_price;
            estimatePrice.innerHTML = "<h2>" + estamatedPrice.toString() + " Lakh</h2>";
            console.log(status)
        }
    })
}

function onPageLoad() {
    console.log("document loaded");
    var url = "http://127.0.0.1:5000/get_location_names";
    // var url = "/api/get_location_names";
    $.get(url, function (data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.location;
            var uiLocations = document.getElementById('uiLocations')
            $("#uiLocations").empty();
            for (var i in locations) {
                var opt = new Option(locations[i].split("_")[1]);
                $("#uiLocations").append(opt)
            }
        }
    });
}
window.onload = onPageLoad();
