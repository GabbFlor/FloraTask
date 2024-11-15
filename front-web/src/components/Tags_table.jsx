const Tags_table = () => {
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
                <tr>
                    <th><input type="checkbox" value={"teste-filho"}  className='chekbox-line-table'  /></th>
                    <td>Programação</td>
                    <td><input type="color" defaultValue={"#eb3434"} disabled className="color-tag" /></td>
                    <td>Todas as tarefas relacionadas a programação.</td>
                    <td>
                        <nav>
                            <button className='btn delete'>Deletar</button>
                            <button className='btn editar'>Editar</button>
                        </nav>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Tags_table;