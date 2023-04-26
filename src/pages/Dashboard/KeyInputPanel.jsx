import { useContext, useEffect } from "react";
import { KeyContext } from "../../context/KeyContextProvider";
import StringEntry from "../../domain/StringEntry";
import Panel from "../../components/Panel";
import InputBlock from "../../components/text/InputBlock";

/**
 * Responsible for handling and displaying user key input.
 */
export default function KeyInputPanel() {
  const {keyEntries, addKeyEntry, incrementKeyCount} = useContext(KeyContext);

  useEffect(() => {
    function handleKeyPress(event) {
      // Log the key as a new entry
      addKeyEntry(new StringEntry(event.key.toLowerCase(), Date.now()));
      incrementKeyCount();

      // Prevent spacebar from scrolling to the bottom of the page
      if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
      }
    }

    document.addEventListener('keypress', handleKeyPress);
  
    return () => {
      // Clean up the event listener when component unmounts.
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <Panel id={"keyInputPanel"}>
      {keyEntries.length ? keyEntries.map((entry, index) => {
        return <InputBlock key={index + " " + entry.value} value={entry.value} />
      }): "• Press any key •"}
    </Panel>
  );
}