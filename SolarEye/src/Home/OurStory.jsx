// import React from "react";
// import { motion, useScroll, useTransform, useInView } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const OurStory = () => {
//   // Scroll-based variants
//   const fadeInVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       transition: { 
//         duration: 0.8, 
//         ease: "easeOut" 
//       } 
//     }
//   };

//   const staggerContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 0.3,
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const heroImageVariants = {
//     hidden: { 
//       scale: 0.9, 
//       opacity: 0 
//     },
//     visible: { 
//       scale: 1, 
//       opacity: 1,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   return (
//     <motion.section 
//       className="relative py-24 bg-white"
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.1 }}
//     >
//       {/* Decorative Shapes */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/80 rounded-full blur-2xl"></div>
//         <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/80 rounded-full blur-2xl"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         {/* Header */}
//         <motion.div
//           variants={fadeInVariants}
//           className="text-center mb-16 max-w-4xl mx-auto"
//         >
//           <motion.h2 
//             className="text-4xl md:text-5xl font-bold text-[#1E222D] mb-6"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ 
//               opacity: 1, 
//               y: 0,
//               transition: { 
//                 duration: 0.6, 
//                 ease: "easeOut" 
//               }
//             }}
//             viewport={{ once: true }}
//           >
//             Our Story
//           </motion.h2>
//           <motion.p 
//             className="text-xl text-gray-600 max-w-3xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ 
//               opacity: 1, 
//               y: 0,
//               transition: { 
//                 duration: 0.6, 
//                 delay: 0.2,
//                 ease: "easeOut" 
//               }
//             }}
//             viewport={{ once: true }}
//           >
//             Empowering sustainable energy solutions through innovation and advanced technologies. At Shaheen, we are redefining the future of solar panel maintenance with cutting-edge AI and drone technology.
//           </motion.p>
//         </motion.div>

//         {/* Content Grid */}
//         <motion.div
//           className="grid md:grid-cols-2 gap-12 items-center"
//           variants={staggerContainerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {/* Left Content */}
//           <motion.div 
//             variants={fadeInVariants} 
//             className="space-y-6"
//           >
//             <motion.h3
//               variants={fadeInVariants}
//               className="text-3xl font-bold text-[#1E222D]"
//             >
//               Who We Are
//             </motion.h3>
            
//             <motion.div variants={fadeInVariants}>
//               <p className="text-gray-600 leading-relaxed mb-4">
//                 Shaheen was founded with a mission to transform how solar energy infrastructure is maintained. By leveraging AI, IoT, and drone technology, we provide proactive solutions that maximize efficiency and sustainability.
//               </p>
//               <p className="text-gray-600 leading-relaxed">
//                 Our team is comprised of passionate innovators, engineers, and visionaries dedicated to creating a cleaner and greener future.
//               </p>
//             </motion.div>

//             <motion.button
//               variants={fadeInVariants}
//               whileHover={{ 
//                 scale: 1.05,
//                 transition: { duration: 0.2 }
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#185B8D] to-[#4ACEF4] text-white rounded-full shadow-md hover:bg-[#1F6396] transition group"
//             >
//               <span>Learn More</span>
//               <ArrowRight 
//                 className="transition-transform group-hover:translate-x-1" 
//                 size={20} 
//               />
//             </motion.button>
//           </motion.div>

//           {/* Right Image */}
//           <motion.div
//             variants={heroImageVariants}
//             className="relative"
//           >
//             <div className="overflow-hidden rounded-md  shadow-2xl">
//               <motion.img
//                 src="https://www.rvslandsurveyors.com/wp-content/uploads/2021/03/remote_surveying.jpg"
//                 alt="Team working on innovative solutions"
//                 className="w-full object-cover"
//                 initial={{ scale: 1.1, opacity: 0 }}
//                 whileInView={{ 
//                   scale: 1, 
//                   opacity: 1,
//                   transition: { 
//                     duration: 0.8, 
//                     ease: "easeOut" 
//                   }
//                 }}
//                 whileHover={{
//                     scale: 1.05,
//                     filter: "brightness(1.0) contrast(1.1)",
//                     transition: {
//                       duration: 0.4,
//                       ease: "easeInOut",
//                     },
//                 }}
//                 viewport={{ once: true }}
//                 style={{ 
//                   filter: 'brightness(0.9) contrast(1.1)' 
//                 }}
//               />
//             </div>
            
//             {/* Subtle Decorative Elements */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ 
//                 opacity: 1, 
//                 scale: 1,
//                 transition: { 
//                   duration: 0.6, 
//                   delay: 0.4,
//                   ease: "backOut" 
//                 }
//               }}
//               viewport={{ once: true }}
//               className="absolute -bottom-6 -right-6 bg-blue-100 w-24 h-24 rounded-full shadow-lg flex items-center justify-center"
//             >
//               <div className="w-12 h-12 bg-[#2485B6] rounded-full"></div>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// };

// export default OurStory;


import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import person from "../assets/person.png"
const OurStory = () => {
  // Scroll-based variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const heroImageVariants = {
    hidden: { 
      scale: 0.9, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="relative py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Decorative Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/80 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/80 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeInVariants}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-[#1E222D] mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                ease: "easeOut" 
              }
            }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6, 
                delay: 0.2,
                ease: "easeOut" 
              }
            }}
            viewport={{ once: true }}
          >
            Empowering sustainable energy solutions through innovation and advanced technologies. At SolarEye, we are redefining the future of solar panel maintenance with cutting-edge AI and drone technology.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Left Content */}
          <motion.div 
            variants={fadeInVariants} 
            className="space-y-6"
          >
            <motion.h3
              variants={fadeInVariants}
              className="text-3xl font-bold text-[#1E222D]"
            >
              Who We Are
            </motion.h3>
            
            <motion.div variants={fadeInVariants}>
              <p className="text-gray-600 leading-relaxed mb-4">
              SolarEye was founded with a mission to transform how solar energy infrastructure is maintained. By leveraging AI, IoT, and drone technology, we provide proactive solutions that maximize efficiency and sustainability.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our team is comprised of passionate innovators, engineers, and visionaries dedicated to creating a cleaner and greener future.
              </p>
            </motion.div>

            <motion.button
              variants={fadeInVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#185B8D] to-[#4ACEF4] text-white rounded-xl shadow-md hover:bg-[#1F6396] transition group"
            >
              <span>Learn More</span>
              <ArrowRight 
                className="transition-transform group-hover:translate-x-1" 
                size={20} 
              />
            </motion.button>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={heroImageVariants}
            className="relative"
          >
            <div className="overflow-hidden rounded-md  shadow-2xl">
              <motion.img
                src={person}
                alt="Team working on innovative solutions"
                className="w-full object-cover"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: "easeOut" 
                  }
                }}
                whileHover={{
                    scale: 1.05,
                    filter: "brightness(1.0) contrast(1.1)",
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                }}
                viewport={{ once: true }}
                style={{ 
                  filter: 'brightness(0.9) contrast(1.1)' 
                }}
              />
            </div>
            
            {/* Subtle Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                transition: { 
                  duration: 0.6, 
                  delay: 0.4,
                  ease: "backOut" 
                }
              }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-blue-100 w-24 h-24 rounded-full shadow-lg flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-[#2485B6] rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurStory;

// import React, { useState, useEffect } from 'react';
// import { motion, useAnimation } from 'framer-motion';
// import { Code, Database, Sparkles, Star, Coffee, Blocks, Fingerprint } from 'lucide-react';

// const FloatingParticle = ({ delay }) => (
//   <motion.div
//     className="absolute w-2 h-2 bg-purple-400 rounded-full"
//     initial={{ opacity: 0, scale: 0 }}
//     animate={{
//       opacity: [0, 1, 0],
//       scale: [0, 1.5, 0],
//       y: [-20, -60],
//       x: Math.random() * 40 - 20,
//     }}
//     transition={{
//       duration: 2,
//       delay,
//       repeat: Infinity,
//       ease: "easeOut"
//     }}
//   />
// );

// const AboutMe = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(null);
//   const controls = useAnimation();

//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     const moveX = clientX - window.innerWidth / 2;
//     const moveY = clientY - window.innerHeight / 2;
//     setMousePosition({ x: moveX, y: moveY });
//   };

//   useEffect(() => {
//     controls.start({
//       x: mousePosition.x * 0.05,
//       y: mousePosition.y * 0.05,
//       transition: { type: "spring", stiffness: 50 }
//     });
//   }, [mousePosition, controls]);

//   const skills = [
//     { 
//       icon: <Code />, 
//       title: 'Full Stack Wizardry', 
//       desc: 'Crafting digital magic with MERN stack enchantments',
//       color: 'from-purple-500 to-pink-500'
//     },
//     { 
//       icon: <Code />, 
//       title: 'Automation Sorcery', 
//       desc: 'Commanding digital robots to do my bidding',
//       color: 'from-blue-500 to-purple-500'
//     },
//     { 
//       icon: <Database />, 
//       title: 'Data Architect', 
//       desc: 'Building castles of information in the cloud',
//       color: 'from-indigo-500 to-purple-500'
//     },
//     { 
//       icon: <Blocks />, 
//       title: 'UI/UX Alchemist', 
//       desc: 'Transforming ideas into golden user experiences',
//       color: 'from-pink-500 to-rose-500'
//     }
//   ];

//   return (
//     <div 
//       className="min-h-screen bg-gray-900 text-white py-16 px-4 overflow-hidden relative"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Animated Background */}
//       <div className="absolute inset-0 opacity-20">
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
//             animate={{
//               x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
//               y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
//             }}
//             transition={{
//               duration: Math.random() * 10 + 20,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
//         ))}
//       </div>

//       <motion.div
//         animate={controls}
//         className="max-w-6xl mx-auto relative"
//       >
//         {/* Hero Section */}
//         <div className="text-center mb-16 relative">
//           {[...Array(8)].map((_, i) => (
//             <FloatingParticle key={i} delay={i * 0.2} />
//           ))}
          
//           <motion.div
//             whileHover={{ rotate: 360 }}
//             transition={{ duration: 1 }}
//             className="w-40 h-40 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-8 flex items-center justify-center p-1"
//           >
//             <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
//               <Fingerprint size={64} className="text-purple-400" />
//             </div>
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-6xl md:text-7xl font-bold mb-4 relative">
//               <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
//                 Areej Omar
//               </span>
//               <motion.span
//                 className="absolute -top-6 -right-6 text-purple-400"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//               >
//                 <Star size={24} />
//               </motion.span>
//             </h1>
            
//             <motion.p
//               className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
//               animate={{ 
//                 backgroundPosition: ["0%", "100%"],
//                 color: ["#A78BFA", "#F472B6"] 
//               }}
//               transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
//             >
//               Digital Craftsperson & Code Poet
//             </motion.p>
//           </motion.div>
//         </div>

//         {/* About Text */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="max-w-3xl mx-auto text-center mb-16 relative"
//         >
//           <p className="text-xl text-purple-200 leading-relaxed font-light">
//             In the vast digital cosmos, I craft experiences that bridge imagination and reality. 
//             With each line of code, I weave together functionality and beauty, creating digital 
//             symphonies that resonate with users and machines alike. My passion lies in turning 
//             complex challenges into elegant solutions, whether through the art of full-stack 
//             development or the science of process automation.
//           </p>
//         </motion.div>

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {skills.map((skill, index) => (
//             <motion.div
//               key={skill.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 + (index * 0.1) }}
//               whileHover={{ scale: 1.05, rotate: [-1, 1] }}
//               onHoverStart={() => setIsHovered(index)}
//               onHoverEnd={() => setIsHovered(null)}
//               className="relative group"
//             >
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"/>
//               <div className="relative bg-gray-900 rounded-lg p-6">
//                 <div className="flex items-center mb-4">
//                   <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gradient-to-r ${skill.color}`}>
//                     {React.cloneElement(skill.icon, {
//                       size: 24,
//                       className: isHovered === index ? 'animate-bounce' : ''
//                     })}
//                   </div>
//                   <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
//                     {skill.title}
//                   </h3>
//                 </div>
//                 <p className="text-purple-200">{skill.desc}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Footer Element */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.2 }}
//           className="text-center mt-16"
//         >
//           <motion.div
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="inline-block"
//           >
//             <Coffee className="text-purple-400" size={32} />
//           </motion.div>
//           <p className="text-purple-300 mt-2 font-light italic">
//             Let's create something extraordinary together
//           </p>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default AboutMe;