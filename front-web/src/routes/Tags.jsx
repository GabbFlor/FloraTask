import { useState } from "react";
import Header from "../components/Header";
import Tags_table from "../components/Tags_table";
import Tags_style from "../styles/Tags-style";
import Modal from "react-modal";
import Style_pop_up_tarefa from "../styles/Pop-up-tarefa-style";

Modal.setAppElement("#root");

const Tags = () => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tagColor, setTagColor] = useState("#000000");

    const openModal = () => setFormIsOpen(true);
    const closeModal = () => setFormIsOpen(false);

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (nome && descricao && tagColor != "") {
            console.log(`Nome: ${nome}`)
            console.log(`Descrição: ${descricao}`)
            console.log(`Cor da tag: ${tagColor}`)

            setNome("")
            setDescricao("")
            setTagColor("#000000");

            closeModal();
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
                            <label htmlFor="nome">Nome da tag:</label>
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
                                onChange={(e) => setDescricao(e.target.value)}
                                style={{height: "50px"}}
                            />
                        </div>

                        <div>
                            <label htmlFor="tag-color">Cor da tag:</label>
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