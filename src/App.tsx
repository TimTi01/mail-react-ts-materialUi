import React, { FC } from 'react';
import './App.css';
import {Container} from "@material-ui/core";
import {Header} from "./Components/Header/Header";
import {Content} from "./Components/Content/Content";


const App:FC = ({children}) => {
  return (
    <div className="App">
      <Container maxWidth="xl">
          <Header/>
          <Content children={children}/>
      </Container>
    </div>
  );
}

export default App;
