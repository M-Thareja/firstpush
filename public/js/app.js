// fetch('http://localhost:3000/weather?address=hawaii').then((response)=>{
//     // if(error){
//     //    return console.log("Can't connect to the server.")
//     //  }
//     console.log(response);

//      response.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }
//         else{
//             console.log(data.temp)
//         }
//     })
// })


const form = document.querySelector('form');
const inputdata = document.querySelector('input');
const message1 = document.querySelector('#message1')
const message2= document.querySelector('#message2')

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = inputdata.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{


     response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            message1.textContent = data.error;
        }
        else{
            console.log(data.temp)
            message1.textContent = `The Temperature of ${location} is ${data.temp} celcius.`
            message2.textContent = `It can be ${data.discription}`
        }
    })
})

})

