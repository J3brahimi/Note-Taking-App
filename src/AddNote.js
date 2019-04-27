import React, { Component } from 'react';

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0, // note id
            newNoteTitle: '', // note title
            newNoteContent: '', // note content 
            borderColor: 'rgba(229, 57, 53,1.0)', // border color
            isTextareaEmpty: false, // check textarea input is empty?
            isTitleEmpty: false, // check title input is empty?
            colorBtnDisabler: 0,
        }

    }

    // set newNoteContent value from textarea
    handleUserInput = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }


    writeNote = () => {

        const { id, newNoteTitle, newNoteContent, borderColor } = this.state;

        // get persian date
        const date = new Date().fa();
        const today = `${date.toString('dddd')} ${date.toString('dd')} ${date.toString('MMMM')}`;

        const note = { localId: id, title: newNoteTitle, content: newNoteContent, date: today, borderColor: borderColor };


        // checking is inputs empty?
        if (newNoteTitle === '') {
            this.setState({ isTitleEmpty: true });
            if (newNoteContent !== '') {
                this.setState({ isTextareaEmpty: false });
            }
        }
        if (newNoteContent === '') {
            this.setState({ isTextareaEmpty: true });
            if (newNoteTitle !== '') {
                this.setState({ isTitleEmpty: false });
            }
        }

        if (newNoteContent !== '' && newNoteTitle !== '') {
            this.props.addNote(note);
            // closing modal
            this.props.handleModal(true);

            // set newNoteContent to empty String
            this.setState(prevState => {
                return {
                    id: prevState.id + 1,
                    newNoteTitle: '',
                    newNoteContent: '',
                    isTextareaEmpty: false,
                    isTitleEmpty: false,
                    borderColor: 'rgba(229, 57, 53,1.0)'
                }
            });
        }

    }

    editNote = () => {
        const { handleModal, editItem } = this.props;
        handleModal(true);
        editItem();
    }

    closingModal = () => {
        this.props.handleModal(true);
        this.setState({ isTitleEmpty: false, isTextareaEmpty: false });
    }

    handleColor = (event) => {
        const { name } = event.target;

        this.setState({ borderColor: name });

        if (name === 'rgba(229, 57, 53,1.0)') {
            this.setState({ colorBtnDisabler: 0 });
        } else if (name === 'rgba(30, 136, 229,1.0)') {
            this.setState({ colorBtnDisabler: 1 });
        } else if (name === 'rgba(124, 179, 66,1.0)') {
            this.setState({ colorBtnDisabler: 2 });
        } else if (name === 'rgba(255, 179, 0,1.0)') {
            this.setState({ colorBtnDisabler: 3 });
        }
    }


    render() {
        const { colorBtnDisabler, isTextareaEmpty, isTitleEmpty } = this.state;
        const { editingNote } = this.props;

        const emptyTitleErrorStyle = {
            display: isTitleEmpty ? 'inline' : 'none'
        }
        const emptyTextareaErrorStyle = {
            display: isTextareaEmpty ? 'inline' : 'none'
        }
        const errorMassage = {
            visibility: isTitleEmpty || isTextareaEmpty ? 'visible' : 'hidden'
        }


        return (
            <div className='modal'>
                <div className='modalContent' >
                    <div className='modalHeader'>
                        <h3><i className="fas fa-sticky-note"></i>{editingNote ? 'ویرایش یادداشت' : 'افزودن یادداشت'}</h3>
                        <i onClick={this.closingModal} className="fas fa-times"></i>
                    </div>
                    <div className='modalForm'>
                        <div>
                            <label>عنوان <span style={emptyTitleErrorStyle}>*</span></label>
                            <input type='text' name='newNoteTitle' onChange={this.handleUserInput} id='noteTitle' />
                        </div>

                        <div>
                            <label>متن <span style={emptyTextareaErrorStyle}>*</span></label>
                            <textarea name='newNoteContent' onChange={this.handleUserInput} id='noteContent' />
                        </div>

                        <div>
                            <label>انتخاب رنگ</label>
                            <div className='selectColor'>
                                <button
                                    disabled={colorBtnDisabler === 0}
                                    name='rgba(229, 57, 53,1.0)'
                                    onClick={this.handleColor}
                                    className='colorBtn'
                                ></button>
                                <button
                                    disabled={colorBtnDisabler === 1}
                                    name='rgba(30, 136, 229,1.0)'
                                    onClick={this.handleColor}
                                    className='colorBtn'
                                ></button>
                                <button
                                    disabled={colorBtnDisabler === 2}
                                    name='rgba(124, 179, 66,1.0)'
                                    onClick={this.handleColor}
                                    className='colorBtn'
                                ></button>
                                <button
                                    disabled={colorBtnDisabler === 3}
                                    name='rgba(255, 179, 0,1.0)'
                                    onClick={this.handleColor}
                                    className='colorBtn'
                                ></button>
                            </div>
                        </div>

                        <div>
                            <p style={errorMassage}>لطفا ورودی هایی که با * مشخص شده را پر کنید</p>
                            {editingNote ? <button onClick={this.editNote}>ذخیره</button> : <button onClick={this.writeNote}>افزودن یادداشت</button>}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
