/**
 * Class representing a Prompt Application.
 * @class
 * @summary A comprehensive implementation of a Prompt Application supporting various features.
 */
class PromptApp {
    /**
     * Creates a PromptApp instance.
     * @constructor
     */
    constructor() {
        this.characterCount = 0;
        this.clipboard = navigator.clipboard;
        this.initEvents();
    }
 
    /**
     * Initializes event listeners for the application.
     */
    initEvents() {
        document.getElementById('inputField').addEventListener('input', this.updateCharacterCount.bind(this));
        document.getElementById('copyButton').addEventListener('click', this.copyToClipboard.bind(this));
        document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    }
 
    /**
     * Updates the character count display.
     * @returns {void}
     */
    updateCharacterCount() {
        const inputField = document.getElementById('inputField');
        this.characterCount = inputField.value.length;
        document.getElementById('charCountDisplay').innerText = `Characters: ${this.characterCount}`;
    }
 
    /**
     * Copies the input text to the clipboard.
     * @returns {Promise<void>}
     */
    async copyToClipboard() {
        const inputField = document.getElementById('inputField');
        try {
            await this.clipboard.writeText(inputField.value);
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
 
    /**
     * Handles keyboard shortcuts.
     * @param {KeyboardEvent} event - The keyboard event object.
     */
    handleKeyboardShortcuts(event) {
        if (event.ctrlKey && event.key === 'c') {
            this.copyToClipboard();
        } else if (event.ctrlKey && event.key === 'r') {
            this.retryAction();
        }
    }
 
    /**
     * Retry logic for actions.
     * @returns {void}
     */
    retryAction() {
        const inputField = document.getElementById('inputField');
        inputField.value = ''; // Reset the input field
        this.updateCharacterCount();
    }
}

// Instantiate the PromptApp
const app = new PromptApp();

// Accessibility: Adding ARIA attributes for better screen reader support
document.getElementById('inputField').setAttribute('aria-label', 'Input field for text');
document.getElementById('copyButton').setAttribute('aria-label', 'Copy to clipboard');