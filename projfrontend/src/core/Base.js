import React from 'react';
import NavBar from './navBar';

const Base=({
    title="My title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=>{
    return(
        <div>
            <NavBar/>
            <div className="container-fluid">

                <div className="jumbotron bg-dark text-white text-center">
                    <h1 className="display-4">{title}</h1>
                    <p className="lead">{description}</p>
                </div>

                <div className={className}>{children}</div>

            </div>

            <footer className="footer bg-dark mt-auto py-2">

                <div className="container-fluid bg-success text-white text-center py-3">
                    <h4>If you got any questions feel free to reach out!</h4>
                    <button className="btn btn-warning btn-lg"> Contact Us</button>
                </div>
                
                <div className="container text-center">
                    <span className="text-muted" >
                        An amazing place to buy <span className="text-white">tshirts</span>
                    </span>
                </div>

            </footer>
        </div>
    )
}

export default Base;