import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import BubbleSortVisualizer from "./Components/BubbleSortVisualizer";
import InsertionSortVisualizer from "./Components/InsertionSortVisualizer";
import MergeSortVisualizer from "./Components/MergeSortVisualizer";
import QuickSortVisualizer from "./Components/QuickSortVisualizer ";
import SelectionSortVisualizer from "./Components/SelectionSortVisualizer";
import Home from "./Components/Home";
import Layout from "./Components/Layout";
import PageTransition from "./Components/PageTransition";
import HeapSortVisualizer from "./Components/HeapSortVisualizer";
import CountingSortVisualizer from "./Components/CountingSortVisualizer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/home" />}
        />

        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/bubbleSort"
            element={
              <PageTransition>
                <BubbleSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/insertionSort"
            element={
              <PageTransition>
                <InsertionSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/mergeSort"
            element={
              <PageTransition>
                <MergeSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/quickSort"
            element={
              <PageTransition>
                <QuickSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/selectionSort"
            element={
              <PageTransition>
                <SelectionSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/heapSort"
            element={
              <PageTransition>
                <HeapSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="/countingSort"
            element={
              <PageTransition>
                <CountingSortVisualizer />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <div className="text-center text-white">Page Not Found</div>
            }
          />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
