pragma solidity ^0.5.10;
import "./WorkbenchBase.sol";

contract Election is WorkbenchBase("BallotApplication", "BallotApplication") {

  struct Voter {
    string constituency;
    bool isRegistered;
    bool voted;
    address vote; //Wallet address of the person voted for
  }

  struct Candidate {
    string name;
    string constituency;
    string politicalParty;
    uint voteCount;
    bool isRegistered;
  }

  //events
  event VotingStarts();
  event VotingEnds();

  //state
  enum ElectionStatus { ContractCreated, VotingStarted, VotingEnded }

  //Roles and properties
  ElectionStatus public State;
  address public ElectionChairperson;
  mapping (address => Candidate) public CandidateList;
  mapping (address => Voter) public VoterList;

  constructor() public {
    ElectionChairperson = msg.sender;
    State = ElectionStatus.ContractCreated;
  }

  modifier isValidVote(address candidate, address voter) {
    require(
      CandidateList[candidate].isRegistered == true &&
      VoterList[voter].isRegistered == true &&
      VoterList[voter].voted == false &&
      keccak256(abi.encodePacked(CandidateList[candidate].constituency)) == keccak256(abi.encodePacked(VoterList[voter].constituency)),
      "Invalid vote!"
    );
    _;
  }
  modifier isAuthorized(address caller) {
    require(caller == ElectionChairperson, "Your are not authorized to call this function!");
    _;
  }

  function registerCandidate(
    string calldata _name,
    string calldata _constituency,
    string calldata _politicalParty,
    address candidateAddress
  ) external isAuthorized(msg.sender) {
    Candidate memory newCandidate = Candidate({
      name: _name,
      constituency: _constituency,
      politicalParty: _politicalParty,
      voteCount: 0,
      isRegistered: true
    });
    // Commiting this Cadidate to storage by including it in the CandidateList property
    CandidateList[candidateAddress] = newCandidate;
  }

  function registerVoter(
    string calldata _constituency,
    address voterAddress
  ) external isAuthorized(msg.sender) {
    Voter memory newVoter = Voter({
      constituency: _constituency,
      voted: false,
      vote: address(0),
      isRegistered: true
    });
    VoterList[voterAddress] = newVoter;
  }

  function voteForCandidate(
    address candidate,
    address voter
  ) external isValidVote(candidate, voter) {
    VoterList[voter].vote = candidate;
    VoterList[voter].voted = true;
    CandidateList[candidate].voteCount = CandidateList[candidate].voteCount + 1;
  }

}