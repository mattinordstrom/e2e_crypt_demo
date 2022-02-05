function sendToAlice() {
  const rawMessageToSend = $( "#bobs_message" ).text();
  console.log("sendToAlice: " + rawMessageToSend);

  const sharedSecretValue = $( "#bob_shared_secret_value" ).text();
  console.log("shared secret: " + sharedSecretValue);

  //TODO encrypt
}

function sendToBob() {
  const rawMessageToSend = $( "#alices_message" ).text();
  console.log("sendToBob: " + rawMessageToSend);

  const sharedSecretValue = $( "#alice_shared_secret_value" ).text();
  console.log("shared secret: " + sharedSecretValue);

  //TODO encrypt
}