import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "fa fa-heart";
    if (!this.props.liked) classes += "-o";
    console.log("Like", this.props.liked);
    return (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        className={classes}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
