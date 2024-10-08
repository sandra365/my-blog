import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { postComment } from "./api/api";
import { Comment } from "./types";

interface CommentFormInputProps {
    postId: string;
    addComment: (comment: Comment) => void;
}

function CommentFormInput (props: CommentFormInputProps) {
    const [isCancelButtonDisabled, setIsCancelsButtonDisabled] = useState<boolean>(true);
    const [isCommentButtonDisabled, setICommentsButtonDisabled] = useState<boolean>(true);
    const [commentFormInput, setCommentFormInput] = useState<string>('');

    const handleFormCancellation = () => {
        setCommentFormInput('');
        setIsCancelsButtonDisabled(true);
    };

    const handleCommentPost = async () => {
        const randomlyGeneratedUserId = Math.floor(Math.random() * 30) + 1;
        const commentData = {
            body: commentFormInput,
            postId: props.postId,
            userId: randomlyGeneratedUserId,
        };
        const postedCommentData = await postComment(commentData);
        if (!postedCommentData) {
           return; 
        }
        props.addComment({...postedCommentData, likes: 0});
        setCommentFormInput('');
        setIsCancelsButtonDisabled(true);
    };

    useEffect(() => {
        commentFormInput === ''
            ? setICommentsButtonDisabled(true)
            : setICommentsButtonDisabled(false); 
    },[commentFormInput]);
    
    return (
        <Stack>
            <TextField 
                id='comment-input-field' 
                label='Add a comment...'
                margin='normal'
                value={commentFormInput}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCommentFormInput(event.target.value);
                }}
                onFocus={() => {
                    setIsCancelsButtonDisabled(false);
                }}
                onBlur={() => {
                    setIsCancelsButtonDisabled(true);
                }}
            />
            <Stack flexDirection='row' justifyContent='right' mb='1'>
                <Button 
                    disabled={isCancelButtonDisabled} 
                    variant='outlined' 
                    size='small' 
                    sx={{mr: 1}}
                    onClick={() => {
                        handleFormCancellation();
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    disabled={isCommentButtonDisabled} 
                    variant='contained' 
                    size='small'
                    onClick={() => {
                        handleCommentPost();
                    }}
                >
                    Comment
                </Button>
            </Stack>
        </Stack>
    );
}

export default CommentFormInput;
