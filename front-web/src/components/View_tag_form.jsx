import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const View_tag_form = ({ tagId }) => {
    const [idUser, setIdUser] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricado] = useState("");
    const [color, setColor] = useState("#000000");
    const [criadoEm, setCriadoEm] = useState("");

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
        } catch(error) {
            if (error.response.status === 403) {
                window.location.href = '/auth/login';
            } else {
                console.error(`Ocorreu um erro desconhecido: ${error.message}`);
            }
        }
    }

    const atualizarInformacaoDaTag = async () => {
        // aguarda recuperar o id do usuário para executar
        if (!idUser) return;

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:8080/tags/getTagById/${tagId}/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) { 
                setNome(response.data.nome);
                setDescricado(response.data.descricao);
                setColor(response.data.color);
                setCriadoEm(response.data.criado_em);
            }
        } catch(error) { 
            if (error.response && error.response.status === 403) {
                window.location.href = '/auth/login';
            } else {
                console.error(`Ocorreu um erro desconhecido: ${error.message}`)
            }
        }
    }

    useEffect(() => {
        recuperarIdDoUser();
    }, []);

    useEffect(() => {
        atualizarInformacaoDaTag();
    }, [idUser])

    return (
        <form>
            <h2>Visualização da tag</h2>

            <div>
                <label htmlFor="nome">Nome:</label>
                <input type="text" value={nome} disabled />
            </div>
            <div>
                <label htmlFor="descricao">Descrição:</label>
                <textarea type="text" value={descricao} disabled />
            </div>
            <div>
                <label htmlFor="cor">Cor:</label>
                <div className="color-tag-background">
                    <div className="color-tag" style={{ backgroundColor: color }}></div>
                </div>
            </div>
            <div>
                <label htmlFor="criado_em">Criado_em:</label>
                <input type="text" value={criadoEm} disabled />
            </div>

            <div className="div-buttons">
            <Link to="/tags" type="button" className="btn voltar-tag">Voltar</Link>
                <Link to={`/tags/edit/${tagId}`} type="button" className="btn editar-tag">Editar</Link>
            </div>
        </form>
    )
}

export default View_tag_form;