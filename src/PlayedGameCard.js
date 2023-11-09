const PlayedGameCard = ({ gameId, gameScore,index,contract,Claimed,getBool }) => {

  const onGetTokensClick = async (gameId) => {

      try {
        const tx = await contract.claimTokensFromPlayedGame(gameId);
        await tx.wait();
        console.log('Tokens claimed!');
        alert("Tokens claimed!");
        getBool(true);
      } catch (error) {
        console.error(error);
      }
  };
  

    return (
      <div className="PlayedGameCard">
          <div>
            <strong>Game ID:</strong> {index + 1}
          </div>
          <div>
            <strong>Game Score:</strong> {gameScore}
          </div>
          
          {<button className={Claimed?'Checked':"notChecked"} checked={Claimed?true:false} variant="contained" color="primary" onClick={() => onGetTokensClick(gameId)}> 
            {Claimed?'Tokens Claimed':'Claim Tokens'}
          </button>
          }
          {/* {Claimed && <div>Tokens Claimed</div>} */}
      </div>
    );
  };

export default PlayedGameCard;