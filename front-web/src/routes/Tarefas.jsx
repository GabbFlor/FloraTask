import Header from "../components/Header";
import Style_tarefas from "../styles/Tarefas-style";
import '../styles/tarefas.css'

const Tarefas = () => {
    return (
        <div className="Pagina-Tarefas">
            {/* <Style_tarefas /> */}

            <Header />

            <main>
                <section className="cima">
                    <section className="Escrita-btn-add">
                        <h1>Tarefas</h1>
                        
                        <button className="btn add">
                            Adicionar
                        </button>
                    </section>
                </section>
            </main>
        </div>
    )
}

export default Tarefas;