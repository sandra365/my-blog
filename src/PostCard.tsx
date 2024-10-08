import { Reactions } from './types';
import { cropPostBody, formatTitle } from './utils';
import TagList from './TagList';
import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReactionsCounter from './ReactionsCounter';

interface PostProps {
    id: number,
    title: string;
    body: string;
    tags: string[];
    reactions: Reactions;
}

function PostCard(props:PostProps) {
    const postTitle = formatTitle(props.title);
    const postBodyPreview = cropPostBody(props.body);
    const buttonLink = `/posts/${props.id}`
    
    return (
        <Grid item xs={8} sm={8} md={6} minWidth={320}>
            <Card>
                <CardContent sx={{
                    '@media (min-width: 600px)': {
                        height: 200
                    },
                    '@media (max-width: 599px)': {
                        height: 225,
                        mb: 2
                    },
                    '@media (min-width: 900px)': {
                        mb: 4
                    }
                }}>
                    <Typography variant='h5' component='h2'>
                        {postTitle}
                    </Typography>
                    <Box sx={{pb: 2}}>
                        <TagList tags={props.tags}/>
                    </Box>
                    <Typography variant='body2'>
                        {postBodyPreview}
                    </Typography>
                </CardContent>
                <CardActions sx={{p: 2}}>
                    <Stack direction='row' justifyContent='space-between' sx={{width: '100%'}}>
                        <ReactionsCounter 
                            likes={props.reactions.likes} 
                            dislikes={props.reactions.dislikes} 
                        />
                        <Link to={buttonLink}>
                            <Button variant='contained' size='small'>
                                Read more
                            </Button>
                        </Link>
                    </Stack>
                </CardActions>
            </Card>
        </Grid> 
    );
}

export default PostCard;
