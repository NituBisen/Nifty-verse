import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Connectwallet from "./pages/Connectwallet";
import Artistpage from "./pages/Artistpage";
import Rankingpage from "./pages/Rankingpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />} />

        <Route
          path="/create-account"
          element={<Createaccount />}
        />

        <Route
          path="/connect-wallet"
          element={<Connectwallet />}
        />

        <Route
          path="/artist"
          element={<Artistpage />}
        />

        <Route
          path="/ranking-page"
          element={<Rankingpage />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;