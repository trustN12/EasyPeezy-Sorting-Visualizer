import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const InsertionSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (sorting) {
      insertionSort();
    }
  }, [sorting]);

  const insertionSort = async () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      setSortedIndex(i);
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
        setArray([...arr]);
        setHighlighted([j + 1]);
        await sleep(300);
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setHighlighted([j + 1]);
      await sleep(300);
    }

    setSorting(false);
    setHighlighted([]);
    setSortedIndex(null);
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
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.7, ease: "easeInOut" }} className="flex flex-col rounded-xl items-center justify-center bg-gradient-to-br from-pink-900 via-purple-700 to-indigo-500 p-4">
      <div className="p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-5xl font-extrabold text-center text-white mb-8 tracking-widest">
          🛸 Insertion Sort Visualizer
        </h1>
        <div className="flex justify-center items-end space-x-4 mb-10">
          {array.map((value, index) => (
            <motion.div
              key={index}
              className={`h-${value * 2} w-14 flex items-center justify-center rounded-lg shadow-lg ${
                highlighted.includes(index)
                  ? "bg-gradient-to-r from-pink-400 to-red-600"
                  : index <= sortedIndex
                  ? "bg-gradient-to-r from-green-400 to-green-600"
                  : "bg-gradient-to-r from-blue-400 to-blue-600"
              }`}
              animate={{
                scale: highlighted.includes(index) || index <= sortedIndex ? 1.2 : 1,
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
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            onClick={handleSort}
            disabled={sorting}
          >
            Start Sorting
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 0, 0, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            onClick={handleReset}
          >
            Reset Array
          </motion.button>
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          <Link to="/bubbleSort">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back to Bubble Sort
            </motion.button>
          </Link>

          <Link to="/mergeSort">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Merge Sort
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default InsertionSortVisualizer;
