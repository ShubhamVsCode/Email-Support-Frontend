import React from 'react'

const FreeExpire = () => {
  return (
    <div class="main">
      <div class="content">
        <h1>Your Email free trial <br/>has ended.</h1>
        <p>Man - the time just flew by, didn&#39;t it?</p>
        <p style={{fontWeight: 600}}>To keep using Email and access all of your data, upgrade to a paid account today!</p>
      
        <p class="contact">Need help? Pay Rs. 700/month only</p>
        </div>

        <div style={{textAlign: "center"}} >

        <img src='/QR.jpg' style={{
            width: "300px",
        }}/>
        </div>
      </div>
  )
}

export default FreeExpire