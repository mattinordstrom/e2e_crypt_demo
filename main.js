function setupExample(pageTitle, numbersToUse) {
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

  let alicePubKey = Math.pow(generatorNumber, alicePrivateNumber) % nNumber;
  let bobPubKey = Math.pow(generatorNumber, bobPrivateNumber) % nNumber;

  let aliceResult = (BigInt(bobPubKey) ** BigInt(alicePrivateNumber) - 1n) % BigInt(nNumber);
  let bobResult = (BigInt(alicePubKey) ** BigInt(bobPrivateNumber) - 1n) % BigInt(nNumber);

  $( ".container" ).html('<h1>'+pageTitle + '</h1><br/>N: ' + nNumber + '<br/><br/>g: ' + generatorNumber +
    '<br/><br/><hr/>Alice private key: ' + (alicePrivateNumber)+'<br/><br/>Bob private key: ' + (bobPrivateNumber) +
    '<br/><br/><hr/>Alice public key: ' + (alicePubKey)+'<br/><br/>Bob public key: ' + (bobPubKey) +
    '<br/><br/><hr/><b>aliceResult: ' + (aliceResult) + '<br/><br/>bobResult: ' + (bobResult) + '</b>'
    );
}

function example1() {
  setUrlPageParam(1);

  setupExample("Example 1");
}

function example2() {
  setUrlPageParam(2);

  const numbersToUse = {
    nNumber: 95779,
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