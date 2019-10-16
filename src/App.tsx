import React from 'react';
import './App.css';
import AdvertiserRow from './interfaces/AdvertiserRow.interface';
import { Advertisers } from './components/Advertisers';

let testData: AdvertiserRow[] = [
  {
    id:1,
    name:"Henk", 
    numberCampaigns:1, 
    createdAt:"2018-04-15T06:27:46.058Z"
  }
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Advertisers advertiserRows={testData} />
    </div>
  );
}

export default App;
