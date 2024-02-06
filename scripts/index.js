const loadButton = document.querySelector(".js-load-button");
const startButton = document.querySelector(".js-start-button");
const stopButton = document.querySelector(".js-stop-button");

const firstTrack = document.querySelector(".js-first-track");
const secondTrack = document.querySelector(".js-second-track");
const thirdTrack = document.querySelector(".js-third-track");

let selectedTrack = -1;
let tracks = [firstTrack,secondTrack,thirdTrack]


firstTrack.addEventListener('click',() => {
    firstTrack.classList.add("clicked-div-style");
    // remove clicked style from other tracks
    secondTrack.classList.remove("clicked-div-style");
    thirdTrack.classList.remove("clicked-div-style");
    selectedTrack = 0;
});

secondTrack.addEventListener('click',() => {
    secondTrack.classList.add("clicked-div-style");
    // remove clicked style from other tracks
    firstTrack.classList.remove("clicked-div-style");
    thirdTrack.classList.remove("clicked-div-style");
    selectedTrack = 1;
});

thirdTrack.addEventListener('click',() => {
    thirdTrack.classList.add("clicked-div-style");
    // remove clicked style from other tracks
    firstTrack.classList.remove("clicked-div-style");
    secondTrack.classList.remove("clicked-div-style");
    selectedTrack = 2;
});

loadButton.addEventListener('click',() => {
    if(selectedTrack !== -1) {
        if(selectedTrack === 0) {
            setTimeout(()=>{
                secondTrack.remove();
                thirdTrack.remove();
                tracks[selectedTrack].classList.add("selected-track");
            },350);
            tracks[1].classList.add("removed-track");
            tracks[2].classList.add("removed-track");
            car = document.querySelectorAll(".svg-car-upper-track"); 

            



        } else if(selectedTrack === 1){
            setTimeout(()=>{
                firstTrack.remove();
                thirdTrack.remove();
                tracks[selectedTrack].classList.add("selected-track");
                document.querySelector(".svg-element").classList.add("svg-element-selected");
                document.querySelector(".svg-obstcule").classList.add("svg-obstcule-selected");
                document.querySelectorAll(".svg-car-middle-track").forEach((carPart) => {
                    carPart.style.transform = `translateY(245px)`;
                });
                
            },350);
            tracks[0].classList.add("removed-track");
            tracks[2].classList.add("removed-track");
            car = document.querySelectorAll(".svg-car-middle-track");
        } else if(selectedTrack === 2){
            setTimeout(()=>{
                secondTrack.remove();
                firstTrack.remove();
                tracks[selectedTrack].classList.add("selected-track");
                document.querySelector(".svg-element").classList.add("svg-element-selected");  
                let [topObstcule, bottomObstcule] = document.querySelectorAll(".svg-obstcule");
                topObstcule.classList.add("svg-obstcule-selected-top-line");
                bottomObstcule.classList.add("svg-obstcule-selected");
                document.querySelectorAll(".svg-car-lower-track").forEach((carPart) => {
                    carPart.style.transform = `translateY(245px)`;
                });
                
            },350);
            tracks[0].classList.add("removed-track");
            tracks[1].classList.add("removed-track");
            car = document.querySelectorAll(".svg-car-lower-track");
        } 

        setTimeout(()=>{
            startButton.disabled = false;
            stopButton.disabled = false;
            startButton.classList.add("start-enable-button");
            stopButton.classList.add("stop-enable-button");
            loadButton.disabled = "true";
            loadButton.classList.remove("load-active-button");
            loadButton.classList.add("disable-button");

        },6000);

        fetch(`/runScript?selectedTrack=${selectedTrack}`)
                    .catch(error => console.error('Error:', error));
    }
});

car = document.querySelectorAll(".svg-car-lower-track");
console.log(car);
console.log(startButton)

let x = 10;
let y = 0;
startButton.addEventListener('click',()=> {
    console.log("hello world");
    if (selectedTrack === 0){
        setInterval(()=>{
            if(x <= 1600) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px)`;
                    }); 
            x = x + 1;
            }
        },10);
    } else if(selectedTrack === 1){
        setInterval(()=>{
            if(x <= 400) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, 245px)`;
                })
                x = x + 5;
                console.log(x);
                
            }else if (x > 400 && x <= 600) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(-30deg)`;
                })
                y = y + 5;
                x = x + 5;
                console.log(x + " 1");
            }else if (x > 600 && x < 1580) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(0deg)`;
                })
                x = x + 5;
                console.log(x + " 2");
            }
    
        },50);
    }else if (selectedTrack === 2) {
        setInterval(()=>{
            if(x <= 400) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, 245px)`;
                })
                x = x + 3;
                console.log(x);
                
            }else if (x > 400 && x <= 600) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(-30deg)`;
                })
                y = y + 3;
                x = x + 3;
                console.log(x);

            }else if (x > 600 && x <= 950) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(0deg)`;
                })
                x = x + 3;
                console.log(x);
            }else if (x > 950 && x <= 1200) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(30deg)`;
                })
                y = y - 2.4;
                x = x + 3;
                console.log(x);
            }
            else if (x > 1200 && x < 1600) {
                car.forEach((carPart)=> {
                    carPart.style.transform = `translate(${x}px, ${245-y}px) rotate(0deg)`;
                })
                x = x + 3;
                console.log(x);
            }
    
        },50);
    }

    
});





