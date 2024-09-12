import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const SelectionSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [minIndex, setMinIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sorting) {
      selectionSort();
    }
  }, [sorting]);

  const selectionSort = async () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      setMinIndex(minIdx);

      for (let j = i + 1; j < arr.length; j++) {
        setHighlighted([minIdx, j]);
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setMinIndex(minIdx);
        }
        await sleep(300);
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }
    }
    setSorting(false);
    setHighlighted([]);
    setMinIndex(null);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = () => setSorting(true);

  const handleReset = () => {
    setArray([45, 20, 35, 10, 60, 80, 55, 15]);
    setSorting(false);
    setHighlighted([]);
    setMinIndex(null);
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
          🔮 Selection Sort Visualizer
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
                  : index === minIndex
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-r from-blue-400 to-blue-600"
              }`}
              animate={{
                scale:
                  highlighted.includes(index) || index === minIndex ? 1.2 : 1,
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
          <Link to="/quickSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back to Quick Sort
            </motion.button>
          </Link>
          <Link to="/heapSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Heap Sort
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
        🧠 Understanding Selection Sort
      </motion.h2>

      {/* Introduction Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-gray-300 text-center leading-7 mb-8 max-w-3xl"
      >
        Selection Sort is a simple sorting algorithm that works by repeatedly finding the minimum (or maximum) element from an unsorted portion of the array and moving it to the beginning (or end) of the sorted portion. It’s easy to understand and implement but is not very efficient for large datasets.
      </motion.p>

      {/* Step-by-Step Visuals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-gradient-to-r from-green-900 to-lime-600 text-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 1: Find Minimum</h3>
          <p className="text-gray-300 mb-4">
            Start by finding the smallest element in the unsorted portion of the array.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
            <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 2: Swap Minimum</h3>
          <p className="text-gray-300 mb-4">
            Swap the smallest element found with the first element of the unsorted portion.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">5</div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 3: Move to Next</h3>
          <p className="text-gray-300 mb-4">
            Move the boundary of the sorted portion and repeat the process for the remaining unsorted portion.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">5</div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 4: Repeat</h3>
          <p className="text-gray-300 mb-4">
            Continue repeating the process until the entire array is sorted.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">8</div>
          </div>
        </div>
      </motion.div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-pink-700 to-slate-950 text-white rounded-lg p-6 shadow-lg w-full mt-8"
      >
        <h3 className="text-2xl font-bold mb-4">Summary of Selection Sort</h3>
        <p className="text-lg text-gray-300 leading-7">
          Selection Sort is a simple and intuitive algorithm with a time complexity of O(n²). It works well for small datasets but is inefficient for larger arrays. By iteratively selecting the minimum element from the unsorted portion and moving it to the sorted portion, it eventually sorts the entire array.
        </p>
      </motion.div>
    </div>
    </>
  );
};

export default SelectionSortVisualizer;
