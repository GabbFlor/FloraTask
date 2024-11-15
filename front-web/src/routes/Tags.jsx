import Header from "../components/Header";
import Tags_table from "../components/Tags_table";


const Tags = () => {
    return (
        <div className="Pagina-Tags">
            <Header />

            <main>
                <section className="section-cima">
                    <h1 className="title">Lista de tags</h1>

                    <button className="btn add">Adicionar</button>
                </section>

                <Tags_table />
            </main>
        </div>
    )
}

export default Tags;