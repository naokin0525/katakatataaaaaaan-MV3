self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('message', async (event) => {
  if (event.data.command === 'read-mcd-configs') {
    try {
      const response = await readMCDConfigs();
      event.ports[0].postMessage({ success: true, data: response });
    } catch (error) {
      event.ports[0].postMessage({ success: false, error: error.message });
    }
  }
});

async function readMCDConfigs() {
  const response = await browser.runtime.sendNativeMessage(
    'org.gigo_ice.katakatataaaaaaan_we_host',
    { command: 'read-mcd-configs' }
  );
  return response;
}
