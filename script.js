// // In script 1
// localStorage.setItem('sharedValue', 'Hello from script 1');

// // In script 2
// var sharedValue = localStorage.getItem('sharedValue');
// console.log(sharedValue); // Output: "Hello from script 1"

document.querySelectorAll("a").forEach((element) => {
    element.addEventListener(("click") , (evt) => {
        let mode = evt.target.parentElement.querySelector("select").value;
        let category = evt.target.parentElement.className.split(" ")[1].replace("-"," ");
        localStorage.setItem('category', category);
        localStorage.setItem('mode', mode);
    })

})