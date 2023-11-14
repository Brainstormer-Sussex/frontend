import React, { Fragment } from "react";
import useKanoodle from "./hooks/kanoodle";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, Typography, CssBaseline, Grid, Container, CardActionArea } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Puzzle from "./resources/puzzle";
import MainFeaturedPost from "./resources/FeaturedPost";

import "./style.css";
import useKanoodleWithPuzzlePiece from "./hooks/kanoodle-with-puzzle";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const KanoodlePuzzle = () => {
  const { StartWorker, StopWorker } = useKanoodle();
  const { StartKanoodleWorker, StopKanoodleWorker } = useKanoodleWithPuzzlePiece();


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost />
          <DndProvider backend={HTML5Backend}>
            <Puzzle />
          </DndProvider>
       
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
            <br/>
            {/* <button
              className='border mt-4 justify-center content-center rounded-2xl p-4 all-btn-chessboard'
              id="startbtn"
              onClick={() => StartKanoodleWorker()}
            >Find Solutions of first puzzle only
            </button>
            <button
              className='border justify-center content-center rounded-2xl p-4 disabled'
              id="startbtn"
              onClick={() => StopKanoodleWorker()}
            >Stop puzzle only
            </button> */}
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
