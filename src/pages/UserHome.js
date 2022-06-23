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


const UserHome = (props) => {
    const [isLoading,setisLoading] = useState(true);
    const [sattaList, setSattaList] = useState([]);
    const [sattaListCity, setSattaListCity] = useState([]);

    const [siteTitle,setSiteTitle] = useState('Nva Savera');
    const [siteAnnouncement,setSiteAnnouncement] = useState('');
    const [adminno,setadminno] = useState('');

    // const URL = 'http://localhost:3003'
    const URL = 'https://satta-backend.herokuapp.com'
    
    const [nsdate,setNsdate] = useState('');

    const getAnnounement = async () => {
        let token = localStorage.getItem('loginToken')
        // setisLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#./'
            }
            await axios.get(URL+'/api/announcment',{
                headers : headers
            }).then((data) => { 
            // setisLoading(false)
                console.log(data);
                let rs = data.data;
                setSiteTitle(rs.title || 'Nva Savera')
                setSiteAnnouncement(rs.description || '')
                setadminno(rs.adminno || '')
            }).catch((er) => {
                if (er.response.status == 401) {
                    console.log('getting eror ');
                    console.log(er.response.status);
                }
            })
        }
  
  const getList = async (d = nsdate) => {
    let token = localStorage.getItem('loginToken')
    setisLoading(true)
    const headers = {
        'Content-Type': 'application/json',
        'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#./'
      }
      console.log(d);
      if(!d || d === undefined)
      {
          d = makeTime()
      }
      await axios.get(URL+'/api/get?date='+d,{
          headers : headers
      }).then((data) => { 
        setisLoading(false)
          console.log(data);
          setSattaList(data.data)
          getListCities(d)
      }).catch((er) => {
          if (er.response.status == 401) {
              console.log('getting eror ');
              console.log(er.response.status);
          }
      })
  }
  const getListCities = async (d) => {
    let token = localStorage.getItem('loginToken')
    setisLoading(true)
    const headers = {
        'Content-Type': 'application/json',
        'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#./'
      }
      console.log(d);
      if(d === undefined)
      {
          d = makeTime()
      }
      let newMonth = Moment(d).format('YYYY-MM')
      await axios.get(URL+'/api/city/get?date='+newMonth,{
          headers : headers
      }).then((data) => {
        setisLoading(false)
          console.log('city');
          console.log(data);
          setSattaListCity(data.data)
      }).catch((er) => {
          if (er.response.status == 401) {
              console.log('getting eror ');
              console.log(er.response.status);
          }
      })
  }
  useEffect(() => {
    getAnnounement();
    setNsdate(makeTime())
    // console.log(Moment()._d);
    // if(nsdate !== undefined)
    // {
        // return false;
    // }
    getList();
  },[])
  const makeTime = () =>{
    const date = new Date();
    console.log('moment date', Moment(date).format('YYYY-MM'))
    return Moment(date).format('YYYY-MM-DD')
    let year = date.getFullYear();
    let month = date.getMonth()
    let day = date.getDate()
    month++;
    month = (month < 10) ? '0'+month :month;
    day = (day < 10) ? '0'+day : day
    // console.log(year+'-'+month+'-'+day);
    return year+'-'+month+'-'+day
  }
  return (
      <>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-md-10'>
                            <center>
                                <h2>Nva Savera</h2>
                            </center>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='row mt-4 mb-4'>
                        <div className='ns-head-box'>
                            <center>
                                <p>
                                    <h4>
                                        To play a game please contact to admin
                                    </h4>
                                </p>
                                <p>
                                    <span>Admin : {adminno}</span>
                                </p>

                            </center>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-md-10'>
                            <center>
                                <h2>{ siteTitle }</h2>
                            </center>
                        </div>
                        <div className='col-md-1'>
                            
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <marquee className="marq-tag">{ siteAnnouncement }</marquee>
                </div>
                <div className='col-md-12 mt-1 mb-2'>
                    <div className='row'>
                        <div className='col-md-9'>
                        </div>
                        <div className='col-md-3'>
                            <div className='form-group'>
                                <label>Select Date</label>
                            <input type="date" className="form-control"
                                value={ nsdate }
                            onChange={(e) => {
                                setNsdate(e.target.value)
                                console.log(Moment(e.target.value).format('YYYY-MM'));
                                console.log(e.target.value) 
                                getList(e.target.value)
                            }}/>

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
                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                    {/* <th className='ns-city-table'>#</th> */}
                                    {/* <th className='ns-city-table'>Title</th> */}
                                    {/* <th className='ns-city-table'>Description</th> */}
                                    <th className='ns-city-table hight'>Date</th>
                                    <th className='ns-city-table'>Disawer</th>
                                    <th className='ns-city-table'>Fridabad</th>
                                    <th className='ns-city-table'>Gaziyabad</th>
                                    <th className='ns-city-table'>Gali</th>
                                    <th className='ns-city-table'>Nva Savera</th>
                                    {/* <th className='ns-city-table'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaListCity.map((ls,i) => {
                                        return (
                                        <tr key={i}>
                                            {/* <td>{ i + 1}</td> */}
                                            {/* <td>{ ls.title }</td> */}
                                            {/* <td>{ ls.description }</td> */}
                                            <td className='ns-city-table hight'>{ Moment(ls.resultDate).format('DD-MM') }</td>
                                            <td>{ (!ls.resultA || ls.resultA == 0) ? '-' : ls.resultA }</td>
                                            <td>{ (!ls.resultB || ls.resultB == 0) ? '-' : ls.resultB }</td>
                                            <td>{ (!ls.resultC || ls.resultC == 0) ? '-' : ls.resultC }</td>
                                            <td>{ (!ls.resultD || ls.resultD == 0) ? '-' : ls.resultD }</td>
                                            <td>{ (!ls.resultE || ls.resultE == 0) ? '-' : ls.resultE }</td>
                                            {/* <td>
                                                <Link to={'/edit/'+ls._id}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                            </td> */}
                                        </tr>

                                        )
                                    }) }
                                </tbody>
                            </Table>
                        </>
                    }
                </div>
                <div className='col-md-12 mt-3 mb-3'>
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
                                    <th className='ns-city-table hight'>#</th>
                                    {/* <th className='ns-city-table'>Title</th> */}
                                    {/* <th className='ns-city-table'>Description</th> */}
                                    <th className='ns-city-table'>Date Time</th>
                                    <th className='ns-city-table'>Result A</th>
                                    <th className='ns-city-table'>Result B</th>
                                    <th className='ns-city-table'>Result C</th>
                                    {/* <th className='ns-city-table'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaList.map((ls,i) => {
                                        return (
                                        <tr key={i}>
                                            <td className='ns-city-table hight'>{ i + 1}</td>
                                            {/* <td>{ ls.title }</td> */}
                                            {/* <td>{ ls.description }</td> */}
                                            <td>{ Moment(ls.resultDate).format('hh:mm A') }</td>
                                            <td>{ (!ls.resultA || ls.resultA == 0) ? '-' : ls.resultA }</td>
                                            <td>{ (!ls.resultB || ls.resultB == 0) ? '-' : ls.resultB }</td>
                                            <td>{ (!ls.resultC || ls.resultC == 0) ? '-' : ls.resultC }</td>
                                            {/* <td>
                                                <Link to={'/edit/'+ls._id}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Link>
                                            </td> */}
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

export default UserHome;
