import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { user } = useContext(AuthContext)
    const { _id, title, price } = useLoaderData();

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered'
        const message = form.message.value;
        const phone = form.phone.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('order placed')
                    form.reset();
                }
            })
            .catch(error => console.error(error))


    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder} className='handlePlaceOrder'>
                <h2 className='text-4xl'>{title}</h2>
                <h4 className='text-2xl'>Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-ghost w-full input-bordered" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-ghost w-full input-bordered" />
                    <input name='phone' type="text" placeholder="Phone number" className="input input-ghost w-full input-bordered" required />
                    <input name='email' type="text" placeholder="Email" defaultValue={user?.email} className="input input-ghost w-full input-bordered" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full" placeholder="Your Message"></textarea>

                <input className='btn' type="submit" value="place your Order" />
            </form>
        </div>
    );
};

export default Checkout;