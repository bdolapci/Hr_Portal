import React from 'react'
import Jobcard from '../components/Jobcard'
import Navbar from '../components/Navbar'

function Categories() {

    const gridstyle={
        display:"grid",
        gridTemplateColumns: "400px 400px",
        gridRow:" auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        justifyContent: "center",
        marginTop:"10%",
        marginBottom:"10%",

    }
    const Categoryex={
        "title":["Category 1","Category 2","Category 3","Category 4","Category 5","Category 6","Category 7","Category 8","Category 9","Category 10"],
        "image":["/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg",
        "/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg",
        "/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg","/static/images/cards/contemplative-reptile.jpg",
        "/static/images/cards/contemplative-reptile.jpg"],
        "description":["Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards  a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards  group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards  of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards  squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards  with over 6,000 species, ranging across all continents except Antarctica",
        "Lizards over 6,000 species, ranging across all continents except Antarctica",
        "Lizards 6,000 species, ranging across all continents except Antarctica"],
    }

  return (
    <>
    {console.log(Categoryex.title)}
    <Navbar/>
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