import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { init as initApm } from "@elastic/apm-rum";

initApm({

  serviceName: 'React',


  serverUrl: 'https://2cb0819007ae40ce958e6cc4474ec415.apm.us-central1.gcp.cloud.es.io:443',


  serviceVersion: '',


  environment: 'my-environment'

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);

