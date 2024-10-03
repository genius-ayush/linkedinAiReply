import React, { useState } from 'react';

interface AIModalProps {
  onClose: () => void;
  onInsert: (text: string) => void;
}

const AIModal: React.FC<AIModalProps> = ({ onClose, onInsert }) => {
  const [command, setCommand] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.");
      setIsGenerating(false);
    }, 1000);
  };

  const handleRegenerate = () => {
    // For this demo, regenerate does the same as generate
    handleGenerate();
  };

  return (
    <div className='text-black h-screen'> helo world Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam temporibus culpa quod deleniti, nostrum itaque voluptatum omnis voluptates similique ipsam accusamus repudiandae eum fugit et id, quia quo accusantium minima! </div>
  );
}; 

export default AIModal ; 