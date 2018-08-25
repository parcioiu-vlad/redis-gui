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
      port: 6379,
      connectionName: ''
    };

    this.ipcRenderer = window.require('electron').ipcRenderer;

    this.createConnection = this.createConnection.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  createConnection() {
    let connection = {
      host: this.state.url,
      port: this.state.port,
      connectionName: this.state.connectionName
    };
    this.ipcRenderer.send('createConnection', connection);
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
                  label="Connection name"
                  value={this.state.connectionName}
                  margin="normal"
                  onChange={(event) => this.handleChange("connectionName", event)}
              />
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
