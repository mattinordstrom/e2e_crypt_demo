var alphabetStringInclSpace = 'abcdefghijklmnopqrstuvwxyz0123456789 ';

function connectToBob() {
  const stringToHash = $( "#alices_message" ).text(); //whatever
  const hashOfString = '85738f8f9a7f1b04b5329c590ebcb9e425925c6d0984089c43a022de4f19c281'; //The SHA256 hash of the string "whatever"
  let sharedSecretValue = $( "#alice_hacker_shared_secret_value" ).text(); //Shared secret between Alice and hacker (Alice thinks it's Bob)

  //ALICE ENCRYPT HASH
  let aliceEncryptedCharArray = [];
  for(let i=0; i<hashOfString.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(hashOfString[i]);
    const encryptedCharPosition = (Number(charAlphabetIdx) + Number(sharedSecretValue)) % alphabetStringInclSpace.length;
    aliceEncryptedCharArray.push(alphabetStringInclSpace[encryptedCharPosition]);
  }
  console.log('hashOfString: ' + hashOfString);
  console.log('Alice encryptedCharArray: ' + aliceEncryptedCharArray.join(''));

  $( "#alices_output" ).html('<b>Payload:</b><br />{plainText: "whatever", encryptedHash:'+aliceEncryptedCharArray.join('').substring(0,8)+'...}<br />');

  //enrypt the hash of "whatever" with the secret 16 and send to Bob
  sharedSecretValue = $( "#bob_hacker_shared_secret_value" ).text();
  //HACKER TRIES TO ESTABLISH TRUST WITH BOB
  let hackerEncryptedCharArray = [];
  for(let i=0; i<hashOfString.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(hashOfString[i]);
    const encryptedCharPosition = (Number(charAlphabetIdx) + Number(sharedSecretValue)) % alphabetStringInclSpace.length;
    hackerEncryptedCharArray.push(alphabetStringInclSpace[encryptedCharPosition]);
  }

  $( "#hacker_message_container" ).html('<b>Payload:</b><br />{plainText: "whatever", encryptedHash:'+hackerEncryptedCharArray.join('').substring(0,8)+'...}<br />');

  //########################
  sharedSecretValue = $( "#bob_hacker_shared_secret_value" ).text(); //Shared secret between hacker and Bob (Bob thinks it's Alice)

  //BOB DECRYPT HASH
  let decryptedCharArray = [];
  for(i=0; i<aliceEncryptedCharArray.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(aliceEncryptedCharArray[i]);
    const decryptedCharPosition = (((charAlphabetIdx - Number(sharedSecretValue)) % alphabetStringInclSpace.length) + alphabetStringInclSpace.length) % alphabetStringInclSpace.length;
    decryptedCharArray.push(alphabetStringInclSpace[decryptedCharPosition]);
  }
  console.log(decryptedCharArray);

  //BOB ENCRYPT STRING TO HASH (TO COMPARE WITH THE MESSAGE THAT ALICE SENT)
  let bobEncryptedCharArray = [];
  for(let i=0; i<hashOfString.length; i++) {
    const charAlphabetIdx = alphabetStringInclSpace.indexOf(hashOfString[i]);
    const encryptedCharPosition = (Number(charAlphabetIdx) + Number(sharedSecretValue)) % alphabetStringInclSpace.length;
    bobEncryptedCharArray.push(alphabetStringInclSpace[encryptedCharPosition]);
  }

  console.log('Bob encryptedCharArray: ' + bobEncryptedCharArray.join(''));

  if(bobEncryptedCharArray.join('') !== aliceEncryptedCharArray.join('')) {
    $( "#bobs_output" ).html('<br /><br /><b>Hey you are not Alice!</b><br />');
  }

  $( "#bob_extra" ).html('Bobs encrypted hash (secret 16): ' + bobEncryptedCharArray.join('') + '<br/><br/> Alices encrypted hash (secret 15): ' + aliceEncryptedCharArray.join(''));
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

