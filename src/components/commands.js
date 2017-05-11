import React from 'react';

export default class Commands extends React.Component {

  render() {
    //task and action header names. simple component. 
    return (
        <div>
          <button onClick={() => this.props.saveProject()}>Save</button>
          <input 
					  type="file" label='Upload'
					  onChange={() => this.onFileLoad()}
					  ref="file"
					/>
        </div>
    );
  }

  onFileLoad() {
  	const file = this.refs.file.files[0];
  	console.log(file)
  	this.props.loadProject(file)
  }
}
