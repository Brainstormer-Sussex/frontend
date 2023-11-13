import React, { Fragment } from "react";
import useKanoodle from "./hooks/kanoodle";
import "./style.css";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from "./resources/FeaturedPost";
import CardActionArea from '@mui/material/CardActionArea';
import { Card, CardContent, Typography } from "@mui/material";
import Main from "./resources/Main";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const KanoodlePuzzle = () => {
  const { StartWorker, StopWorker } = useKanoodle();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost />
          <Grid
            item 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '24vh' }}
          >
            <Main />
          </Grid>
          <Grid 
            item 
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '24vh' }}
          >
            <Card sx={{ display: 'flex' }} className="row">
              <CardContent >
                <div id="work"></div>
              <Typography variant="subtitle1" paragraph>
                Finding possible solutions for you....
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Solutions found: <span id="solcnt">0</span>
              </Typography>
              <button
                className='border mt-4 justify-center content-center rounded-2xl p-4 all-btn-chessboard'
                id="startbtn"
                onClick={() => StartWorker()}
              >Find Solutions
              </button>
              <button
                className='border justify-center content-center rounded-2xl p-4 disabled'
                id="startbtn"
                onClick={() => StopWorker()}
              >Stop
              </button>
              </CardContent>
            </Card>
          </Grid>
          <Fragment>
            
          </Fragment>
          <Grid container spacing={3} sx={{ mt: 3 }} className="grid-center">
            <div id="debug"></div>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <div id="results"></div>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>

  );
};

export default KanoodlePuzzle;
