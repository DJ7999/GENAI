import React, { useState, useEffect } from 'react';
import Chatbot from "react-chatbot-kit";
import InvestmentHistory from "../CurrentPortfolio/InvestmentHistory";
import Portfolio from "../CurrentPortfolio/Portfolio";
import { ReloadProvider } from '../../context/ReloadContext';
import Goals from '../CurrentPortfolio/Goals';
import Fire from '../CurrentPortfolio/Fire';
import Admin from '../CurrentPortfolio/Admin';
import EquityManagement from '../CurrentPortfolio/EquityManagement';
import Employee from '../CurrentPortfolio/Employee';
import Insights from '../CurrentPortfolio/Insignts';
import "./ContentMain.css";
import config from '../Chat/config';
import MessageParser from '../Chat/MessageParser';
import ActionProvider from '../Chat/ActionProvider';
import 'react-chatbot-kit/build/main.css';
const ContentMain = () => {
  
  return (
    <ReloadProvider>
    <div className="main-content-holder">
      <div className="content-grid-one">
       {JSON.parse(localStorage.getItem("is_superuser"))?
       <>
        <Admin/>
        <EquityManagement/>
       </> :<></>}
       {JSON.parse(localStorage.getItem("is_superuser"))||JSON.parse(localStorage.getItem("is_staff"))?
       <>
        <Employee/>
       </> :<></>}
       {!(JSON.parse(localStorage.getItem("is_superuser"))||JSON.parse(localStorage.getItem("is_staff")))?
       <>
       <Insights/>
        <Portfolio/>
        <InvestmentHistory />
        <Goals />
        <Fire/>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </>:<></>}
      
      </div>
    </div>
    </ReloadProvider>
  );
};

export default ContentMain;
