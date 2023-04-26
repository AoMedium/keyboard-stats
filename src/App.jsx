import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Examples from './pages/Examples/Examples';
import Workspace from './pages/Workspace/Workspace';

export const ROOT_PATH = '/keyboard-stats/';

// List of pages (used in Navigation Bar)
export const pages = [
  {
    name: "Workspace",
    path: "workspace"
  },
  {
    name: "Dashboard",
    path: ""
  },
  {
    name: "Examples",
    path: "examples"
  },
];

export default function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={ROOT_PATH}>
            <Route index element={<Dashboard />}/>
            <Route path="examples" element={<Examples />}/>
            <Route path="workspace" element={<Workspace />}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
