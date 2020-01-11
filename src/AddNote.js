import React, { Component } from 'react';
import config from './config';
import PropTypes from 'prop-types';


export default class AddNote extends Component {
    onSubmit(e) {
        e.preventDefault();
        const noteName = e.target.noteName.value;
        const content = e.target.content.value;
        const folderId = e.target.folderId.value;

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "Post",
            body: JSON.stringify({
                name: noteName,
                folderId: folderId,
                content: content
            }),
            headers: {
                "content-type": "application/json",
            }
        })
            .then(e => console.log(e))
    }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="noteName"></input>
                <input type="text" name="content"></input>
                <select name="folderId">
                    {this.props.folders.map(folder => (<option value={folder.id}>{folder.name}</option>))}
                </select>
                <button type="submit" name="btn">Save Note</button>

            </form>
        )
    }

};

AddNote.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string,

}