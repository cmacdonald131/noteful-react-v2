import React, { Component } from 'react';
import config from './config';
import PropTypes from 'prop-types';

export default class AddFolder extends Component {
    onSubmit(e) {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: "Post",
            body: JSON.stringify({
                name: folderName,
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
                <input type="text" name="folderName"></input>
                <button type="submit" name="btn">Save Folder</button>
            </form>
        )
    }


};

AddFolder.propTypes = {
    name: PropTypes.string
}

