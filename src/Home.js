import React, {useState, useEffect} from "react";
import './App.css';
import {ethers} from 'ethers';
function Home(){
      const [currentAccount, setCurrentAccount] = useState("");
      const [contractInstance, setcontractInstance] = useState('');
      const [status,setStatus] = useState(false);
      const [isWinner, setIsWinner] = useState('');

      useEffect (() =>{
         const loadBlockchainData = async () =>{
            if (typeof window.ethereum !== 'undefined'){
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                try{
                     const signer = provider.getSigner();
                     const address = await signer.getAddress();
                     console.log(address);
                     setCurrentAccount(address);
                     window.ethereum.on('accountsChanged' , (accounts) => {
                        setCurrentAccount(accounts[0]);
                        console.log(currentAccount);
                     })
                }catch(err){
                    console.error(err);
                }
            }else {
                alert('Please install Metamask to use this application')
            }
         };

         const contract = async () =>{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // console.log(TokenInteraction.contractAddress,TokenInteraction.contractAbi);
            const contractAddress = '0x9226F4BbD350E10a0e44bF65f4D75A00aE702064';
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
            ]
            const contractIns = new ethers.Contract(contractAddress,contractAbi, signer);
            console.log(contractIns);
            setcontractInstance(contractIns);
            const status = await contractInstance.isComplete();
            setStatus(status);
            const Winner = await contractInstance.getWinner();
            if (Winner === currentAccount){
                setIsWinner(true);
            }else{
                setIsWinner(false);
            }
         }
         loadBlockchainData();
         contract();
      },[currentAccount,contractInstance]);

      const enterLottery = async () => {
        const amountToSend = ethers.utils.parseEther('0.001');
        const tx = await contractInstance.enterGame({value: amountToSend,});
        await tx.wait();
      }

      const claimprize = async () => {
       
        const tx = await contractInstance.claimprize();
        await tx.wait();
      }

       return(
        <div className="container">
            <div className="header1"> 
            <h1>Lottery Page</h1>
            </div>
            <div className="button-container">
                {status ? (isWinner ? (<button className="enter-button" onClick={claimprize}> claimprize </button>):
                 (<p>You are not the winner</p>)) :
                  (<button className="enter-button" onClick={enterLottery}> Enter Lottery </button>)
                }
            </div>
        </div>
       )

}

export default Home ;
