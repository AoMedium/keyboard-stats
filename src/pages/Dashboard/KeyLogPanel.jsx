import { useEffect, useState, useContext } from 'react';
import { KeyContext } from "../../context/KeyContextProvider";
import MultiLineChart from '../../components/charts/default/MultiLineChart';
import PieChart from '../../components/charts/default/PieChart';
import RadarChart from '../../components/charts/default/RadarChart';

import TextLine from '../../components/text/TextLine';

import Panel from '../../components/Panel'
import Label from '../../components/Label'

import LineFigure from '../../domain/LineFigure';

import { sumMap } from '../../utils/Helpers';
import { startTime } from '../../context/KeyContextProvider';

/**
 * Responsible for displaying key information as charts in panels.
 */
export default function KeyLogPanel() {
  const {
    keyCountEntries,
    speedEntries,
    accelEntries,
    charCounts,
    rowCounts,
    textHistory,
  } = useContext(KeyContext);


  // ----- To change the graphs, you only need to edit from this point onwards -----


  const keyCountChart = (
    <Panel class={"chartPanel"}>
      {/* <Label>Line Chart<br></br>(count)</Label> */}

      {/* <BasicLineChart labels={[1,2,3,4]} data={[1,2,3,4]}/> */}

      <MultiLineChart title="Count" figures={[
        new LineFigure("Key Count", keyCountEntries)]} startTime={startTime} />
    </Panel>
  );

  const speedAndAccelChart = (
    <Panel class={"chartPanel"}>
      {/* <Label>Line Chart<br></br>(speed and accel)</Label> */}

      <MultiLineChart title="Delta" figures={[
        new LineFigure("Speed", speedEntries, 'rgb(53, 162, 235)','rgba(53, 162, 235, 0.5)', 1),
        new LineFigure("Acceleration", accelEntries, 'rgb(53, 235, 162)','rgba(53, 235, 162, 0.5)', 2)
      ]} 
        startTime={startTime} />
    </Panel>
  );

  const charCountChart = (
    <Panel class={"chartPanel"}>
      {/* <Label>Pie Chart</Label> */}

      <PieChart title="Key Distribution" sectors={charCounts} updateProp={sumMap(charCounts)}/>
    </Panel>
  );

  const rowCountChart = (
    <Panel class={"chartPanel"}>
      {/* <Label>Radar Chart</Label> */}

      <RadarChart title="Row Distribution"
        labels={Array.from(rowCounts.keys())} 
        data={Array.from(rowCounts.values())}/>

      {/* <RadarChart points={rowCounts} updateProp={sumMap(rowCounts)}/> */}
    </Panel>
  );


  // ----- Don't worry about anything below here -----


  const textHistoryChart = (
    <Panel id={"textLinePanel"} class={"chartPanel"}>
      <div id="textLineContainer">
        {textHistory.map((entry, index) => {
          return <TextLine key={index + " " + entry.value} entry={entry} />
        })}
      </div>
    </Panel>
  );

  return (
    <div className={"chartContainer"}>
      {keyCountChart}
      {speedAndAccelChart}
      {charCountChart}
      {rowCountChart}

      {textHistoryChart}
    </div>
  );
}