# Chart.js Tech Demo
Ou-An Chuang (ochu761) - April 2023

## Introduction
This tech demo will run you through the basics of using Chart.js for React. 

The demo consists of a key-logging app that graphs the number of keys you press per second, then calculates the "speed", "acceleration" and (other metrics such as distribution) of the keys.

There is also a Workspace page giving you a place to try out the functionalities provided by Chart.js for React.

You may find the following documentation useful to reference:
- [react-chartjs-2 Documentation](https://react-chartjs-2.js.org)
- [Documentation for configuring chart options](https://www.chartjs.org/docs/latest/configuration/)

## Setup
First, you will need to install the required dependencies. Open a new terminal in your IDE and run the following:
```
npm install
```
Once installation is complete, start the web application with:
```
npm run dev
```
You should see the following output in your terminal:
```
  VITE v4.2.1  ready in 221 ms

  ➜  Local:   http://localhost:9999/
  ➜  Network: use --host to expose
  ➜  press h to show help
```
Open this address in your web browser (or Ctrl/Cmd click the address in VSCode).

## Demo Structure
The demo will mainly focus on two parts of the project: the Dashboard and the Workspace. However, you are free to explore other parts of the project.

### Dashboard
- Path: ``src/pages/Dashboard``
- This is the landing page for the demo where you can dynamically generate data by typing. 
- Note: your key inputs will NOT be uploaded and recorded to a database. Feel free to check out the ``src/pages/Dashboard/KeyInputPanel.jsx`` and follow the data flow to see where it's stored.

### The Workspace
- Path: ``src/pages/Workspace``
- This is the directory where you will be writing your code.

### Charts
- Path: ``src/components/charts``
- This is where you can find the charts used as components for the Dashboard and Examples pages.

### Examples
- Path: ``src/pages/Examples``
- This is where the live examples from the react-chartjs-2 documentation have been integrated into the app.
- You can find the chart components in ``src/components/charts/examples``.