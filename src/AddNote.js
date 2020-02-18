import React, { Component } from 'react';
import config from './config';
import ApiContext from './ApiContext';
import uuid from 'uuid/v4';

export default class AddNote extends Component {
    static contextType = ApiContext
    onSubmit = (e) => {
        e.preventDefault();
        const noteName = e.target.noteName.value;
        const content = e.target.content.value;
        const folder_id = e.target.folderId.value;
        const id = uuid;
        const modified = new Date();

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "Post",
            body: JSON.stringify({
                name: noteName,
                folder_id: folder_id,
                content: content,
                id: id,
                modified: modified
            }),
            headers: {
                "Authorization": "Bearer 95545026-4d48-11ea-b77f-2e728ce88125",
                "content-type": "application/json"
            }
        })
            .then(note => {
                return note.json()
            }).then(data => {
                this.context.refreshNote(data)
                this.props.history.push('/')
            })

    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="noteName" style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>Name of Note</label>
                <input type="text" name="noteName" required></input>
                <label htmlFor="content" style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>What do you need to do?</label>
                <input type="text" name="content" required></input>
                <select name="folderId">
                    {this.props.folders.map(folder => (<option value={folder.id} key={folder.id}>{folder.name}</option>))}
                </select>
                <button type="submit" name="btn">Save Note</button>
            </form>
        )
    }

};

