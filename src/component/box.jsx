import { React, Component } from 'play-js-react';
import { Cell } from './cell.jsx';

export class Box extends Component {

  createView = () => (
    <div id="box">
      {this.props.value.cells.flat().map(cell =>
        <Cell
          position={cell.position}
          startable={cell.startable}
          color={cell.color}
          mark={cell.mark}
          check={cell.check}
          onClick={this.props.onClick}
          onContextMenu={this.props.onContextMenu}/>
      )}
    </div>
  );
}
