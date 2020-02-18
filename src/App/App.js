import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import './App.css';
import AddFolder from '../AddFolder';
import AddNote from '../AddNote';
import RenderError from '../RenderError';


class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`, {
                headers: {
                    'Authorization': 'Bearer 95545026-4d48-11ea-b77f-2e728ce88125'
                }
            }),

            fetch(`${config.API_ENDPOINT}/folders`, {
                headers: {
                    'Authorization': 'Bearer 95545026-4d48-11ea-b77f-2e728ce88125'
                }
            })
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({ notes, folders });
            })
            .catch(error => {
                console.error({ error });
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    refreshFolder = (folder) => {
        this.setState({
            folders: [...this.state.folders, folder]
        })
    }

    refreshNote = (note) => {
        this.setState({
            notes: [...this.state.notes, note]
        })
    }

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={NotePageNav} />


            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-note" render={props => (<AddNote
                    folders={this.state.folders} history={props.history} />)} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            refreshFolder: this.refreshFolder,
            refreshNote: this.refreshNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <RenderError>
                        <header className="App__header">
                            <h1>
                                <Link to="/">Noteful</Link>{' '}
                                <FontAwesomeIcon icon="check-double" />
                            </h1>
                        </header>
                    </RenderError>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                    <RenderError>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" name="noteName"></input>
                            <button type="submit" name="btn">Save Note</button>
                        </form>
                    </RenderError>
                </div>
            </ApiContext.Provider>
        );
    }
}


export default App;
