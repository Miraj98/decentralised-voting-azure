# Demo
### You can view the demo at https://miraj98.github.io/azure-voting-client

# Decentralised voting Azure

1. Using uPort mobile app to issue Voter ID credentials. These credentials will be in the form of "Verifiable credentials"
2. These credentials will be used to authenticate a particular user to vote on the blockchain. He/she will be only able to vote once and only for the candidate registered in their constituency.

## Implementation

We will be using a NodeJs server that will have a couple of functions: Issuing/verifying credentials and showing a list of candidates that can be voted for based on the constituency they are registered in. Once the user is authenticated using the uPort app, he/she will be able to sign a transaction that will be recorded on the blockchain.
