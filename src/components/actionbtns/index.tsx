import { Box, Button } from "@mui/material"


type IProps = {
    loading: boolean;
    error: boolean;
    page:number;
    setPage:(page: number) => void;
}
const ActionBtns:React.FC<IProps> = ({setPage,loading,error,page}) =>{
    const nextHandle=()=>{
        console.log(page,"setpage")
            setPage(page+1)
        
      }
      const prevHandle=()=>{
        if(page !== 1 ) {
            setPage(page-1)
        }
        
      }
    return (
        <Box sx={{
            display:'flex'
            ,
            justifyContent: 'space-between',
        }}>
        <Button variant={"contained"} onClick={()=>prevHandle()} color="secondary" disabled={page === 1 || loading ||error} >Previous</Button>
        <Button variant={"contained"} onClick={()=>nextHandle()} color="secondary"  disabled={error}>Next</Button>
        </Box>
    )
}

export default ActionBtns