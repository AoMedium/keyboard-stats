import { useContext, useEffect } from "react";
import { KeyContext, duration } from "../../context/KeyContextProvider";

/**
 * Responsible for recording key entries every tick.
 */
export default function Timer() {
  const { 
    time, 
    incrementTime,
    addTextEntry,
    addKeyCountEntry,
    addSpeedEntry,
    addAccelEntry,
    addRowCountEntry,
    clearKeyEntries
  } = useContext(KeyContext);

  /**
   * Initialise timer interval.
   */
  useEffect(() => {
    const interval = setInterval(() => {
      incrementTime();
    }, duration);

    // Clear when component unmounts to prevent multiple intervals occurring
    return () => clearInterval(interval);
  }, []);

  /**
   * Timer actions on tick.
   */
  useEffect(() => {
    console.log("Time: " + time);

    addEntries();
  }, [time]);

  function addEntries() {
    addTextEntry();
    addKeyCountEntry();
    addSpeedEntry();
    addAccelEntry();
    addRowCountEntry();

    // Calculations complete; clear record for next calculation.
    clearKeyEntries()
  }
}