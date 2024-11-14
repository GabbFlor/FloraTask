import Header from "../components/Header";
import '../styles/tags-style.css'

const Tags = () => {
    return (
        <div className="Pagina-Tags">
            <Header />

            <main>
                <h1 className="title">Lista de tags</h1>

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
                        <tr>
                            <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                            <td>Programação</td>
                            <td><input type="color" defaultValue={"#eb3434"} disabled className="color-tag" /></td>
                            <td>Todas as tarefas relacionadas a programação.</td>
                            <button className='btn deletar btn-style-table'>Deletar</button>
                        </tr>
                    </tbody>
                </table>
            </main>
        </div>
    )
}

export default Tags;