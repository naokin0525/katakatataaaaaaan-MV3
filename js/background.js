function onConfigUpdated(aKey) {
    debug(aKey);
    debug(configs);
}

async function applyMCDConfigs() {
  try {
    var response = await send({ command: 'read-mcd-configs' });
    log('loaded MCD configs: ', response);
    Object.keys(response).forEach((aKey) => {
      configs[aKey] = response[aKey];
      configs.$lock(aKey);
    });
  }
  catch(aError) {
    log('Failed to read MCD configs: ', aError);
  }
}

function send(aMessage) {
  if (configs.debug)
    aMessage.debug = true;
  log('Sending: ', aMessage);
  return browser.runtime.sendNativeMessage('org.gigo_ice.katakatataaaaaaan_we_host', aMessage);
}

(async () => {
  log('initial startup');
  await configs.$load();
  await applyMCDConfigs();

  configs.$addObserver(onConfigUpdated);
})();

