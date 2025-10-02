import { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@components/header";

type Game = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string; 
  startHour: string; 
};

const Program: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/program") 
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Program | Penguin Project</title>
      </Head>
      <Header />
      <main className="mx-auto mt-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">PROGRAM</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="w-full border border-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black py-2">GAME</th>
                <th className="border border-black py-2">DATE</th>
                <th className="border border-black py-2">HOUR</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td className="border border-black px-2 py-2 font-medium">
                    {game.homeTeam} - {game.awayTeam}
                  </td>
                  <td className="border border-black px-2 py-2">
                    {new Date(game.date).toLocaleDateString()}
                  </td>
                  <td className="border border-black px-2 py-2">{game.startHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  );
};

export default Program;