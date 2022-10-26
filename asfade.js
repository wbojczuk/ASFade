"use strict";

const asFade = {
    speed: "1s",
    disableOnMobile: true,
    amount: "10px",
    // Percentage 1-100 That Elements must be in viewport to fade in 
    elemPercentage = 10,

    init: ()=>{
        // Inject Styles
        const fadeStyles = document.createElement("style");
        fadeStyles.textContent = `
        .as-fade-up{
            opacity: 0;
            transform: translateX(0) translateY(${asFade.amount});
            transition: ${asFade.speed} transform, ${asFade.speed} opacity;
        }
        .as-fade-down{
            opacity: 0;
            transform: translateX(0) translateY(-${asFade.amount});
            transition: ${asFade.speed} transform, ${asFade.speed} opacity;
        }
        .as-fade-left{
            opacity: 0;
            transform: translateX(${asFade.amount}) translateY(0);
            transition: ${asFade.speed} transform, ${asFade.speed} opacity;
        }
        .as-fade-right{
            opacity: 0;
            transform: translateX(-${asFade.amount}) translateY(0);
            transition: ${asFade.speed} transform, ${asFade.speed} opacity;
        }
        
        .as-fade-on{
            opacity: 1;
            transform: translateX(0) translateY(0);
        }
        `;
        document.getElementsByTagName("head")[0].append(fadeStyles);

        const isElementXPercentInViewport = function(el, percentVisible) {
            let
              rect = el.getBoundingClientRect(),
              windowHeight = (window.innerHeight || document.documentElement.clientHeight);
          
            return !(
              Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
              Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
            )
          };

        const fadeElems = document.querySelectorAll(".as-fade-down, .as-fade-up, .as-fade-left, .as-fade-right");
        
        // initial scan
        fadeElems.forEach((elem)=>{
            if(isElementXPercentInViewport(elem, asFade.elemPercentage)){
                elem.classList.add("as-fade-on");
            }
        });

        // Scroll checks
        document.addEventListener("scroll", ()=>{
            fadeElems.forEach((elem)=>{
                if(isElementXPercentInViewport(elem, asFade.elemPercentage)){
                    elem.classList.add("as-fade-on");
                }else{
                    elem.classList.remove("as-fade-on");
                }
            });
        });


        
    }
};
if(asFade.disableOnMobile){
    if(window.matchMedia("only screen and (min-width: 900px)").matches){
        asFade.init();
    }
}else{
    asFade.init();  
}
