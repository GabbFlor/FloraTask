import Modal from "react-modal";
import { useEffect } from "react";
import Style_pop_up_tarefa from "../styles/Pop-up-tarefa-style";

Modal.setAppElement("#root");

const VisualizarTarefa = ({ tarefa, closeModal }) => {

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            contentLabel="Visualizar Tarefa"
            className="custom-style-form-pop-up"
        >
            <Style_pop_up_tarefa />
            <h2>Visualizar Tarefa</h2>

            <form>
                <div>
                    <label htmlFor="nome">Título:</label>
                    <input
                        type="text"
                        className="input name"
                        value={tarefa?.nome || ""}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="detalhes">Detalhes:</label>
                    <textarea
                        className="input detalhes"
                        value={tarefa?.detalhes || ""}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="tags">Tags:</label>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <button className="button-dropdown" type="button" style={{cursor: "default", width: "100%", justifyContent: "flex-start", gap: "5px"}}>
                            <div
                                className="tag-color"
                                style={{
                                    backgroundColor: tarefa?.tagColor || "#000",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                }}
                            ></div>
                            <div>{tarefa?.tagName}</div>
                        </button>
                    </div>
                </div>
                <div>
                    <label htmlFor="prazo">Prazo:</label>
                    <input
                        type="text"
                        className="input prazo"
                        value={tarefa?.prazo || ""}
                        readOnly
                    />
                </div>
                <div>
                    <label htmlFor="criado_em">Criado em:</label>
                    <input
                        type="text"
                        className="input criado_em"
                        value={tarefa?.criado_em || ""}
                        readOnly
                    />
                </div>

                <div className="div-buttons">
                    <button
                        type="button"
                        className="btn concluir btn-style-table"
                        onClick={closeModal}
                    >
                        Fechar
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default VisualizarTarefa;
