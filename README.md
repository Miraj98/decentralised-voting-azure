# Demo
### You can view the demo at https://miraj98.github.io/azure-voting-client

**The blockchain is successfully running on Azure.** Here is the RPC-endpoint: https://blockchainfyjsubbloc.blockchain.azure.com:3200/OBwwyHUPU7aZFrPT5aCtRkzm

**Note** that most transactions are handled by a backend server, however **transactions related to actual voting need to be performed by voters manually** and hence they need to have their own wallet (the easiest way is to use MetaMask extension in the browser) to sign transactions. Hence to connect to the Azure Blockchain they will have to use "Custom RPC" option in MetaMask and paste the RPC endpoint provided above to be able to interact with the blockchain and the contracts deployed on it. 

# Decentralised voting Azure

1. Using uPort mobile app to issue Voter ID credentials. These credentials will be in the form of "Verifiable credentials"
2. These credentials will be used to authenticate a particular user to vote on the blockchain. He/she will be only able to vote once and only for the candidate registered in their constituency.

## Implementation

We will be using a NodeJs server that will have a couple of functions: Issuing/verifying credentials and showing a list of candidates that can be voted for based on the constituency they are registered in. Once the user is authenticated using the uPort app, he/she will be able to sign a transaction that will be recorded on the blockchain.
