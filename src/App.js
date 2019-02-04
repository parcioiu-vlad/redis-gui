import React, {Component} from 'react';
import './App.css';
import Tree from "./tree/Tree";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ConnectionModal from "./connection/ConnectionModal";

class App extends Component {

  constructor() {
    super();
    this.state = {
      items: {
        name: 'Node1',
        children: [
          {name: 'Node1.2'},
          {name: 'Node1.3', children: [{name: 'Node1.3.1'}]}
        ]
      },
      showConnectionModal: false
    };

    this.openCreateConnection = this.openCreateConnection.bind(this);
    this.handleClose = this.handleClose.bind(this);

    let ipcRenderer = window.require('electron').ipcRenderer;

    if (ipcRenderer) {
      let self = this;
      ipcRenderer.on('connected', function (event, arg) {
        //TODO show success message
        //TODO add the created connection to tree
        alert('connected');
        self.setState({showConnectionModal: false});
      })
    }

  }

  openCreateConnection() {
    this.setState(
        {showConnectionModal: !this.state.showConnectionModal});
    this.state.showConnectionModal = !this.state.showConnectionModal;

  }

  handleClose() {
    this.setState({showConnectionModal: false});
  }

  render() {
    return (
        <div className="App">

          <div>
            <Grid item xs={3}>
              <Button variant="contained" color="primary"
                      onClick={this.openCreateConnection}>
                Create connection
              </Button>
              <ConnectionModal open={this.state.showConnectionModal}
                               onClose={this.handleClose}/>
            </Grid>

          </div>

          <Grid item xs={3}>
            <Tree data={this.state.items}/>
          </Grid>
        </div>
    );
  }
}

export default App;
