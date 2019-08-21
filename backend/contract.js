exports.abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "VoterList",
    "outputs": [
      {
        "name": "constituency",
        "type": "string"
      },
      {
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "name": "voted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x0098a51a"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "CandidateList",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "constituency",
        "type": "string"
      },
      {
        "name": "politicalParty",
        "type": "string"
      },
      {
        "name": "voteCount",
        "type": "uint256"
      },
      {
        "name": "isRegistered",
        "type": "bool"
      },
      {
        "name": "candidateAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x0a03fff1"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "ElectionChairperson",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3a97f669"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "VoterAddressList",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x79784eeb"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "State",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf1b6dccd"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "CandidateAddressList",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xf737bc0a"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor",
    "signature": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "VotingStarts",
    "type": "event",
    "signature": "0x2b1dc6350e3f2860a3375210062f7102aeb9c86eea93e2ea103489a0092027c3"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "VotingEnds",
    "type": "event",
    "signature": "0xf9bbc368da798b232cf047dd7b172615dc07914724c2722bd2591564d77294a5"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "applicationName",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "workflowName",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "originatingAddress",
        "type": "address"
      }
    ],
    "name": "WorkbenchContractCreated",
    "type": "event",
    "signature": "0x5164ff06e10737dceb282871701b28082988339e79ba9d49c6c9b0e00312982b"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "applicationName",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "workflowName",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "action",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "originatingAddress",
        "type": "address"
      }
    ],
    "name": "WorkbenchContractUpdated",
    "type": "event",
    "signature": "0xa13bd79f323c399d36191e886ded389c940ccd7e6dd744d1505943592fb2b433"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCandidateList",
    "outputs": [
      {
        "components": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "constituency",
            "type": "string"
          },
          {
            "name": "politicalParty",
            "type": "string"
          },
          {
            "name": "voteCount",
            "type": "uint256"
          },
          {
            "name": "isRegistered",
            "type": "bool"
          },
          {
            "name": "candidateAddress",
            "type": "address"
          }
        ],
        "name": "candidates",
        "type": "tuple[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfdbc4006"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_constituency",
        "type": "string"
      },
      {
        "name": "_politicalParty",
        "type": "string"
      },
      {
        "name": "candidateAddress",
        "type": "address"
      }
    ],
    "name": "registerCandidate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xe2e989b2"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_constituency",
        "type": "string"
      },
      {
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "registerVoter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x4a075de2"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "candidate",
        "type": "address"
      },
      {
        "name": "voter",
        "type": "address"
      },
      {
        "name": "otp",
        "type": "uint256"
      }
    ],
    "name": "voteForCandidate",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xd5e14fe2"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "otp",
        "type": "uint256"
      },
      {
        "name": "voterAddress",
        "type": "address"
      }
    ],
    "name": "mapOTP",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xb2ab8ec6"
  }
]