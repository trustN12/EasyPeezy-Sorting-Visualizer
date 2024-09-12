import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const MergeSortVisualizer = () => {
  const [array, setArray] = useState([45, 20, 35, 10, 60, 80, 55, 15]);
  const [sorting, setSorting] = useState(false);
  const [highlighted, setHighlighted] = useState([]);
  const [mergedIndex, setMergedIndex] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (sorting) {
      mergeSort(array, 0, array.length - 1);
    }
  }, [sorting]);

  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < n1 && j < n2) {
      setHighlighted([left + i, mid + 1 + j]);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      setArray([...arr]);
      await sleep(300);
    }

    while (i < n1) {
      setHighlighted([left + i]);
      arr[k] = L[i];
      i++;
      k++;
      setArray([...arr]);
      await sleep(300);
    }

    while (j < n2) {
      setHighlighted([mid + 1 + j]);
      arr[k] = R[j];
      j++;
      k++;
      setArray([...arr]);
      await sleep(300);
    }

    setMergedIndex([
      ...mergedIndex,
      ...Array.from({ length: right - left + 1 }, (_, idx) => left + idx),
    ]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = () => setSorting(true);

  const handleReset = () => {
    setArray([45, 20, 35, 10, 60, 80, 55, 15]);
    setSorting(false);
    setHighlighted([]);
    setMergedIndex([]);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="flex flex-col rounded-xl items-center justify-center bg-gradient-to-br from-gray-900 via-blue-700 to-indigo-500 p-4"
      >
        <div className="p-10 bg-black bg-opacity-30 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-4xl">
          <h1 className="text-5xl font-extrabold text-center text-white mb-8 tracking-widest">
            🪂 Merge Sort Visualizer
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
                    : mergedIndex.includes(index)
                    ? "bg-gradient-to-r from-green-400 to-green-600"
                    : "bg-gradient-to-r from-blue-400 to-purple-600"
                }`}
                animate={{
                  scale:
                    highlighted.includes(index) || mergedIndex.includes(index)
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
            <Link to="/insertionSort">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(255, 0, 255, 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-purple-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Back to Insertion Sort
              </motion.button>
            </Link>

            <Link to="/quickSort">
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(0, 255, 0, 0.8)",
                }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
              >
                Go to Quick Sort
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
          🧠 Understanding Merge Sort
        </motion.h2>

        {/* Introduction Section */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-300 text-center leading-7 mb-8 max-w-3xl"
        >
          Merge Sort is a divide-and-conquer algorithm that splits the array
          into smaller sub-arrays, sorts those sub-arrays, and then merges them
          back together. It’s known for its efficiency and stability, making it
          a popular choice for sorting large datasets.
        </motion.p>

        {/* Step-by-Step Visuals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full bg-gradient-to-r from-zinc-800 to-slate-900 text-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">Step 1: Divide</h3>
            <p className="text-gray-300 mb-4">
              Split the array into two halves until each sub-array contains a
              single element or is empty.
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">
                5
              </div>
              <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">
                3
              </div>
              <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">
                8
              </div>
              <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">
                2
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">Step 2: Sort</h3>
            <p className="text-gray-300 mb-4">
              Recursively sort the smaller sub-arrays created from the divide
              step.
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">
                3
              </div>
              <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">
                5
              </div>
              <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">
                2
              </div>
              <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">
                8
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">Step 3: Merge</h3>
            <p className="text-gray-300 mb-4">
              Merge the sorted sub-arrays back together to form a single sorted
              array.
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">
                2
              </div>
              <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">
                3
              </div>
              <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">
                5
              </div>
              <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">
                8
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-2">Step 4: Repeat</h3>
            <p className="text-gray-300 mb-4">
              Repeat the merge process until the entire array is sorted.
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-yellow-400 text-white font-bold p-4 text-center rounded-lg">
                2
              </div>
              <div className="bg-green-400 text-white font-bold p-4 text-center rounded-lg">
                3
              </div>
              <div className="bg-blue-400 text-white font-bold p-4 text-center rounded-lg">
                5
              </div>
              <div className="bg-red-400 text-white font-bold p-4 text-center rounded-lg">
                8
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-teal-600 to-cyan-900 text-white rounded-lg p-6 shadow-lg w-full mt-8"
        >
          <h3 className="text-2xl font-bold mb-4">Summary of Merge Sort</h3>
          <p className="text-lg text-gray-300 leading-7">
            Merge Sort is a stable sorting algorithm with a time complexity of
            O(n log n). It is particularly useful for large datasets and ensures
            that the original order of equal elements is preserved. By dividing
            and merging, Merge Sort efficiently sorts data with minimal
            comparisons.
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default MergeSortVisualizer;
