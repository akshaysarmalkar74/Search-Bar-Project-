import { useState, useEffect } from "react";
import AnimeForm from "./AnimeForm";
import axios from "axios";

export default function AnimeFormDisplay() {
  const [animeName, setAnimeName] = useState({ name: "" });
  const [searchResult, setResult] = useState({ data: null, loading: true });
  {
    console.log(searchResult);
  }

  const options = {
    method: "GET",
    url: "https://anime-db.p.rapidapi.com/anime",
    params: {
      page: "1",
      size: "10",
      search: animeName.name,
    },
    headers: {
      "X-RapidAPI-Key": "bb39fbd85emshe8dd5bbe01a959fp1483dfjsn281f51c9d2c9",
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  useEffect(
    function fetchresult() {
      const fetchData = async () => {
        const request = await axios.request(options);

        const responseValue = request.data;
        console.log(responseValue);
        setResult({ data: responseValue, loading: false });
      };
      fetchData();
    },
    [animeName]
  );

  const Search = (anime) => {
    setResult({ data: null, loading: true });
    setAnimeName(anime);
  };

  if (searchResult.loading) return <h2>Loading...</h2>;

  return (
    <div>
      <AnimeForm Search={Search} />

      {searchResult.data && searchResult.data.length > 0 ? (
        <ul>
          {searchResult.data.map((anime) => (
            <li key={anime._id}>
              {anime.title}
              <img
                key={anime._id}
                src={anime.image}
                alt={anime.title}
                style={{ maxWidth: "100px" }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No anime found.</p>
      )}
    </div>
  );
}
