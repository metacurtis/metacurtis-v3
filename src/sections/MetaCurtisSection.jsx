import React from 'react';
import MetaCurtisTimeline from '../timeline/MetaCurtisTimeline';
import MetaCurtisInfographic from '../infographic/MetaCurtisInfographic';

// Keep any existing imports from your current file

const MetaCurtisSection = () => {
  // Keep your existing content and logic
  
  return (
    <section id="metacurtis" className="min-h-screen bg-black text-white py-16">
      {/* Keep your existing section content above */}
      
      {/* Add the Timeline component */}
      <div className="container mx-auto mt-16">
        <MetaCurtisTimeline />
      </div>
      
      {/* Add the Infographic component */}
      <div className="container mx-auto mt-24">
        <MetaCurtisInfographic />
      </div>
    </section>
  );
};

export default MetaCurtisSection;