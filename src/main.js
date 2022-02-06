function setupExample(pageTitle, numbersToUse) {
  const nNumber = numbersToUse.nNumber;
  const generatorNumber = numbersToUse.generatorNumber;
  const alicePrivateNumber = numbersToUse.alicePrivateNumber;
  const bobPrivateNumber = numbersToUse.bobPrivateNumber;

  let alicePubKey = (generatorNumber ** alicePrivateNumber) % nNumber;
  let bobPubKey = (generatorNumber ** bobPrivateNumber) % nNumber;

  let aliceResult = (BigInt(bobPubKey) ** BigInt(alicePrivateNumber)) % BigInt(nNumber);
  let bobResult = (BigInt(alicePubKey) ** BigInt(bobPrivateNumber)) % BigInt(nNumber);

  $( "#page_title" ).html('<h2>' + pageTitle + '</h2>');
  $( "#public_n_g" ).html('N: ' + nNumber + '<i> (prime number)</i><br/><br/>g: ' + generatorNumber + '<i> (generator)</i>' + '<br/><br/><br/>');
  $( "#private_keys" ).html('&#128273; Alice private key: ' + alicePrivateNumber + '<br/><br/>&#128273; Bob private key: ' + bobPrivateNumber + '<br/><br/><br/>');
  $( "#created_pub_keys" ).html('Alice public key: ' + alicePubKey + '<br/>Bob public key: ' + bobPubKey + '<br/><br/>'+
    '<i>Alice: '+generatorNumber+'<sup>'+alicePrivateNumber+'</sup> % '+nNumber+'</i><br/>' + '<i>Bob: '+generatorNumber+'<sup>'+bobPrivateNumber+'</sup> % '+nNumber+'</i>');
  $( "#shared_secret" ).html('<b>Alice result: <span id="alice_shared_secret_value">' + aliceResult + '</span><br/>Bob result: <span id="bob_shared_secret_value">' + bobResult + '</span></b><br/><br/>' + 
    '<i>Alice: '+bobPubKey+'<sup>'+alicePrivateNumber+'</sup> % '+nNumber+'</i><br/>' + '<i>Bob: '+alicePubKey+'<sup>'+bobPrivateNumber+'</sup> % '+nNumber+'</i>');
}

function example1() {
  resetMessages();
  setUrlPageParam(1);

  const numbersToUse = {
    nNumber: 95273, //prime number
    generatorNumber: 5,
    alicePrivateNumber: 22,
    bobPrivateNumber: 4
  };

  setupExample("Example 1", numbersToUse);
}

function example2() {
  resetMessages();
  setUrlPageParam(2);

  const numbersToUse = {
    nNumber: 17, //prime number
    generatorNumber: 7,
    alicePrivateNumber: 15,
    bobPrivateNumber: 12
  };

  setupExample("Example 2", numbersToUse);
}

function exampleCustom(numbersToUse) {
  // { nNumber: 19, generatorNumber: 9, alicePrivateNumber: 12, bobPrivateNumber: 17 }
  resetMessages();
  setupExample("Example custom", numbersToUse);
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');

  if(page == 2) {
    example2();
    return;
  }

  example1();
}

function setUrlPageParam(page) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page='+page;
    window.history.pushState({path:newurl},'',newurl);
  }
}