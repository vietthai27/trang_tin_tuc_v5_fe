import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const NotAuthorizePage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <img src="https://t4.ftcdn.net/jpg/03/10/78/73/360_F_310787392_cNTZuWCdxWeaCllZtUQ29DJR9jpbpiRH.jpg"/>    
            <Button variant="outlined" onClick={()=> {navigate("/")}}>Về trang chủ</Button>       
        </div>
    )
}

export default NotAuthorizePage