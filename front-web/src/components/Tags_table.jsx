import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Tags_table = () => {
    const [tags, setTags] = useState([]);
    const [idUser, setIdUser] = useState("");

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

    const atualizarTags = async () => {
        if (!idUser) return; // Aguarda até o idUser ser atualizado

        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(`http://localhost:8080/tags/getByUserId/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setTags(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("Você não tem permissão para acessar as tags.");
            } else {
                console.error(`Erro ao atualizar tags: ${error.message}`);
            }
        }
    }

    useEffect(() => {
        recuperarIdDoUser();
    }, []);

    useEffect(() => {
        atualizarTags();
    }, [idUser])

    const handleDeletarTag = (id, tagName) => {
        Swal.fire({
            icon: "warning",
            title: "Você tem certeza?",
            text: `A tag "${tagName}" será deletada permanentemente!`,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Deletar",
            customClass: {
                title: "title_swal",
                text: "text_swal"
            }
        })
        .then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token");

                axios.delete(`http://localhost:8080/tags/${idUser}/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: "Deletado!",
                            text: `A tag "${tagName}" foi deletada com sucesso!`,
                            icon: "success",
                            timer: 1000,
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
                    if(error.response.status === 403) {
                        console.error("Você não tem permissão para fazer essa operação.")
                    }
                })
            }
        })
        .catch(error => {
            Swal.fire({
                title: "Deletado!",
                text: `Erro ao deletar a tag: ${error.message}`,
                icon: "error",
                timer: 1000,
                customClass: {
                    title: "title_swal",
                    text: "text_swal"
                }
            })  
        })
    }

    return(
        <table className='table-tarefas'>
            <thead>
                <tr>
                    <th><input type="checkbox" value={"teste"} className='chekbox-line-table' /></th>
                    <th>Nome</th>
                    <th>Cor</th>
                    <th>Descrição</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                {tags.map(tag => (
                    <tr key={tag.id}>
                        <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                        <td>{tag.nome}</td>
                        <td className="td-color-tag"><div className='tag-color-table' style={{ backgroundColor: tag.color }}></div></td>
                        <td>{tag.descricao}</td>
                        <td>
                            <nav>
                                <button className='btn delete' onClick={() => handleDeletarTag(tag.id, tag.nome)}>Deletar</button>
                                <Link className='btn editar btn-a' to={`${tag.id}`}>Editar</Link>
                            </nav>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Tags_table;