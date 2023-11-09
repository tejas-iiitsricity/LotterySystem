import React, { useState, useEffect ,useCallback} from 'react';
import './App.css';
import { ethers } from 'ethers';
import PlayedGames from './PlayedGames';

function App() {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);
  const [finishedGame, setFinishedGame] = useState(0);

  const contractAddress = "0x6AA6461baa9c8543a2F3d2B52784a9Df546f415d";
  const contractAbi =[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "gameIndex",
				"type": "uint256"
			}
		],
		"name": "claimTokensFromPlayedGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "enterGame",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "increasedSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "cap",
				"type": "uint256"
			}
		],
		"name": "ERC20ExceededCap",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cap",
				"type": "uint256"
			}
		],
		"name": "ERC20InvalidCap",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getTokensToPlayGame",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cap",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Games",
		"outputs": [
			{
				"internalType": "address",
				"name": "Gamer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "GameId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "GameScore",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "Claimed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGamesHistory",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "Gamer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "GameId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "GameScore",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "Claimed",
						"type": "bool"
					}
				],
				"internalType": "struct LotteryGame.GameInstance[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numOfGames",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


useEffect(() => {
    const loadContractData = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractAbi, signer);
          setContract(contract);
        } catch (error) {
          console.error("Error loading contract data:", error);
        }
      } else {
        alert("Install MetaMask dude");
      }
    };

    loadContractData();
  }, []);
  
  // Log the balance after it's been set in the state
  useEffect(() => {
    if (contract && typeof window.ethereum !== "undefined") {
      const loadAccountAndBalance = async () => {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);

          const userBalance = await contract.balanceOf(account);
          const finalBal = ethers.utils.formatEther(userBalance);
          setBalance(finalBal);
        } catch (error) {
          console.error("Error loading account and balance:", error);
        }
      };

      loadAccountAndBalance();
    }
  }, [contract, account,finishedGame]);

  useEffect(() => {
	if (contract && typeof window.ethereum !== "undefined") {
	  const loadAccountAndBalance = async () => {
		try {
		  const provider = new ethers.providers.Web3Provider(window.ethereum);
  
		  // Listen for changes in the connected accounts
		  window.ethereum.on("accountsChanged",async (accounts) => {
			setAccount(accounts[0]);
  
			const userBalance = await contract.balanceOf(accounts[0]);
			const finalBal = ethers.utils.formatEther(userBalance);
			setBalance(finalBal);
		  });
  
		  // Get the initial connected account
		  const accounts = await provider.listAccounts();
		  setAccount(accounts[0]);
  
		  // Fetch the balance associated with the initial account
		  const userBalance = await contract.balanceOf(accounts[0]);
		  const finalBal = ethers.utils.formatEther(userBalance);
		  setBalance(finalBal);
		} catch (error) {
		  console.error("Error loading account and balance:", error);
		}
	  };
  
	  loadAccountAndBalance();
	}
  }, [contract,account,finishedGame]);
  

  const enterGame = async () => {
    try {
      const tx = await contract.enterGame();
	  if(tx){
		setFinishedGame(true);
	}
    } catch (error) {
      console.error(error);
    }
  };

  const getTokens =async()  => {
	try {
	  const tx = await contract.getTokensToPlayGame({ value: ethers.utils.parseEther("0") });
	  if(tx){
		  setFinishedGame(true);
	  }
	} catch (error) {
	  console.error(error);
	}
  };

 
 

  console.log(contract);
  console.log(account);

  return (
    <div className="App">
      <div className='header1'>
	  	<h1>Lottery System</h1>
		</div>
		<div className='Header2'>
			<button className='GetTokens' onClick={getTokens}>GetTokens</button>
			<p>Connected Account: <span className='AccountNumber'>{account}</span></p>
			<p>Your Token Balance: <b>{balance} YT</b></p>
			<button className='EnterGame' onClick={enterGame}>Enter Game</button>
		</div>
      {/* <Usergames contractInstance={contract} currentAccount={account}/> */}
      <br></br>
      <br></br>
      <br></br>
      <div className='Header3'>
	  <h1>User Games</h1>
		</div>
      <PlayedGames contract={contract} account={account} newScore={finishedGame}/>
    </div>
  );
}

export default App;
