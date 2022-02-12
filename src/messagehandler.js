var alphabetStringInclSpace = 'abcdefghijklmnopqrstuvwxyz0123456789 ';

function connectToBob() {
  let rsaMessage = 60;
  const stringHello = 'hello';

  //ALICE ENCRYPTS
  let cipherText = 72; // (60^41) mod 133 (Message^D MOD N)
  let aliceEncryptedStringArray = [];
  for(let i=0; i<stringHello.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(stringHello[i]);
    const encryptedCharPosition = (Number(charAlphabetIdx) + Number(rsaMessage)) % alphabetStringInclSpace.length;
    aliceEncryptedStringArray.push(alphabetStringInclSpace[encryptedCharPosition]);
  }
  const aliceEncryptedString = aliceEncryptedStringArray.join('');
  $( "#alices_output" ).html('<b>Payload:</b><br />{encryptedString: '+aliceEncryptedString.substring(0,8)+'..., cipherText:'+cipherText+', plainText: "hello"}<br />');

  //BOB DECRYPTS
  cipherText = 72; //This is what Alice sent
  const calcRsaMessage = 60; // (72^29) mod 133 (Cipher^E MOD N)
  let decryptedArray = [];
  for(i=0; i<aliceEncryptedStringArray.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(aliceEncryptedStringArray[i]);
    const decryptedCharPosition = (((charAlphabetIdx - Number(calcRsaMessage)) % alphabetStringInclSpace.length) + alphabetStringInclSpace.length) % alphabetStringInclSpace.length;
    decryptedArray.push(alphabetStringInclSpace[decryptedCharPosition]);
  }
  const bobDecryptedString = decryptedArray.join('');
  $( "#bobs_output" ).html('Decrypted cipher: ' + calcRsaMessage + '<br/><br/>Decrypted string: ' + bobDecryptedString + '<br/><br/>Plain text: hello');

  $( "#bob_extra" ).html('(Alice encrypt: (60^41) MOD 133 = 72)' + 
  '<br/><br/> Bob decrypt: (72^29) MOD 133 = 60<br/><br/><b>STRINGS MATCH, YOU ARE ALICE!</b>');

  $( "#hacker_message_container" ).html('<br />Hacker doesnt know D (41). If Bob uses hackers pub key the strings wouldnt match. Cannot change message!');
}

function sendToAlice() {
  let rawMessageToSend = $( "#bobs_message" ).text();
  let sharedSecretValue = $( "#bob_shared_secret_value" ).text();
  let messageContainerID = "alices_output";

  const hackerMessageToSend = 'im bob you owe me money';

  const urlParams = new URLSearchParams(window.location.search);
  const isMITM = urlParams.get('page') == 3;
  if(isMITM) {
    resetPage(true);
    sharedSecretValue = $( "#bob_hacker_shared_secret_value" ).text();
    encryptAndDecrypt(rawMessageToSend, sharedSecretValue, "hacker_message_container", true);
    
    sharedSecretValue = $( "#alice_hacker_shared_secret_value" ).text();
    encryptAndDecrypt(hackerMessageToSend, sharedSecretValue, messageContainerID, true);
  } else {
    encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID, false);
  }
  
}

function sendToBob() {
  let rawMessageToSend = $( "#alices_message" ).text();
  let sharedSecretValue = $( "#alice_shared_secret_value" ).text();
  let messageContainerID = "bobs_output";

  const hackerMessageToSend = 'im alice you are ugly';

  const urlParams = new URLSearchParams(window.location.search);
  const isMITM = urlParams.get('page') == 3;
  if(isMITM) {
    resetPage(true);
    sharedSecretValue = $( "#alice_hacker_shared_secret_value" ).text();
    encryptAndDecrypt(rawMessageToSend, sharedSecretValue, "hacker_message_container", true, true);
    
    sharedSecretValue = $( "#bob_hacker_shared_secret_value" ).text();
    encryptAndDecrypt(hackerMessageToSend, sharedSecretValue, messageContainerID, true);
  } else {
    encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID, false);
  }
}

function encryptAndDecrypt(rawMessageToSend, sharedSecretValue, messageContainerID, isMITM, aliceToBob) {
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

  if(!isMITM) {
    $( "#"+messageContainerID+"" ).html('<br /><br /><b>'+decryptedCharArray.join('') + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
    $( "#hacker_message_container" ).html('<span style="color:green">FAIL! Message intercepted but could not be decrypted. Shared secret is unknown!</span>' + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
  } else {
    if(messageContainerID == 'hacker_message_container') {
      const forwardAnotherMessage = aliceToBob ? 'Forward another message ->' : '<- Forward another message';
      $( "#hacker_message_container" ).html('<br /><span style="color:red">'+forwardAnotherMessage+'</span><br /><b>'+decryptedCharArray.join('') + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
    } else {
      $( "#"+messageContainerID+"" ).html('<br /><br /><b>'+decryptedCharArray.join('') + '</b><br />&#8679;<br />' + encryptedCharArray.join(''));
    }
  }

}

