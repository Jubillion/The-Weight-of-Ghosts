// Note: the following line is metadata for Synk's Vulnerability Scanner.
// file deepcode ignore DOMXSS: Requests are sent to a trusted server.


document.getElementById("num").focus(); // Focus on the input when the page loads.

document.getElementById("submit").onclick = () => {
    let num = document.getElementById("num").value; // Get the user input.
    window.detachedContainer = []; // Create an array to store the detached elements within.
    let imgs = document.getElementById("images");
    if (imgs.innerHTML != "") {
        output("Please reload the page.", false);
    } else if (parseInt(num).toString().length == num.length && num[0] != "-") { // Make sure the input is a positive whole number without padding zeroes.
        // Retrieve the blobs for the images.
        let img1 = new XMLHttpRequest(), img2 = new XMLHttpRequest(), img3 = new XMLHttpRequest();
        img1.responseType = "blob"; // Ask the server to send blob objects.
        img2.responseType = "blob";
        img3.responseType = "blob";
        img1.open("GET", "img380965882.webp"); // These are the files we are retrieving.
        img2.open("GET", "img471465269.webp");
        img3.open("GET", "img527866382.webp");
        img1.onload = () => {img1 = URL.createObjectURL(img1.response)}; // Create URLs for each image after a response is received.
        img2.onload = () => {img2 = URL.createObjectURL(img2.response)};
        img3.onload = () => {img3 = URL.createObjectURL(img3.response)};
        img1.send(); 
        img2.send();
        img3.send();

        for(let i = 0; i < parseInt(num); i++) { // Create the specified number of elements and attach them to the DOM tree.
            detachedContainer.push(document.getElementById("elements").appendChild(document.createElement("div")));
            document.getElementById("elements").removeChild(detachedContainer[i]);
        }

        // document.getElementById("elements").innerHTML = ""; // Detach all of the elements at once.

        let intl = setInterval(() => { // Load the images after all of the above is done.
            if(typeof img1 == "string" && (typeof img2 == "string") && (typeof img3 == "string")) {
                clearInterval(intl);
                loadImages(imgs, img1, img2, img3);
            }
        });
    } else { // If the input is invalid:
        switch(num[0]) { // Tell the user about the error in the input.
            case "0":
                output("No padding zeroes.", false);
                break;
            case "-":
                output("Must be positive.", false);
                break;
            default:
                if(num.includes(".")) {
                    output("Must be whole.", false);
                } else {
                    output("Must be a number.", false);3
                }
        }
    }
}

function loadImages(imgs, url1, url2, url3) {
    let time = performance.now();
    imgs.innerHTML = `<img src="${url1}" type="image/webp" width="300px" alt="">`;
    imgs.children[0].onload = () => { // First image loads.
        imgs.innerHTML += `<img src="${url2}" type="image/webp" width="300px" alt="">`;
        imgs.children[1].onload = () => { // Second image loads.
            imgs.innerHTML += `<img src="${url3}" type="image/webp" width="300px" alt="">`;
            imgs.children[2].onload = () => { // Third image loads.
                time = performance.now() - time; // Get elapsed time.
                time *= 100; // Round elapsed time to two decimal points.
                time = Math.round(time);
                time /= 100;
                output(`Completed in ${time} ms.`, true); // Display the rounded time to the user.
            }
        }
    }
}

document.getElementById("num").onkeydown = (e) => { // Press Enter to submit the form.
    if (e.key == "Enter") document.getElementById("submit").click();
}

function output(contents, success) { // Display the output of the code.
    window.outputting = window.outputting ?? false;
    if (!outputting) {
        outputting = true;
        let output = document.getElementById("output");
        let status = document.getElementById("output-icon");

        output.hidden = false;
        setTimeout(() => { output.hidden = true, outputting = false; }, 3000)

        switch (success) {
            case true: // On success:
                status.style.backgroundColor = "rgba(3, 146, 3, 0.84)";
                status.innerText = "✓";
                break;

            case false: // On failure:
                status.style.backgroundColor = "rgba(226, 0, 0, 0.84)";
                status.innerText = "✕";
                break;

            case undefined: // On unknown/generic:
                status.style.backgroundColor = "rgb(42, 15, 85)";
                status.innerText = "✓ ✕";
                break;

            default: // On invalid:
                status.style.backgroundColor = "rgba(226, 0, 0, 0.84)";
                status.innerText = "✕";
                contents = "Invalid output type";
                console.trace();
        }

        document.getElementById("output-text").innerText = contents;
    }
}
