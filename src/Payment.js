import React,{useState, useEffect} from 'react'
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { useStateValue } from './StateProvider';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getCartTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';


function Payment() {
    const [ {cart, user}, dispatch ] = useStateValue();
    const stripe = useStripe();
    const elements = useElements();

    const history = useHistory();

    const [error,setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded,setSucceeded] = useState(false);
    const [processing,setProcessing] = useState("");
    const [clientSecret, setClientSecret] = useState(true);


    useEffect(()=>{
        //generate the special stripe secret which allows us to charge customer
        //whenever cart changes it will make the request and update the stripe secret and charge customer the correct amount
        const getClientSecret = async () =>{
            const response = await axios({
                method:'post',
                // Stripe expects the total in a currencies subunits
                url:`/payments/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret)
            console.log('Try this one>>>',clientSecret);
        }
       
        getClientSecret();
    },[cart])

    console.log('this is the secret >>>', clientSecret)

    const handleSubmit = async (event) =>{
        // stripe stuff
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent}) => {
            // paymentIntent = payment confirrmation

            db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
                })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })

            history.replace('/orders')
        })
    }

    const handleChange = event =>{
        //Listen for changes in the CardElement and show errors
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }
    return (
        <div className='payment'>
            <div className="payment__container">
                <h1>
                    Checkout (<Link to='/checkout'>{cart?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>123 React Ave</p>
                        <p>San Jose, CA</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {cart.map(item=>(
                            <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}/>
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe magic */}
                        <form onSubmit={handleSubmit}> 
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value)=>(
                                        <h3>Order Total: {value}</h3>)}
                                    decimalScale={2}
                                    value={getCartTotal(cart)}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />

                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing? <p>Processing</p> : "BuyNow"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                            *For testing purpose please keep typing '42' to fill out all required information
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
