import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import TaskManagerRoutes from './core/routes';

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            flexGrow: 1,
          }}
        >
          {<TaskManagerRoutes />}
        </div>
        <div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
