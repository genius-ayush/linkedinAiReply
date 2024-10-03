import { createRoot } from "react-dom/client";
import { aiIconSvg } from "./popup/AiIconSvg";
import AIModal from "./popup/Components/AIModal";
import React from "react";

export default defineContentScript({
  matches: ["https://www.linkedin.com/feed/"],

  main() {
    console.log("hello to LinkedIn");

    function addAIIcon(messageInput: HTMLElement, textfield: HTMLElement) {
      console.log("Input field found:", messageInput);
      console.log("Text field found:", textfield);

      // Create the AI icon and add it to the message input's parent
      const aiIcon = document.createElement("div");
      aiIcon.innerHTML = aiIconSvg;
      aiIcon.style.position = "absolute";
      aiIcon.style.right = "10px";
      aiIcon.style.bottom = "10px";
      aiIcon.style.cursor = "pointer";
      aiIcon.style.backgroundColor = "rgba(0,0,255,0.2)"; // Debug color
      aiIcon.style.zIndex = "500"; // Ensure it's above other elements
      messageInput.parentElement?.appendChild(aiIcon);

      // Add click listener to AI icon
      aiIcon.addEventListener("click", () => {
        console.log("AI Icon clicked");

        // Create a modal container and append it to the textfield (message list)
        const modalContainer = document.createElement("div");
        modalContainer.style.position = "absolute";
        modalContainer.style.right = "20px"; // Right side of the chat area
        modalContainer.style.top = "10px"; // Top position above message area
        modalContainer.style.width = "400px"; // Adjust width to fit the modal
        modalContainer.style.padding = "20px";
        modalContainer.style.backgroundColor = "#fff"; // Modal background
        modalContainer.style.border = "1px solid #ccc";
        modalContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        modalContainer.style.zIndex = "10000"; // Higher than other elements

        // Append the modalContainer directly to the textfield (chat area)
        textfield.appendChild(modalContainer);

        // Create a React root and render the AIModal component
        const root = createRoot(modalContainer);
        root.render(
          React.createElement(AIModal, {
            onClose: () => {
              root.unmount(); // Unmount the modal
              modalContainer.remove(); // Remove the container from the DOM
            },
            onInsert: (text: string) => {
              // Insert the generated text into the chat input field
              messageInput.innerText += text;
            },
          })
        );
      });
    }

    // MutationObserver to detect the message input and text field elements
    const observer = new MutationObserver(() => {
      const messageInput = document.querySelector(
        ".msg-form__contenteditable"
      ) as HTMLElement;

      const textfield = document.querySelector(
        ".msg-s-message-list-container"
      ) as HTMLElement;

      if (messageInput && textfield) {
        observer.disconnect(); // Stop observing once the elements are found
        addAIIcon(messageInput, textfield);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },
});
