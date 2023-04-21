import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Favoritos = () => {

  const [filmes, setFilmes] = useState([]);

  useEffect(() => {

    const minhaLista = localStorage.getItem('@primefilmes');
    setFilmes(JSON.parse(minhaLista) || []);

  }, [])

  function excluirFilme(id) {
    let filtroFilmes = filmes.filter((item) => {
      return(item.id !== id)
    })

    setFilmes(filtroFilmes);
    localStorage.setItem('@primefilmes', JSON.stringify(filtroFilmes));
    toast.success('Filme excluido com sucesso!')
  }

  return (
    <div className='meus-filmes'>
      <h1>Meus favoritos</h1>

      {filmes.length === 0 && <span className='span-nenhum'> Você não possui nenhum filme salvo :/</span>}

      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.title}</span>
              <i>{item.vote_average} / 10</i>

              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(item.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favoritos;