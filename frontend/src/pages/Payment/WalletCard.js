// https://docs.metamask.io/guide/ethereum-provider.html#using-the-provider
import Web3 from 'web3'
import React, {useState} from 'react'
import {ethers} from 'ethers'
import './WalletCard.css'
import { Navigate ,useLocation} from 'react-router-dom'
import axios from '../../utils/axios'
const WalletCard = () => {
	const location=useLocation();
    const object=location.state;
	const account='';
	const [account1, setaccount] = useState(null);
	const[cadd,setcontadd]=useState(null);
	const[cacc,setcontacc]=useState(null);
	const[bal,getbal]=useState(null);
        const connectMetamask = async () => {
            if(window.ethereum && window.ethereum.isMetaMask) {
				window.ethereum.request({method: "eth_requestAccounts"})
				.then(result => {
								setaccount(result[0]);
								connectContract();
							})
							.catch(error => {
							console.log("error occured");
							});
            }
        }
        const connectContract = async () => {
            const ABI =[
				{
					"inputs": [],
					"name": "deposit",
					"outputs": [],
					"stateMutability": "payable",
					"type": "function"
				},
				{
					"inputs": [
						{
							"internalType": "address payable",
							"name": "_to",
							"type": "address"
						},
						{
							"internalType": "uint256",
							"name": "_amount",
							"type": "uint256"
						}
					],
					"name": "withdraw",
					"outputs": [],
					"stateMutability": "nonpayable",
					"type": "function"
				},
				{
					"inputs": [],
					"name": "getAddress",
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
					"name": "getBalance",
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
            const Address = "0x193083BE389384C664b4668333390844450c9C92";
            window.web3 = await new Web3(window.ethereum);
			console.log(window.web3);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
			setcontadd(window.contract);
			getContractAccount();
        }

        const getContractAccount = async () => {
            const data = await window.contract.methods.getAddress().call();
			setcontacc(data);
        }

        const getBalanceApple = async () => {
            const data = await window.contract.methods.getBalance().call();
			getbal(data);
        }

        const depositContract = async () => {
            const amount = "100000000000000000";
            await window.contract.methods.deposit().send({from: account1, value: amount});
			getBalanceApple();
			withdraw();
        }
		if(bal!=null){
			 const addToList =  async() => {
        try {
		if(object.rent===true){
			await axios.post("http://localhost:5000/api/user/rent", {
            email: object.user.email,
            data: {movie:object.movie,date:new Date(),id:object.movie.id},
          });
		}
		else{
			await axios.post("http://localhost:5000/api/user/add", {
				email: object.user.email,
				data: object.movie,
			  });
		}  
        } catch (error) {
          console.log(error);
        }
      };
	  addToList()
			return <Navigate to='/Movie' state={object.movie} />
		}
        const withdraw = async () => {
            const amount = "100000000000000000";
            const address = "0x94eF74Fe142F072c86715fc690d2423fb86C46B5";
            await window.contract.methods.withdraw(address, amount).send({from: account1});
        }

	return (
		<div className='walletCard'>
		<h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
			<button onClick={connectMetamask}>connect to metamask</button>
			<div className='accountDisplay'>
				<h3>Address: {account1} {bal}</h3>
			</div>
			<button onClick={depositContract}>deposit</button>
			<div className='balanceDisplay'>
				<h3>Balance: {bal}</h3>
			</div>
			{/* {errorMessage} */}
		</div>
	);
}

export default WalletCard;