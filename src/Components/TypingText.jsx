import { motion } from "framer-motion";

const TypingText = () => {
  const textPart1 = "Easy";
  const textPart2 = "Peezy";

  // Combine characters for animation
  const charactersPart1 = textPart1.split("");
  const charactersPart2 = textPart2.split("");

  return (
    <div className="text-center">
      <motion.span
        className="text-yellow-400"
      >
        {charactersPart1.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 7, delay: index * 0.07, ease: "easeOut" }}
          >
            {char}
          </motion.span>
        ))}
        <span className="text-transparent bg-gradient-to-r from-teal-400 via-yellow-500 to-red-700 bg-clip-text">
          {charactersPart2.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (index + charactersPart1.length) * 0.05, ease: "circOut"}}
              
            >
              {char}
            </motion.span>
          ))}
        </span>
      </motion.span>
    </div>
  );
};

export default TypingText;
