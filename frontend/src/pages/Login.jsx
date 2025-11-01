import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Login()
{
    const {login}=useAuth()
    const [formData,setformData]=useState({email:"",password:""});
    const navigate=useNavigate();

    const handleChange=(e)=>
    {    const {name,value}=e.target
        setformData((prevData)=>({...prevData,[name]:value}));
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", formData);
            login(res.data.user,res.data.token);
            alert(res.data.msg);

            if(res.data.user.role==="admin")
            {
                navigate("/admin/dashboard");
            }else{
                navigate("/custpmer/dashboard");
            }
        }catch(err)
        {
              alert(err.response?.data?.msg || "Login failed");
        }
    };

    return(

        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md w-80" >

                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input
                type="email"
                name="email"
                placeholder="Email"
                 className="border p-2 w-full mb-3 rounded"
                onChange={handleChange}
                required
                />
                <input 
                type="password"
                name="password"
                placeholder="Password"
                className="border p-2 w-full mb-3 rounded"
                onChange={handleChange}
                required
                />
                <button type="submit" className="bg-red-600 hover:bg-red-700 rounded w-full p-2 text-black text-xl">Login</button>
                <p>Don't have an account ?{" "}
                    <Link to="/signup" className="text-blue-400 hover:underline">Signup</Link>
                </p>
            </form>
        </div>
    )
}