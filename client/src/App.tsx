import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Home from "./components/layout/Home";
import TodoInputForm from "./components/todo/TodoInputForm";
import TodoList from "./components/todo/TodoList";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  if (user) {
    return (
      <>
        <Header />
        <TodoInputForm />
        <TodoList />
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
