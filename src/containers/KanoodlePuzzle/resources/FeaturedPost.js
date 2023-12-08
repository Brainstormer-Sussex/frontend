import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ContentSection(props) {
  const { post } = props;

  return (
    <>
      <Grid item xs={12} md={6}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                Kanoodle Puzzle
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {/* {post.date} */}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Kanoodle is a collection of fun, logical thinking puzzles. It’s great for promoting children’s spatial reasoning skills and developing their self-confidence with problem-solving. For adults, these puzzles help maintain lifetime cognitive function. Exercising the brain is great for all ages! 101 puzzles are included, which makes Kanoodle perfect for everyone from puzzle-loving children to puzzle-master adults. The small, portable case makes it easy to carry with you wherever you go.



                Read more: https://manuals.plus/kanoodle/kanoodle-interior-id6-ei-2978-user-manual#ixzz8IykUnzFd
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

ContentSection.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContentSection;