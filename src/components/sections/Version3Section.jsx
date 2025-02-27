import { motion } from 'framer-motion';

export default function Version3Section() {
  return (
    <section id="version-3" className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
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
        <h2 className="text-6xl md:text-7xl font-bold text-white mb-8 flex items-baseline gap-3">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Version
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-green-500"
          >
            3
          </motion.span>
        </h2>

        {/* Animated Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-black/50 p-8 rounded-xl border border-green-500/20 backdrop-blur-sm"
        >
          <p className="text-white/70 text-lg">
            The third iteration, representing growth and evolution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((version) => (
              <motion.div 
                key={version}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (version * 0.2) }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-green-900/10 rounded-lg border border-green-500/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-green-400 mb-2">V3.{version}</h3>
                <p className="text-white/60">Phase {version} development.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
