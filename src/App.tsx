import "./App.css";
import { useEffect, useState } from 'react';
import LineChart, { Figure } from './components/LineChart';
import ConsoleInputBlock from './components/ConsoleInputBlock';
import ConsoleTextLine from './components/ConsoleTextLine';
import NumberEntry from './domain/NumberEntry';
import StringEntry from './domain/StringEntry';
import { sumMap } from './utils/Util';
import { calcDerivative, calcSpeedWithEntries } from './utils/InputCalculations';
import PieChart from './components/PieChart';

export const MAX_NUM_ENTRIES = 20;
export const MAX_TEXT_ENTRIES = 5;
const startTime = Date.now();
const tickPerSecond = 1;
const duration = 1000 / tickPerSecond;

export default function App() {

  const [time, setTime] = useState<number>(0);
  const [idleTime, setIdleTime] = useState<number>(0);
  const [keyCount, setKeyCount] = useState<number>(0);

  const [keyEntries, setKeyEntries] = useState<StringEntry[]>([]);
  const [textHistory, setTextHistory] = useState<string[]>([]);
  const [charCounts, setCharCounts] = useState(new Map<string, number>());

  const [keyCountEntries, setKeyCountEntries] = useState<NumberEntry[]>([]);
  const [speedEntries, setSpeedEntries] = useState<NumberEntry[]>([]);
  const [accelEntries, setAccelEntries] = useState<NumberEntry[]>([]);



  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1);
    }, duration);
    // Clear when component unmounts to prevent multiple intervals occurring
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(time);

    addEntries();
    checkEntries();
  }, [time]);



  function checkEntries() {
    // if (idleTime > 10) {
    //   setKeyCount(0);
    //   // charCounts.clear();

    //   setIdleTime(0);
    // }
  }

  function addEntries() {
    addTextEntry();

    let newKeyCountEntry = new NumberEntry(keyCount, Date.now())

    setKeyCountEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }

      // if (prevEntries.at(prevEntries.length - 1)?.value == keyCount) {
      //   setIdleTime(idleTime + 1);
      // }

      return [...prevEntries, newKeyCountEntry];
    })


    // Calculate speed from entries.
    // let newSpeedEntry = new NumberEntry(calcSpeedWithEntries(keyEntries, duration), Date.now());
    let newSpeedEntry = new NumberEntry(calcDerivative(keyCountEntries, duration), Date.now());

    setSpeedEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }

      // NOTE: do not call methods inside of set callbacks as they are executed twice (see https://stackoverflow.com/questions/62106596/reactjs-setstate-being-called-twice-in-a-function-called-once-why)
      return [...prevEntries, newSpeedEntry];
    })

    // Calculate acceleration from entries.
    let newAccelEntry = new NumberEntry(calcDerivative(speedEntries, duration), Date.now());

    setAccelEntries(prevEntries => {
      if (prevEntries.length >= MAX_NUM_ENTRIES) {
        prevEntries.splice(0,1);
      }
      return [...prevEntries, newAccelEntry];
    })

    // Calculations complete; clear record for next calculation.
    // setKeyCount(0);
    setKeyEntries([]);
  }

  function addTextEntry() {
    if (keyEntries.length > 0) {
      if (textHistory.length >= MAX_TEXT_ENTRIES) {
        textHistory.splice(0,1);
      }

      let text = "";

      keyEntries.forEach(entry => {
        // Concatenate letters.
        text += entry.value;

        // Record letters.
        let prevValue = charCounts.get(entry.value);

        if (prevValue) { // Letter has previously been recorded.
          charCounts.set(entry.value, prevValue + 1);
        } else { // Create new key-value pair for the letter.
          charCounts.set(entry.value, 1);
        }
        setCharCounts(charCounts);
      });

      textHistory.push(text);
      setTextHistory(textHistory);

      // setIdleTime(0);
    }
  }

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      // Declare outside of set callback to prevent from being executed twice.
      let entry = new StringEntry(event.key, Date.now());

      setKeyEntries(prevEntries => { 
        setKeyCount(prevKeyCount => prevKeyCount + 1);
        if (prevEntries.length >= MAX_NUM_ENTRIES) {
          prevEntries.splice(0,1);
        }
        return [...prevEntries, entry];
      });
    }

    document.addEventListener('keypress', handleKeyPress);
  
    return () => {
      // Clean up the event listener when component unmounts.
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);



  return (
    <>
      <div>
        <div style={{position: "fixed", bottom: "45%"}}>
          {textHistory.map((text, index) => {
            return <ConsoleTextLine key={index + " " + text} value={text} />
          })}
        </div>
        <div style={{position: "fixed", top: "55%"}}>
          {keyEntries.map((entry, index) => {
            return <ConsoleInputBlock key={index + " " + entry.value} value={entry.value} />
          })}
        </div>
      </div>
     
      <div className="chartContainer">
        <div className="chartPanel">
          <LineChart figures={[
          new Figure("Key Count", keyCountEntries)]} startTime={startTime} />
        </div>
        <div className="chartPanel">
          <LineChart figures={[
            new Figure("Speed", speedEntries, 'rgb(53, 162, 235)','rgba(53, 162, 235, 0.5)', 1),
            new Figure("Acceleration", accelEntries, 'rgb(53, 235, 162)','rgba(53, 235, 162, 0.5)', 2)
          ]} 
            startTime={startTime} />
        </div>
        <div className="chartPanel">
          <PieChart sectors={charCounts} updateProp={sumMap(charCounts)}/>
        </div>
      </div>
    </>
  );
}