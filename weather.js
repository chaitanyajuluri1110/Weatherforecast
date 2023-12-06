var inputvalue=document.querySelector('#locationinput')
var btn=document.querySelector('#add')
var locationout=document.querySelector('#locationoutput')
var descrip=document.querySelector('#description')
var temp=document.querySelector('#temp')
var wind=document.querySelector('#wind')
apik= "2e82ee681192098a709652e09cf2b57e"
function convertion(val)
{
    return (val-273).toFixed(3)
}
btn.addEventListener('click',function()
{
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
    .then(res=>res.json())
    
    .then(data=>
    {
        var nameval=data['name']
        var descript=data['weather']['0']['description']
        var temperature=data['main']['temp']
        var windspeed=data['wind']['speed']

        locationout.innerHTML = `Weather of <span>${nameval}</span>`;
        descrip.innerHTML = `Sky Conditions: <span>${descript}</span>`;
        temp.innerHTML = `Temperature: <span>${convertion(temperature)}C</span>`;
        wind.innerHTML = `Wind speed: <span>${windspeed} km/h</span>`;

    })
    .catch(err=> alert('You Entered Wrong Location'))
})