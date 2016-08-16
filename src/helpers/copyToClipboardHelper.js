'use strict';

function copyToClipboardHelper(str) {
    // Add copy handler to document
    document.addEventListener('copy', function handleOnCopy(e) {
        e.preventDefault();
        e.clipboardData.setData('text/plain', str);
    });
    // Trigger copy event
    document.execCommand('copy');
}

module.exports = copyToClipboardHelper;
