import React, { Component } from 'react';
import './tree.css';

class Tree extends Component {
  render() {
    const data = this.props.data;
    if (!data) {
      return null;
    }

    let nodes = null;

    if (data.children) {
      nodes = data.children.map(function(node, index) {
        return <li key={node.name}><Tree data={node}/></li>
      });
    }

    return (
        <div>
          <span>{data.name}</span>
          <ul>{nodes}</ul>
        </div>
    );
  }
}

export default Tree;
