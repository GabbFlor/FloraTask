import { useState } from "react";
import Header from "../components/Header";
import Home_tasks from "../components/Home_tasks";
import Style_tarefas from "../styles/Tarefas-style";
import { BsSearch, BsFunnel, BsCaretDownFill } from "react-icons/bs"
import Swal from 'sweetalert2'
import Modal from "react-modal";
import Style_pop_up_tarefa from "../styles/Pop-up-tarefa-style";

Modal.setAppElement("#root")

const Tarefas = () => {
    const [nome, setNome] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [tags, setTags] = useState(null);
    const [prazo, setPrazo] = useState("");
    const [img, setImg] = useState(null);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [tagSelecionadas, setTagsSelecionadas] = useState("Selecione uma tag:");

    const openModal = () => setFormIsOpen(true);
    const closeModal = () => setFormIsOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(`Nome: ${nome}`)
        console.log(`detalhes: ${detalhes}`)
        console.log(`tags: ${tags}`)
        console.log(`prazo: ${prazo}`)

        setNome("")
        setDetalhes("")
        setTags(null)
        setPrazo("")
        setTagsSelecionadas("Selecione uma tag:")

        closeModal();
    }

    const tagOptions = [
        { label: "Nenhuma", color: null, value: null },
        { label: "Programação", color: "red", value: "programacao" },
        { label: "Dormir", color: "yellow", value: "dormir" },
    ]

    return (
        <div className="Pagina-Tarefas">
            <Style_tarefas />

            <Header />

            <main>
                <section className="cima">
                    <section className="Escrita-btn-add">
                        <h1>Tarefas</h1>
                        
                        <button className="btn add" onClick={openModal}>Adicionar</button>
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

                <Modal 
                    isOpen={formIsOpen} 
                    onRequestClose={closeModal} 
                    contentLabel="Adicionar tarefa"
                    className="custom-style-form-pop-up"
                >
                    <Style_pop_up_tarefa />
                    <h2>Adicionar nova tarefa</h2>

                    <form action="" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nome">Título:</label>
                            <input 
                                type="text" 
                                className="input name" 
                                placeholder="Digite aqui..." 
                                name="nome" 
                                value={nome}
                                onChange={(e) => setNome(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label htmlFor="detalhes">Detalhes:</label>
                            <textarea 
                                type="textarea" 
                                className="input detalhes" 
                                placeholder="Digite aqui..." 
                                name="detalhes" 
                                value={detalhes}
                                onChange={(e) => setDetalhes(e.target.value)} 
                            />
                        </div>
                        <div className="div-tags">
                            <label htmlFor="tags">Tags:</label>
                            {/* (prev) => !prev ; isso serve para quando clicar a primeira vez ele abrir, e na segunda ele fechar */}
                            <button type="button" className="button-dropdown" onClick={() => setDropdownAberto((prev) => !prev)}>
                                {tagSelecionadas}

                                <BsCaretDownFill />
                            </button>

                            {dropdownAberto && (
                                <section className="dropdown-menu">
                                    {tagOptions.map((option) => (
                                        <div key={option.value} className="dropdown-line" onClick={() => {
                                            setDropdownAberto(false);
                                            setTagsSelecionadas(option.label);
                                            setTags(option.value);
                                        }}
                                        >
                                            <div className="tag-color" style={{backgroundColor: option.color}}></div>
                                            <div>{option.label}</div>
                                        </div>
                                    ))}
                                </section>
                            )}
                        </div>
                        <div>
                            <label htmlFor="prazo">Prazo:</label>
                            <input 
                                type="date" 
                                className="input prazo" 
                                placeholder="Digite aqui..." 
                                name="prazo" 
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)} 
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
                        
                        <div className="div-buttons">
                            <button className="btn deletar btn-style-table" onClick={() => closeModal()}>Cancelar</button>
                            <button className="btn concluir btn-style-table">Adicionar</button>
                        </div>
                    </form>
                </Modal>

                
            </main>
        </div>
    )
}

export default Tarefas;