import React, { Fragment } from "react";
import useKanoodle from "./hooks/kanoodle";
import "./style.css";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Kanoodle from "./hooks/kanoodle";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const KanoodlePuzzle = () => {
  const worker = new Kanoodle();
  // const { StartWorker, StopWorker } = useKanoodle();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          {/* <MainFeaturedPost  />
          <Grid container spacing={3} sx={{ mt: 3 }} className="grid-center">
            <Main title="From the firehose" posts={posts} />
          </Grid> */}
            <Fragment>
              <button
                className='border mt-4 justify-center content-center rounded-2xl p-4 all-btn-chessboard'
                id="startbtn"
                onClick={() => worker.StartWorker()}
              >Start Worker
              </button>
              <button
                className='border justify-center content-center rounded-2xl p-4 disabled'
                id="startbtn"
                onClick={() => worker.StopWorker()}
              >Stop
              </button>
              <p>Solutions found: <span id="solcnt">0</span></p>
            </Fragment>
            <Grid container spacing={3} sx={{ mt: 3 }} className="grid-center">
              <div id="work"></div>
              <div id="results"></div>
              <div id="debug"></div>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>

  );
};

export default KanoodlePuzzle;
