import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Edit_tag_form = ({ tagId }) => {
    const [idUser, setIdUser] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [color, setColor] = useState("#000000");
    const [caracteres, setCaracteres] = useState(0);

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
                setDescricao(response.data.descricao);
                setColor(response.data.color);
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

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (nome && descricao && color != "") {
            const token = localStorage.getItem("token")

            axios.put(`http://localhost:8080/tags/${tagId}`, {
                    nome: nome,
                    descricao: descricao,
                    color: color,
                    userId: idUser
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: `A tag "${nome}" foi editada com sucesso!`,
                        timer: 1000,
                        showConfirmButton: false,
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
                        timer: 1500,
                        customClass: {
                            title: "title_swal",
                            text: "text_swal"
                        }
                    })
                } else if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Algum dos campos ultrapassa o limite de caracteres`,
                        showConfirmButton: true,
                        customClass: {
                            title: "title_swal",
                            text: "text_swal"
                        }
                    })
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: `Erro interno no servidor: ${error.message}`,
                        customClass: {
                            title: "title_swal",
                            text: "text_swal"
                        }
                    })
                }
            })
        } else {
            console.error("Não tente alterar o html para enviar valores vazios.")
        }
    }

    return (
        <form action="" onSubmit={HandleSubmit}>
            <h2>Edição da tag</h2>

            <div>
                <label htmlFor="nome">Nome:</label>
                <input 
                    type="text" 
                    value={nome} 
                    required
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="descricao">Descrição:</label>
                <textarea 
                    type="text" 
                    value={descricao} 
                    required
                    onChange={(e) => {
                        setDescricao(e.target.value);
                        setCaracteres(e.target.value.length);
                    }}
                />
                {caracteres <= 255 ? (
                    <p className="caracters-count" style={{ color: "#6A6A6A" }}>{caracteres}/255 caracteres.</p>
                ) : (
                    <p className="caracters-count" style={{ color: "red" }}>{caracteres}/255 caracteres.</p>
                )}
            </div>
            <div>
                <label htmlFor="cor">Cor:</label>
                <input 
                    type="color" 
                    value={color}
                    required
                    onChange={(e) => setColor(e.target.value)}
                    className="input-color"
                />
            </div>

            <div className="div-buttons">
                <Link to="/tags" type="button" className="btn voltar-tag">Voltar</Link>
                <button type="submit" className="btn editar-tag">Enviar</button>
            </div>
        </form>
    )
}

export default Edit_tag_form;