import React from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

  return (
    <div className="row">
        <div className="col-md-12">


            <div>Home</div>
            <button className='btn btn-dark btn-sm' type='button' onClick={()=>navigate("/dashboard")}>Go to dashboard</button>

            


        </div>
    </div>
  )
}

export default Home
