const DataStorageABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getTransaction",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
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
		"name": "getTransactionsCount",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_jProvider",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_jSeeker",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_salary",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_razorpayPaymentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_razorpayOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_razorpaySignature",
				"type": "string"
			}
		],
		"name": "storeData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userTransactions",
		"outputs": [
			{
				"internalType": "string",
				"name": "jobProvider",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "jobSeeker",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "salary",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "razorpayPaymentId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "razorpayOrderId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "razorpaySignature",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

module.exports = DataStorageABI;
