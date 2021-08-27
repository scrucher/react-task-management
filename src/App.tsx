import  React from 'react';
//import TaskApi from './api/task';
import { TaskApp } from './components/tasks.app';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/login.component';
import SignUp from './components/reister.component';

function App() {
//  const [token, setToken] = useState();
//  if (!token){
//    return <Login setToken={setToken} />
//  }
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component= {App}>
            <TaskApp />
          </Route>
          <Route exact path="/login" component={Login} >
            <Login />
          </Route>
          <Route exact path="/signup" component= {SignUp}>
            <SignUp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
