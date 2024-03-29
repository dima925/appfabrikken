function correctImageDataURI(dataURI) {
  //if mime type is not defined(specifically on samsung galaxy)
  if (/data:;?base64,/.test(dataURI)) {
    dataURI = dataURI.replace(/data:;?base64,/, 'data:image/jpeg;base64,');
  }
  return dataURI;
}

function correctFileName(name) {
  name = decodeURIComponent(name);
  name = name.replace(/:/g, '-');
  return name;
}

function isCordova() {
  return typeof (cordova) !== 'undefined'
}

function correctExternalURL(url) {
  var isAndroid = false;
  if (window.device && window.device.platform.toLowerCase() === 'android') {
    isAndroid = true;
  }
  if (isAndroid && typeof (url) === 'string'
          && (url.indexOf('.pdf') === url.length - 4 || url.indexOf('.pdf?') !== -1)) {
    url = 'http://docs.google.com/viewer?url=' + url + '&embedded=true';
  }
  return url;
}

function convertImgToBase64(url, callback, outputFormat) {
  var canvas = document.createElement('CANVAS');
  var ctx = canvas.getContext('2d');
  var img = new Image;
  img.crossOrigin = 'Anonymous';
  img.onload = function () {
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
    callback.call(this, dataURL);
    // Clean up
    canvas = null;
  };
  img.src = url;
}

function convertNumToTimeFormate(value) {
  var tempVal = value * 1;
  var resultString = value;
  if (tempVal < 10)
    resultString = '0' + value;
  return resultString;
}

function convertObjectToArray(obj) {
  var arr = $.map(obj, function (value, index) {
    if(!is_Null(value))value.id = index;
    return [value];
  });

  return arr;
}

function is_Null(value) {

  if (value === "" || value === undefined || value === null) {
    return true;
  } else {
    if (typeof (value) == 'object') {
      if (value.length)
        return true;
      else
        return false;
    } else {
      return false;
    }
  }

}