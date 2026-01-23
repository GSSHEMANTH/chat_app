
import Login from "./Login";
import Chat from "./Chat";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    
  );
}

export default App;
