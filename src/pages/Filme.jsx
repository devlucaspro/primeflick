import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';

const Filme = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "9c03104ee500db58c957f1c3e158daaf",
          language: "pt-BR",
        }
      })
      .then((response) => {
        setFilme(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log('filme não encontrado')
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme()
    

    return () => {
      console.log('Componente foi desmontado')
    }

  }, [navigate, id])

  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primefilmes');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

    if(hasFilme) {
      toast.warn('Esse filme já está na sua lista!')
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primefilmes', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso!');
  }

  if(loading) {
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme-info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse:</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className='area-btn'>
        <button  onClick={salvarFilme}>Salvar</button>
        <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
      </div>
    </div>
  )
}

export default Filme;