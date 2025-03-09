import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen bg-black/70 flex items-center justify-center p-8 relative">
      {/* SEO Optimized Heading - hidden visually but available to search engines */}
      <h1 className="not-sr-only:hidden">MetaCurtis - Marine Veteran Using Meta Learning for AI-Enhanced Web Development and Digital Transformation</h1>
      
      {/* Background animation - with improved visibility */}
      <div 
        className="absolute inset-0 opacity-20 animate-gradient-shift"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, transparent 70%)',
          backgroundSize: '150% 150%',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-3xl w-full z-10 mx-auto text-center"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white mb-8"
        >
          The Meta Learning Revolution
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-purple-900/30 p-8 rounded-xl border border-purple-500/30 backdrop-blur"
        >
          <div className="space-y-6 mb-10">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Beyond Development: The Meta Learning Advantage</h3>
            
            <p className="text-white/80 text-lg text-center">
              From Marine Corps battlefield to Wells Fargo AVP to cutting-edge developer—my path exemplifies the power of meta learning. After facing two years of unemployment, I developed a system to master modern web frameworks in just <span className="text-purple-400 font-semibold">three weeks</span>—compressing what typically takes years into days.
            </p>
            
            <p className="text-white/80 text-lg text-center">
              As a 50-year-old African-American Marine veteran with a finance background, I bring perspectives rarely found in tech:
            </p>
            
            <ul className="space-y-3 text-white/80 text-lg mx-auto max-w-xl">
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Meta Learning Methodology:</strong> The proven system that compressed years of learning into weeks</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Military Precision:</strong> Projects executed with Marine Corps discipline and attention to detail</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">Executive Strategy:</strong> AVP-level financial expertise driving business results</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="text-purple-400 flex-shrink-0 mt-1">➤</span> 
                <span><strong className="text-white">AI-Accelerated Execution:</strong> Delivering extraordinary results at unprecedented speed</span>
              </li>
            </ul>
          </div>
          
          <div className="border-t border-purple-500/30 pt-8">
            <p className="text-white/90 text-lg mb-6 text-center">
              Ready to experience the meta advantage? Let's transform your learning curve and transcend ordinary business boundaries.
            </p>
            <div className="flex flex-col space-y-6">
              <motion.a
                href="mailto:curtiswhorton.now@gmail.com"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full p-4 bg-purple-700/40 hover:bg-purple-700/70 rounded-lg border border-purple-500/30 text-white/90 text-center transition-duration-300 hover:text-white"
              >
                Start Your Meta Journey
              </motion.a>
              <div className="flex justify-center space-x-6">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => (
                  <motion.a
                    key={platform}
                    href={`https://${platform.toLowerCase()}.com/metacurtis`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.2) }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: '0 0 15px rgba(168, 85, 247, 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 bg-purple-700/40 rounded-full border border-purple-500/30 text-white/90 transition-duration-300"
                    aria-label={platform}
                  >
                    {platform[0]}
                  </motion.a>
                ))}
              </div>
              <p className="text-white/60 text-sm text-center">
                Email: <a href="mailto:curtiswhorton.now@gmail.com" className="text-purple-400 hover:text-purple-300 underline">curtiswhorton.now@gmail.com</a>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
