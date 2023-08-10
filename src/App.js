import './App.css';
import React from 'react';
import TextEditorComponent from './components/EditorComponent/TextEditorComponent';

const App = () => {
  return (
    <div className="App">
      <center>
        React Editify App
        <div style={{padding: '15px'}}>
          <TextEditorComponent />
        </div>
      </center>
    </div>
  );
}

export default App;
