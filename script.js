window.web3.currentProvider.enable();
console.log(window.web3.currentProvider.enable());
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log('Yes web3 provider detected');
} else {
    console.log('No web3 provider detected');
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/ab8d09c017fb4c3eaccd8f2e71447740"));
};

var Tx = ethereumjs.Tx;


web3.eth.getAccounts().then(function (result) {
    web3.eth.defaultAccount = result[0];
    console.log(web3.eth.defaultAccount);
	account = web3.eth.defaultAccount;
});

web3.eth.handleRevert = true;

var abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address payable[]",
				"name": "to",
				"type": "address[]"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Sent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "AddMoney",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "GoodMen",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "HowManyGoodMen",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "HowMuchMoneyDoWeHave",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "Id",
				"type": "uint256"
			}
		],
		"name": "WhoIsGoodMan",
		"outputs": [
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
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "Id",
				"type": "uint256"
			}
		],
		"name": "WhoIsIndigent",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "gmens",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "Addr2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Money2",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "indigentAccs",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "indigents",
		"outputs": [
			{
				"internalType": "string",
				"name": "Desease",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Name",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "Addr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "Perc",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_desease",
				"type": "string"
			}
		],
		"name": "register",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let privateKey = new ethereumjs.Buffer.Buffer('bfb935c2fbb12159489a5b573c20b0063bc3ef324774d540f04a5c6b51b81390', 'hex');
const contractAddress = "0x31A4aD0CDe53B4b1D6C3281cC5e0fBFF5Cc29a56"; // Deployed manually
var Charity = new web3.eth.Contract(abi, contractAddress);
var HashOut;

function addMoney1() {
    var mon = document.getElementById("Money").value
        Charity.methods.AddMoney().send({
        from: web3.eth.defaultAccount,
        value: web3.utils.toWei(mon, "ether")
    }, function (error, result) {
        console.log("Money to send:", mon);
    });
};

function Registr() {
    var name1 = document.getElementById("Name").value;
    var desease = document.getElementById("Desease").value;
    Charity.methods.register(name1, desease).send({
        from: web3.eth.defaultAccount
    }, function (error, result) {
        console.log("Registered");
    }); //функция без параметров
};

function ShowTransaction(HashOut) {
    window.open('https://ropsten.etherscan.io/tx/' + HashOut);
}

function Check3() {
    var id1 = document.getElementById("ID1").value;
    Charity.methods.WhoIsIndigent(id1).call({
        from: web3.eth.defaultAccount
    }, function (error, result) {
        console.log("Indigent man", result);
        document.getElementById("myTextOutPut3").value = "Имя: " + result[0] + "\n" + "Заболевание: " + result[1] + "\n" + "Адрес: " + result[2];
    }); //функция без параметров
};

function Check4() {
    var id2 = document.getElementById("ID2").value;
    Charity.methods.WhoIsGoodMan(id2).call({
        from: web3.eth.defaultAccount
    }, function (error, result) {
        console.log("Donator", result);
        document.getElementById("myTextOutPut4").value = "Адрес: " + result[0] + "\n" + "Денег: " + result[1];
    }); //функция без параметров
};

function Check2() {
    Charity.methods.HowMuchMoneyDoWeHave().call({
        from: web3.eth.defaultAccount
    }, function (error, result) {
        console.log("Donation money", result);
        document.getElementById("myTextOutPut2").value = result / 1000000000000000000;
    }); //функция без параметров
};

function Check1() {
    Charity.methods.HowManyGoodMen().call({
        from: web3.eth.defaultAccount
    }, function (error, result) {
        console.log("How Many Good Men", result);
        document.getElementById("myTextOutPut1").value = result;
    }); //функция без параметров
};

var event = Charity.events.Sent(function (error, result) {
    if (!error)
        console.log(result);
});
