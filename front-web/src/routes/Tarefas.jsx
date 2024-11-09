import { useState } from "react";
import Header from "../components/Header";
import Home_tasks from "../components/Home_tasks";
import Style_tarefas from "../styles/Tarefas-style";
import { BsSearch, BsFunnel } from "react-icons/bs"
import Swal from 'sweetalert2'

const Tarefas = () => {
    const [nome, setNome] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [tags, setTags] = useState("");
    const [prazo, setPrazo] = useState("");
    const [img, setImg] = useState(null);

    const handleAddTarefa = () => {
        Swal.fire({
            title: "Adicionar uma nova tarefa",
            html: ``,
            // input: "text", placeholder: "teste"
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Nome: ${nome}`)
        console.log(`Nome: ${detalhes}`)
        console.log(`Nome: ${tags}`)
        console.log(`Nome: ${prazo}`)
    }

    return (
        <div className="Pagina-Tarefas">
            <Style_tarefas />

            <Header />

            <main>
                <section className="cima">
                    <section className="Escrita-btn-add">
                        <h1>Tarefas</h1>
                        
                        <button className="btn add" onClick={() => handleAddTarefa()}>Adicionar</button>
                    </section>

                    <section className="Search-section">
                        <form action="" className="search-div">
                            <input type="text" placeholder="Procurar"/>
                            <button type="submit" title="Pesquisar"><BsSearch /></button>
                        </form>

                        <div className="filter-div">
                            <BsFunnel /> <p>Filtrar</p>
                        </div>
                    </section>
                </section>
                <section className="Tabela_tarefas">
                    <Home_tasks />
                </section>

                <form action="">
                    <div>
                        <label htmlFor="nome">Título:</label>
                        <input 
                            type="text" 
                            className="input name" 
                            placeholder="Digite aqui..." 
                            name="nome" 
                            value={nome}
                            onChange={setNome} 
                        />
                    </div>
                    <div>
                        <label htmlFor="detalhes">Detalhes:</label>
                        <input 
                            type="textarea" 
                            className="input detalhes" 
                            placeholder="Digite aqui..." 
                            name="detalhes" 
                            value={detalhes}
                            onChange={setDetalhes} 
                        />
                    </div>
                    <div>
                        <label htmlFor="tags">Tags:</label>
                        <input 
                            type="text" 
                            className="input tags" 
                            placeholder="Digite aqui..." 
                            name="tags" 
                            value={tags}
                            onChange={setTags} 
                        />
                    </div>
                    <div>
                        <label htmlFor="prazo">Prazo:</label>
                        <input 
                            type="date" 
                            className="input prazo" 
                            placeholder="Digite aqui..." 
                            name="prazo" 
                            value={prazo}
                            onChange={setPrazo} 
                        />
                    </div>
                    <div>
                        <label htmlFor="img">Imagem:</label>
                        <input 
                            type="file" 
                            className="input img" 
                            placeholder="Digite aqui..." 
                            name="img" 
                        />
                    </div>
                    
                    <div>
                        <button className="btn deletar btn-style-table">Cancelar</button>
                        <button className="btn concluir btn-style-table">Adicionar</button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default Tarefas;