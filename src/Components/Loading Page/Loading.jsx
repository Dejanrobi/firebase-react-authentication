import React from 'react'
import { Card } from 'react-bootstrap';
import "./Loading.css";
import loading from "./loading.svg";

const Loading = () => {
  return (
    <>
        <div className='loading'>
            <img className='loadingImage' src={loading} alt="Loading" />
        </div>
    </>
  )
}

export default Loading
