function setupExample(pageTitle, numbersToUse) {
  const nNumber = numbersToUse.nNumber;
  const generatorNumber = numbersToUse.generatorNumber;
  const alicePrivateNumber = numbersToUse.alicePrivateNumber;
  const bobPrivateNumber = numbersToUse.bobPrivateNumber;

  let alicePubKey = Math.pow(generatorNumber, alicePrivateNumber) % nNumber;
  let bobPubKey = Math.pow(generatorNumber, bobPrivateNumber) % nNumber;

  let aliceResult = (BigInt(bobPubKey) ** BigInt(alicePrivateNumber) - 1n) % BigInt(nNumber);
  let bobResult = (BigInt(alicePubKey) ** BigInt(bobPrivateNumber) - 1n) % BigInt(nNumber);

  $( "#page_title" ).html('<h2>' + pageTitle + '</h2>');
  $( "#public_n_g" ).html('N: ' + nNumber + '<i> (prime number)</i><br/><br/>g: ' + generatorNumber + '<i> (generator)</i>' + '<br/><br/><br/>');
  $( "#private_keys" ).html('&#128273; Alice private key: ' + alicePrivateNumber + '<br/><br/>&#128273; Bob private key: ' + bobPrivateNumber + '<br/><br/><br/>');
  $( "#created_pub_keys" ).html('Alice public key: ' + alicePubKey + '<br/>Bob public key: ' + bobPubKey + '<br/><br/>'+
    '<i>Alice: 5<sup>22</sup> % 95273</i><br/>' + '<i>Bob: 5<sup>4</sup> % 95273</i>');
  $( "#shared_secret" ).html('<b>Alice result: ' + aliceResult + '<br/>Bob result: ' + bobResult + '</b><br/><br/>' + 
    '<i>Alice: 625<sup>22</sup> % 95273</i><br/>' + '<i>Bob: 7473<sup>4</sup> % 95273</i>');
}

function example1() {
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
  setUrlPageParam(2);

  const numbersToUse = {
    nNumber: 13, //prime number
    generatorNumber: 7,
    alicePrivateNumber: 15,
    bobPrivateNumber: 13
  };

  setupExample("Example 2", numbersToUse);
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