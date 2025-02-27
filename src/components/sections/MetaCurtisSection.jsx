import { motion } from 'framer-motion'

export default function MetaCurtisSection() {
  return (
    <section id="meta-curtis" className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background animation */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: '100% 100%' }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'reverse' }}
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
          backgroundSize: '100% 100%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl w-full z-10"
      >
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 flex items-baseline gap-3">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-blue-500"
          >
            Meta
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Curtis
          </motion.span>
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm"
        >
          <p className="text-white/70 text-lg">
            Exploring the intersection of technology, creativity, and innovation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {['Innovation', 'Technology'].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.2) }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                }}
                className="p-6 bg-blue-900/10 rounded-lg border border-blue-500/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-2">{item}</h3>
                <p className="text-white/60">Future content will expand on these concepts.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
