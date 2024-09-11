import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const QuickSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [sortedIndex, setSortedIndex] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sorting) {
      quickSort(array, 0, array.length - 1);
    }
  }, [sorting]);

  const quickSort = async (arr, low, high) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    setSortedIndex((prev) => [
      ...new Set([
        ...prev,
        ...Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
      ]),
    ]);
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlighted([j, high]);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(300);
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await sleep(300);
    return i + 1;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = () => setSorting(true);

  const handleReset = () => {
    setArray([45, 20, 35, 10, 60, 80, 55, 15]);
    setSorting(false);
    setHighlighted([]);
    setSortedIndex([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="flex flex-col rounded-xl items-center justify-center bg-gradient-to-br from-gray-900 via-blue-700 to-indigo-500 p-4"
    >
      <div className="p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8 tracking-widest">
          🚀 Quick Sort Visualizer
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
                  : sortedIndex.includes(index)
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : "bg-gradient-to-r from-blue-400 to-purple-600"
              }`}
              animate={{
                scale:
                  highlighted.includes(index) || sortedIndex.includes(index)
                    ? 1.2
                    : 1,
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
          <Link to="/mergeSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back to Merge Sort
            </motion.button>
          </Link>
          <Link to="/selectionSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Selection Sort
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default QuickSortVisualizer;
