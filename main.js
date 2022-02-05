function init(numbersToUse) {
  if(!numbersToUse) {
    numbersToUse = {
      nNumber: 13,
      generatorNumber: 7,
      alicePrivateNumber: 15,
      bobPrivateNumber: 13
    };
  }

  const nNumber = numbersToUse.nNumber;
  const generatorNumber = numbersToUse.generatorNumber;
  const alicePrivateNumber = numbersToUse.alicePrivateNumber;
  const bobPrivateNumber = numbersToUse.bobPrivateNumber;

  
/*
  nNumber += Math.floor(Math.random() * 9) + 1; //random integer from 1 to 9:
  for(let i = 0; i < 4; i++) {
    nNumber += Math.floor(Math.random() * 10); //random integer from 0 to 9:
  }
  nNumber = Number(nNumber);
*/

  let alicePubKey = Math.pow(generatorNumber, alicePrivateNumber) % nNumber;
  let bobPubKey = Math.pow(generatorNumber, bobPrivateNumber) % nNumber;

  let aliceResult = Math.pow(bobPubKey, alicePrivateNumber) % nNumber;
  let bobResult = Math.pow(alicePubKey, bobPrivateNumber) % nNumber;

  $( ".container" ).html('N: ' + nNumber + '<br/><br/>g: ' + generatorNumber +
    '<br/><br/><hr/>Alice private key: ' + (alicePrivateNumber)+'<br/><br/>Bob private key: ' + (bobPrivateNumber) +
    '<br/><br/><hr/>Alice public key: ' + (alicePubKey)+'<br/><br/>Bob public key: ' + (bobPubKey) +
    '<br/><br/><hr/>aliceResult: ' + (aliceResult) + '<br/><br/>bobResult: ' + (bobResult));
}


//BIGINT (27576n ** 15n - 1n) % 95779