import { motion } from 'framer-motion';
import { Brain, Zap, ArrowRight, CheckCircle, RefreshCw, Layers } from 'lucide-react';

export default function TheSystemSection() {
  const stepsData = [
    {
      icon: <Brain size={24} />,
      title: "Meta Learning Framework",
      description: "Engineering optimized learning pathways by breaking complex skills into feedback-rich microloops.",
      color: "#10B981" // green
    },
    {
      icon: <Zap size={24} />,
      title: "AI-Human Co-Creation",
      description: "Developing structured AI workflows that transform AI from a tool into an active thought partner.",
      color: "#8B5CF6" // purple
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Accelerated Feedback Loop",
      description: "Creating self-optimizing cycles where both human and AI capabilities expand exponentially with each iteration.",
      color: "#3B82F6" // blue
    }
  ];

  const benefitsData = [
    "3x faster skill acquisition and implementation",
    "AI becomes a true cognitive extension, not just a tool",
    "Self-improving feedback loops for continuous growth",
    "Meta-awareness that transcends conventional learning limitations"
  ];

  return (
    <section id="version-3" className="min-h-screen bg-black flex flex-col items-center p-8 relative overflow-hidden">
      {/* Subtle Background Motion */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'linear-gradient(45deg, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl w-full z-10"
      >
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-4 flex flex-wrap items-baseline gap-3">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white"
          >
            The
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-green-500"
          >
            System
          </motion.span>
        </h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-white/80 mb-12 max-w-2xl"
        >
          A next-generation approach to human-AI integration where transformation isn't luck—it's engineered.
        </motion.p>

        {/* The System Core Framework */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-green-500/20 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-8">The MetaCurtis AI Integration Model</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stepsData.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + (index * 0.2) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-black/60 rounded-lg border border-green-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4" 
                     style={{ backgroundColor: `${step.color}30` }}>
                  <div style={{ color: step.color }}>{step.icon}</div>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                <p className="text-white/60 flex-grow">{step.description}</p>
                
                <motion.div 
                  className="mt-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${step.color}30` }}
                  whileHover={{ rotate: 90 }}
                >
                  {index < stepsData.length - 1 ? (
                    <ArrowRight size={16} style={{ color: step.color }} />
                  ) : (
                    <CheckCircle size={16} style={{ color: step.color }} />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Evolution Layer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-green-500/20 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-6">AI-Human Integration Layers</h3>
          
          <div className="flex flex-col space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="p-2 bg-gray-800/80 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Layers size={24} className="text-gray-400" />
              </div>
              <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700 flex-grow">
                <h4 className="text-lg font-semibold text-gray-300">Basic AI Usage</h4>
                <p className="text-gray-400 text-sm">Task-based automation, single-instance queries</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="p-2 bg-blue-800/30 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Layers size={24} className="text-blue-400" />
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-700/30 flex-grow">
                <h4 className="text-lg font-semibold text-blue-300">Advanced AI Workflows</h4>
                <p className="text-blue-400/80 text-sm">Structured prompts, iterative refinement, process optimization</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="p-2 bg-green-500/30 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Layers size={24} className="text-green-400" />
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30 flex-grow">
                <h4 className="text-lg font-semibold text-green-300">The MetaCurtis Approach</h4>
                <p className="text-green-400/80 text-sm">AI co-creation, meta-cognition, self-evolving intelligence system</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* 3-Week Mastery Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-green-500/20 backdrop-blur-sm mb-16"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-6">The 3-Week Mastery Case Study</h3>
          
          <div className="relative flex flex-col md:flex-row gap-6 mb-6">
            {/* Timeline bar */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-800/50 -translate-x-1/2 z-0"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
              className="md:w-1/2 p-6 bg-black/60 rounded-lg border border-green-500/30 relative z-10"
            >
              <h4 className="text-xl font-bold text-white mb-2">Week 1: Framework Building</h4>
              <p className="text-white/70">Engineered AI-optimized learning pathways, developed structured prompt systems, created meta-learning feedback loops</p>
            </motion.div>
            
            <div className="md:w-1/2"></div>
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-6 mb-6">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-800/50 -translate-x-1/2 z-0"></div>
            
            <div className="md:w-1/2"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              viewport={{ once: true }}
              className="md:w-1/2 p-6 bg-black/60 rounded-lg border border-green-500/30 relative z-10"
            >
              <h4 className="text-xl font-bold text-white mb-2">Week 2: Co-Creative Implementation</h4>
              <p className="text-white/70">Established AI-human collaborative workflows, refined prompt engineering, developed pattern recognition at scale</p>
            </motion.div>
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-green-800/50 -translate-x-1/2 z-0"></div>
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
              className="md:w-1/2 p-6 bg-black/60 rounded-lg border border-green-500/30 relative z-10"
            >
              <h4 className="text-xl font-bold text-white mb-2">Week 3: Meta-Cognitive Integration</h4>
              <p className="text-white/70">Achieved self-evolving intelligence system, exponential output acceleration, complete web development mastery</p>
            </motion.div>
            
            <div className="md:w-1/2"></div>
          </div>
        </motion.div>
        
        {/* Measurable Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          viewport={{ once: true }}
          className="bg-black p-8 rounded-xl border border-green-500/30"
        >
          <h3 className="text-2xl font-bold text-green-400 mb-6">Beyond Conventional AI Usage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefitsData.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.6 + (index * 0.15) }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <div className="bg-green-500/20 p-2 rounded-full">
                  <CheckCircle size={16} className="text-green-400" />
                </div>
                <p className="text-white/80">{benefit}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            viewport={{ once: true }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-green-500/20 border border-green-500 rounded-full text-green-400 font-bold flex items-center gap-2 transition-all group"
            >
              <span>Experience The System</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}