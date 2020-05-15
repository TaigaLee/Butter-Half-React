import React from "react";
import CometChatUnified from "../CometChat/src/lib/CometChat/components/CometChatUnified";

export default class ChatDashboard extends React.Component {
  render() {
    return (
      <div>
        <CometChatUnified />
        <button
          onClick={this.props.switchViewingChat}
          style={{
            width: "100vw",
            height: "5vh",
            backgroundColor: "red",
            fontFamily: "Advent Pro",
            color: "white",
            fontSize: "1.5em",
          }}
        >
          Exit Chat
        </button>
      </div>
    );
  }
}
