const feedback = (message) => {
	let feedback = document.querySelector(".feedbackMessage");
	feedback.innerHTML += `<p>${message}</p>`;
};
// let uuid = "00002a37-0000-1000-8000-00805f9b34fb";
let uuid = "00000009-0000-3512-2118-0009af100700";
const trigger = document.querySelector(".main_btn");
trigger.addEventListener("click", async () => {
    try{
	let device = await navigator.bluetooth
		.requestDevice({ acceptAllDevices: true,
        optionalServices: ['heart_rate', 'generic_attribute', 'generic_access'] })
    feedback(device.name)

    let server = await device.gatt.connect()
    // feedback(server);
    // let service = await device.gatt.getPrimaryService('heart_rate')
    // console.log(service);

    }
    catch(e){
       feedback(e)
    }
    
		// .then((device) => {
        //     console.log(device.name)
        //     return device.gatt.connect();
        //     }) 
		// .catch((error) => {
		// 	console.log(error);
		// });

	
});
