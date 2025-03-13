import { lazy, Suspense, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, CheckCircle, Clock, Star } from 'lucide-react';

// Lazy-load the DiscoveryModal
const DiscoveryModal = lazy(() => import("../components/ui/DiscoveryModal"));

export default function ServicesSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = useMemo(() => [
    {
      id: 'foundation',
      name: 'Digital Foundation',
      tagline: 'Establish your online presence with impact',
      description: 'A premium website that captivates visitors and converts effortlessly.',
      timeline: '2 weeks',
      price: '$5,000+',
      icon: <Briefcase className="w-6 h-6" />,
      features: ['Responsive design system', 'SEO optimization', 'Analytics integration'],
      benefits: ['Instant credibility', '24/7 lead capture', 'Showcase core offerings'],
      color: 'blue',
      availableSlots: 5,
      gradient: 'from-blue-500/20 to-cyan-400/20',
      buttonGradient: 'from-blue-500 to-cyan-400'
    },
    {
      id: 'professional',
      name: 'Market Amplifier',
      tagline: 'Stand out with cutting-edge motion and AI integration',
      description: 'A high-conversion experience designed for engagement and impact.',
      timeline: '3 weeks',
      price: '$10,000+',
      icon: <Star className="w-6 h-6" />,
      features: ['AI-enhanced UX', 'Premium animations', 'Conversion-focused strategies'],
      benefits: ['Higher conversion rates', 'Stronger brand identity', 'Enhanced engagement'],
      color: 'purple',
      recommended: true,
      availableSlots: 3,
      gradient: 'from-purple-500/20 to-pink-400/20',
      buttonGradient: 'from-purple-500 to-pink-400'
    },
    {
      id: 'executive',
      name: 'Digital Domination',
      tagline: 'Command your industry with an elite experience',
      description: 'A completely bespoke WebGL-infused platform with hyper-interactivity.',
      timeline: '4 weeks',
      price: '$20,000+',
      icon: <CheckCircle className="w-6 h-6" />,
      features: ['WebGL animations', 'Micro-interaction design', 'Enterprise-grade performance'],
      benefits: ['Industry authority', 'Memorable experience', 'Scalable for growth'],
      color: 'amber',
      availableSlots: 2,
      gradient: 'from-amber-500/20 to-orange-400/20',
      buttonGradient: 'from-amber-400 to-orange-400'
    }
  ], []);

  // Open modal for selected service
  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      {/* Subtle animated gradient orbs */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
              Future-Ready Digital Experiences
            </span>
          </h2>
          <p className="text-xl text-gray-300/90 max-w-3xl mx-auto">
            Elevate your brand with premium full-stack development, AI-driven UX, and WebGL animations.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { staggerChildren: 0.15 } }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`relative rounded-xl backdrop-blur-lg bg-black/30 border border-white/10 shadow-xl flex flex-col h-full ${
                service.recommended ? 'ring-2 ring-purple-400/50' : ''
              }`}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`}></div>

              <div className="p-6">
                <div className={`inline-flex items-center justify-center p-3 rounded-lg bg-gradient-to-br ${service.buttonGradient} mb-4`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                <p className="text-gray-400 mb-2">{service.tagline}</p>
                <p className="text-gray-500">{service.description}</p>
                <div className="mt-4">
                  <span className="text-gray-300">Starting at: <strong>{service.price}</strong></span>
                </div>
              </div>

              <div className="mt-auto p-6">
                <motion.button
                  onClick={() => handleServiceSelect(service)}
                  className={`w-full py-3 px-4 bg-gradient-to-r ${service.buttonGradient} text-white rounded-lg font-medium flex items-center justify-center shadow-xl relative overflow-hidden`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="relative bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-10 border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative text-center">
            <h3 className="text-3xl font-bold text-white">Let's Build Something Incredible</h3>
            <p className="text-gray-300 mt-4 mb-6">Schedule a consultation to transform your digital vision into reality.</p>

            <motion.button 
              onClick={() => setIsModalOpen(true)}
              className="relative bg-gradient-to-r from-purple-500 to-blue-500 py-4 px-10 rounded-lg text-white font-medium shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Your Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Lazy-loaded Discovery Modal */}
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <DiscoveryModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            selectedService={selectedService}
          />
        </Suspense>
      )}
    </section>
  );
}
