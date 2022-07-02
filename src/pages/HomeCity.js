import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate, Link } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
// import { Link } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faEdit } from '@fortawesome/free-solid-svg-icons'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//  for icons
// npm i --save @fortawesome/fontawesome-svg-core
// npm install --save @fortawesome/free-solid-svg-icons
// npm install --save @fortawesome/react-fontawesome


const HomeCity = (props) => {
    const [isLoading,setisLoading] = useState(true);
    const [sattaList, setSattaList] = useState([])
    const [dateinput,filterDateinput] = useState()

    // const URL = 'http://localhost:3003'
    const URL = 'https://satta-backend.herokuapp.com'
  
  const getList = async (date) => {
    // filterDateinput(date)
    let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'token': token
      }
      if(!date || date === undefined)
      {
        date = Moment().format('YYYY/MM')
      }
      filterDateinput(date)
      setisLoading(true)
      await axios.get(URL+'/api/admin/city/get?date='+Moment(date).format('YYYY-MM'),{
          headers
      }).then((data) => {
        setisLoading(false)
          console.log(data);
          setSattaList(data.data)
      }).catch((er) => {
        setisLoading(false)
          if (er.response.status == 401) {
              console.log('getting eror ');
              console.log(er.response.status);
            //   props.history.push("/login");
             window.location.href = '/login'
          }
      })
  }
  useEffect(() => {
    // getList(Moment(new Date()).format('YYYY/MM'));
    let date = Moment().format('YYYY/MM')
    console.log('init',date);
    getList(date);
    // console.log(Moment(new Date()).format('DD/MM/YYYY'));
    // filterDateinput(Moment(new Date()).format('DD-MM-YYYY'))
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
                            <Link to="/add-city" className='white' >
                                <button className='btn btn-primary'>
                                    Add New
                                </button>
                            </Link>
                        </div>
                        <div className='col-md-1'>
                            <div className='form-group'>
                                <label>Select date</label>
                                <DatePicker 
                                name="date"
                                className={'form-control'}
                                dateFormat="YYYY/MM"
                                showMonthYearPicker
                                onChange={
                                    (date) => {
                                        console.log(date);
                                        getList(Moment(date).format('YYYY/MM'))
                                    }
                                }
                                value={dateinput} />
                                {/* <input type="date" className="form-control" value={dateinput} 
                                    onChange={
                                        (e) => {
                                            console.log(e.target.value);
                                        }
                                    }
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={(!isLoading) ? 'col-md-12 ':'col-md-12 loader-ns'}>
                    {isLoading && <Spinner animation="border" role="status" className='ns-lader-class'>
                            <span className="visually-hidden loader-ns">Loading...</span>
                            </Spinner>
                    }
                    {!isLoading && 
                        <> 
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th className='ns-city-table high columns-nst'>#</th>
                                    <th className='ns-city-table columns-nst'>Title</th>
                                    {/* <th>Description</th> */}
                                    <th className='ns-city-table columns-nst'>Date Time</th>
                                    <th className='ns-city-table columns-nst'>Disawer</th>
                                    <th className='ns-city-table columns-nst'>Fridabad</th>
                                    <th className='ns-city-table columns-nst'>Gaziyabad</th>
                                    <th className='ns-city-table columns-nst'>Gali</th>
                                    <th className='ns-city-table columns-nst'>Nva Savera</th>
                                    <th className='ns-city-table columns-nst'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaList.map((ls,i) => {
                                        return (
                                        <tr key={i}>
                                            <td>{ i + 1}</td>
                                            <td className='columns-ns'>{ ls.title }</td>
                                            {/* <td>{ ls.description }</td> */}
                                            <td className='columns-ns hight'>{ Moment(ls.resultDate).format('YYYY-MM-DD') }</td>
                                            <td className='columns-ns'>{ (!ls.resultA) ? '-' : ls.resultA }</td>
                                            <td className='columns-ns'>{ (!ls.resultB) ? '-' : ls.resultB }</td>
                                            <td className='columns-ns'>{ (!ls.resultC) ? '-' : ls.resultC }</td>
                                            <td className='columns-ns'>{ (!ls.resultD) ? '-' : ls.resultD }</td>
                                            <td className='columns-ns'>{ (!ls.resultE) ? '-' : ls.resultE }</td>
                                            <td className='columns-ns'>
                                                <Link to={'/edit-city/'+ls._id}>
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

export default HomeCity;
