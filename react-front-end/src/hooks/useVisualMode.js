import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])


  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory(prev => {
        return [...prev, newMode]
      })
      setMode(newMode);
    } else {
      setHistory(prev => {
        return [...prev.slice(0, prev.length - 1), newMode]
      })
      setMode(newMode)
    }
  }
  const back = () => {
    const newHistory = [...history]
    newHistory.pop();
    setHistory(newHistory)
    if (!(history.length === 1)) {
      setMode(newHistory[newHistory.length - 1])
    }
  }
  return { mode, transition, back };
}