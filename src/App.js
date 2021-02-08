import React, {useEffect, useState} from "react";
import { Grid, Divider, TableCell, Table, TableContainer, TableBody, TableHead, TableRow, Paper, IconButton, Button,
  Dialog, DialogTitle, DialogActions, DialogContent, TextField} from "@material-ui/core";
import './App.scss';
import { IconTrash, IconEdit } from 'tabler-icons';
import { makeStyles } from '@material-ui/core/styles';



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
  const [singlePost, setSinglePost] = useState({});
  const postId = '';
  const [open, setOpen] = useState(false);
  const [commentArray, setCommentArray] = useState([]);
  const styles = newStyle();


  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setPosts(data));
  })

   function fetchComments(){
     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
         .then(response => response.json())
         .then(data => setCommentArray(data));
  }

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




  return (
      <Grid container xs={12} alignItems='center' justify='center'>
        <Grid container xs={12} md={10}>

          <Grid container xs={12} alignItems='center' justify='space-between' direction='row'>

            <h1>Postagens</h1>

            <Button variant="contained" color="primary" onClick={() => openDialog('add', '')}>
              Adicionar Postagem
            </Button>
          </Grid>

          <TableContainer component={Paper}>
            <Table  size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">Título</TableCell>
                  <TableCell align="left">Conteúdo</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell component="th" scope="row" align="left">{post.id}</TableCell>
                      <TableCell align="left">{post.title}</TableCell>
                      <TableCell align="left">{post.body}</TableCell>
                      <TableCell align="left">
                          <IconButton aria-label="edit" onClick={() => openDialog('edit', post.id)}>
                            <IconEdit size={24} color="#01FF01" stroke={1} strokeLinejoin="miter" />
                          </IconButton>

                          <IconButton aria-label="delete">
                            <IconTrash size={24} color="#01FF01" stroke={1} strokeLinejoin="miter" />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={open} onClose={() => setOpen(!open)}>
            <DialogTitle>{'Adicionar novo item'}</DialogTitle>
            <DialogContent>
              <form noValidate autoComplete="off">
                <h2>Postagem</h2>
                <Divider className={styles.divider}/>
                <TextField id="outlined-basic" label="Título" value={singlePost.title} variant="outlined" className={styles.textField}/>
                <TextField id="outlined-basic" label="Conteúdo" value={singlePost.body} variant="outlined" multiline rows={6} className={styles.textField}/>

                <h2>Comentários</h2>
                <Divider className={styles.divider}/>
                <TextField id="outlined-basic" label="Nome" variant="outlined" className={styles.textField}/>
                <TextField id="outlined-basic" label="E-mail" variant="outlined" className={styles.textField}/>
                <TextField id="outlined-basic" label="Comentário" variant="outlined" className={styles.textField}/>
              </form>

              <Button variant="contained" onClick={() => setOpen(!open)} color="primary">
                Adicionar Comentário
              </Button>

              <TableContainer component={Paper}>
                <Table  size="small" aria-label="a dense table">
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
              <Button variant="contained" onClick={() => setOpen(!open)} color="primary">
                Fechar
              </Button>
              <Button variant="contained" onClick={() => setOpen(!open)} color="primary">
                Salvar e Continuar
              </Button>

              <Button variant="contained" onClick={() => setOpen(!open)} color="primary" autoFocus>
                Salvar
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>
      </Grid>
  );
}

export default App;
