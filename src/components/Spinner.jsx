import React from 'react'
import PuffLoader from "react-spinners/PuffLoader";
function Spinner() {
    const [loading, setLoading] = React.useState(true);
    const [color, setColor] = React.useState("rgb(25, 118, 210)");
    
  return (
    <div className="sweet-loading" style={{position:"fixed",
      top: 0, left: 0,
      transform: "translate(calc(44vw - 50%), calc(40vh - 50%))",}}>
      <PuffLoader color={color} loading={loading}  size={150} />
    </div>
  )
}

export default Spinner