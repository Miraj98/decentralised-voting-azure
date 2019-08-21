import React from "react";
import { Grommet, Box, Button, TextInput, Heading } from "grommet";
import { fetchQrCode } from "../networkutils/networkrequests";

const theme = {
  global: {
    font: {
      family: "Lato",
      size: "14px",
      height: "20px"
    }
  }
};

class VoterRegistration extends React.Component {
  state = {
    submitPressed: false,
    name: "",
    constituency: "",
    dob: "",
    walletAddress: "",
    qr: null
  };

  render() {
    if (!this.state.submitPressed) {
      return (
        <Grommet theme={theme} full>
          <Box align="center" flex>
            <Heading margin="small">Registration</Heading>
            <Box margin={{ top: "large" }} gap="large" direction="row">
              <TextInput
                placeholder="Full name"
                value={this.state.name}
                onChange={event => this.setState({ name: event.target.value })}
              />
              <TextInput
                placeholder="Constituency"
                value={this.state.constituency}
                onChange={event => this.setState({ constituency: event.target.value })}
              />
            </Box>
            <Box margin={{ top: "small" }} gap="large" direction="row">
              <TextInput
                placeholder="DD/MM/YYYY (DOB)"
                value={this.state.dob}
                onChange={event => this.setState({ dob: event.target.value })}
              />
              <TextInput
                placeholder="Wallet Address"
                value={this.state.walletAddress}
                onChange={event => this.setState({ walletAddress: event.target.value })}
              />
            </Box>
            <Box margin={{ top: "large" }} gap="large" direction="row">
              <Button
                onClick={async () => {
                  this.setState(() => ({ submitPressed: true }));
                  const { qr } = await fetchQrCode(
                    "https://9b015d10.ngrok.io",
                    {
                      name: this.state.name,
                      dob: this.state.dob,
                      walletAddr: this.state.walletAddress,
                      constituency: this.state.constituency
                    }
                  );
                  console.log(qr);
                  this.setState(() => ({ qr }));
                }}
                primary
                label="Submit"
                hoverIndicator="background"
              />
            </Box>
          </Box>
        </Grommet>
      );
    } else {
      return (
        <Box align="center" flex>
          <Heading margin="medium" level={2}>Scan this QR code with the uPort app to get a digital version of your Voter ID.</Heading>
          <img alt="fetching qr code" src={`${this.state.qr}`} sityle={{ height: 300, width: 300 }} />
        </Box>
      );
    }
  }
}

export default VoterRegistration;
