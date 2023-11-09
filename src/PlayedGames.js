import React, { useEffect, useState } from 'react';
import PlayedGameCard from './PlayedGameCard';


const PlayedGames = ({contract,account,newScore}) => {

  const [games,setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading,setIsloading] = useState(true);
  const [bool,setBool] = useState(false);

  const BoolHandler =() => {

   setBool(true);
  };
  

  useEffect(()=>{

   const fetchArray = async () => {

      try {
        const array = await contract.getGamesHistory();
        setGames(array);
        setIsloading(false);
        console.log(array);
        
      } catch (error) {
        console.log(error);
      }

    }
    fetchArray();
  },[contract,bool,newScore]);

  

 
  useEffect(() => {
    if (!isLoading) {
      const filtered = games.filter((game) => game.Gamer === account);
      setFilteredGames(filtered);
    }
  }, [games, account, isLoading]);

  console.log(filteredGames);


  return (
    <div className='PlayedGames'>
      {!isLoading && filteredGames && filteredGames.map((game, index) => (
        <PlayedGameCard
          key={index}
          gameId={game.GameId.toNumber()}
          gameScore={game.GameScore.toNumber()}
          index={index}
          contract={contract}
          Claimed={game.Claimed}
          getBool={BoolHandler}
        />
      ))}
       {isLoading && <div>Loading...</div>}
       {!isLoading && filteredGames.length === 0 && <div>No games played yet</div>}
    </div>
   
  );
};

export default PlayedGames;
