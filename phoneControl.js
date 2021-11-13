var px = 50; // Position x and y
var py = 50;
var vx = 0.0; // Velocity x and y
var vy = 0.0;
var updateRate = 1/60; // Sensor refresh rate

function getAccel(){
DeviceMotionEvent.requestPermission().then(response => {
  if (response == 'granted') {
      console.log("accelerometer permission granted");

     // Add a listener to get smartphone acceleration 
    // in the XYZ axes (units in m/s^2)
    //how else can we access this "event"?
    //window.addEventListener('devicemotion', (event) => {
        
    //});

    // Add a listener to get smartphone orientation 
   // in the alpha-beta-gamma axes (units in degrees)
     window.addEventListener('deviceorientation',(event) => {
         rotation_degrees = event.alpha;
        frontToBack_degrees = event.beta;
        leftToRight_degrees = event.gamma;

        // Since phones are narrower than they are long, 
        // double the increase to the x velocity
        vx = vx + leftToRight_degrees * updateRate; 
        vy = vy + frontToBack_degrees * updateRate*.5;
        
        // velocity affect is halved for smoothing
        px = px + vx*.25;
        if (px > 98 || px < 0){ 
            px = Math.max(0, Math.min(98, px)) // Clip px between 0-98
            vx = 0;
        }
        py = py + vy*.25;
        if (py > 98 || py < 0){ 
            py = Math.max(0, Math.min(98, py)) // Clip py between 0-98
            vy = 0;
        }

        // dot = document.getElementsByClassName("indicatorDot")[0]
        // dot.setAttribute('style', "left:" + (px) + "%;" +
        //               "top:" + (py) + "%;");

        document.getElementById("f2b").innerHTML = "checkcheck1";//(Math.round( frontToBack_degrees* 100) / 100).toString();

        pixelVal= 69;//(leftToRight_degree -50)/10;    
        document.getElementById("l2r").innerHTML = pixelVal.toString();
      
    });
  }
});
}

// function pixelSend(val){
//   var xhr = new XMLHttpRequest();
//         xhr.open("POST", "/data", true);
//         xhr.setRequestHeader('Content-Type', 'application/json');
//         xhr.send(JSON.stringify({
//             value: val
//         }));
// }
