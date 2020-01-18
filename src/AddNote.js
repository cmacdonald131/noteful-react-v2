import React, { Component } from 'react';
import config from './config';
import uuid from 'uuid/v4';

export default class AddNote extends Component {
    onSubmit = (e) => {
        e.preventDefault();
        const noteName = e.target.noteName.value;
        const content = e.target.content.value;
        const folderId = e.target.folderId.value;
        const id = uuid;

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "Post",
            body: JSON.stringify({
                name: noteName,
                folderId: folderId,
                content: content,
                id: id
            }),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(e => this.props.history.push('/'))

    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="noteName" style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>Name of Note</label>
                <input type="text" name="noteName"></input>
                <label htmlFor="content" style={{ color: "white", marginRight: "5px", marginLeft: "5px" }}>What do you need to do?</label>
                <input type="text" name="content"></input>
                <select name="folderId">
                    {this.props.folders.map(folder => (<option value={folder.id} key={folder.id}>{folder.name}</option>))}
                </select>
                <button type="submit" name="btn">Save Note</button>

            </form>
        )
    }

};

