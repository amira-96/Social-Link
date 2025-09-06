// src/Context/AppBlurContext.jsx
import React, { createContext, useState } from 'react';

// إنشاء كائن السياق
export const AppBlurContext = createContext();

// إنشاء مكون المزود (Provider)
export const AppBlurProvider = ({ children }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (contentComponent) => {
    setModalContent(contentComponent);
    setIsBlurred(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsBlurred(false);
  };

  return (
    <AppBlurContext.Provider value={{ isBlurred, showModal, hideModal }}>
      {children}
      {/* هذا هو حاوية النافذة المنبثقة التي ستعرض المحتوى */}
      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/5 bg-opacity-10  backdrop-blur-sm">
          {modalContent}
        </div>
      )}
    </AppBlurContext.Provider>
  );
};