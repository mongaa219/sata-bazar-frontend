import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
// import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import '../datepiker.scss';
import config from '../config'





const AddNewDataCity = (props) => {
    const [isLoading,setisLoading] = useState(false);
    const [sattaList, setSattaList] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [resultDate, setResultDate] = useState(new Date());
    const [resultA, setResultA] = useState('');
    const [resultB, setResultB] = useState('');
    const [resultC, setResultC] = useState('');
    const [resultD, setResultD] = useState('');
    const [resultE, setResultE] = useState('');
    const [resultF, setResultF] = useState('');

    // const URL = 'http://localhost:3003'
    // const URL = 'https://satta-backend.herokuapp.com'
    // const URL = 'https://44.207.30.122:8000'
    const URL = config.apiUrl
    
  const sattaAdd = async (e) => {
    //   e.preveventDefault();
        setisLoading(true);
      e.preventDefault();
      let submit_data = {
        title : title,
        resultDate : Moment(resultDate).format('YYYY/MM/DD hh:mm A'),
        resultA : resultA,
        resultB : resultB,
        resultC : resultC,
        resultD : resultD,
        resultE : resultE,
        resultF : resultF
      };
      let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        'token': token
      }
      console.log(headers);
      console.log(submit_data);
      await axios.post(URL+'/api/admin/city/satta',submit_data,{
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
        window.location.href = '/home-city'
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
  },[])
  return (
      <>
        <div className='container mt-3 admin-pages'>
            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={sattaAdd}>
                        <div className="mb-3 mt-3">
                            <label >Title</label>
                            <input type="text" className="form-control"  placeholder="Enter Title" name="title" onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result Date:</label>
                            <DatePicker 
                                name="date"
                                className={'form-control'}
                                dateFormat="Pp"
                                onChange={(date) => { 
                                    console.log(date);
                                    setResultDate(Moment(date).format('YYYY/MM/DD')) }} value={resultDate} />
                                {/* <input type="date" className={'form-control'} onChange={(e) => { 
                                    console.log(e.target.value);
                                    setResultDate(Moment(e.target.value).format('YYYY/MM/DD')) }} value={resultDate}/> */}
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Disawer</label>
                            <input type="number" className="form-control"  name="resultA" onChange={(e) => setResultA(e.target.value)} value={resultA} placeholder="Disawer"/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Fridabad</label>
                            <input type="number" className="form-control"  name="resultB" onChange={(e) => setResultB(e.target.value)} value={resultB} placeholder="Fridabad"/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Gaziyabad</label>
                            <input type="number" className="form-control"  name="resultC" onChange={(e) => setResultC(e.target.value)} value={resultC} placeholder="Gaziyabad"/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Gali</label>
                            <input type="number" className="form-control"  name="resultD" onChange={(e) => setResultD(e.target.value)} value={resultD} placeholder="Gali"/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Nva Savera</label>
                            <input type="number" className="form-control"  name="resultE" onChange={(e) => setResultE(e.target.value)} value={resultE} placeholder="Nva Savera"/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Savera</label>
                            <input type="number" className="form-control"  name="resultF" onChange={(e) => setResultF(e.target.value)} value={resultF} placeholder="Savera"/>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {!isLoading && 'Submit'}
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

export default AddNewDataCity;