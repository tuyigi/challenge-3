import './App.css';
import searchIcon from './assets/searchIcon.png';
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  AppBar,
  Toolbar,
  Container,
  Paper,
  InputBase,
  Button,
  Grid
} from "@material-ui/core";
import { Skeleton} from "@material-ui/lab";
import {
  Search
} from "@material-ui/icons";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: 15,
  },
  btn:{
    textTransform:'capitalize'
  },
  appBar:{
    backgroundColor:"#2593C0"
  },
 
  search:{
    flexGrow:1
  },
  button:{
    backgroundColor:"#2593C0",
    color:"#ffffff",
    textTransform:'capitalize'
  },
  card: {
    borderRadius: 15,
  },
  image:{
    borderRadius: 15,
  }
}));

function App() {
  const classes = useStyles();

  const [loading,setLoading]=useState(false);
  const [photos,setPhotos]=useState([]);
  const [id,setId]=useState(null);

  // get album photo by id 

  const getAlbumPhoto=()=>{
    if(id!==null&&id!==0){
      setLoading(true);
    const searchInstance = axios.create(
      {headers: {
        "Content-Type": "application/json"
      },
    }
    );

    searchInstance.get("https://challengethree.darasa.info/getAlbum.php?id="+id)
    .then((res)=>{
      console.log(res.data);
      setPhotos(res.data);
      setLoading(false);
    });
  }
  }

  useEffect(()=>{

  },[]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} elevation={0}>
        <Toolbar>
          <Box className={classes.title} ml={2}>
          
              <Typography variant="h5">Challenge 2</Typography>
           
          </Box>

        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
      <Box pt={10}>
            <Paper className={classes.paper}>
              <Box p={0} display="flex" flexDirection="column">
                <Box display="flex" alignItems="center" justifyContent="center">
                <InputBase
                className={classes.search}
                size="small"
                placeholder="Search by Album Id"
                inputProps={{ 'aria-label': 'naked' }}
                onChange={(v,e)=>{
                  let id_=v.target.value;
                  if(id_!==0){
                    setId(id_);
                  }else{
                    setId(null);
                  }
                }}
              /> 
              <Button
              variant="contained"
              size="small"
              elevation={0}
              className={classes.button}
              onClick={getAlbumPhoto}

              startIcon={<Search />}>
              Get Photos By Id
              </Button>
                </Box>
              </Box>
             </Paper>
             {loading===false&&photos.length===0&&(
                 <Box mt={10} display="flex" alignItems="center" justifyContent="center">
                   <img src={searchIcon} width={320}/>
                 </Box>
                 )
               }

             <Box mt={5}>
             <Grid container spacing={2}>

               

               {loading===true?
               
               [1,2,3].map((i,m)=>{ 
                 return(
<Grid item xs={6} sm={6} md={6} lg={4}>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={15}
                  width={1}
                >
                  <Skeleton
                    variant="rect"
                    height={150}
                    width={"100%"}
                    style={{ borderRadius: 15 }}
                  />

                  <Skeleton
                    variant="text"
                    width={"68%"}
                    style={{ borderRadius: 7 }}
                  />
                </Box>
              </Grid>
                 );
               }
               ):

               photos.map((pho,i)=>{
return(
              <Grid item xs={6} sm={6} md={6} lg={4}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                 
                    <Paper className={classes.card} elevation={0}>
                      <Box
                        height="150px"
                        width={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        border={0}
                        borderRadius="borderRadius"
                        borderColor="grey.300"
                      >
                        <img src={pho.thumbnailUrl} className={classes.image}/>
                      </Box>
                    </Paper>

                  <Box mt={1}  display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column">
                    <Typography m={2} style={{fontSize:"12px"}} color="inherit">{pho.title}</Typography>
                  </Box>
                </Box>
              </Grid>
);
         
               })

              }
             
          
              </Grid>
           
             </Box>
       </Box >

      </Container>


    </div>
  );
}

export default App;
