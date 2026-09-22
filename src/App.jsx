// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Homepage from "./pages/Homepage";
// import Createaccount from "./pages/Createaccount";
// import Connectwallet from "./pages/Connectwallet";
// import Artistpage from "./pages/Artistpage";
// import Market from "./marketplace/market";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Homepage />} />

//       <Route path="/marketplace" element={<Market />} />

      // <Route
      //   path="/create-account"
      //   element={<Createaccount />}
      // />

      // <Route
      //   path="/connect-wallet"
      //   element={<Connectwallet />}
      // />

      // <Route
      //   path="/artist-page"
      //   element={<Artistpage />}
      // />
//     </Routes>
//   );
// };

// export default App;





import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import NFT from "./nftpage/NFT";
import Createaccount from "./pages/Createaccount";
import Connectwallet from "./pages/Connectwallet";
import Artist from "./artistpage/Artist";
import Market from "./marketplace/market";
import Collection from "./collectionpage/Collection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/marketplace" element={<Market />} />

      <Route path="/nft/:id" element={<NFT />} />

      <Route path="/create-account" element={<Createaccount />}/>

      <Route path="/connect-wallet" element={<Connectwallet />}/>

       <Route path="/artist" element={<Artist />} />
       
       <Route path="/collections" element={<Collection />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;