import {KeyContextProvider} from '../../context/KeyContextProvider';
import Timer from './Timer';
import KeyInputPanel from './KeyInputPanel';
import KeyLogPanel from './KeyLogPanel';
import NavigationBar from '../../components/NavigationBar';
import { pages } from '../../App';

/**
 * Contains all of the relevant components required to allow the user to input and visualise their key presses.
 */
export default function Dashboard() {
  return (
    <>
      <NavigationBar pages={pages} active={"Dashboard"}/>
      <KeyContextProvider>
        <Timer/>
        <KeyLogPanel />
        <KeyInputPanel />
      </KeyContextProvider>
    </>
    
  );
}