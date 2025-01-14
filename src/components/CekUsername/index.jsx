import React, { useEffect, useState } from "react";



const CekUsername = () => {
    const [game, setGame] = useState();
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({ username: "", email: "" });
    const [username,setUsername] = useState("")

    const cekUsername = async () => {
        const data = "123";
        try {
          const response = await fetch("/api/username", {
            method: "POST",
            body: JSON.stringify(data),
          });
          const fetchData = await response.json();
          console.log(fetchData);
          const signature = fetchData.signature;
          const apigames = fetchData.apigames;
          const merchantId = fetchData.merchantId;


      
          const response2 = await fetch(`${apigames}/merchant/${merchantId}/cek-username/${game}?user_id=${userId}&signature=${signature}`,{
            method : "GET",
            headers: {
                'Content-Type': 'application/json',
              }              
          });
      
            const user = await response2.json();
            setUsername(user)
            console.log(`${apigames}/merchant/${merchantId}/cek-username/${game}?user_id=${userId}&signature=${signature}`);
          

        
        } catch (error) {}
      };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserId(`${formData.username}${formData.email}`)
    console.log({formData});
    console.log({game});
    console.log({userId});
    cekUsername();
};

useEffect(() => {
    if (formData.username && formData.email) {
        setUserId(`${formData.username}${formData.email}`);
        setGame('mobilelegend')
      }
  return () => {
    setUserId("")
  }
}, [formData])


  return (
    <div>
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <div className="flex gap-4">
        <div className="mb-4 max-w-[200px]">
          <label htmlFor="username" className=" text-gray-700 font-medium"></label>
          <input placeholder="Id Pengguna" type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="placeholder-blue-800 mt-1 text-black p-2 w-full border rounded" required />
        </div>

        <div className="mb-4 w-[100px]">
          <label htmlFor="email" className=" text-gray-700 font-medium"></label>
          <input placeholder="Id Zona" id="email" name="email" value={formData.email} onChange={handleChange} className="placeholder-blue-800 mt-1 text-black p-2 w-full border rounded" required />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
    <div className="">{
        username && 
    <h1>{username.data?.username}asd</h1>
        }
    </div>
    </div>
  );
};

export default CekUsername;
