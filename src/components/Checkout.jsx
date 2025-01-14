"use client";
import Link from "next/link";
import React, { useState } from "react";
import { TbCopy } from "react-icons/tb";

const Checkout = ({ id, price, productName }) => {
  const [quantity, setQuantity] = useState(1);
  const [secret, setSecret] = useState();
  const [link,setLink] =useState()

  const decreaseQuantity = () => {
    setQuantity((prevState) => (quantity > 1 ? prevState - 1 : null));
  };

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleChange = (event) => {
    const value = Math.max(1, parseInt(event.target.value, 10) || 1); // Pastikan nilai minimal 1
    setQuantity(value);
  };

  const checkout = async () => {
    const data = {
      id,
      price,
      productName,
      quantity,
    };
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        body: JSON.stringify(data),
      });

      const requestData = await response.json();
      window.snap.pay(requestData.token);
    } catch (error) {
      console.log(error);
    }
  };

  const copyText =async(text) =>{
    try {
      await navigator.clipboard.writeText(text);
      console.log(text + " berhasil disalin");
    } catch (err) {
      console.error('Gagal menyalin teks ke clipboard:', err);
    }
  }

  const generatePaymentLink = async () => {
    const isi = { quantity };
    const response = await fetch("/api/secret", {
      method: "POST",
      body: JSON.stringify(isi),
    });
    const data = await response.json();
    setSecret(data.secret);
    console.log(data.secret);
    const encode = Buffer.from(`${data.secret}`).toString("base64");
    let dataTransaction = {
      item_details: [
        {
          id : id,
          name: productName,
          price: price,
          quantity: quantity,
        },
      ],
      transaction_details: {
        order_id: id,
        gross_amount: price * quantity,
      },
    };

    const response2 = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `BASIC ${encode}`,
      },
      body: JSON.stringify(dataTransaction),
    });
    const paymentLink = await response2.json();
    console.log(paymentLink.payment_url);
    
    setLink(paymentLink.payment_url)
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex sm:gap-4">
          <button className="transition-all hover:opacity-75" onClick={decreaseQuantity}>
            ➖
          </button>

          <input type="number" id="quantity" value={quantity} className="h-10 w-16 text-black border-transparent text-center" onChange={handleChange} />

          <button className="transition-all hover:opacity-75" onClick={increaseQuantity}>
            ➕
          </button>
        </div>
        <button className="rounded bg-indigo-500 p-4 text-sm font-medium transition hover:scale-105" onClick={checkout}>
          Checkout
        </button>
      </div>
      <div>
        {
          !link &&
      <button className="text-indigo-500 py-4 text-sm font-medium transition hover:scale-105" onClick={generatePaymentLink}>
        Create Payment Link
      </button>
        }
      <div>
      {link && 
      <div className="my-2">
        <Link href={link} className="text-blue-500 italic block text-xs bg-slate-200 p-1 rounded">
          {link}
        </Link>
        <button className="p-1" onClick={()=>{copyText(link)}}>
        <TbCopy className="text-blue-500 mt-1 size-5"/>
        </button>
      </div>
      }
      </div>
      </div>
    </>
  );
};

export default Checkout;
