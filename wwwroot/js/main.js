function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,
            timeout: 10000,          // thời gian chờ tối đa 10 giây
            maximumAge: 0
        });;
    } else {
        alert("Geolocation don't support on this browser.");
    }
}

function successCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    // Gửi dữ liệu về server qua AJAX hoặc form
    sendLocationToServer(latitude, longitude);
}

function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User deny location permission");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location is unreachable. Laptop/ PC don't support!");
            break;
        case error.TIMEOUT:
            alert("Get location time out!");
            break;
        case error.UNKNOWN_ERROR:
            alert("Undefined error!!!!");
            break;
    }
}

function sendLocationToServer(lat, lon) {
    alert("Your location: " + lat + ", " + lon);
    // Gửi dữ liệu về server
    fetch('/Location/ReceiveLocation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: lat, longitude: lon })
    })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

window.getUserOS = function () {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    if (/android/i.test(userAgent)) {
        return "Android";
    }
    if (navigator.appVersion.indexOf("Win") != -1) {
        return "Windows";
    }
    if (navigator.appVersion.indexOf("Mac") != -1) {
        return "macOS";
    }
    if (navigator.appVersion.indexOf("Linux") != -1) {
        return "Linux";
    }
    return "Unknown";
}
