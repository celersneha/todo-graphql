import Header from "./components/layout/Header";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  return <Header />;
}

export default App;
