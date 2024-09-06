import formatPrice from "../scripts/Utils/money.js";

console.log("Format Price testing suite")

console.log("Basic Test")
if(formatPrice(2085) === "20.85") {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log("Work with zero")
if(formatPrice(0) === "0.00") {
    console.log("Passed");
} else {
    console.log("Failed");
}

console.log("Work with float")
if(formatPrice(2000.4) === "20.00") {
    console.log("Passed");
} else {
    console.log("Failed");
}