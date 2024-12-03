import { useEffect, useState } from "react";
import Header from "../components/Header";
import Tags_table from "../components/Tags_table";
import Tags_style from "../styles/Tags-style";
import Modal from "react-modal";
import Style_pop_up_tarefa from "../styles/Pop-up-tarefa-style";
import axios from "axios";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const Tags = () => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tagColor, setTagColor] = useState("#000000");
    const [userInfo, setUserInfo] = useState([]);
    const [caracteres, setCaracteres] = useState(0);

    const openModal = () => setFormIsOpen(true);
    const closeModal = () => setFormIsOpen(false);

    useEffect(() => {
        const pegarUserInfo = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await axios.get('http://localhost:8080/auth/info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200) {
                    setUserInfo(response.data);
                } else {
                    console.log("Erro desconhecido")
                }
            } catch (error) {
                if (error.response.status === 403) {
                    window.location.href = '/auth/login';
                } else {
                    console.error(`Erro interno no servidor: ${error.message}`)
                }
            }
        }

        pegarUserInfo();
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (nome && descricao && tagColor != "") {
            const token = localStorage.getItem("token");

            axios.post("http://localhost:8080/tags", {
                    nome: nome,
                    descricao: descricao,
                    color: tagColor,
                    userId: userInfo.id
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
                        text: `A tag "${nome}" foi adicionada com sucesso!`,
                        timer: 1500,
                        customClass: {
                            title: "title_swal",
                            text: "text_swal"
                        }
                    })
                    .then(() => {
                        window.location.href = '/tags';
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 403) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Você não tem permissão para adicionar tags!`,
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

    return (
        <div className="Pagina-Tags">
            <Tags_style />

            <Header />

            <main>
                <section className="section-cima">
                    <h1 className="title">Lista de tags</h1>

                    <button className="btn add" onClick={openModal}>Adicionar</button>
                </section>

                <Tags_table />

                <Modal
                    isOpen={formIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Adicionar uma tag"
                    className="custom-style-form-pop-up add-tags"
                >
                    <Style_pop_up_tarefa />

                    <form action="" onSubmit={HandleSubmit}>
                        <div>
                            <label htmlFor="nome">Nome:</label>
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
                            <label htmlFor="nome">Descrição:</label>
                            <textarea 
                                type="text" 
                                className="input name"
                                placeholder="Diga mais sobre essa tag..."
                                name="nome"
                                value={descricao}
                                required
                                onChange={(e) => {
                                    setDescricao(e.target.value);
                                    setCaracteres(e.target.value.length);
                                }}
                                style={{height: "50px"}}
                            />
                            {caracteres <= 255 ? (
                                <p className="caracters-count" style={{ color: "#6A6A6A" }}>{caracteres}/255 caracteres.</p>
                            ) : (
                                <p className="caracters-count" style={{ color: "red" }}>{caracteres}/255 caracteres.</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tag-color">Cor:</label>
                            <input 
                                type="color" 
                                className="input tag-color"
                                name="tag-color"
                                required
                                value={tagColor}
                                onChange={(e) => setTagColor(e.target.value)}
                            />
                        </div>

                        <div className="div-buttons">
                            <button className="btn delete-tag btn-style-table" type="button" onClick={closeModal}>Cancelar</button>
                            <button className="btn enviar-tag btn-style-table" type="submit">Adicionar</button>
                        </div>
                    </form>
                </Modal>
            </main>
        </div>
    )
}

export default Tags;