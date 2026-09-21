import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Createaccount from "./pages/Createaccount";
import Connectwallet from "./pages/Connectwallet";
import Artistpage from "./pages/Artistpage";

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
          path="/artist-page"
          element={<Artistpage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;