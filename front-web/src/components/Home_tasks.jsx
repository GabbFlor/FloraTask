import { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import Style_tarefas from '../styles/Tarefas-style'
import axios from 'axios'
import Swal from 'sweetalert2'
import VisualizarTarefa from './Visualizar_tarefa'


const Home_tasks = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [direction, setDirection] = useState('left');
    const [tarefasCompletas, setTarefasCompletas] = useState([]);
    const [tarefasIncompletas, setTarefasIncompletas] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tarefaSelecionada, setTarefaSelecionada] = useState(null);

    const handleChange = (e, newValue) => {
        setDirection(newValue > tabIndex ? 'right' : 'left')
        setTabIndex(newValue)
    }

    const atualizarTarefasCompletas = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`http://localhost:8080/auth/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                let userId = response.data.id;

                try {
                    const responseTarefa = await axios.get(`http://localhost:8080/tarefa/getCompletedByUserId/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
    
                    if (responseTarefa.status === 200) {
                        setTarefasCompletas(responseTarefa.data);
                    }
                } catch (errorTarefa) {
                    if(errorTarefa.response && errorTarefa.response.data === 403) {
                        console.error(`Erro ao recuperar tarefas: ${errorTarefa.message}`)
                    }
                }
            }
        } catch (error) {
            if(error.response && error.response.status === 403) {
                window.location.href = '/auth/login'
            } 
            else {
                console.error(`Erro interno no servidor: ${error.message}`)
            }
        }
    }

    const atualizarTarefasIncompletas = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`http://localhost:8080/auth/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                let userId = response.data.id;

                try {
                    const responseTarefa = await axios.get(`http://localhost:8080/tarefa/getIncompletedByUserId/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
            
                    if (responseTarefa.status === 200) {
                        setTarefasIncompletas(responseTarefa.data);
                    }
                } catch (errorTarefa) {
                    if(errorTarefa.response && errorTarefa.response.data === 403) {
                        console.error(`Erro ao recuperar tarefas: ${errorTarefa.message}`)
                    }
                }
            }
        } catch (error) {
            if(error.response && error.response.status === 403) {
                window.location.href = '/auth/login'
            } 
            else {
                console.error(`Erro interno no servidor: ${error.message}`)
            }
        }
    }

    useEffect(() => {
        atualizarTarefasCompletas();

        atualizarTarefasIncompletas();
    }, []);

    const handleVisualizarTarefa = (nome, detalhes, tagName, tagColor, prazo, criado_em) => {
        setTarefaSelecionada({ nome, detalhes, tagName, tagColor, prazo, criado_em });
        setModalIsOpen(true);
    } 

    const closeModal = () => setModalIsOpen(false);

    return (
        <Box>
            <Style_tarefas />
            <Tabs 
                value={tabIndex} 
                onChange={handleChange} 
                TabIndicatorProps={{
                    style: {
                        backgroundColor: '#EB7E84',
                    },
                }}
                sx={{
                    '& .MuiTab-root': {
                        fontSize: "15px"
                    },
                    '& .MuiTab-root.Mui-selected': {
                        color: '#D74951',
                        fontSize: "15px"
                    },
                }}
            >
                <Tab label="Em progresso" />
                <Tab label="Finalizado" />
            </Tabs>
            <Box className='container-box-tabs'>
                {modalIsOpen && (
                    <VisualizarTarefa
                        tarefa={tarefaSelecionada}
                        closeModal={closeModal}
                    />
                )}
                {tabIndex === 0 && (
                    <Slide in={tabIndex === 0} direction={direction} timeout={500} mountOnEnter unmountOnExit>
                        <div style={{ position: 'absolute', width: '100%' }}>
                            <table className='table-tarefas'>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" value={"teste"} className='chekbox-line-table' /></th>
                                        <th>Tarefa</th>
                                        <th>Tags</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarefasCompletas.map(tarefa => (
                                        <tr key={tarefa.id}>
                                            <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                                            <td>{tarefa.nome}</td>
                                            <td className='tag-td'>
                                                <div className='tag-color' style={{ backgroundColor: tarefa.tags.color }}></div>
                                                {tarefa.tags.nome}
                                            </td>
                                            <td>
                                                <nav>
                                                    <button className='btn concluir btn-style-table'>Concluir</button>
                                                    <button className='btn deletar btn-style-table'>Deletar</button>
                                                    <button className='btn editar btn-style-table'>Editar</button>
                                                    <button 
                                                        className='btn visualizar btn-style-table' 
                                                        onClick={() => handleVisualizarTarefa(
                                                            tarefa.nome,
                                                            tarefa.detalhes,
                                                            tarefa.tags.nome,
                                                            tarefa.tags.color,
                                                            tarefa.prazo,
                                                            tarefa.criado_em
                                                        )}
                                                    >Visualizar</button>
                                                </nav>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Slide>
                )}

                {tabIndex === 1 && (
                    <Slide in={tabIndex === 1} direction={direction} timeout={500} mountOnEnter unmountOnExit>
                        <div style={{ position: 'absolute', width: '100%' }}>
                        <table className='table-tarefas'>
                                <thead>
                                    <tr>
                                        <th><input type="checkbox" value={"teste"} className='chekbox-line-table' /></th>
                                        <th>Tarefa</th>
                                        <th>Tags</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tarefasIncompletas.map(tarefa => (
                                        <tr key={tarefa.id}>
                                            <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                                            <td>{tarefa.nome}</td>
                                            <td>{tarefa.tags.nome}</td>
                                            <td>
                                                <nav>
                                                    <button className='btn deletar btn-style-table'>Deletar</button>
                                                    <button 
                                                        className='btn visualizar btn-style-table'
                                                        onClick={() => handleVisualizarTarefa(
                                                            tarefa.nome,
                                                            tarefa.detalhes,
                                                            tarefa.tags.nome,
                                                            tarefa.tags.color,
                                                            tarefa.prazo,
                                                            tarefa.criado_em
                                                        )}
                                                    >Visualizar</button>
                                                </nav>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Slide>
                )}
            </Box>
        </Box>
    );
}

export default Home_tasks;