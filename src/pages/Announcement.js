import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
import DateTimePicker from 'react-datetime-picker';



const Announcement = (props) => {
    const [isLoading,setisLoading] = useState(false);
    const [sattaList, setSattaList] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [adminno, setAdminno] = useState('');

    const [title2, setTitle2] = useState('');
    const [description2, setDescription2] = useState('');

    // const URL = 'http://localhost:3003'
    // const URL = 'https://satta-backend.herokuapp.com'
    const URL = 'https://107.20.102.114'
    
  const announcementAdd = async (e) => {
    //   e.preveventDefault();
        setisLoading(true);
      e.preventDefault();
      let submit_data = {
        title : title,
        description : description,
        title2 : title2,
        description2 : description2,
        adminno : adminno,
        importanttext:'--'
      };
      let token = localStorage.getItem('loginToken')
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
        'token': token
      }
      console.log(headers);
      console.log(submit_data);
      await axios.post(URL+'/api/admin/announcment',submit_data,{
          headers
      }).then((data) => {
        setisLoading(false)
        console.log(data);
        if(data.status == 202)
        {
            alert(data.data.message);
            return false;
        }
        alert(data.data.message || 'Some error !!');
        // window.location.href = '/home-city'
      }).catch((er) => {
          console.log('error ',er);
          setisLoading(false)
        alert('Somthing went wrong !!');
      })
  }
  const announcementGet = async (e) => {
    //   e.preveventDefault();
      
      let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json',
        'token': token
      }
      console.log(headers);
      await axios.get(URL+'/api/admin/announcment',{
          headers : headers
      }).then((data) => {
        setisLoading(false)
        console.log(data.data);
        if(data.data)
        {
            setTitle(data.data.title);
            setDescription(data.data.description);
            setTitle2(data.data.title2 || '');
            setDescription2(data.data.description2 || '');
            
            setAdminno(data.data.adminno)
        }
        // window.location.href = '/home-city'
      }).catch((er) => {
          console.log('error ',er);
          setisLoading(false)
        alert('Somthing went wrong !!');
      })
  }
  useEffect(() => {
    // getList();
    let token = localStorage.getItem('loginToken')
    if(!token)
    {
        window.location.href = '/login'
    }
    announcementGet()
  },[])
  return (
      <>
        <div className='container mt-3 admin-pages'>
            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={announcementAdd}>
                        <div className="mb-3 mt-3">
                            <label >Admin no.</label>
                            <input type="text" className="form-control"  placeholder="Enter Admin no." name="adminno" onChange={(e) => setAdminno(e.target.value)} value={adminno}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Site Title</label>
                            <input type="text" className="form-control"  placeholder="Enter Title" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Announcement</label>
                            <textarea className="form-control" rows={1}  placeholder="Enter Description" name="Description" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Site Title 2</label>
                            <input type="text" className="form-control"  placeholder="Enter Title 2" name="title" onChange={(e) => setTitle2(e.target.value)} value={title2}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Announcement 2</label>
                            <textarea className="form-control" rows={1}  placeholder="Enter Description 2" name="Description" onChange={(e) => setDescription2(e.target.value)} value={description2}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {!isLoading && 'Save'}
                            { isLoading && 
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden loader-ns">Loading...</span>
                                </Spinner>
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </>
  );
}

export default Announcement;