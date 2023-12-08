import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ContentSection(props) {
    return (
        <>
            <Grid item xs={12} md={6}>
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                            Polysphere Pyramid Puzzle
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {/* {post.date} */}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                            The puzzle is a level 5 pyramid made of the pieces that we used in the task 4
                            <br />
                            As in the previous task, we expect that the user can specify a partial configuration (which, of course, may also be an "empty" configuration) and your application can provide all the possible "completions". In addition to the points mentioned in the previous task (correctness, efficiency, testing, etc.), solutions should be presented in a way that is helpful for a player with an actual physical set of the puzzle at hand. For example, how about images like this?
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                            Let's play now...
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default ContentSection;