import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';
import { SuitSpade, SuitHeart, SuitDiamond, SuitClub, Sun } from './icons.jsx';

function getIcon(mark) {
  switch (mark) {
    case 1: return <SuitSpade/>;
    case 2: return <SuitHeart/>;
    case 3: return <SuitDiamond/>;
    case 4: return <SuitClub/>;
    case 5: return <Sun/>;
  }
}

export class Cell extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      helper.addBaseClass('cell');

      if (helper.value.tile?.color) {
        helper.addBaseClass('color' + helper.value.tile.color);
      } else if (helper.value.check) {
        helper.addBaseClass('check' + helper.value.check);
      }

      return (
        <div
          className={helper.getClassName()}
          onClick={helper.getHandleClick()}
          onContextMenu={helper.getHandleContextMenu()}>

          {helper.value.tile?.mark && getIcon(helper.value.tile.mark)}
        </div>
      );
    });
  }

  handleClick(event) {
    new JsxHelper(this).runDefaultHandleClick(event);
  }

  handleContextMenu(event) {
    new JsxHelper(this).runDefaultHandleContextMenu(event);
  }
}
