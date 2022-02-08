var alphabetStringInclSpace = 'abcdefghijklmnopqrstuvwxyz ';

function sendToAlice() {
  let rawMessageToSend = $( "#bobs_message" ).text();
  let sharedSecretValue = $( "#bob_shared_secret_value" ).text();
  let messageContainerID = "bobs_message_container";

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
  let messageContainerID = "alices_message_container";

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

function resetPage(mitm) {
  $( "#hacker_message_container" ).html('');
  $( "#bobs_message_container" ).html('');
  $( "#alices_message_container" ).html('');

  if(mitm) {
    $( "#hacker_knowledge_info" ).html('<ul><li>SHARED SECRET with Alice</li><li>SHARED SECRET with Bob</li></ul>');
  } else {
    $( "#hacker_knowledge_info" ).html('<ul><li>Knows the created public keys</li><li>Knows how the algoritm works</li></ul>');
  }
}
