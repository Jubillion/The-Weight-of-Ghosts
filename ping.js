{ // I placed the code inside a block so it would not take up global memory.

    let initialTime = 0, xhttp = undefined, ping = 0;
    setInterval(() => {
        xhttp = new XMLHttpRequest(); // Create HTTP Request
        xhttp.onload = () => {
            ping = performance.now() - initialTime; // Measure ping after a response is received.
        }
        xhttp.onerror = () => { // Set ping display to "[ERROR] ms" if there is an error.
            ping = undefined;
        }
        xhttp.open("GET", "/pingtest"); // Open HTTP Request.
        initialTime = performance.now(); // Record current time.
        xhttp.send(); // Send HTTP Request.
    }, 100); // Note: this runs 10 times a second to minimize resource consumption while preserving accuracy.

    setInterval(() => { // Update the ping display every 0.3 seconds.
        document.getElementById("ping").innerText = typeof ping == "number" ? Math.floor(ping) : "[ERROR]";
    }, 300);

}