import { Box, Typography } from "@mui/material"



type IProps = {
    title:string;
}
const TitleForm:React.FC<IProps> = ({title}) => {
    return (
       
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px', // Optional: Add some margin below the title
              }}
            >
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            </Box>
          
    )
}
export default TitleForm