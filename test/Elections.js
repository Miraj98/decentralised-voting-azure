const Elections = artifacts.require("Elections");
contract('Elections', (accounts) => {

    it('testing ResponseMessage of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var returnValue1;
        returnValue1 = await ElectionsInstance.ResponseMessage.call();

        // Write an assertion below to check the return value of ResponseMessage.
        assert.equal('something', 'something', 'A correctness property about ResponseMessage of Elections');
    });

    it('testing Responder of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var returnValue1;
        returnValue1 = await ElectionsInstance.Responder.call();

        // Write an assertion below to check the return value of Responder.
        assert.equal('something', 'something', 'A correctness property about Responder of Elections');
    });

    it('testing RequestMessage of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var returnValue1;
        returnValue1 = await ElectionsInstance.RequestMessage.call();

        // Write an assertion below to check the return value of RequestMessage.
        assert.equal('something', 'something', 'A correctness property about RequestMessage of Elections');
    });

    it('testing State of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var returnValue1;
        returnValue1 = await ElectionsInstance.State.call();

        // Write an assertion below to check the return value of State.
        assert.equal('something', 'something', 'A correctness property about State of Elections');
    });

    it('testing Requestor of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var returnValue1;
        returnValue1 = await ElectionsInstance.Requestor.call();

        // Write an assertion below to check the return value of Requestor.
        assert.equal('something', 'something', 'A correctness property about Requestor of Elections');
    });

    it('testing SendRequest of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var callerAccount = accounts[0];
        var requestMessage1 = "StringValue1";
        await ElectionsInstance.SendRequest(requestMessage1, {from: callerAccount});

        // Because the function call can change the state of contract Elections, please write assertions
        // below to check the contract state.
        assert.equal('something', 'something', 'A correctness property about SendRequest of Elections');
    });

    it('testing SendResponse of Elections', async () => {
        const ElectionsInstance = await Elections.deployed();
        var callerAccount = accounts[0];
        var responseMessage1 = "StringValue1";
        await ElectionsInstance.SendResponse(responseMessage1, {from: callerAccount});

        // Because the function call can change the state of contract Elections, please write assertions
        // below to check the contract state.
        assert.equal('something', 'something', 'A correctness property about SendResponse of Elections');
    });

});