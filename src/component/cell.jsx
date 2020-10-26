import { React, Component, Classes } from 'play-js-react';
import { SuitSpade, SuitHeart, SuitDiamond, SuitClub, Sun } from './icons.jsx';

class Mark extends Component {

  createView = () => {
    switch (this.props.value) {
      case 1: return <SuitSpade/>;
      case 2: return <SuitHeart/>;
      case 3: return <SuitDiamond/>;
      case 4: return <SuitClub/>;
      case 5: return <Sun/>;
      default: return <span>&nbsp;</span>;
    }
  }
}

export class Cell extends Component {

  argsOnClick = (event) => [this.props.position];
  argsOnContextMenu = (event) => [this.props.position];

  createView = () => {
    const className = new Classes('cell')
      .add(this.props.startable && 'startable')
      .add('color', this.props.color)
      .add('check', !this.props.color && this.props.check)
      .value;

    return (
      <div
        className={className}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}>

        <Mark value={this.props.mark}/>
      </div>
    );
  }
}
