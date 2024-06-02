const apikey = 'ddecf516706a22ab045050be228ad196';
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
let searchbox = document.querySelector(".searchbar input");
let searchbtn = document.querySelector(".searchbar button");
let widgeticon = document.querySelector(".widget img");
let card = document.querySelector(".card");
let contain = document.querySelector(".container");
let movingcard = document.querySelector(".moving");
let error = document.querySelector(".error");
let widget = document.querySelector(".widget")
let footer = document.querySelector(".footer")

let checkWeather = async (city)=>{
    let response = await fetch(url +  city + `&appid=${apikey}` + "&units=metric");
    const data = await response.json();
    if(response.status==404)
        {
            error.style.display = "block";
            error.style.color = "black";
            widget.style.display = "none";
            contain.style.display = "none";
            movingcard.style.display = "none";
            footer.style.display = "none";
        }
    if(response.status==200)
        {
            error.style.display = "none";
            widget.style.display = "block";
            contain.style.display = "block";
            movingcard.style.display = "inline-block";
            footer.style.display = "flex";
        }

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed)+"km/h";

    if(data.weather[0].main==="Clouds" || data.weather[0].main==="Haze")
        {
            widgeticon.src = "./assets/cloudy.png";
            card.style.background = "linear-gradient(180deg,#10B3F4 0%,#4242FF 100%)";
            contain.style.display = "inline";
            card.style.overflow = "hidden";
        }
    else if(data.weather[0].main==="Clear")
        {
            widgeticon.src = "./assets/sun.png";
            card.style.background = "linear-gradient(180deg,#10B3F4 0%,#4242FF 100%)";
            contain.style.display = "none";
        }
    else if(data.weather[0].main==="Rain")
        {
            widgeticon.src = "./assets/rain.png";
            card.style.background = "linear-gradient(180deg,#CBCBCB 0%,#8C8C8C 100%)";
            contain.style.display = "none";
        }
    else if(data.weather[0].main==="Drizzle")
        widgeticon.src = "./assets/drizzle.png";
    else if(data.weather[0].main==="Snow")
        widgeticon.src = "./assets/snowy.png";

};

searchbtn.addEventListener("mouseenter",()=>{
    searchbtn.style.backgroundColor="black";
    searchbtn.style.color="white";
});
searchbtn.addEventListener("mouseleave",()=>{
    searchbtn.style.backgroundColor="white";
    searchbtn.style.color="black";
});
searchbtn.addEventListener("click",()=>{
    checkWeather(searchbox.value);
});