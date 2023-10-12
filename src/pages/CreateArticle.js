import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import Topheader from '../components/Topheader';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function CreateArticle() {

    const navigate = useNavigate()

    const { quill, quillRef } = useQuill();

    const [post, setPost] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        let user = JSON.parse(localStorage.getItem("user"))


        if (user === null){

            navigate("/login")

        }else{

            // console.log(user);
            let form = new FormData(e.currentTarget)
            form.append("description", post)
            form.append("user", user.id)

            axios.post('https://samiee.pythonanywhere.com/createarticle/', form)
            .then((res) => {
                navigate("/")
                alert("Success")
            })
            .catch((err)=>{
                for(let i in err?.response?.data){
                    alert(i + " " + err?.response?.data[i])
                }
                
            })
            
    }}

    useEffect(() =>{

        if(quill){
            quill.on('text-change', (delta, oldDelta, source) =>{
                setPost(quill.root.innerHTML);
            })
        }

    }, [quill])

  return (
   <div className="create">
    <Topheader/>
    <div className="container">
        <form onSubmit = {handleSubmit} >

            <div>
                <label htmlFor="" className='form-label'>Title</label>
                <input name='title' className="form-control" />
            </div>

            <div>
                <label htmlFor="" className='form-label'>Main Photo</label>
                <input type="file" name='image' className="form-control" />
            </div>

            <div>
                <label htmlFor="" className='form-label'>Other Photo</label>
                <input type="file" name='other' className="form-control" />
            </div>

            <div className='mt-3'>
                <div ref={quillRef} />
            </div>

            <button type='submit' className='btn btn-dark btn-md w-100'>Submit Article</button>



        </form>
    </div>
   </div>
  )
}

export default CreateArticle