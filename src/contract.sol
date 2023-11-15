// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract LotteryGame is ERC20Capped {
     address public owner;
     uint public numOfGames = 0;

    struct GameInstance{
        address Gamer;
        uint GameId;
        uint GameScore;
        bool Claimed;
    }

    GameInstance[] public Games;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner can call this function"
        );
        _;
    }

    constructor()
        ERC20("LotteryGame", "LT")
        ERC20Capped(1000000 * 1e18)
    {
        // 1,000,000 YT tokens with 18 decimal places (1e18)
        // _mint(msg.sender, 10 * 1e18);
        owner = msg.sender;
    }

      function getTokensToPlayGame() public payable {
        require(
            msg.value >= 0,
            "Send more than 0.001 ETH to receive tokens"
        );
        uint256 tokensToMint = 1000 * 1e18; // 500 tokens with 18 decimal places
        // require(totalSupply() + tokensToMint <= cap(), "Token cap exceeded");
        _mint(msg.sender, tokensToMint);
    }

    // Function to enter a game, charge with 500 tokens, generate a random score, and add to the Games array
    function enterGame() public {
        require(balanceOf(msg.sender) >= 150 * 1e18, "Insufficient tokens to enter the game");

        // Charge the user with 500 tokens
        _transfer(msg.sender, address(this), 150 * 1e18);

        // Generate a random game score (for demonstration purposes)
        uint gameScore = uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, Games.length))) % 50;
        // Create a new GameInstance
        GameInstance memory newGame = GameInstance({
            Gamer: msg.sender,
            GameId:numOfGames,
            GameScore: gameScore,
            Claimed: false
        });

        numOfGames++;

        // Add the new game to the Games array
        Games.push(newGame);
    }

    function claimTokensFromPlayedGame(uint gameIndex) public {
        // require(gameIndex < Games.length, "Invalid game index");
        GameInstance storage game = Games[gameIndex];

        require(!game.Claimed, "Tokens already claimed for this game");
        require(game.Gamer == msg.sender, "You can only claim tokens for your own game");

        // Calculate the tokens to reward based on the game score
        uint tokensToReward;


        if (game.GameScore >= 0 && game.GameScore < 10) {
            tokensToReward = 10 * 1e18;
        } else if (game.GameScore >= 10 && game.GameScore < 20) {
            tokensToReward = 20 * 1e18;
        } else if (game.GameScore >= 20 && game.GameScore < 30) {
            tokensToReward = 60 * 1e18;
        } else if (game.GameScore >= 30 && game.GameScore < 40) {
            tokensToReward = 150 * 1e18;
        } else if (game.GameScore >= 40 && game.GameScore <= 50) {
            tokensToReward = 300 * 1e18;
        } else {
            tokensToReward = 0; // No tokens for scores outside the specified ranges
        }


        // Transfer the rewarded tokens to the player
        _mint( msg.sender, tokensToReward);

        // Set the Claimed boolean to true
        game.Claimed = true;
    }

    function getGamesHistory() public view returns(GameInstance[] memory){
        return Games;
    }
}
