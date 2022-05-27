import React from 'react'
import Jobcard from '../components/Jobcard'
import Navbar from '../components/Navbar'
import accounting from "../pictures/banner.jpg"
function Categories() {

    const gridstyle={
        display:"grid",
        gridTemplateColumns: "400px 400px",
        gridRow:" auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        justifyContent: "center",
        marginTop:"6%",
        marginBottom:"10%",

    }
    const Categoryex={
        "title":["Accounting","Customer Service","Analytics&Data Science","Design&Illustration","Engineering","Web&Software Development","Law&Legal","Marketing","Writing&Translation","Architecture"],
        "image":["https://hrportal.blob.core.windows.net/uploadfile/accounting.jpg","https://hrportal.blob.core.windows.net/uploadfile/Costumer-Service.png","https://hrportal.blob.core.windows.net/uploadfile/web-sitesi-analizi.png",
        "https://hrportal.blob.core.windows.net/uploadfile/Graphic-Design-Vector-Illustration.jpg.crdownload","https://hrportal.blob.core.windows.net/uploadfile/Engineer's Mindset.jpg","https://hrportal.blob.core.windows.net/uploadfile/Web-Development.jpg",
        "https://hrportal.blob.core.windows.net/uploadfile/indir.jpg","https://hrportal.blob.core.windows.net/uploadfile/marketing-manager.jpg","https://hrportal.blob.core.windows.net/uploadfile/the-industries-require-written-translation-.jpg",
        "https://hrportal.blob.core.windows.net/uploadfile/istockphoto-476190573-1024x1024.jpg"],
        "description":["You can find Hr,Accounting,Consulting jobs in this category",
        "You can find Community Management and Customer services jobs in this category",
        "You can find Analytics ,AI & Machine Learning and Data Mining jobs in this category",
        "You can find Art,Audio Production,NFT Design,Photography jobs in this category",
        "You can find Engineering,Chemical Engineering,Civil Engineering,Electrical Engineering,Mechanical Engineering jobs in this category",
        "You can find BlockChain,Devops,Cloud Computing,Mobile Development,QA &Testing, Game Design jobs in this category",
        "You can find Finance,Law,Legal,Legal Assistant jobs in this category",
        "You can find Marketing,SEO,Social Media,SMM jobs in this category",
        "You can find Copywriting,Translation,Writing jobs in this category",
        "You can find Architecture,Interior Design,Landscape Design jobs in this category"],
    }
    
  return (
    <>
    {console.log(Categoryex.title)}
    <Navbar/>
    <h1 style={{textAlign:"center",marginTop:"5%",fontSize:"64px"}}>Categories</h1>
   <div style={gridstyle} className="grid">
    {Categoryex.title.map((title,index)=>{
        return(
            <Jobcard title={title} image={Categoryex.image[index]} description={Categoryex.description[index]}/>
        )
    })}
 
  
   </div>
    </>
  )
}

export default Categories