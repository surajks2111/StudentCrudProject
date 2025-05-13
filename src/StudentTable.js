import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function StudentTable(){
    const [students,setStudents]=useState("");
    const navigate=useNavigate();
    const DisplayDetails=(id)=>{
        navigate("/student/view/"+id);
    }
    const EditDetails=(id)=>{
        navigate("/student/edit/"+id);
    }
    const DeleteDetails=(id)=>{
        if(window.confirm("Are You Sure you Want to Delete this Particular Student Permanently?")){
            fetch("http://localhost:8000/students/"+id,{
            method:'DELETE',
        })
        .then((res)=>{
            alert("Student Data has been Removed successfully");
            window.location.reload();
        })
        .catch((err)=>console.log(err.message)
    )
        }
    }

    useEffect(()=>{
        fetch('http://localhost:8000/students')
        .then((res)=>res.json())
        .then((data)=>
            setStudents(data)).catch((err)=>
            console.log(err.message))
    },[]) 
    return(
        <div className="container">
            <h2>Student Records</h2>
            <div className="table-container">
                <Link to="/student/create" className="btn btn-add">Add new Student</Link>
                <Link to="/" className="btn btn-logout">Logout</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Place</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students && students.map((item,index)=>(
                            <tr key={item.id}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.place}</td>
                            <td>{item.mobile}</td>
                            <td>
                                <button onClick={()=>DisplayDetails(item.id)} className="btn btn-info">View</button>
                                <button onClick={()=>EditDetails(item.id)} className="btn btn-primary">Edit</button>
                                <button onClick={()=>DeleteDetails(item.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>)
                            )
                            }
                    </tbody>
                </table>
            </div>
        </div>
    )
}