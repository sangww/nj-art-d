
  const width = 640;
  const height = 360;

  var video = document.getElementById("video");

  let cam_default = undefined;
  let cam_usb = undefined;

  navigator.mediaDevices.enumerateDevices()
  .then(devices => {
    devices.forEach(function(device) {
      if(device.kind == 'videoinput') {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
        if(device.label.includes('Logitech Webcam C925e')) cam_usb = device.deviceId;
        if(device.label.includes('FaceTime HD Camera')) cam_default = device.deviceId;
      }
    });

    const constraints = {
      video: { width: { min: width }, height: { min: height }, deviceId: {exact: (cam_usb) ? cam_usb:cam_default }},
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
    });
  });
