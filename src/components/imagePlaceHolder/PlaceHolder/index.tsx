import { Box, CircularProgress } from "@mui/material";

const Placeholder = () => {
    return (
            <Box
              sx={{
                width: "100%",
                height: "500px",
                bgcolor: "grey.300", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position:"relative"
                
              }}
            >
                <div style={{position:"relative" ,width:"35px" ,height:'35px'}}>

              <CircularProgress sx={{position:"absolute",top:0,left:0,right:0}} color="secondary" size="100" />
                </div>
            </Box>
    )
}
  export default Placeholder;