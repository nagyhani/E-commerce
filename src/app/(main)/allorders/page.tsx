'use client'

import { ordersReview } from '../ordersAction/ordersAction'
import { OrdersItems } from '@/types/orders'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Orders() {
  const [item, setItem] = useState<OrdersItems[]>([])

  useEffect(() => {
    handelOrders()
  }, [])

  async function handelOrders() {
    const data: OrdersItems[] = await ordersReview()
    setItem(Array.isArray(data) ? data : [])
  }

  return (
    <div className=" w-full">
      <h1 className="text-main text-2xl my-10">Purchase history</h1>

      <div className=" p-2.5 w-full">
        {item.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          item.map((order, index) => (
            <div key={index} className=" border p-2.5 flex flex-col mb-4 space-y-8  w-full">
              <div className='border my-8 p-2.5 rounded-2xl space-y-1  w-full'>

                 <p>Delivery status: {order.isDelivered}</p>
              <p>Payment method: {order.paymentMethodType}</p>
              <p>Payment status: {order.isPaid}</p>
              <p>Tax price: {order.taxPrice} EGP</p>
              <p>Shipping price: {order.shippingPrice} EGP</p>
              <p> Total price: {order.totalOrderPrice} EGP</p>

              </div>
             

            

             {Array.isArray(order.cartItems) && order.cartItems.map((element) => (
  <div key={element._id} className="border p-8 flex items-center justify-between rounded-2xl">
    <Image
      src={element.product.imageCover}
      alt={element.product.title}
      width={100}
      height={100}
    />
    <p className="ms-6">{element.product.title}</p>
  </div>
))}
             
            </div>
          ))
        )}
      </div>
    </div>
  )
}