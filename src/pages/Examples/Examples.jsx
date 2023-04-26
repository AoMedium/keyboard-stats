import Panel from "../../components/Panel";
import NavigationBar from '../../components/NavigationBar';
import { pages } from "../../App";

import MultitypeChart from "../../components/charts/examples/MultitypeChart";
import BubbleChart from "../../components/charts/examples/BubbleChart";
import PolarAreaChart from "../../components/charts/examples/PolarAreaChart";
import LineChart from "../../components/charts/examples/LineChart";
import DoughnutChart from "../../components/charts/examples/DoughnutChart";
import HorizontalBarChart from "../../components/charts/examples/HorizontalBarChart";

/**
 * Page of example charts.
 */
export default function Examples() {
  return (
    <>
      <NavigationBar pages={pages} active={"Examples"}/>
      <div className="chartContainer">
        <Panel class="chartPanel">
          <LineChart />
        </Panel>
        <Panel class="chartPanel">
          <BubbleChart />
        </Panel>
        <Panel class="chartPanel">
          <HorizontalBarChart />
        </Panel>
        <Panel class="chartPanel">
          <PolarAreaChart />
        </Panel>
        <Panel class="chartPanel">
          <MultitypeChart/>
        </Panel>
        <Panel class="chartPanel">
          <DoughnutChart />
        </Panel>
      </div>
    </>
  );
}