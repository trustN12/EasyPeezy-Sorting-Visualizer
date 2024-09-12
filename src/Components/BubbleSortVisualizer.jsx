import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (sorting) {
      bubbleSort();
    }
  }, [sorting]);

  const bubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setHighlighted([j, j + 1]);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await sleep(300);
        }
      }
    }
    setSorting(false);
    setHighlighted([]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = () => setSorting(true);

  const handleReset = () => {
    setArray([45, 20, 35, 10, 60, 80, 55, 15]);
    setSorting(false);
    setHighlighted([]);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex flex-col rounded-xl items-center justify-center bg-gradient-to-br from-green-900 via-teal-700 to-cyan-500 p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl"
      >
        <h1 className="text-5xl font-extrabold text-center text-white mb-8 tracking-widest">
          💡 Bubble Sort Visualizer
        </h1>
        <div className="flex justify-center items-end space-x-4 mb-10">
          {array.map((value, index) => (
            <motion.div
              key={index}
              className={`h-${
                value * 2
              } w-14 flex items-center justify-center rounded-lg shadow-lg ${
                highlighted.includes(index)
                  ? "bg-gradient-to-r from-red-400 to-pink-600"
                  : "bg-gradient-to-r from-blue-400 to-purple-600"
              }`}
              animate={{
                scale: highlighted.includes(index) ? 1.2 : 1,
                y: highlighted.includes(index) ? -10 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold">{value}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mb-10">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            onClick={handleSort}
            disabled={sorting}
          >
            Start Sorting
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            onClick={handleReset}
          >
            Reset Array
          </motion.button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4">
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-slate-950 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              onClick={() => navigate("/")}
            >
              Home
            </motion.button>
          </Link>

          <Link to="/insertionSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Insertion Sort
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>



    <div className="flex flex-col items-center justify-center bg-black bg-opacity-30 p-8 rounded-3xl shadow-lg mt-12">
  <motion.h2
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-4xl font-extrabold text-white text-center mb-4"
  >
    🧠 Understanding Bubble Sort
  </motion.h2>

  {/* Introduction Section */}
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-lg text-gray-300 text-center leading-7 mb-8 max-w-3xl"
  >
    Bubble Sort is a simple algorithm where we repeatedly compare adjacent elements in a list and swap them if they are in the wrong order. The largest values "bubble" to the end of the list after each pass. Let's break it down step-by-step with visuals.
  </motion.p>

  {/* Step-by-Step Visuals */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
  >
    {/* Step 1 */}
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Step 1: Compare & Swap</h3>
      <p className="text-gray-300 mb-4">
        Start by comparing the first two elements. If the left element is greater than the right, swap them.
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">5</div>
        <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">3</div>
        <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
        <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
      </div>
    </div>

    {/* Step 2 */}
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Step 2: Move to Next Pair</h3>
      <p className="text-gray-300 mb-4">
        Now, move to the next pair of elements and repeat the process.
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">3</div>
        <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">5</div>
        <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
        <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
      </div>
    </div>

    {/* Step 3 */}
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Step 3: Continue Until End</h3>
      <p className="text-gray-300 mb-4">
        Keep repeating the process until the largest element is at the end of the list.
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">3</div>
        <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">5</div>
        <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
        <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">8</div>
      </div>
    </div>

    {/* Step 4 */}
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-bold mb-2">Step 4: Repeat</h3>
      <p className="text-gray-300 mb-4">
        Repeat the process for the rest of the list until all elements are sorted.
      </p>
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">2</div>
        <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">3</div>
        <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">5</div>
        <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">8</div>
      </div>
    </div>
  </motion.div>

  {/* Conclusion */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="bg-gradient-to-r from-purple-900 to-purple-700 text-white rounded-lg p-6 shadow-lg w-full mt-8"
  >
    <h3 className="text-2xl font-bold mb-4">Summary of Bubble Sort</h3>
    <p className="text-lg text-gray-300 leading-7">
      Bubble Sort is easy to understand but not very efficient for large datasets. Its time complexity in the worst case is O(n²), but it works well for smaller or nearly sorted arrays. By comparing and swapping adjacent elements, the largest values gradually move to the end of the list, and the process repeats until the entire array is sorted.
    </p>
  </motion.div>
</div>



    </>
  );
};

export default BubbleSortVisualizer;
