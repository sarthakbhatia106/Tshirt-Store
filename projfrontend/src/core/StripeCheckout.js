import React, {useState,useEffect} from 'react';
import { isAutheticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import {createOrder} from "./helper/OrderHelper"
import {setReload,reload} from "./Cart"

const StripeCheckout=({products,setReload=f=>f, reload= undefined})=>{

    const [data, setData]=useState({
        loading:false,
        success:false,
        error:"",
        address: ""
    });

    const token= isAutheticated() && isAutheticated().token;
    const userId= isAutheticated() && isAutheticated().user._id;

    const getFinalAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount= amount+p.price;
        })
        return amount;
    }
    const makePayment=(token)=>{
        const body={
            token,
            products
        }
        const headers={
            "Content-Type" : "application/json"
        }

        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response=>{
            console.log(response)
            const {status}=response;
            console.log("STATUS", status);
            cartEmpty(()=>{
                console.log("did we have a crash")
            });
            setReload(!reload)
        }).catch(err=>console.log(err))
    }

    const showStripeButton=()=>{
        return isAutheticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51H55RwE3p3Iu3fsV3hQvRbyqMiIqeggPYW1Pkb1WMWKIVgOlVBBQPsRjPTS51a04dzUWELoKNkUM1FOBEupmmmwN00p3QhrwdH"
            token={makePayment}
            amount={getFinalAmount() * 100}
            name="Buy tshirts"
            shippingAddress
            billingAddress
            >
            <button className="btn btn-success btn-lg">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign in</button>
            </Link>
        )
    }



    return (
        <div>
            <h3 className="text-white">Stripe checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;