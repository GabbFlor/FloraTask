import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'

const Home_tasks = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [direction, setDirection] = useState('left');

    const handleChange = (e, newValue) => {
        setDirection(newValue > tabIndex ? 'right' : 'left')
        setTabIndex(newValue)
    }

    return (
        <Box>
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
            <Box sx={{ padding: 2, position: 'relative', overflow: 'hidden', minHeight: 100 }}>
                {tabIndex === 0 && (
                    <Slide in={tabIndex === 0} direction={direction} timeout={500} mountOnEnter unmountOnExit>
                        <div style={{ position: 'absolute', width: '100%' }}>
                            Em progresso
                        </div>
                    </Slide>
                )}

                {tabIndex === 1 && (
                    <Slide in={tabIndex === 1} direction={direction} timeout={500} mountOnEnter unmountOnExit>
                        <div className='tab_content' style={{ position: 'absolute', width: '100%' }}>
                            Finalizado
                        </div>
                    </Slide>
                )}
            </Box>
        </Box>
    );
}

export default Home_tasks;