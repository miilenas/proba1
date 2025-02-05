import React, { useState } from "react";
import Navbar from "./Components/NavBar";
import Login from "./Login";

function App() {
  const [userType, setUserType] = useState(null); // Na početku nema prijavljenog korisnika

  const handleLoginSuccess = (type) => {
    setUserType(type); // Postavljamo tip korisnika kada se uspešno prijavi
  };

  return (
    <div>
      {!userType ? (
        // Ako korisnik nije prijavljen, prikazujemo Login komponentu
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        // Ako je korisnik prijavljen, prikazujemo Navbar i sadržaj
        <>
          <Navbar userType={userType} />
          <div style={{ padding: "20px" }}>
            <h2>Welcome to e-Banking!</h2>
            <p>Prikazivanje sadržaja zavisi od korisničkog tipa!</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
