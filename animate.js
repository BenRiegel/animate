// file: Animation.js
// author: Ben Riegel
// description: creates and exports a function 'animate' which performs a
// JavaScript animation. It accepts two parameters: 1) 'animationF', which
// is a callback that is exectured during each cycle of the animation, and 2)
// 'duration', which specifies how long in ms the animation lasts. The
// 'animate' function returns a promise that resolves when the animation
// duration has expired. 'requestAnimationFrame' is used to time the cycling
// of the animation.


//iife used here so that the startTimeStamp variable and cycle function
//are only accessible to the returned function
let animate = (function(){

  let startTimeStamp;

  //function that repeats during the duration of the animation. It requests
  //a new animation frame, and then calculates the current run time of the
  //animation. If the total run time hasn't execeeded the specified duration,
  //then the animation function is executed and a new cycle is started. If
  //the total run has has exceded the specified duration, then the promise
  //is resolved.

  function cycle(animationF, duration, resolveF, ...args){
    requestAnimationFrame( function(){
      const currentTimeStamp = new Date().getTime();
      const currentRunTime = currentTimeStamp - startTimeStamp;
      if (currentRunTime < duration){
        let totalProgress = currentRunTime / duration;
        totalProgress = Math.min(totalProgress, 1);
        animationF(totalProgress, ...args);
        cycle(animationF, duration, resolveF, ...args);
      } else {
        resolveF();
      }
    } );
  }

  //animationF is the function that is repeated during the animation
  //duration is the length of time in ms; the 'animate' function returns
  //a promise that resolves when the duration has completed
  return function(animationF, duration, ...args){
    return new Promise( (resolve, reject) =>{
      startTimeStamp = new Date().getTime();
      cycle(animationF, duration, resolve, ...args);
    } );
  }

})();


export default animate;
