import React, { Component } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 
 // toast-configuration method,
 // it is compulsory method.
toast.configure()

export default class FilesUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            imgCollection: ''
        }
    }
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }
    onSubmit(e) {
        e.preventDefault()
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        axios.post("http://localhost:4000/api/upload-images", formData, {
        }).then(res => {
            console.log(res.data)
        })
    }
    
    render() {
        const notify = ()=>{
 
            // Calling toast method by passing string message
           toast.success('successfully uploaded',   {position: toast.POSITION.TOP_CENTER});
        }
        return (
            <div className="container container-table  py-5">
                <div className="row vertical-center-row border border-2 py-4">
                    <form onSubmit={this.onSubmit} className="align-center">
                    <h3 className='text-success'>Multiple File Upload</h3>
                        <div className="form-group ">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success" onClick={notify} type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}