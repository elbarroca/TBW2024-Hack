import { motion } from "framer-motion";
import { fadeInUp, staggerChildren, fadeIn } from "@/utils/animations";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <motion.div 
        className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white overflow-hidden"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-[url('/hexagon-pattern.svg')] opacity-10"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0] 
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            aria-hidden="true" 
          />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
            >
              Empowering Blockchain Education for Everyone
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-purple-100 mb-8"
            >
              Breaking barriers in blockchain learning with decentralized solutions for a better future.
            </motion.p>
            
            <motion.a 
              href="/courses" 
              className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-8 py-3 rounded-lg transition-all transform hover:scale-105 hover:shadow-lg hover:from-purple-600 hover:to-purple-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Statement - Updated with glassmorphism */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 shadow-xl backdrop-blur-sm border border-white/20"
            variants={fadeInUp}
          >
            <p className="text-xl text-gray-700 leading-relaxed">
              We believe education should be free from centralized control, empowering learners to take ownership of their growth. Our platform bridges the gap between blockchain technology and those eager to master it, fostering a decentralized future for everyone.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-8 text-center"
            >
              Our Story
            </motion.h2>
            
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
            >
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 mb-6"
                  variants={fadeInUp}
                >
                  <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                  <p className="text-gray-700 leading-relaxed">
                    Founded by two passionate students, Ricardo and [Your Co-Founder's Name], our project was born out of a shared frustration with the challenges of learning blockchain technology.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  variants={fadeInUp}
                >
                  <div className="h-12 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  <p className="text-gray-700 leading-relaxed">
                    We decided to change that. Our project, built during the Taipei Blockchain Week Hackathon, is our contribution to democratizing blockchain education.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Meet the Founders */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Meet the Founders
          </motion.h2>
          
          <motion.div 
            className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Ricardo's Card */}
            <motion.div 
              className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                    {/* Add image here if available */}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Ricardo Barroca
                </h3>
                <p className="text-purple-600 font-medium">Co-Founder & Blockchain Visionary</p>
              </div>
              <p className="text-gray-600 text-center">
                Ricardo is a dedicated blockchain student and visionary who co-founded this platform with the goal of breaking down barriers in blockchain education.
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Twitter</span>
                  {/* Add Twitter icon */}
                </motion.a>
                {/* Add other social links */}
              </div>
            </motion.div>

            {/* Co-founder's Card */}
            <motion.div 
              className="group bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                    {/* Add image here if available */}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Ricardo Castillo
                </h3>
                <p className="text-purple-600 font-medium">Co-Founder & Technical Lead</p>
              </div>
              <p className="text-gray-600 text-center">
                Alex brings deep technical expertise and a passion for blockchain development, focusing on creating intuitive educational experiences.
              </p>
              <div className="mt-4 flex justify-center space-x-4">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="sr-only">Twitter</span>
                  {/* Add Twitter icon */}
                </motion.a>
                {/* Add other social links */}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-purple-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl font-bold text-gray-900 mb-6"
            >
              Our Vision
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-700 mb-8"
            >
              Our vision is to create the leading decentralized education platform for blockchain enthusiasts worldwide.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div 
          className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 1, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <div className="container mx-auto px-4 text-center relative">
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold mb-6"
          >
            Join us in breaking barriers and shaping the future of blockchain education
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-purple-100 mb-8"
          >
            Whether you're a beginner or a blockchain pro, our platform is here to empower you.
          </motion.p>
          <motion.a 
            href="/courses" 
            className="inline-block bg-white text-purple-900 font-semibold px-8 py-3 rounded-lg transition-all hover:bg-purple-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Learning
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
} 