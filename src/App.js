import logo from "./logo.svg";
import "./App.css";
import Editor from "./libs/editor";

function App() {
  return (
    <div className="w-full h-full px-12 flex justify-center">
      <div className="w-full  sticky top-0 max-w-2xl mx-auto h-full rounded border-l border-gray-300 py-12">
        <Editor />
      </div>
    </div>
  );
}

export default App;
