import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
  Link,
  Modal,
  Card,
  CardContent
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function App() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [openBio, setOpenBio] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/github/${username}`);
      setUserData(response.data);
      const response_followers = await axios.get(`http://localhost:8000/api/github/${username}/followers`);
      setFollowers(response_followers.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleOpenBio = () => {
    setOpenBio(true);
  };

  const handleCloseBio = () => {
    setOpenBio(false);
  };

  const handleViewProfile = async (login) => {
    setUsername(login);
    await fetchUserData();
  };

  const followerColumns = [
    {
      field: 'avatar_url',
      headerName: 'Avatar',
      width: 150,
      renderCell: (params) => (
        <Avatar src={params.value} alt="Avatar"/>
      )
    },
    { field: 'login', headerName: 'Login', width: 150 },
    { field: 'url', headerName: 'Perfil', width: 300, renderCell: (params) => (<Button 
      variant="contained" 
      color="primary" 
      onClick={() => handleViewProfile(params.row.login)}
    >
      Ver perfil
    </Button>) }
  ];

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Typography variant="h4" align="center">Buscar Usuário GitHub</Typography>
          <TextField 
            fullWidth
            variant="outlined"
            label="Nome do usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Button 
            variant="contained" 
            color="primary" 
            onClick={fetchUserData}
            style={{ marginTop: '10px' }}
          >
            Buscar
          </Button>
        </Grid>

        <Grid item xs={6}>
          {/* Informação do usuário */}
          {userData && (
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">DADOS DO USUÁRIO</Typography>
                <Avatar alt={userData.name} src={userData.avatar_url} style={{ width: '100px', height: '100px', margin: '20px 0' }} />
                <Typography variant="h6">{userData.name}</Typography>
                <Typography>Username: {userData.login}</Typography>
                <Button variant="outlined" color="primary" onClick={handleOpenBio}>Exibir Bio</Button>
                <Modal
                  open={openBio}
                  onClose={handleCloseBio}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={{ padding: '20px', background: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    {userData.bio || "Sem bio disponível."}
                  </div>
                </Modal>
                <Typography>Link GitHub: <Link href={userData.html_url} target="_blank">{userData.html_url}</Link></Typography>
                <Typography>Blog: <Link href={userData.blog} target="_blank">{userData.blog}</Link></Typography>
                <Typography>Empresa: {userData.company}</Typography>
                <Typography>Localização: {userData.location}</Typography>
                <Typography>Número de Repositórios Públicos: {userData.public_repos}</Typography>
                <Typography>Número de Followers: {userData.followers}</Typography>
                <Typography>Número de Followings: {userData.following}</Typography>
              </CardContent>
            </Card>
          )}
        </Grid>

        <Grid item xs={6}>
          {/* Lista de seguidores */}
          {followers.length > 0 && (
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" style={{ marginBottom: '20px' }}>Seguidores</Typography>
                <div style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={followers}
                    columns={followerColumns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick={true}
                    components={{
                      Toolbar: GridToolbar,
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
