import {makeStyles} from '@material-ui/core'

export default makeStyles((theme) => ({
    navlinks: {
      marginLeft: theme.spacing(2),
      display: "flex",
    },
   logo: {
      flexGrow: "1",
      cursor: "pointer",
      color : "white",
      textDecoration:" none !important",
      "&:hover": {
        color: "yellow",
       
      },
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "16px",
      marginLeft: theme.spacing(5),
      "&:hover": {
        color: "red",
        borderBottom: "1px solid white",
      },
      backgroundColor:"transparent",
      border :"none",
      textTransform:"capitalize"
    },
  }));
  