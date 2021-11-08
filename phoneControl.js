var rpio = require('rpio');
var pin=12;

// Keep the max brightness down
var range =1024;
var maxVal=128;

var clockdiv=8;
var interval=5;

rpio.open(pin, rpio.PWM); /* Use pin 12 */
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin,range);


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
        pwmVal=Math.round(leftToRight_degrees+90);

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

        dot = document.getElementsByClassName("indicatorDot")[0]
        dot.setAttribute('style', "left:" + (px) + "%;" +
                      "top:" + (py) + "%;");

        //document.getElementById("f2b").innerHTML = (Math.round( frontToBack_degrees* 100) / 100).toString();
        document.getElementById("l2r").innerHTML = pwmVal;//(Math.round( leftToRight_degrees* 100) / 100).toString();
     
        rpio.pwmSetData(pin,pwmVal);  
    });
  }
});
}