import {React, useEffect, useState} from 'react';
import axios from "axios";
import { Navigate, useParams } from "react-router-dom"
import { Table, Nav ,Spinner, Modal, Button, Form} from 'react-bootstrap'
import Moment from 'moment';
// import DateTimePicker from 'react-datetime-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const EditData = (props) => {
    const {id} = useParams();
    const [isLoading,setisLoading] = useState(false);
    const [sattaList, setSattaList] = useState([])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState(' ');
    const [resultDate, setResultDate] = useState(new Date());
    const [resultA, setResultA] = useState('');
    const [resultB, setResultB] = useState('');
    const [resultC, setResultC] = useState('');
    const [resultD, setResultD] = useState('');
    const [resultE, setResultE] = useState('');

    // const URL = 'http://localhost:3003'
    const URL = 'https://satta-backend.herokuapp.com'

    // const { id } = useParams();
    // console.log(props.history);
    const getSataOne = async (id) => {
        let token = localStorage.getItem('loginToken')
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'token': token
          }
          await axios.get(URL+'/api/admin/city/get/'+id,{
               headers
          }).then((data) => {
            setisLoading(false)
            if(!data.data){
                alert('Data not found !');
                return false;
            } 
            console.log(data.data);
            setSattaList(data.data.sattaList);
            setTitle(data.data.title);
            setDescription(data.data.description);
            // setResultDate(Moment(data.data.resultDate).toDate());
            setResultDate(Moment(data.data.resultDate).format('YYYY/MM/DD'))
            // console.log('d string ',Moment(data.data.resultDate).toDate());
            setResultA(data.data.resultA);
            setResultB(data.data.resultB);
            setResultC(data.data.resultC);
            setResultD(data.data.resultD);
            setResultE(data.data.resultE);

          }).catch((er) => {
              console.log(er);
              if (er.response.status == 401) {
                  console.log('getting eror ');
                  console.log(er.response.status);
                //   props.history.push("/login");
                 window.location.href = '/login'
              }
              else{
                  alert('facing some error')
              }
          })
      }
  const sattaAdd = async (e) => {
    //   e.preveventDefault();
        setisLoading(true);
      e.preventDefault();
      let submit_data = {
        title : title,
        resultDate : resultDate,
        resultA : resultA,
        resultB : resultB,
        resultC : resultC,
        resultD : resultD,
        resultE : resultE
      };
      let token = localStorage.getItem('loginToken')
    const headers = {
        'Content-Type': 'application/json',
        'token': token
      }
      console.log(headers);
      console.log(submit_data);
    //   https://satta-backend.herokuapp.com
      await axios.post(URL+'/api/admin/city/satta/'+id,submit_data,{
          headers : headers
      }).then((data) => {
        setisLoading(false)
        console.log(data);
        if(data.status == 202)
        {
            alert(data.data.message);
            return false;
        }
        alert(data.data.message || 'Some error !!');
        // window.location.href = '/home'
      }).catch((er) => {
          console.log('error ',er);
          setisLoading(false)
        alert('Somthing went wrong !!');
      })
  }
  useEffect(() => {
    getSataOne(id);
    let token = localStorage.getItem('loginToken')
    if(!token)
    {
        window.location.href = '/login'
    }
  },[])
  return (
      <>
        <div className='container mt-3'>
            <div className='row'>
                <div className='col-md-12'>
                    <form onSubmit={sattaAdd}>
                        <div className="mb-3 mt-3">
                            <label >Title</label>
                            <input type="text" className="form-control"  placeholder="Enter Title" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result Date:</label>
                            {/* <DateTimePicker 
                                name="date"
                                className={'form-control'}
                                onChange={setResultDate} value={resultDate} minDate={new Date()}/> */}
                                <DatePicker 
                                name="date"
                                className={'form-control'}
                                onChange={(date) => { 
                                    console.log(date);
                                    setResultDate(Moment(date).format('YYYY/MM/DD')) }} value={resultDate} />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Result A</label>
                            <input type="number" className="form-control" name="resultA" onChange={(e) => setResultA(e.target.value)} value={resultA} placeholder="Result A" />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Gali</label>
                            <input type="number" className="form-control" name="resultB" onChange={(e) => setResultB(e.target.value)} value={resultB} placeholder="Gali" />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Nva Savera</label>
                            <input type="number" className="form-control" name="resultC" onChange={(e) => setResultC(e.target.value)} value={resultC} placeholder="Nva Savera" />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Gali</label>
                            <input type="number" className="form-control" name="resultD" onChange={(e) => setResultC(e.target.value)} value={resultD} placeholder="Gali" />
                        </div>
                        <div className="mb-3 mt-3">
                            <label >Nva Savera</label>
                            <input type="number" className="form-control" name="resultE" onChange={(e) => setResultC(e.target.value)} value={resultE} placeholder="Nva Savera" />
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

export default EditData;