import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MindMapBuilder } from './mindMapBuilder/MindMapBuilder';
import { LibraryMindMap } from './library/LibraryMindMap';

const  App: React.FC = () => {
  return (
    <Router>
      <Route path='/' exact component={MindMapBuilder} />
      <Route path='/library_mindmap' component={LibraryMindMap} />
    </Router>
  );
}

export default App;