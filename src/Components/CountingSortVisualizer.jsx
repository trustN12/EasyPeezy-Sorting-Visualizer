import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CountingSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(null);

  useEffect(() => {
    if (sorting) {
      countingSort();
    }
  }, [sorting]);

  const countingSort = async () => {
    let arr = [...array];
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = new Array(range).fill(0);
    let output = new Array(arr.length).fill(0);

    // Step 1: Store the count of each element
    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }

    // Step 2: Modify count[] so that it contains actual positions
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    // Step 3: Build the output array
    for (let i = arr.length - 1; i >= 0; i--) {
      setHighlighted([i]);
      await sleep(200);

      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;

      setArray([...output]);
      setSortedIndex(arr.length - i);
      await sleep(200);
    }

    setSortedIndex(arr.length);
    setSorting(false);
    setHighlighted([]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = () => setSorting(true);

  const handleReset = () => {
    setArray([45, 20, 35, 10, 60, 80, 55, 15]);
    setSorting(false);
    setHighlighted([]);
    setSortedIndex(null);
  };

  return (
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex flex-col rounded-xl items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-700 to-blue-500 p-4"
    >
      <div className="p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8 tracking-widest">
          🧮 Counting Sort Visualizer
        </h1>
        <div className="flex justify-center items-end space-x-4 mb-10">
          {array.map((value, index) => (
            <motion.div
              key={index}
              className={`h-${
                value * 2
              } w-14 flex items-center justify-center rounded-lg shadow-lg ${
                highlighted.includes(index)
                  ? "bg-gradient-to-r from-red-400 to-red-600"
                  : index >= sortedIndex
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-r from-blue-400 to-blue-600"
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

        <div className="flex justify-center space-x-4 mt-4">
          <Link to="/heapSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back to Heap Sort
            </motion.button>
          </Link>
          <Link to="/bubbleSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Bubble Sort
            </motion.button>
          </Link>
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-slate-950 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Home
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>


<div className="flex flex-col items-center justify-center bg-black bg-opacity-30 p-8 rounded-3xl shadow-lg mt-12">
<motion.h2
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-4xl font-extrabold text-white text-center mb-4"
>
  🧠 Understanding Counting Sort
</motion.h2>

{/* Introduction Section */}
<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-lg text-gray-300 text-center leading-7 mb-8 max-w-3xl"
>
  Counting Sort is a non-comparison-based sorting algorithm that counts the number of occurrences of each distinct element. It then uses this information to place each element in its correct position. This is particularly efficient for sorting integers within a limited range.
</motion.p>

{/* Step-by-Step Visuals */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="w-full bg-gradient-to-r from-orange-800 to-sky-900 text-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {/* Step 1 */}
  <div className="flex flex-col items-center">
    <h3 className="text-2xl font-bold mb-2">Step 1: Count Elements</h3>
    <p className="text-gray-300 mb-4">
      Start by counting the number of occurrences of each distinct element in the array.
    </p>
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">5</div>
      <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">3</div>
      <div className="bg-purple-400 text-white font-bold p-4 text-center rounded-lg">8</div>
      <div className="bg-teal-400 text-white font-bold p-4 text-center rounded-lg">2</div>
    </div>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center">
    <h3 className="text-2xl font-bold mb-2">Step 2: Compute Positions</h3>
    <p className="text-gray-300 mb-4">
      Compute the position of each element in the sorted array based on the counts.
    </p>
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">2</div>
      <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">3</div>
      <div className="bg-teal-400 text-white font-bold p-4 text-center rounded-lg">5</div>
      <div className="bg-purple-400 text-white font-bold p-4 text-center rounded-lg">8</div>
    </div>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center">
    <h3 className="text-2xl font-bold mb-2">Step 3: Place Elements</h3>
    <p className="text-gray-300 mb-4">
      Place each element in its correct position in the sorted array based on the computed positions.
    </p>
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">2</div>
      <div className="bg-teal-400 text-white font-bold p-4 text-center rounded-lg">3</div>
      <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">5</div>
      <div className="bg-purple-400 text-white font-bold p-4 text-center rounded-lg">8</div>
    </div>
  </div>

  {/* Step 4 */}
  <div className="flex flex-col items-center">
    <h3 className="text-2xl font-bold mb-2">Step 4: Output Sorted Array</h3>
    <p className="text-gray-300 mb-4">
      The final sorted array is obtained after placing all elements in their computed positions.
    </p>
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">2</div>
      <div className="bg-teal-400 text-white font-bold p-4 text-center rounded-lg">3</div>
      <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">5</div>
      <div className="bg-purple-400 text-white font-bold p-4 text-center rounded-lg">8</div>
    </div>
  </div>
</motion.div>

{/* Conclusion */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="bg-gradient-to-r from-pink-800 to-cyan-700 text-white rounded-lg p-6 shadow-lg w-full mt-8"
>
  <h3 className="text-2xl font-bold mb-4">Summary of Counting Sort</h3>
  <p className="text-lg text-gray-300 leading-7">
    Counting Sort is efficient for sorting integers when the range of the numbers is known and not too large. It works by counting occurrences of each element, computing their positions in the sorted array, and then placing each element in its correct position. Its time complexity is O(n + k), where n is the number of elements and k is the range of the input values.
  </p>
</motion.div>
</div>

    </>
  );
};

export default CountingSortVisualizer;
