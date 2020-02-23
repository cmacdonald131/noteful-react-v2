import React, { Component } from 'react';
import config from './config';
import ApiContext from './ApiContext';

export default class AddFolder extends Component {

    static contextType = ApiContext
    onSubmit = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "Post",
            body: JSON.stringify({
                name: folderName,
            }),
            headers: {
                'Authorization': 'Bearer 95545026-4d48-11ea-b77f-2e728ce88125',
                'content-type': 'application/json'
            }
        })

            .then(note => {
                return note.json()
            }).then(data => {
                this.context.refreshFolder(data)
                this.props.history.push('/')
            })

    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <label htmlFor="folderName" style={{ marginRight: "5px", marginLeft: "5px" }}>New folder name</label>
                <input type="text" name="folderName" required></input>
                <button type="submit" name="btn">Save Folder</button>
            </form>
        )
    }
};



