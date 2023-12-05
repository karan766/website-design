const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
        
    })
}

var timeout

function circleChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets){
        this.clearTimeout(timeout);

        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

      yprev = dets.clientY;
      xprev = dets.clientX;

      circleMouseFollower(xscale,yscale);


      timeout = setTimeout(function () {
        document.querySelector("#minicircle").style.transform  = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
      },100);
    });
}

circleChaptaKaro();


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove" , function (dets)  {
   document.querySelector("#minicircle").style.transform  = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circleMouseFollower();
firstPageAnim();

// teeno element ko select karo, uske baad teeno par ek mouseemove lagao, jab mousemove ho to ye pata karo ki mousekah apar hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo,move karte waqt rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye//

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;


    elem.addEventListener("mousemove", function (dets){
      diffrot = dets.clientX -rotate;
      var diffe = dets.clientY - elem.getBoundingClientRect();
      rotate = dets.clientX;

      elem.addEventListener("mouseleave", function (dets){
        diffrot = dets.clientX - rotate;
        var diffe = dets.clientY - elem.getBoundingClientRect();
        rotate = dets.clientX;
        
       gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration:0.5 
       });
      });
      
     gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top : diffe,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20,20,diffrot * 0.5)
     });
    });
});