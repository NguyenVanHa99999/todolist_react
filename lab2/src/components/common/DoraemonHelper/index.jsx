import React, { useState, useEffect } from 'react';
import './DoraemonHelper.css';

const DoraemonHelper = ({ show, message = "Hãy bấm vào tôi để tạo task!" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  return (
    <div className={`doraemon-helper ${isVisible ? 'show' : ''}`}>
      <div className="doraemon-character">
        {/* Head */}
        <div className="doraemon-head">
          <div className="doraemon-face">
            {/* Eyes */}
            <div className="doraemon-eye left">
              <div className="doraemon-pupil"></div>
            </div>
            <div className="doraemon-eye right">
              <div className="doraemon-pupil"></div>
            </div>

            {/* Nose */}
            <div className="doraemon-nose"></div>

            {/* Mouth */}
            <div className="doraemon-mouth"></div>

            {/* Whiskers */}
            <div className="doraemon-whisker left-1"></div>
            <div className="doraemon-whisker left-2"></div>
            <div className="doraemon-whisker right-1"></div>
            <div className="doraemon-whisker right-2"></div>
          </div>
        </div>

        {/* Body */}
        <div className="doraemon-body">
          <div className="doraemon-belly">
            <div className="doraemon-pocket"></div>
          </div>
        </div>
      </div>
      <div className="speech-bubble">
        {message}
      </div>
    </div>
  );
};

export default DoraemonHelper;
