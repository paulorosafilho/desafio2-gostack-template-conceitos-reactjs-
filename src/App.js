import React, {useState, useEffect} from "react";

//Importando a api
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);
  
  //Listando projetos no início da aplicação
  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response.data);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      title: `Novo reposítório ${Date.now()}`,
      owner: "Paulo Rosa"
    })
    
    const repository = response.data

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    const response = await api.delete(`repositories/${id}`)

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories])
  }

  return (
    <div>

      <ul data-testid="repository-list">
        
          {repositories.map(repository => 
          
            <li key={repository.id}>
              
              {repository.title}
          
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>

            </li>

          )}
          
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
