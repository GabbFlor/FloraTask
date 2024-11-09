import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Slide from '@mui/material/Slide'
import Style_tarefas from '../styles/Tarefas-style'


const Home_tasks = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [direction, setDirection] = useState('left');

    const handleChange = (e, newValue) => {
        setDirection(newValue > tabIndex ? 'right' : 'left')
        setTabIndex(newValue)
    }

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
                                    <tr>
                                        <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                                        <td>Programar a Flora Task</td>
                                        <td>Importante!!!</td>
                                        <td>
                                            <nav>
                                                <button className='btn concluir btn-style-table'>Concluir</button>
                                                <button className='btn deletar btn-style-table'>Deletar</button>
                                                <button className='btn editar btn-style-table'>Editar</button>
                                                <button className='btn visualizar btn-style-table'>Visualizar</button>
                                            </nav>
                                        </td>
                                    </tr>
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
                                    <tr>
                                        <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                                        <td>Dormir</td>
                                        <td>Opcional fds</td>
                                        <td>
                                            <nav>
                                                <button className='btn deletar btn-style-table'>Deletar</button>
                                                <button className='btn visualizar btn-style-table'>Visualizar</button>
                                            </nav>
                                        </td>
                                    </tr>
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