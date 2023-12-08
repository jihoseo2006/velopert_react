import './App.css';
import { UsersProvider } from './UserContext.js';
import Users from './Users';

function App() {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

export default App;
