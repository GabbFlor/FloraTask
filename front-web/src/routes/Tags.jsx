import Header from "../components/Header";
import Tags_table from "../components/Tags_table";
import Tags_style from "../styles/Tags-style";


const Tags = () => {
    return (
        <div className="Pagina-Tags">
            <Tags_style />

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