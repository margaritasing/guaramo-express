let slider= document.querySelector(".slider-contenedor")
let sliderIndividual= document.querySelectorAll(".contenido-slider")
let contador= 0;
let whidth= sliderIndividual[0].clientWidth;
let intervalo= 8000;

window.addEventListener("resize", function(){
    whidth= sliderIndividual[0].clientWidth;
})

setInterval(function(){
    slides()

},intervalo)
function slides(){
    slider.style.transform= "translate("+(-whidth*contador)+"px)";
    slider.style.transition= "transform 5s";
    contador++;
    if(contador -1== sliderIndividual.length){
        setTimeout(function(){
            slider.style.transform= "translate(0px)";
            slider.style.transition= "transform 0s";
            contador= 0;  

        },)
    }

}