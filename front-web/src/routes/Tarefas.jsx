import Header from "../components/Header";
import Home_tasks from "../components/Home_tasks";
import Style_tarefas from "../styles/Tarefas-style";
import '../styles/tarefas.css'
import { BsSearch, BsFunnel } from "react-icons/bs"

const Tarefas = () => {
    return (
        <div className="Pagina-Tarefas">
            {/* <Style_tarefas /> */}

            <Header />

            <main>
                <section className="cima">
                    <section className="Escrita-btn-add">
                        <h1>Tarefas</h1>
                        
                        <button className="btn add">Adicionar</button>
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
            </main>
        </div>
    )
}

export default Tarefas;