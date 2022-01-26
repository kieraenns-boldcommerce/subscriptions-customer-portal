import { Resets, Vars, Fonts } from "./globalStyles";
import IndexPage from "./pages/index";

const App = () => {
  return (
    <div>

      <Fonts />
      <Resets />
      <Vars />

      <IndexPage />

    </div>
  );
};

export default App;
