import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="about" className="min-h-screen bg-black flex items-center justify-center p-8 relative">
      {/* Background animation */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          backgroundSize: '150% 150%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: 'reverse'
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-4xl w-full z-10"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-6xl md:text-7xl font-bold text-white mb-8"
        >
          Contact
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-purple-500/20 backdrop-blur-sm"
        >
          <p className="text-white/70 text-lg mb-8">
            Get in touch to discuss ideas and opportunities.
          </p>
          <div className="flex flex-col space-y-6">
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 text-white/70 text-left transition-all duration-300"
            >
              Email Contact Form
            </motion.button>
            <div className="flex justify-center space-x-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => (
                <motion.button
                  key={platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-purple-900/20 rounded-full border border-purple-500/20 text-white/70 transition-all duration-300"
                >
                  {platform[0]}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
