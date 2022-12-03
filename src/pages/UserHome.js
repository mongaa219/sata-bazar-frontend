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


const UserHome = (props) => {
    const [isLoading,setisLoading] = useState(true);
    const [sattaList, setSattaList] = useState([]);
    const [sattaListCity, setSattaListCity] = useState([]);

    const [siteTitle,setSiteTitle] = useState('Nva Savera');
    const [siteAnnouncement,setSiteAnnouncement] = useState('');

    const [siteTitle2,setSiteTitle2] = useState('');
    const [siteAnnouncement2,setSiteAnnouncement2] = useState('');

    const [adminno,setadminno] = useState('');
    let ab = 0;

    // const URL = 'http://localhost:3003'
    // const URL = 'https://satta-backend.herokuapp.com'
    const URL = 'http://107.20.102.114:8000'
    
    const [nsdate,setNsdate] = useState('');

    const getAnnounement = async () => {
        let token = localStorage.getItem('loginToken')
        // setisLoading(true)
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#'
            }
            await axios.get(URL+'/api/announcment',{
                 headers
            }).then((data) => { 
            // setisLoading(false)
                console.log(data);
                let rs = data.data;
                setSiteTitle(rs.title || 'Nva Savera')
                setSiteAnnouncement(rs.description || '')

                setSiteTitle2(rs.title2 || 'Nva Savera')
                setSiteAnnouncement2(rs.description2 || '')

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
    // 'Content-Type': 'application/json',
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#'
      }
      console.log(d);
      if(!d || d === undefined)
      {
          d = makeTime()
      }
      await axios.get(URL+'/api/get?date='+d,{
          headers
      }).then((data) => { 
        setisLoading(false)
          console.log(data.data);
          
        //   setSattaList(data.data)
          let sattaListData = [];
            // let startdate = new Date();
            let month = 0;
            // "2022-06-18T18:52:34.064Z"
            
            let startdate = Moment(d+'T10:00:00.000Z','YYYY-MM-DD hh:mm A'); 
            console.log('startdate ===== >',startdate);
            for (let i = 0; i < 28; i++) {
                const findDate = filterData(data.data,startdate,'YYYY-MM-DD hh:mm A');
                if(findDate)
                {
                    console.log(i,findDate);
                    sattaListData.push(findDate);
                }
                else
                {
                    const element = {
                        _id : '',
                        resultA : '',
                        resultB : '',
                        resultC : '',
                        resultDate : startdate,
                        resultDateTime : '',
                        createdAt : '',
                        updatedAt : '',
                    };
                    sattaListData.push(element);
                }
                startdate = Moment(startdate, "YYYY-MM-DD hh:mm A").add(20, 'minutes');
            }
            setSattaList(sattaListData)
          getListCities(d)
      }).catch((er) => {
          console.log(er);
          if (er.response.status == 401) {
              console.log('getting eror ');
              console.log(er.response.status);
          }
      })
  }
  const filterData = (arr,search,format = 'YYYY-MM-DD') => {
      for (let i = 0; i < arr.length; i++) {
        //   console.log(Moment(arr[i].resultDate).format('YYYY-MM-DD') +" == "+ Moment(search).format('YYYY-MM-DD'));
        if(Moment(arr[i].resultDate).format(format) == Moment(search).format(format))
        {
            console.log('UTC ==>  ',arr[i].resultDate);
            console.log('match ==>  ',Moment(arr[i].resultDate).format(format));
              
              return arr[i];
          }
      }
      return false;
  }
  const getListCities = async (d) => {
    let token = localStorage.getItem('loginToken')
    setisLoading(true)
    // 'Content-Type': 'application/json',
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'secret-key': '#1234nirmaljeetdeveloper987654321#satta#free#react#**project123456789#'
      }
      console.log(d);
      if(d === undefined)
      {
          d = makeTime()
      }
      let newMonth = Moment(d).format('YYYY-MM')
      await axios.get(URL+'/api/city/get?date='+newMonth,{
          headers
      }).then((data) => {
        setisLoading(false)
            // console.log(' ======================================================================');
            // console.log('city');
            // console.log(data.data.length);
            // console.log(data.data);
            // console.log(' ======================================================================');
            // let cityData = data.data;
            let cityData = [];
            // let startdate = data.data[data.data.length - 1].resultDate || new Date();
            let month = 0;
            // let startdate = newMonth+'-01T'
            let startdate = Moment(newMonth+'-01T','YYYY-MM-DD'); 
            for (let i = 0; i <= 31; i++) {
                // let element;
                // console.log('date starting ==> '+Moment(startdate).format('YYYY-MM-DD'));
                // console.log('month == ',month);
                if(month == 0)
                {
                    month = Moment(startdate).format('MM');
                    // console.log('month ==in if === ',month);
                }
                if(month != Moment(startdate).format('MM'))
                {
                    // console.log('month == break',month);
                    break;
                }
                // console.log('date entered ==> '+Moment(startdate).format('YYYY-MM-DD'));
                // console.log('find data ==> '+Moment(startdate).format('YYYY-MM-DD'),filterData(data.data,startdate))
                // console.log('find data ==> ',filterData(data.data,startdate))
                const findDate = filterData(data.data,startdate);
                if(findDate)
                {
                    // console.log(i,findDate);
                    cityData.push(findDate);
                }
                else
                {
                    const element = {
                         _id : '',
                         resultA : '',
                         resultB : '',
                         resultC : '',
                         resultD : '',
                         resultE : '',
                         resultF : '',
                         resultDate : startdate,
                         resultDateTime : '',
                         createdAt : '',
                         updatedAt : '',
                     };
 
                     cityData.push(element);
                }
                startdate = Moment(startdate, "DD-MM-YYYY").add(1, 'days');
                // }
                // startdate = Moment(startdate, "DD-MM-YYYY").add(1, 'days');
            }
          setSattaListCity(cityData)
      }).catch((er) => {
          console.log('city data === >  ',er);
          if(er.response)
          {
              if (er.response.status == 401) {
                  console.log('getting eror ');
                  console.log(er.response.status);
              }
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
                    <div className='row'>
                        <div className='col-md-4 ns-top-rd'>Satta King</div>
                        <div className='col-md-4 ns-top-rd'>Satta Leak</div>
                        <div className='col-md-4 ns-top-rd'>Result Chart</div>
                        <div className='col-md-12 bg-black red-color ns-marquee'>
                            <marquee>Nva Savera Satta, Nvasaverasatta, Nva Savera Satta 2020, Nva Savera Satta up, Nva Savera Satta result, Nva Savera Satta result, Nva Savera Satta online, Gali result, Desawar result, Nva Savera Satta chart, Nva Savera Satta live, Gali satta, Deshawar live result, Gali live result, Satta matka, Nva Savera Satta matka, Nva Savera Satta up, Nva Savera Satta 2021 chart, Nva Savera Satta desawar, Nva Savera Satta gali, Gali live result, Disawar live result, Satta Number, Satta Game, Gali Number, Delhi Nva Savera Satta, Satta Bazar, Black Nva Savera Satta, Gali Single Jodi, Black Satta Result, Desawar Single Jodi</marquee>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='row mt-3 mb-3'>
                        <div className='col-md-10 center-ns'>
                                <h2>www.nvasaverasatta.com</h2>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='add-box-1'>
                        <p className="add-box-1-p1">
                            गली हो या Ranchi देसावर जोड़ी मिलेगी सिंगल  कंपनी लाखों लोगों ने ज्वाइन की हुई है जो की काफी सालो से जुड़े है हमारे साथ हर महीने 40 से 50 लाख का प्रॉफिट होता है हमारे भाईयों का 
                        </p>
                        <p className="add-box-1-p2" >गेम पास का प्रूफ देखने केलिए WhatApp करें</p>
                        {/* <p></p> */}
                        {/* <p className="add-box-1-p3">सुहाना गुप्ता - सट्टा कंपनी CEO &amp; MD</p> */}
                        <p className="add-box-1-p4" >{adminno}</p>
                        <a href="https://wa.me/9329286908">
                            <button className='add-box-1-btn1'>
                                <font size="4px"><b>WhatsApp Chat</b></font>
                            </button>
                        </a>
                        <a href={'tel:>'+adminno}>
                            <button className='add-box-1-btn2'><font size="4px"><b>Call Now</b></font></button>
                        </a>
                    </div>

                </div>
                <div className='col-md-12 mt-3'>
                    <div className='add-box-1-df'>
                        <p className="add-box-1-p1">
                        सभी सट्टा खेलने वाले भाईयो के लिए खुश खबरी गली; दिसावर; गाजियाबाद ;और PUNE RANCHI DELHI GOLD में होगा सिंगल जोड़ी ब्लास्ट तो जिन भाईयो को लाखो का लॉस है होगा अब एक ही बार में कवर तो बिना समय निकालें जल्दी से जल्दी वॉट्सएप पर जुड़े और कमाए लाखो रुपए
                        </p>
                        <p className="add-box-1-p2" >गेम पास का प्रूफ देखने केलिए WhatApp करें</p>
                        <p></p>
                        <p className="add-box-1-p3">सुमन गुप्ता 
                        {/* - सट्टा कंपनी  CEO &amp; MD */}
                        </p>
                        <p className="add-box-1-p4" >{adminno}</p>
                        <a href="https://wa.me/9329286908">
                            <button className='add-box-1-btn1'>
                                <font size="4px"><b>WhatsApp Chat</b></font>
                            </button>
                        </a>
                        <a href={'tel:>'+adminno}>
                            <button className='add-box-1-btn2'><font size="4px"><b>Call Now</b></font></button></a>
                    </div>

                </div>
                <div className='col-md-12'>
                    <div className='row mt-2 mb-2'>
                        <div className='col-md-10 bg-black ns-heading-top'>
                            <center>
                                <h2>Nva savera & Desawar lotto lottery game</h2>
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
                                        To play a game please contact to admin (Nva Savera)
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
                        <div className='center bg-black'>
                                <h2 className='white-color'>{ siteTitle }</h2>
                                <h3 className='yellow-color'>{ siteAnnouncement }</h3>
                                <h2 className='white-color'>{ siteTitle2 }</h2>
                                <h3 className='yellow-color'>{ siteAnnouncement2 }</h3>
                                {/* <h2 className='white-color'>{ siteTitle }</h2>
                                <h3 className='yellow-color'>{ siteAnnouncement }</h3>
                                <h2 className='white-color'>{ siteTitle }</h2>
                                <h3 className='yellow-color'>{ siteAnnouncement }</h3> */}
                        </div>
                        <div className='col-md-1'>
                            
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </div>
                {/* <div className='col-md-12'>
                    <marquee className="marq-tag">{ siteAnnouncement }</marquee>
                </div> */}
                <div className='col-md-12 mt-1 mb-2'>
                    <div className='table-heading-city-ns'>
                        <h2>All Game Result Chart</h2>
                    </div>
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
                                    <th className='ns-city-table high columns-nst'>Date</th>
                                    <th className='ns-city-table columns-ns'>Disawer (05:00 AM)</th>
                                    <th className='ns-city-table columns-ns'>Fridabad (06:30 PM)</th>
                                    <th className='ns-city-table columns-ns'>Gaziyabad (09:00 PM)</th>
                                    <th className='ns-city-table columns-ns'>Gali (12:05 AM)</th>
                                    <th className='ns-city-table columns-ns'>Nva Savera (02:50 PM)</th>
                                    <th className='ns-city-table columns-ns'>Savera (03:00 PM)</th>
                                    {/* <th className='ns-city-table'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaListCity.map((ls,i) => {
                                        ab = i + 1;
                                        return (
                                        <tr key={i}>
                                            {/* <td>{ i + 1}</td> */}
                                            {/* <td>{ ls.title }</td> */}
                                            {/* <td>{ ls.description }</td> */}
                                            <td className='ns-city-table hight'>{ (!ls.resultDate ) ? '-' : Moment(ls.resultDate).format('DD-MM') }</td>
                                            <td className='columns-ns'>{ ls.resultA }</td>
                                            <td className='columns-ns'>{ ls.resultB }</td>
                                            <td className='columns-ns'>{ ls.resultC }</td>
                                            <td className='columns-ns'>{ ls.resultD }</td>
                                            <td className='columns-ns'>{ ls.resultE }</td>
                                            <td className='columns-ns'>{ ls.resultF }</td>
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
                <div className='col-md-12 mt-3 mb-3 mt-5'>
                    <div className='row mt-4 mb-4'>
                        <div className='col-md-12 ns-head-box'>
                            <center>
                                <h2>Desawar lottery game</h2>
                            </center>
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
                                    <th className='ns-city-table hight ns-result'>#</th>
                                    {/* <th className='ns-city-table'>Title</th> */}
                                    {/* <th className='ns-city-table'>Description</th> */}
                                    <th className='ns-city-table columns-ns'>Date Time</th>
                                    <th className='ns-city-table columns-ns'>Result A</th>
                                    <th className='ns-city-table columns-ns'>Result B</th>
                                    <th className='ns-city-table columns-ns'>Result C</th>
                                    {/* <th className='ns-city-table'>Action</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    { sattaList.map((ls,i) => {
                                        return (
                                        <tr key={i}>
                                            <td className='ns-city-table hight ns-result'>{ i + 1}</td>
                                            {/* <td>{ ls.title }</td> */}
                                            {/* <td>{ ls.description }</td> */}
                                            <td className='columns-ns-resultls'>{ (!ls.resultDate) ? '-' : Moment(ls.resultDate).format('hh:mm A') }</td>
                                            <td className='columns-ns-resultls'>{ ls.resultA }</td>
                                            <td className='columns-ns-resultls'>{ ls.resultB }</td>
                                            <td className='columns-ns-resultls'>{ ls.resultC }</td>
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

                <div className='col-md-12 mt-4 mb-5'>
                    <div className='row'>
                        <div className='col-md-12 ns-info-bottom'>
                        <h2>
                            What is Nva Savera Satta ?
                        </h2>
                        <p>Nva Savera Satta is a kind of lottery game based on numbers from 00 to 99 which comes under "Gambling". The real name of this game is Nva Savera Satta, in which "Satta" means betting or gambling and "Nva Savera" means a pot through which a number is drawn out. In the Nva Savera Satta game, people wager money on their chosen numbers from between 00 to 99. After which, a number is drawn out of the pot. Whichever person's number was drawn out, he would win the prize and people called him as the Nva Savera Satta. Nva Savera Satta is not the name of the game, it was the title used to honor the winner of the Satta Matka. But as this game became popular, people started knowing it by the name of Nva Savera Satta.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </>
  );
}

export default UserHome;
