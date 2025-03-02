import React, { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Clock, DollarSign, BrainCircuit, Code, PenTool } from 'lucide-react';

const TimelineEvent = ({ icon, title, period, description, isActive, onClick, color }) => {
  return (
    <motion.div 
      className={`relative cursor-pointer mb-8 ${isActive ? 'z-10' : 'z-0'}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className={`flex items-center p-2 rounded-full ${isActive ? 'bg-opacity-100' : 'bg-opacity-70'}`}
        style={{ backgroundColor: color }}
        animate={{ scale: isActive ? 1.1 : 1 }}
      >
        <div className="bg-gray-900 rounded-full p-2">
          <div className="text-white">{icon}</div>
        </div>
        <motion.div 
          className="ml-4 text-white font-bold"
          animate={{ opacity: isActive ? 1 : 0.8 }}
        >
          {title}
          <div className="text-xs opacity-80">{period}</div>
        </motion.div>
      </motion.div>
      
      {isActive && (
        <motion.div 
          className="bg-gray-800 text-white rounded-lg p-4 mt-4 shadow-lg border border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p>{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const MetaCurtisTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  
  const timelineEvents = [
    {
      icon: <Clock size={24} />,
      title: "Marine Corps",
      period: "Foundation Years",
      description: "Built a foundation of precision, discipline, and resilience through military service. These principles continue to inform my methodical approach to business and technology challenges.",
      color: "#1D4ED8" // Navy blue
    },
    {
      icon: <DollarSign size={24} />,
      title: "Wells Fargo AVP",
      period: "12 Years",
      description: "Developed executive-level financial expertise and strategic decision-making capabilities as Assistant Vice President, managing complex projects and stakeholder relationships in the banking sector.",
      color: "#BE185D" // Dark pink
    },
    {
      icon: <PenTool size={24} />,
      title: "2+ Years of Unemployment",
      period: "Transformation Period",
      description: "Experienced a profound personal and professional reinvention, developing meta-awareness and a philosophical framework that transcends conventional business constructs.",
      color: "#059669" // Green
    },
    {
      icon: <Code size={24} />,
      title: "AI-Driven Web Development",
      period: "3 Week Mastery",
      description: "Mastered Vite, Tailwind, and Framer Motion in just three weeks through systematic AI utilization, creating an optimized workflow that dramatically increases development speed and quality.",
      color: "#7C3AED" // Purple
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "MetaCurtis Born",
      period: "Present",
      description: "Launched a uniquely positioned philosophy-driven transformation firm combining financial expertise, technical skills, and philosophical depth to deliver premium web development solutions with strategic business insights.",
      color: "#D97706" // Amber
    }
  ];

  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-700 rounded-full"></div>
          
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={index}
              icon={event.icon}
              title={event.title}
              period={event.period}
              description={event.description}
              isActive={activeEvent === index}
              onClick={() => setActiveEvent(index)}
              color={event.color}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
};

export default MetaCurtisTimeline;