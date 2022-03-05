import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { Store } from '../Store'
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingAddressScreen() {
    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const { userInfo, cart: {shippingAddress}} = state

// useState form
    const [fullName, setFullName] = useState(shippingAddress.fullName || '')
    const [address, setAddress] = useState(shippingAddress.address || '')
    const [city, setCity] = useState(shippingAddress.city || '')
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '')
    const [country, setCountry] = useState(shippingAddress.country || '')

    useEffect(() => {
        if(!userInfo){
            navigate('/signin')
        }
    }, [userInfo, navigate])

    const submitHandler = e => {
        e.preventDefault();
        ctxDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload:{
                fullName,
                address,
                city,
                postalCode,
                country,
            },
        })
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postalCode,
                country
            })
        )
        navigate ('/payment')
    }
  return (
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
            <h1 className="my-3">Shipping Address</h1>

{/* Form */}
            <Form onSubmit={submitHandler}>
{/* Form name */}
                <Form.Group className="mb-3" controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control value={fullName} 
                        onChange={e => setFullName(e.target.value)} require
                    />
                </Form.Group>

    {/* Form address */}
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={address} 
                        onChange={e => setAddress(e.target.value)} require
                    />
                </Form.Group>

    {/* Form city */}
                <Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control value={city} 
                        onChange={e => setCity(e.target.value)} require
                    />
                </Form.Group>

    {/* Form PostalCode */}
                <Form.Group className="mb-3" controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control value={postalCode} 
                        onChange={e => setPostalCode(e.target.value)} require
                    />
                </Form.Group>

    {/* Form country */}
                <Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control value={country} 
                        onChange={e => setCountry(e.target.value)} require
                    />
                </Form.Group>
    {/* Button */}
                <div className="mb-3">
                    <Button variant="primary" type="submit">
                        Continue
                    </Button>
                </div>
            </Form>
        </div>

        
    </div>
  )
}
