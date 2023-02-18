import Main from "./components/Main";

export default function App() {
  return (
    <div className="flex justify-center items-center w-screen h-full min-h-screen space-x-5 bg-blue-400 overflow-auto">
      <div className="bg-white rounded-lg p-10">
        <Main />
      </div>
    </div>
  );
}
