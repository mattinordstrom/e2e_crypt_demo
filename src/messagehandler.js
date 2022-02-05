function sendToAlice() {
  const rawMessageToSend = $( "#bobs_message" ).text();
  console.log("sendToAlice: " + rawMessageToSend);

  //TODO encrypt
}

function sendToBob() {
  const rawMessageToSend = $( "#alices_message" ).text();
  console.log("sendToBob: " + rawMessageToSend);

  //TODO encrypt
}