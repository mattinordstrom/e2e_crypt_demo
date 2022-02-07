var alphabetStringInclSpace = 'abcdefghijklmnopqrstuvwxyz ';

function sendToAlice() {
  const rawMessageToSend = $( "#bobs_message" ).text();
  const sharedSecretValue = $( "#bob_shared_secret_value" ).text();
  const messageContainerID = "bobs_message_container";

  encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID);
}

function sendToBob() {
  const rawMessageToSend = $( "#alices_message" ).text();
  const sharedSecretValue = $( "#alice_shared_secret_value" ).text();
  const messageContainerID = "alices_message_container";

  encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID);
}

function encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID) {
  //ENCRYPT
  let encryptedCharArray = [];
  for(let i=0; i<rawMessageToSend.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(rawMessageToSend[i]);
    const encryptedCharPosition = (Number(charAlphabetIdx) + Number(sharedSecretValue)) % alphabetStringInclSpace.length;
    encryptedCharArray.push(alphabetStringInclSpace[encryptedCharPosition]);
  }
  //console.log(encryptedCharArray);

  //DECRYPT
  let decryptedCharArray = [];
  for(i=0; i<encryptedCharArray.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(encryptedCharArray[i]);
    const decryptedCharPosition = (((charAlphabetIdx - Number(sharedSecretValue)) % alphabetStringInclSpace.length) + alphabetStringInclSpace.length) % alphabetStringInclSpace.length;
    decryptedCharArray.push(alphabetStringInclSpace[decryptedCharPosition]);
  }
  //console.log(decryptedCharArray);

  $( "#"+messageContainerID+"" ).html('<br /><br /><b>'+decryptedCharArray.join('') + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
  $( "#hacker_message_container" ).html('<span style="color:red">FAIL! Message intercepted but could not be decrypted. Shared secret is unknown!</span>' + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
}

function resetMessages() {
  $( "#hacker_message_container" ).html('');
  $( "#bobs_message_container" ).html('');
  $( "#alices_message_container" ).html('');
}
