import { TextField } from "@mui/material";

const CustomTextField = ({children, ...otherprops}) => {
    return (
        <>
        <TextField {...otherprops}> {children} </TextField>
        </>
    )
}
export default CustomTextField;