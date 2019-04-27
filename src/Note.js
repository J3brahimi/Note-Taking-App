import React, { Component } from 'react'

export default class Note extends Component {
    constructor(props) {
        super(props);
        this.id = props.id;
    }

    removeItem = () => {
        this.props.removeItem(this.props.id);
    }

    editItem = () => {
        this.props.openEdit(this.props.id);
    }

    render() {
        const { title, content, date, borderColor } = this.props;
        const borderStyle = {
            borderRight: `2px solid ${borderColor}`
        }
        return (
            <div className='noteElement' style={borderStyle}>

                <div>
                    <h4>{title}</h4>
                    <div>
                        <i onClick={this.editItem} className="fas fa-pen fa-flip-horizontal"></i>
                        <i onClick={this.removeItem} className="fas fa-times"></i>
                    </div>

                </div>
                <p>{content}</p>
                <p className='noteDate'>{date}</p>
            </div>
        )
    }
}
