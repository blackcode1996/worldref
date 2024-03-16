import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../component/Card";

interface UserData {
  name: string;
  email: string;
}

const Home: React.FC<{ userData?: UserData; token?: string | null }> = () => {
  const [cardsData, setCardsData] = useState<any[]>([]);
  const token = JSON.parse(localStorage.getItem("token") ?? "null");
  const userData = JSON.parse(localStorage.getItem("userData") ?? "{}");

  useEffect(() => {
    if (token) {
      axios
        .get("https://worldref-nine.vercel.app/cardsData", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCardsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching cards data:", error);
        });
    }
  }, [token]);

  return (
    <div className="container">
      {userData && <p>Hello {userData.name}</p>}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {cardsData.map((card, index) => (
          <div key={index} className="col">
            <Card data={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
