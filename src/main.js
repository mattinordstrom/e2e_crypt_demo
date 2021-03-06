let numbersToUse = {};

function setupExample(pageTitle) {
  const nNumber = numbersToUse.nNumber;
  const generatorNumber = numbersToUse.generatorNumber;
  const alicePrivateNumber = numbersToUse.alicePrivateNumber;
  const bobPrivateNumber = numbersToUse.bobPrivateNumber;

  let alicePubKey = (generatorNumber ** alicePrivateNumber) % nNumber;
  let bobPubKey = (generatorNumber ** bobPrivateNumber) % nNumber;

  let aliceResult = (BigInt(bobPubKey) ** BigInt(alicePrivateNumber)) % BigInt(nNumber);
  let bobResult = (BigInt(alicePubKey) ** BigInt(bobPrivateNumber)) % BigInt(nNumber);

  $( "#page_title" ).html('<h2>' + pageTitle + '</h2><br/>&nbsp;');
  $( "#public_n_g" ).html('N: ' + nNumber + '<i> (prime number)</i><br/><br/>g: ' + generatorNumber + '<i> (generator)</i>' + '<br/><br/><br/>');
  $( "#private_keys" ).html('&#128273; Alice private key: ' + alicePrivateNumber + '<br/><br/>&#128273; Bob private key: ' + bobPrivateNumber + '<br/><br/><br/>');
  $( "#created_pub_keys" ).html('Alice public key: ' + alicePubKey + '<br/>Bob public key: ' + bobPubKey + '<br/><br/>'+
    '<i>Alice: '+generatorNumber+'<sup>'+alicePrivateNumber+'</sup> % '+nNumber+'</i><br/>' + '<i>Bob: '+generatorNumber+'<sup>'+bobPrivateNumber+'</sup> % '+nNumber+'</i>');
  $( "#shared_secret" ).html('<b>Alice result: <span id="alice_shared_secret_value">' + aliceResult + '</span><br/>Bob result: <span id="bob_shared_secret_value">' + bobResult + '</span></b><br/><br/>' + 
    '<i>Alice: '+bobPubKey+'<sup>'+alicePrivateNumber+'</sup> % '+nNumber+'</i><br/>' + '<i>Bob: '+alicePubKey+'<sup>'+bobPrivateNumber+'</sup> % '+nNumber+'</i>');
}

function example1() {
  resetPage();
  setUrlPageParam(1);

  numbersToUse = {
    nNumber: 95273, //prime number
    generatorNumber: 5,
    alicePrivateNumber: 22,
    bobPrivateNumber: 4
  };
  setupExample("Example 1");
}

function example2() {
  resetPage();
  setUrlPageParam(2);

  numbersToUse = {
    nNumber: 17, //prime number
    generatorNumber: 7,
    alicePrivateNumber: 15,
    bobPrivateNumber: 12
  };
  setupExample("Example 2");
}

function exampleCustom(customNumbersToUse) {
  numbersToUse = customNumbersToUse;

  // { nNumber: 19, generatorNumber: 9, alicePrivateNumber: 12, bobPrivateNumber: 17 }
  resetPage();
  setupExample("Example custom");
}

function mitm() {
  setUrlPageParam(3);
  resetPage(true);
  
  mitmInfoSetup();

  $( "#page_title" ).html('<h2>Man-in-the-middle example</h2><br/>&nbsp;');
}

function mitmprevent() {
  setUrlPageParam(4);
  resetPage(true, true);

  mitmPreventInfoSetup();

  $( "#page_title" ).html('<h2>Prevent MITM attack example (digital signature)</h2><br/>Note: In this example plain text is sent. But digital signature can ofc. be combined with previous examples.' +
    ' (If a document is sent, something like SHA256 hash could be used.)');
}

function mitmPreventInfoSetup() {
  $( "#generated_keys_mitmp" ).html('<b>Prime numbers (P, Q):</b> (7, 19) '+
  '<br/><br/><b>Product (N):</b> 133 <i>(P*Q)</i>'+
  '<br/><br/><b>Totient (T):</b> 108 <i>(P-1)*(Q-1)</i>'+
  '<br/><br/><b>Public key (E):</b> 29 <i>prime, less than T and not factor of T</i>'+
  '<br/><br/><b>Private key (D):</b> 41 <i>(D*E) mod T = 1</i>');
}

function mitmInfoSetup() {
  numbersToUse = {nNumber: 17, generatorNumber: 7, alicePrivateNumber: 15, bobPrivateNumber: 12, hackerPrivateNumber: 14};
  const nNumber = numbersToUse.nNumber;
  const generatorNumber = numbersToUse.generatorNumber;
  const alicePrivateNumber = numbersToUse.alicePrivateNumber;
  const bobPrivateNumber = numbersToUse.bobPrivateNumber;
  const hackerPrivateNumber = numbersToUse.hackerPrivateNumber;

  let alicePubKey = (generatorNumber ** alicePrivateNumber) % nNumber;
  let bobPubKey = (generatorNumber ** bobPrivateNumber) % nNumber;
  let hackerPubKey = (generatorNumber ** hackerPrivateNumber) % nNumber;

  let aliceHackerResult = (BigInt(hackerPubKey) ** BigInt(alicePrivateNumber)) % BigInt(nNumber);
  let hackerAliceResult = (BigInt(alicePubKey) ** BigInt(hackerPrivateNumber)) % BigInt(nNumber);
  let bobHackerResult = (BigInt(hackerPubKey) ** BigInt(bobPrivateNumber)) % BigInt(nNumber);
  let hackerBobResult = (BigInt(bobPubKey) ** BigInt(hackerPrivateNumber)) % BigInt(nNumber);
  let bobResult = (BigInt(alicePubKey) ** BigInt(bobPrivateNumber)) % BigInt(nNumber);

  $( "#public_n_g" ).html('N: ' + nNumber + '<i> (prime number)</i><br/><br/>g: ' + generatorNumber + '<i> (generator)</i>' + '<br/><br/><br/>');
  $( "#private_keys" ).html('&#128273; Alice private key: ' + alicePrivateNumber + '<br/><br/>&#128273; Bob private key: ' + bobPrivateNumber  + '<br/><br/>(&#128273; Hacker private key: ' + hackerPrivateNumber + ')<br/>');
  $( "#created_pub_keys" ).html('Alice public key: ' + alicePubKey + '<br/>Bob public key: ' + bobPubKey + '<br/>'+ '(Hacker public key: ' + hackerPubKey + ')<br /><br /><br />');
  $( "#shared_secret" ).html('<b>Alice -> Hacker: <span id="alice_hacker_shared_secret_value">' + aliceHackerResult + '</span><br/>Hacker -> Alice: <span>' + hackerAliceResult + '</span><br/>'+
    '<br/>Bob -> Hacker: <span id="bob_hacker_shared_secret_value">' + bobHackerResult + '</span><br/>Hacker -> Bob: <span>' + hackerBobResult + '</span></b><br/><br/>'+
    'Bob <-> Alice would have been '+bobResult+' (but never used)<br/>');
}

function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');

  if(page == 2) {
    example2();
    return;
  } else if (page == 3) {
    mitm();
    return;
  } else if (page == 4) {
    mitmprevent();
    return;
  }

  example1();
}

function resetPage(mitm, mitmprevent) {
  $( "#hacker_message_container" ).html('');
  $( "#alices_output" ).html('');
  $( "#bobs_output" ).html('');
  $( "#bob_extra" ).html('');

  if(mitm) {
    $( "#hacker_knowledge_info" ).html('<ul><li>SHARED SECRET with Alice</li><li>SHARED SECRET with Bob</li></ul>');
  } else {
    $( "#hacker_knowledge_info" ).html('<ul><li>Knows the created public keys</li><li>Knows how the algoritm works</li></ul>');
  }

  if(mitmprevent) {
    $( "#public_info" ).html('<ul><li>Alice public key (E): 29</li><li>Product (N): 133</li></ul>');

    $( "#send_to_bob" ).html('<button onclick="connectToBob()">Connect to Bob -></button>');
    $( "#send_to_alice" ).html('<button disabled>-----------</button>');

    $( "#alices_message" ).html('');
    $( "#bobs_message" ).html('');

    $( "#header_table_mitmp").show();
    $( "#header_table").hide();

    $( "#hacker_knowledge_info" ).html('');
    $( "#alice_knowledge_info" ).html('<ul><li>&#128273; Private key (D): 41</li><li>RSA message: 60</li></ul>');
    $( "#bob_knowledge_info" ).html('');
  } else {
    $( "#public_info" ).html('<ul><li>N</li><li>g</li><br /><li>Alices created key</li><li>Bobs created key</li></ul>');

    $( "#send_to_bob" ).html('<button onclick="sendToBob()">Send message to Bob -></button>');
    $( "#send_to_alice" ).html('<button onclick="sendToAlice()"><- Send message to Alice</button>');

    $( "#alices_message" ).html('bananas are yellow');
    $( "#bobs_message" ).html('an apple can be red');

    $( "#header_table_mitmp").hide();
    $( "#header_table").show();

    $( "#alice_knowledge_info" ).html('<ul><li>&#128273; Alices private key</li><li>SHARED SECRET</li></ul>');
    $( "#bob_knowledge_info" ).html('<ul><li>&#128273; Bobs private key</li><li>SHARED SECRET</li></ul>');
  }
}

function setUrlPageParam(page) {
  if (history.pushState) {
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page='+page;
    window.history.pushState({path:newurl},'',newurl);
  }
}