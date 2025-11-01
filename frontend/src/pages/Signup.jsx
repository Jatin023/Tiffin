import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [formData,setformData]=useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    });

      const navigate=useNavigate();

      const handleChange=(e)=>{
        const {name,value}=e.target;
        setformData((prevData)=>({...prevData,[name]:value}));
      }


      const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const res= await axios.post("http://localhost:5000/api/auth/signup",formData);
            alert(res.data.msg);
            navigate('/login');
        }catch(error)
        {
             alert(error.message?.data?.msg || "signup failed");
        }
      };


      return(
        <div className="flex justify-center items-center h-screen bg-gray-100 ">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Signup</h2>
                <input 
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  className="border p-2 w-full mb-3 rounded"
                  required
                  />
                  <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="border p-2 w-full mb-3 rounded"
                  required
                  />
                  <input
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={handleChange}
                  className="border p-2 w-full mb-3 rounded"
                  required
                  />

                  <select
                  name="role"
                  className="border p-2 w-full mb-3 rounded"
                  onChange={handleChange}
                  >
                   <option value="customer">Customer</option>
                    <option value="admin">Admin</option>

                  </select>
                  <button type="submit" className="bg-red-600 text-black text-lg hover:bg-orange-700 w-full p-2 rounded">Signup</button>
                  
                  
            </form>
        </div>
      )
}