import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate, Link } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
// import { Link } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEdit } from '@fortawesome/free-solid-svg-icons'

//  for icons
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome


const Home = (props) => {
    const [isLoading,setisLoading] = useState(true);
    const [sattaList, setSattaList] = useState([])
  
  const getList = async () => {
    let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json',
        'token': token
      }
      await axios.get('https://satta-backend.herokuapp.com/api/admin/get',{
          headers : headers
      }).then((data) => {
        setisLoading(false)
          console.log(data);
          setSattaList(data.data)
      }).catch((er) => {
          if (er.response.status == 401) {
              console.log('getting eror ');
              console.log(er.response.status);
            //   props.history.push("/login");
             window.location.href = '/login'
          }
      })
  }
  useEffect(() => {
    getList();
  },[])
  return (
      <>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-md-10'>
                            <center>
                                <h2>Satta List</h2>
                            </center>
                        </div>
                        <div className='col-md-1'>
                            <Link to="/add" className='white' >
                                <button className='btn btn-primary'>
                                    Add New
                                </button>
                            </Link>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </div>
                <div className='col-md-12'>
                    {isLoading && <Spinner animation="border" role="status">
                            <span className="visually-hidden loader-ns">Loading...</span>
                            </Spinner>
                    }
                    {!isLoading && 
                        <> 
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Date Time</th>
                                    <th>Result A</th>
                                    <th>Result B</th>
                                    <th>Result C</th>
                                    <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaList.map((ls,i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{ i + 1}</td>
                                            <td>{ ls.title }</td>
                                            <td>{ ls.description }</td>
                                            <td>{ Moment(ls.resultDate).format('YYYY-MM-DD hh:mm A') }</td>
                                            <td>{ (!ls.resultA || ls.resultA == 0) ? '-' : ls.resultA }</td>
                                            <td>{ (!ls.resultB || ls.resultB == 0) ? '-' : ls.resultB }</td>
                                            <td>{ (!ls.resultC || ls.resultC == 0) ? '-' : ls.resultC }</td>
                                            <td>
                                                <Link to={'/edit/'+ls._id}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                            </td>
                                        </tr>

                                        )
                                    }) }
                                </tbody>
                            </Table>
                        </>
                    }
                  </div>
            </div>
        </div>
      </>
  );
}

export default Home;
