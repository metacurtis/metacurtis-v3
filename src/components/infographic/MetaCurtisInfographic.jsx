import React from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Code, 
  TrendingUp, 
  Target,
  BarChart4,
  Building,
  UserCheck,
  Lightbulb
} from 'lucide-react';

const MetaCurtisInfographic = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    { label: "Year 1 Revenue", value: "$220K-300K" },
    { label: "Year 3 Revenue", value: "$1.5M-2.2M" },
    { label: "Year 5 Revenue", value: "$3.5M-6M+" }
  ];

  const markets = [
    { icon: <Building size={20} />, name: "Financial Services" },
    { icon: <BrainCircuit size={20} />, name: "Conscious Businesses" },
    { icon: <TrendingUp size={20} />, name: "Organizations in Transformation" },
    { icon: <Lightbulb size={20} />, name: "Forward-Thinking Businesses" }
  ];

  const pillars = [
    {
      icon: <Building size={24} />,
      title: "Executive-Level Business Understanding",
      description: "12 years of banking experience as Wells Fargo AVP",
      color: "#1D4ED8"
    },
    {
      icon: <Code size={24} />,
      title: "AI-Accelerated Technical Implementation",
      description: "Mastered Vite, Tailwind, Framer Motion in 3 weeks",
      color: "#7C3AED"
    },
    {
      icon: <BrainCircuit size={24} />,
      title: "Philosophical Framework",
      description: "Transcending conventional business constructs",
      color: "#059669"
    },
    {
      icon: <UserCheck size={24} />,
      title: "Proven Transformation Methodology",
      description: "Personal journey as living case study",
      color: "#D97706"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-md border border-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">The MetaCurtis Advantage</h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
      >
        {pillars.map((pillar, index) => (
          <motion.div 
            key={index} 
            variants={item}
            className="bg-gray-800 p-6 rounded-lg shadow-md border-t-4"
            style={{ borderColor: pillar.color }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${pillar.color}30` }}>
                <div style={{ color: pillar.color }}>{pillar.icon}</div>
              </div>
              <h3 className="font-bold text-lg text-white">{pillar.title}</h3>
            </div>
            <p className="text-gray-300">{pillar.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Target Markets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center text-white">
            <Target size={24} className="mr-2 text-indigo-400" />
            Target Markets
          </h3>
          <ul className="space-y-3">
            {markets.map((market, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <div className="bg-gray-700 p-2 rounded-full mr-3">
                  <div className="text-indigo-400">{market.icon}</div>
                </div>
                <span>{market.name}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Revenue Projections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center text-white">
            <BarChart4 size={24} className="mr-2 text-emerald-400" />
            Revenue Projections
          </h3>
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">{stat.label}</span>
                  <span className="font-bold text-emerald-400">{stat.value}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div 
                    className="bg-emerald-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(index + 1) * 30}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (index * 0.2), duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* USP Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-indigo-800 to-purple-900 text-white p-6 rounded-lg shadow-md border border-indigo-700"
      >
        <h3 className="text-xl font-bold mb-4 text-center">Your Unique Value Proposition</h3>
        <p className="text-center mb-4">
          "An unprecedented combination of financial expertise, technical skills, and philosophical depth
          creating a 'blue ocean' opportunity in web development."
        </p>
        <div className="flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-indigo-400 border border-indigo-500 font-bold py-2 px-6 rounded-full shadow-md"
          >
            Start Your Transformation
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MetaCurtisInfographic;