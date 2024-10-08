import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeapSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [sortedIndex, setSortedIndex] = useState(null);

  useEffect(() => {
    if (sorting) {
      heapSort();
    }
  }, [sorting]);

  const heapSort = async () => {
    let arr = [...array];
    const n = arr.length;

    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // One by one extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      setHighlighted([0, i]);
      await sleep(300);
      
      // Swap the root (max element) with the end element
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setArray([...arr]);
      setSortedIndex(i); // mark element as sorted
      await sleep(300);

      // Heapify the reduced heap
      await heapify(arr, i, 0);
    }
    setSortedIndex(0); // mark the last element as sorted
    setSorting(false);
    setHighlighted([]);
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      setHighlighted([i, largest]);
      await sleep(300);

      // Swap
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setArray([...arr]);

      await heapify(arr, n, largest);
    }
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
          🌟 Heap Sort Visualizer
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
          <Link to="/selectionSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Back to Selection Sort
            </motion.button>
          </Link>
          <Link to="/countingSort">
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Go to Counting Sort
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
        🧠 Understanding Heap Sort
      </motion.h2>

      {/* Introduction Section */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-lg text-gray-300 text-center leading-7 mb-8 max-w-3xl"
      >
        Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It first builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and reconstructs the heap until the data is sorted.
      </motion.p>

      {/* Step-by-Step Visuals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full bg-gradient-to-r from-emerald-700 to-teal-900 text-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Step 1 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 1: Build Max Heap</h3>
          <p className="text-gray-300 mb-4">
            Convert the array into a max heap, where each parent node is greater than or equal to its child nodes.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">8</div>
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">2</div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 2: Extract Maximum</h3>
          <p className="text-gray-300 mb-4">
            Extract the maximum element (root of the heap) and place it at the end of the array.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">8</div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 3: Rebuild Heap</h3>
          <p className="text-gray-300 mb-4">
            Rebuild the heap from the remaining elements to ensure the max heap property is maintained.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">8</div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Step 4: Repeat</h3>
          <p className="text-gray-300 mb-4">
            Repeat the process until all elements are sorted and placed at the end of the array.
          </p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">2</div>
            <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">3</div>
            <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">5</div>
            <div className="bg-orange-400 text-white font-bold p-4 text-center rounded-lg">8</div>
          </div>
        </div>
      </motion.div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-sky-900 to-purple-900 text-white rounded-lg p-6 shadow-lg w-full mt-8"
      >
        <h3 className="text-2xl font-bold mb-4">Summary of Heap Sort</h3>
        <p className="text-lg text-gray-300 leading-7">
          Heap Sort is an efficient sorting algorithm with a time complexity of O(n log n). It uses a binary heap to repeatedly extract the maximum (or minimum) element and rebuilds the heap. It’s useful for scenarios where a stable in-place sort is needed.
        </p>
      </motion.div>
    </div>

    </>
  );
};

export default HeapSortVisualizer;
