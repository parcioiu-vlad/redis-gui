import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

class ConnectionModal extends Component {

  constructor() {
    super();
    this.state = {
      url: "",
      port: 6379
    };

    this.createConnection = this.createConnection.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  createConnection() {
    let url = this.state.url + ":" + this.state.port;

    fetch('http://localhost:9090/rest/v1/connections/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: url
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    });

  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    return (
        <Dialog open={this.props.open} aria-labelledby="dialog-title">
          <DialogTitle id="dialog-title">Create connection</DialogTitle>
          <form noValidate autoComplete="off">
            <Grid item xs={12}>
              <TextField
                  id="name"
                  label="URL"
                  value={this.state.url}
                  margin="normal"
                  onChange={(event) => this.handleChange("url", event)}
              />
              <TextField
                  id="name"
                  label="Port"
                  value={this.state.port}
                  margin="normal"
                  type="number"
                  onChange={(event) => this.handleChange("port", event)}
              />
            </Grid>

            <Button variant="contained" color="primary" onClick={this.createConnection}>
              Create connection
            </Button>
          </form>
        </Dialog>
    );
  }
}

export default ConnectionModal;
