import React, {useEffect, useState} from "react";
import { Grid, TableCell, Table, TableContainer, TableBody, TableHead, TableRow, Paper, IconButton, Button, Dialog, DialogTitle, DialogActions, DialogContent} from "@material-ui/core";
import './App.scss';
import { IconTrash, IconEdit } from 'tabler-icons';

function App() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect( () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => setPosts(data));
  })

  return (
      <Grid container xs={12} alignItems='center' justify='center'>
        <Grid container xs={12} md={10}>

          <Grid container xs={12} alignItems='center' justify='space-between' direction='row'>

            <h1>Postagens</h1>

            <Button variant="contained" color="primary" onClick={() => setOpen(!open)}>
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
                          <IconButton aria-label="edit">
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

          <Dialog
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent>
              <h1>Form</h1>
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
