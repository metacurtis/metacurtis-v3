import React from "react";
import { motion } from "framer-motion";

const letters = [
  { id: "meta", letter: "M" },
  { id: "curtis", letter: "C" },
  { id: "version3", letter: "3V" },
];

const MC3VLetters = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {letters.map(({ id, letter }, index) => (
        <motion.div
          key={index}
          id={id}
          initial={{ opacity: 0.7 }}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 25px rgba(0,150,255,0.8)" }}
          className="text-8xl md:text-9xl font-extrabold px-8 py-4 cursor-pointer"
        >
          {letter}
        </motion.div>
      ))}
    </div>
  );
};

export default MC3VLetters;
