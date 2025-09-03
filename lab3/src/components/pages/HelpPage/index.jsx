import React from 'react';

const HelpPage = () => {
  return (
    <div style={{ padding: '20px', flex: 1 }}>
      <h1>Help & Support</h1>
      <p>This is the help page. Here you will find answers to frequently asked questions and other support information.</p>
      <h2>Frequently Asked Questions</h2>
      <p><strong>Q: How do I create a new task?</strong></p>
      <p>A: Navigate to the 'My Task' section and click the 'Add new' button.</p>
      <p><strong>Q: Can I change the view?</strong></p>
      <p>A: Yes, you can switch between List, Calendar, and Table views using the toggle buttons at the top of the 'My Task' page.</p>
    </div>
  );
};

export default HelpPage;

