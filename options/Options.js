function Options(aConfigs) {
  this.configs = aConfigs;
  this.uiNodes = {};

  this.onReady = this.onReady.bind(this);
  document.addEventListener('DOMContentLoaded', this.onReady);
}
Options.prototype = {
  onReady: async function() {
    document.removeEventListener('DOMContentLoaded', this.onReady);

    if (!this.configs || !this.configs.$loaded)
      throw new Error('you must give configs!');

    await this.configs.$loaded;
    Object.keys(this.configs.$default).forEach((key) => {
      const node = this.findUIForKey(key);
      if (!node) return;
      this.bindToTextField(key, node);
    });
  },

  bindToTextField: function(key, node) {
    node.value = this.configs[key];
    node.addEventListener('input', () => {
      const updatedValue = node.value;
      const updatedKey = {};
      updatedKey[key] = updatedValue;
      chrome.storage.local.set(updatedKey);
    });
  },
};
