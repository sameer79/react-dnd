import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Target extends Component {
  constructor(props) {
    super(props);
    this.lists = this.renderList(props) || [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item !== this.props.item) {
      this.renderList(nextProps);
    }
  }

  renderList = props => {
    const {item} = props;
    if (item !== null) {
      const index = this.lists.findIndex((l) => l.id === item.id);
      if (index < 0) {
        this.lists.push(item);
      }
    }
    return this.lists;
  }

  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';

    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        {
          this.lists.map((list, i) => {
            return <div key={i}>
              Drop items id: {list.id}
            </div>
          })
        }
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);
