import React from "react";

export type SquareValue = "X" | "O" | null;

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
}

export class Square extends React.Component<SquareProps> {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}
