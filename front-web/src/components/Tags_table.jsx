import axios from "axios";
import { useEffect, useState } from "react";

const Tags_table = () => {
    const [tags, setTags] = useState([]);

    const atualizarTags = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get("http://localhost:8080/auth/info", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.status === 200) {
                let userId = response.data.id;

                try {
                    const responseTags = await axios.get(`http://localhost:8080/tags/getByUserId/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (responseTags.status === 200) {
                        setTags(responseTags.data);
                    }
                } catch (error) {
                    if (error.response.status === 403) {
                        window.location.href = '/auth/login';
                    }
                }
            } else {
                console.log("Erro desconhecido")
            }
        } catch(error) {
            if (error.response.status === 403) {
                window.location.href = '/auth/login';
            } else {
                console.error(`Erro interno no servidor: ${error.message}`)
            }
        }
    }

    useEffect(() => {
        atualizarTags();
    }, []);



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
                        <td><div className='tag-color' style={{ backgroundColor: tag.color }}></div></td>
                        <td>{tag.descricao}</td>
                        <td>
                            <nav>
                                <button className='btn delete'>Deletar</button>
                                <button className='btn editar'>Editar</button>
                            </nav>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Tags_table;