import Panel from "../../components/Panel";
import NavigationBar from '../../components/NavigationBar';
import { pages } from "../../App";
import styles from "./Workspace.module.css"

import WorkspaceChart from "./WorkspaceChart";

export default function Workspace() {
  return (
    <>
      <NavigationBar pages={pages} active={"Workspace"}/>

      <div className="chartContainer">
        <Panel class={`chartPanel ${styles.workspacePanel}`}>

          {/* TODO: (Demo) You only need to modify this to add/remove props */}
          <WorkspaceChart />


        </Panel>
      </div>
    </>
  );
}