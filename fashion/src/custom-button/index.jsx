import { Button } from "@mui/material";

const CustomButton = ({children, ...otherprops}) => {
    return (
        <>
        <Button {...otherprops}> {children} </Button>
        </>
    )
}
export default CustomButton;