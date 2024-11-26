/*

caretposition.js

Copyright (c) 2012- Hiroki Akiyama http://akiroom.com/
caretposition.js is free software distributed under the terms of the MIT license.
*/

const Measurement = new function() {
    this.caretPos = function(textarea, mode) {
        let targetElement = textarea;

        // HTML Sanitizer
        const escapeHTML = (s) => {
            const obj = document.createElement('pre');
            obj.textContent = s; // Always use textContent for security
            return obj.innerHTML;
        };

        // Get caret character position
        const getCaretPosition = (element) => {
            let startpos = -1, endpos = -1;
            if (element.selectionStart !== undefined) {
                startpos = element.selectionStart;
                endpos = element.selectionEnd;
            }
            return { start: startpos, end: endpos };
        };

        // Get element absolute position
        const getElementPosition = (element) => {
            const rect = element.getBoundingClientRect();
            const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            return {
                left: rect.left + scrollLeft,
                top: rect.top + scrollTop,
                right: rect.right + scrollLeft,
                bottom: rect.bottom + scrollTop
            };
        };

        // Main function starts here
        const textAreaPosition = getElementPosition(targetElement);
        const dummyName = targetElement.id + "_dummy";
        let dummyTextArea = document.getElementById(dummyName);
        if (!dummyTextArea) {
            // Generate dummy textarea
            dummyTextArea = document.createElement("div");
            dummyTextArea.id = dummyName;

            // Apply necessary styles
            const style = window.getComputedStyle(targetElement);
            dummyTextArea.style.cssText = `
                visibility: hidden;
                position: absolute;
                top: 0;
                left: 0;
                white-space: pre-wrap;
                word-wrap: break-word;
                overflow: hidden;
                font-size: ${style.fontSize};
                font-family: ${style.fontFamily};
                padding: ${style.padding};
                width: ${style.width};
                height: ${style.height};
                background-color: ${style.backgroundColor};
            `;

            targetElement.parentNode.appendChild(dummyTextArea);
        }

        // Sync scroll positions
        dummyTextArea.scrollLeft = targetElement.scrollLeft;
        dummyTextArea.scrollTop = targetElement.scrollTop;

        // Prepare text content
        const codeStr = targetElement.value;
        const selPos = getCaretPosition(targetElement);
        const leftText = codeStr.slice(0, selPos.start);
        const selText = codeStr.slice(selPos.start, selPos.end) || "a";
        const rightText = codeStr.slice(selPos.end);

        const processText = (text) => {
            return escapeHTML(text)
                .replace(/\n/g, '<br>')
                .split('')
                .join('<wbr>');
        };

        // Set calculation text in the dummy text area
        dummyTextArea.innerHTML = `
            ${processText(leftText)}
            <wbr><span id="${dummyName}_i">${processText(selText)}</span><wbr>
            ${processText(rightText)}
        `;

        // Get caret absolute pixel position
        const dummyTextAreaPos = getElementPosition(dummyTextArea);
        const caretPos = getElementPosition(document.getElementById(dummyName + "_i"));
        switch (mode) {
            case 'self':
                // Relative to TEXTAREA
                return {
                    left: caretPos.left - dummyTextAreaPos.left,
                    top: caretPos.top - dummyTextAreaPos.top
                };
            case 'body':
            case 'screen':
            case 'stage':
            case 'page':
            default:
                // Relative to PAGE
                return {
                    left: textAreaPosition.left + caretPos.left - dummyTextAreaPos.left,
                    top: textAreaPosition.top + caretPos.top - dummyTextAreaPos.top
                };
        }
    };
};
