import { React, Component } from 'play-js-react';
import { Cell } from './cell.jsx';
import { CaretLeft } from './icons.jsx';

export class Next extends Component {

  createView = () => (
    <div id="next">
      <div className="tiles">
        {this.props.value.cells.map(cell =>
          <Cell color={cell.color} mark={cell.mark}/>
        )}
      </div>
      <div className="remain">
        <CaretLeft/><span>{this.props.value.remain}</span>
      </div>
    </div>
  );
}
