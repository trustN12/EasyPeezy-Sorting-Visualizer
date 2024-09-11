import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TypingText from "./TypingText";
import { FaGithub, FaYoutube, FaEnvelope, FaPhone } from "react-icons/fa";

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 10,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded ">
      
      {/* Social Icons - Top Right */}
      <div className="absolute top-5 right-5 flex space-x-6 text-2xl">
        <motion.a
          href="https://github.com/trustN12"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-green-400 transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaGithub />
        </motion.a>
        <motion.a
          href="https://www.youtube.com/@algo-bot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaYoutube />
        </motion.a>
        <motion.a
          href="mailto:academyshreyn12@gmail.com"
          className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaEnvelope />
        </motion.a>
        <motion.a
          href="tel:+919679188394"
          className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
          variants={iconVariants}
          whileHover="hover"
        >
          <FaPhone />
        </motion.a>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-6xl flex justify-center font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-700"
        >
          Welcome To{" "}
          <span className="ml-4">
            <TypingText />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="text-lg md:text-2xl font-medium"
        >
          Experience the magic of sorting algorithms come to life with my
          interactive visualizer.
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-12">
          <div className="flex items-center justify-center">
            <Link to="/bubbleSort">
              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-400 to-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:bg-gradient-to-r hover:from-red-700  hover:to-purple-700 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Start Here
              </motion.button>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <a
              href="https://www.geeksforgeeks.org/sorting-algorithms/"
              className="text-gray-500 hover:text-white hover:font-md hover:transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
