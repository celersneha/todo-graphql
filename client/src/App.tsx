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
        <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
        <div className="absolute top-50 left-40 w-32 h-32 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
        <div className="absolute bottom-30 left-70 w-24 h-24 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
        <div className="absolute top-50 right-40 w-32 h-32 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
        <div className="absolute bottom-30 right-70 w-24 h-24 rounded-full bg-[#6949ff]/5 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#c961ff]/5 animate-pulse"></div>
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
