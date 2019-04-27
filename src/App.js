import React, { Component } from 'react';
import Note from './Note';
import AddNote from './AddNote';
import Intro from './Intro';
import SearchResult from './SearchResult';
import Header from './Header';



class App extends Component {
  constructor() {
    super();
    this.state = {
      isShowingIntro: false,
      isModalOpen: false,
      noteContent: [],
      searchNoteContent: [],
      editingNote: false,
      editingId: 0
    }
  }

  componentDidMount() {
    const modal = document.querySelector('.modal');
    const windowOnClick = (event) => {
      if (event.target === modal) {
        modal.classList.toggle('showModal');
        this.setState({ isModalOpen: false });
        const noteElementTitle = document.getElementById('noteTitle');
        const noteElementContent = document.getElementById('noteContent');

        noteElementTitle.value = '';
        noteElementContent.value = '';
      }
    }
    window.addEventListener('click', windowOnClick);

    // set searchNoteContent
    const { noteContent } = this.state;
    this.setState({ searchNoteContent: noteContent });
  }

  addNote = (note) => {
    const { noteContent, searchNoteContent } = this.state;
    this.setState({
      noteContent: [...noteContent, note],
      searchNoteContent: [...searchNoteContent, note]
    });
  }

  removeNote = (noteId) => {
    const { noteContent } = this.state;
    const newNoteContent = noteContent.filter(note => note.localId !== noteId);
    this.setState({
      noteContent: newNoteContent,
      searchNoteContent: newNoteContent
    });
  }

  openEdit = (id) => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('showModal');
    this.setState({ isModalOpen: true, editingNote: true, editingId: id });

    const noteElementTitle = document.getElementById('noteTitle');
    const noteElementContent = document.getElementById('noteContent');
    const currentNote = this.state.noteContent.filter(note => note.localId === id);

    noteElementTitle.value = currentNote[0].title;
    noteElementContent.value = currentNote[0].content;
  }

  editItem = () => {
    const { editingId } = this.state;

    const noteElementTitle = document.getElementById('noteTitle');
    const noteElementContent = document.getElementById('noteContent');
    const noteElementColor = document.querySelectorAll('.colorBtn');

    let newNoteContent = this.state.noteContent;
    let noteIndex = 0;
    newNoteContent.forEach((note, index) => {
      if (note.localId === editingId) {
        noteIndex = index;
      }
    });
    let noteColor = '';

    Array.from(noteElementColor).forEach(color => {
      if (color.disabled) {
        noteColor = color.name
      }
    });
    newNoteContent[noteIndex].title = noteElementTitle.value;
    newNoteContent[noteIndex].content = noteElementContent.value;
    newNoteContent[noteIndex].borderColor = noteColor;
    this.setState({ noteContent: newNoteContent, searchNoteContent: newNoteContent });
    console.log('noteColor: ', noteColor);
  }

  handleModal = (value) => {
    const modal = document.querySelector('.modal');
    modal.classList.toggle('showModal');
    this.setState({ isModalOpen: true });
    if (value === true) {
      modal.classList.remove('showModal');
      this.setState({ isModalOpen: false, editingNote: false });
      setTimeout(function () {
        const noteElementTitle = document.getElementById('noteTitle');
        const noteElementContent = document.getElementById('noteContent');

        noteElementTitle.value = '';
        noteElementContent.value = '';
      }, 500);
    }
  }

  searchNotes = (searchInput) => {
    const { searchNoteContent } = this.state;

    if (searchInput.length === 0) {
      this.setState({ noteContent: searchNoteContent });
    } else {
      const newNoteContent = searchNoteContent.filter(note => {
        const noteTitle = note.title.toLowerCase();
        const searchText = searchInput.toLowerCase();
        return noteTitle.includes(searchText);
      });
      this.setState({ noteContent: newNoteContent });
    }
  }

  render() {
    const noteElements = this.state.noteContent.map(value =>

      <Note
        key={value.localId}
        removeItem={this.removeNote}
        openEdit={this.openEdit}
        id={value.localId}
        {...value}
      />
    );

    const { isModalOpen, noteContent, editingNote, searchNoteContent } = this.state;
    const addBtnStyle = { display: isModalOpen ? 'none' : 'block' }
    const mainStyle = {
      height: window.innerHeight - 122 + 'px'
    }

    return (
      <div>
        <Header searchNotes={this.searchNotes} />
        <main style={mainStyle}>
          {/* show Intro when noteContent Empty */}
          {noteContent.length === 0 && searchNoteContent.length === 0 ? <Intro /> : ''}
          {/* show SearchResult */}
          {noteContent.length === 0 && searchNoteContent.length >= 1 ? <SearchResult /> : ''}
          {noteElements}
          <AddNote
            addNote={this.addNote}
            handleModal={this.handleModal}
            editingNote={editingNote}
            editItem={this.editItem}
          />
        </main>
        <footer>
          <div className='before'>
            <button style={addBtnStyle} onClick={this.handleModal}><i className="fas fa-plus-circle"></i></button>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
