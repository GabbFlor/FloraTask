import { useEffect, useState } from "react";
import Header from "../components/Header";
import Home_tasks from "../components/Home_tasks";
import Style_tarefas from "../styles/Tarefas-style";
import { BsSearch, BsFunnel, BsCaretDownFill, BsX } from "react-icons/bs"
import Swal from 'sweetalert2'
import Modal from "react-modal";
import Style_pop_up_tarefa from "../styles/Pop-up-tarefa-style";
import axios from "axios";

Modal.setAppElement("#root");

const Tarefas = () => {
    const [nome, setNome] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [tags, setTags] = useState(null);
    const [prazo, setPrazo] = useState("");
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [tagSelecionadas, setTagsSelecionadas] = useState("Selecione uma tag:");
    const [idUser, setIdUser] = useState("");
    const [tagOptions, setTagOptions] = useState([]);
    const openModal = () => setFormIsOpen(true);
    const closeModal = () => setFormIsOpen(false);

    const recuperarIdDoUser = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("http://localhost:8080/auth/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setIdUser(response.data.id);
            }
        } catch (error) {
            if (error.response.status === 403) {
                window.location.href = "/auth/login";
            } else {
                console.error(`Ocorreu um erro desconhecido: ${error.message}`);
            }
        }
    }

    useEffect(() => {
        recuperarIdDoUser();
    }, []);

    const atualizarTags = async () => {
        if (!idUser) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:8080/tags/getByUserId/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setTagOptions(response.data);
            }
        } catch (error) {
            if (error.response.status === 403) {
                console.error("Você não tem permissão para acessar as tags.");
            } else {
                console.error(`Erro ao atualizar tags: ${error.message}`);
            }
        }
    }

    useEffect(() => {
        atualizarTags();
    }, [idUser])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nome && detalhes && prazo != "") {
            const token = localStorage.getItem("token");

            axios.post("http://localhost:8080/tarefa", {
                    nome: nome,
                    detalhes: detalhes,
                    tags: {
                        id: tags
                    },
                    userId: idUser,
                    prazo: prazo
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(response => {
                if (response.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: `A tarefa "${nome}" foi adicionada com sucesso!`,
                        timer: 1500,
                        showConfirmButton: false
                    })
                    .then(() => {
                        console.log(tags);
                        // window.location.href = '/';
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Você não tem permissão para adicionar tarefas!`,
                        timer: 1500
                    })
                    .then(() => {
                        closeModal();
                    })
                } else if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Algum dos campos inseridos ultrapassa o limites de caracteres (255 caracteres).`,
                        showConfirmButton: true
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Erro interno no servidor: ${error.message}`
                    })
                    .then(() => {
                        closeModal();
                    })
                }
            })
        } else {
            console.error("Não tente alterar o HTML para enviar valores vazios!")
        }
    }

    const limparTags = () => {
        setTags(null);
        setTagsSelecionadas("Selecione uma tag:")
    }

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
                                required
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
                                required
                                value={detalhes}
                                onChange={(e) => setDetalhes(e.target.value)} 
                            />
                        </div>
                        <div className="div-tags">
                            <label htmlFor="tags">Tags:</label>
                            {/* (prev) => !prev ; isso serve para quando clicar a primeira vez ele abrir, e na segunda ele fechar */}
                            <button type="button" className="button-dropdown" onClick={() => setDropdownAberto((prev) => !prev)}>
                                {tagSelecionadas}

                                <div className="buttons-dropdown-options">
                                    <BsX className="X-icon" title="Limpar tag" onClick={(e) => {
                                        // serve para executar apenas o do btn X, sem executar o do btn dropdown
                                        e.stopPropagation();
                                        limparTags();
                                    }}/>
                                    <BsCaretDownFill title="Abrir menu de tags"/>
                                </div>
                            </button>

                            {dropdownAberto && (
                                <section className="dropdown-menu">
                                    {tagOptions.map((tag) => (
                                        <div key={tag.id} className="dropdown-line" onClick={() => {
                                            setDropdownAberto(false);
                                            setTagsSelecionadas(tag.nome);
                                            setTags(tag.id);
                                        }}
                                        >
                                            <div className="tag-color" style={{backgroundColor: tag.color}}></div>
                                            <div>{tag.nome}</div>
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
                                required
                                value={prazo}
                                onChange={(e) => setPrazo(e.target.value)} 
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