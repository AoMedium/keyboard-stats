import React, { useState } from 'react';


import KEY_ROW_LOOKUP from "../utils/KeyRowLookup";

import NumberEntry from '../domain/NumberEntry';
import StringEntry from '../domain/StringEntry';
import { calcDerivative } from '../utils/InputCalculations';

const KeyContext = React.createContext({});

const MAX_NUM_ENTRIES = 20;
const MAX_TEXT_ENTRIES = 5;
export const startTime = Date.now();

// Timer parameters
export const tickPerSecond = 1;
export const duration = 1000 / tickPerSecond;

/**
 * Store utilised by components requiring key input information.
 */
function KeyContextProvider(props) {
  
  const [time, setTime] = useState(0);
  const [keyCount, setKeyCount] = useState(0);

  const [keyEntries, setKeyEntries] = useState([]);
  const [textHistory, setTextHistory] = useState([]);
  const [charCounts, setCharCounts] = useState(new Map());
  const [rowCounts, setRowCounts] = useState(
    new Map()
    .set("number", 0)
    .set("top", 0)
    .set("home", 0)
    .set("bottom", 0)
    .set("other", 0));

  const [keyCountEntries, setKeyCountEntries] = useState([]);
  const [speedEntries, setSpeedEntries] = useState([]);
  const [accelEntries, setAccelEntries] = useState([]);





  const incrementTime = () => {
    setTime(time => time + 1);
  }
  
  const incrementKeyCount = () => {
    setKeyCount(prevKeyCount => prevKeyCount + 1);
  }

  const addKeyEntry = (entry) => {
    setKeyEntries(prevEntries => { 
      return [...prevEntries, entry];
    });
  }

  const clearKeyEntries = () => {
    setKeyEntries([]);
  }

  const addTextEntry = () => {
    // Prevents empty entries from being added to the history.
    if (keyEntries.length <= 0) {
      return;
    }

    if (textHistory.length >= MAX_TEXT_ENTRIES) {
      // Remove the oldest entry
      textHistory.splice(0,1);
    }

    let text = "";

    keyEntries.forEach(entry => {
      // Concatenate letters into a single string.
      text += entry.value;

      // Count and record letters.
      let prevValue = charCounts.get(entry.value);

      if (prevValue) { // Letter has previously been recorded (value not null).
        charCounts.set(entry.value, prevValue + 1);
      } else { 
        // Create new key-value pair for the letter.
        charCounts.set(entry.value, 1);
      }
    });
    setCharCounts(charCounts);

    textHistory.push(new StringEntry(text, new Date().toLocaleTimeString('en-US')));
    setTextHistory(textHistory);
  }

  const addKeyCountEntry = () => {
    let newKeyCountEntry = new NumberEntry(keyCount, Date.now())

    setKeyCountEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }

      return [...prevEntries, newKeyCountEntry];
    })
  }

  const addSpeedEntry = () => {
    // Calculate speed from entries.
    let newSpeedEntry = new NumberEntry(calcDerivative(keyCountEntries, duration), Date.now());

    setSpeedEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }

      // NOTE: do not call methods inside of set callbacks as they are executed twice (see https://stackoverflow.com/questions/62106596/reactjs-setstate-being-called-twice-in-a-function-called-once-why)
      return [...prevEntries, newSpeedEntry];
    })
  }

  const addAccelEntry = () => {
    // Calculate acceleration from entries.
    let newAccelEntry = new NumberEntry(calcDerivative(speedEntries, duration), Date.now());

    setAccelEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }
      return [...prevEntries, newAccelEntry];
    })
  }

  const addRowCountEntry = () => {
    keyEntries.forEach(entry => {
      // Check which row the key belongs to (using lookup)

      if (KEY_ROW_LOOKUP.topRow.includes(entry.value)) {
        rowCounts.set("top", rowCounts.get("top") + 1);
      } else if(KEY_ROW_LOOKUP.homeRow.includes(entry.value)) {
        rowCounts.set("home", rowCounts.get("home") + 1)
      } else if(KEY_ROW_LOOKUP.bottomRow.includes(entry.value)) {
        rowCounts.set("bottom", rowCounts.get("bottom") + 1)
      } else if(KEY_ROW_LOOKUP.numberRow.includes(entry.value)) {
        rowCounts.set("number", rowCounts.get("number") + 1)
      } else {
        rowCounts.set("other", rowCounts.get("other") + 1)
      }
    });
    setRowCounts(rowCounts);
  }

  const contextValue = {
    time,
    keyCount,
    keyEntries,
    textHistory,
    charCounts,
    rowCounts,
    keyCountEntries,
    speedEntries,
    accelEntries,
    incrementTime,
    incrementKeyCount,
    addKeyEntry,
    clearKeyEntries,
    addTextEntry,
    addKeyCountEntry,
    addSpeedEntry,
    addAccelEntry,
    addRowCountEntry,
  };

  return (
    <KeyContext.Provider value={contextValue}>
      {props.children}
    </KeyContext.Provider>
  );
}

export {
  KeyContext,
  KeyContextProvider
};