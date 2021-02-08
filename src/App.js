import React, {useEffect, useState} from "react";
import { Grid, Divider, TableCell, Table, TableContainer, TableBody, TableHead, TableRow, Paper, IconButton,
  Dialog, DialogTitle, DialogActions, DialogContent, TextField} from "@material-ui/core";
import './App.scss';
import { IconTrash, IconEdit } from 'tabler-icons';
import { makeStyles } from '@material-ui/core/styles';
import {ButtonPrimary, SectionSubtitle, SectionTitle} from "./components/styled";



const newStyle = makeStyles((theme) => ({
  textField: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'white',
    paddingBottom: 0,
    fontWeight: 500,
    marginBottom:8,
    marginTop:8
  },
  divider:{
    width:'100%',
    marginBottom:8
  }
}));



function App() {
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState({
    id:'',
    title:'',
    body:'',
    userId:''
  });
  let postId = '';
  const [open, setOpen] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const [singleComment, setSingleComment] = useState({
    postId:'',
    id:'',
    name:'',
    email:'',
    body:''
  })
  const styles = newStyle();


  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setPosts(data));
  }, []);


  function openDialog(context, id) {
    if (context === 'edit') {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then(response => response.json())
          .then(data => setSinglePost(data));
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
          .then(response => response.json())
          .then(data => setCommentArray(data));
      setOpen(!open);
    } else {
      setSinglePost({});
      setCommentArray([]);
      setOpen(!open);
    }
  }

  function createPost(id){
    let array = posts;
    if(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: singlePost.title,
          body: singlePost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            array.push(data);
            setPosts(array);
            setOpen(!open)
          });

    } else{
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: singlePost.title,
          body: singlePost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            array.push(data);
            setPosts(array);
            setOpen(!open)
          });
    }
  }

  function createPostAndContinue(id){
    let array = posts;
    if(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: id,
          title: singlePost.title,
          body: singlePost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            array.push(data);
            setPosts(array);
            setSinglePost({
              title:'',
              body:''
            });
            setSingleComment({
              name:'',
              email:'',
              body:''
            });
          })
    }else{
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: singlePost.title,
          body: singlePost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            array.push(data);
            setPosts(array);
            setSinglePost({
              title:'',
              body:''
            });
            setSingleComment({
              name:'',
              email:'',
              body:''
            });
          });
    }
  }

  function deletePost(id, indice){
    let array = posts;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      let removed = array.filter( (item, index) => {
        return index != indice;
      });
      setPosts(removed);
    });
  }

  function insertComments(id){
    let array = commentArray;
    let postsArray = posts;
    if(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
        method: 'POST',
        body: JSON.stringify({
          postId:id,
          name:singleComment.name,
          email:singleComment.email,
          body: singleComment.body,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            array.push(data)
            setCommentArray(array)
            setSingleComment({
              name:'',
              email:'',
              body:''
            })
          });
    } else{
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: singlePost.title,
          body: singlePost.body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
          .then((response) => response.json())
          .then(data => {
            postsArray.push(data);
            setPosts(postsArray);
            fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`, {
              method: 'POST',
              body: JSON.stringify({
                postId:postId,
                name:singleComment.name,
                email:singleComment.email,
                body: singleComment.body,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
                .then((response) => response.json())
                .then(data => {
                  array.push(data)
                  setCommentArray(array)
                  setSingleComment({
                    name:'',
                    email:'',
                    body:''
                  })
                });
          });
    }
  }


  return (
      <Grid container xs={12} alignItems='center' justify='center'>
        <Grid container xs={12} md={10}>

          <Grid container xs={12} alignItems='center' justify='space-between' direction='row'>
            <SectionTitle>Postagens</SectionTitle>
            <ButtonPrimary variant="contained" disableElevation onClick={() => openDialog('add', '')}>
              Adicionar Postagem
            </ButtonPrimary>
          </Grid>

          <TableContainer component={Paper}>
            <Table size="small" aria-label="posts">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Título</TableCell>
                  <TableCell align="left">Conteúdo</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post, index) => (
                    <TableRow key={post.id}>
                      <TableCell component="th" scope="row" align="left">{post.id}</TableCell>
                      <TableCell align="left">{post.title}</TableCell>
                      <TableCell align="left">{post.body}</TableCell>
                      <TableCell align="left">
                          <IconButton aria-label="edit" onClick={() => openDialog('edit', post.id)}>
                            <IconEdit size={24} color="#3E59B6" stroke={2} strokeLinejoin="miter" />
                          </IconButton>

                          <IconButton aria-label="delete" onClick={() => deletePost(post.id, index)}>
                            <IconTrash size={24} color="#3E59B6" stroke={2} strokeLinejoin="miter" />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>{(!singlePost.id) ?'Adicionar novo item' : 'Editar Item'}</DialogTitle>
            <DialogContent>
              <form noValidate autoComplete="off">
                <SectionSubtitle>Postagem</SectionSubtitle>
                <Divider className={styles.divider}/>
                <TextField label="Título" value={singlePost.title} variant="outlined" className={styles.textField} onChange={e => setSinglePost({ ...singlePost, title: e.target.value })}/>
                <TextField label="Conteúdo" value={singlePost.body} variant="outlined" multiline rows={6} className={styles.textField} onChange={e => setSinglePost({ ...singlePost, body: e.target.value })}/>

                <SectionSubtitle>Comentários</SectionSubtitle>
                <Divider className={styles.divider}/>
                <TextField  label="Nome" variant="outlined" className={styles.textField} value={singleComment.name} onChange={e => setSingleComment({ ...singleComment, name: e.target.value })}/>
                <TextField label="E-mail" variant="outlined" className={styles.textField} value={singleComment.email} onChange={e => setSingleComment({ ...singleComment, email: e.target.value })}/>
                <TextField label="Comentário" variant="outlined" className={styles.textField} value={singleComment.body} onChange={e => setSingleComment({ ...singleComment, body: e.target.value })}/>
              </form>

              <ButtonPrimary variant="contained" disableElevation onClick={() => insertComments(singlePost.id)}>
                Adicionar Comentário
              </ButtonPrimary>

              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Nome</TableCell>
                      <TableCell align="left">E-mail</TableCell>
                      <TableCell align="left">Conteúdo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commentArray.map((comment) => (
                        <TableRow key={comment.id}>
                          <TableCell align="left">{comment.name}</TableCell>
                          <TableCell align="left">{comment.email}</TableCell>
                          <TableCell align="left">{comment.body}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </DialogContent>
            <DialogActions>
              <ButtonPrimary variant="contained" disableElevation onClick={() => setOpen(!open)}>
                Fechar
              </ButtonPrimary>
              <ButtonPrimary variant="contained" disableElevation onClick={() => createPostAndContinue(singlePost.id)}>
                Salvar e Continuar
              </ButtonPrimary>

              <ButtonPrimary variant="contained" disableElevation onClick={() => createPost(singlePost.id)} autoFocus>
                Salvar
              </ButtonPrimary>
            </DialogActions>
          </Dialog>

        </Grid>
      </Grid>
  );
}

export default App;
