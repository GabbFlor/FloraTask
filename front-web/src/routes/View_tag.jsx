import { useParams } from "react-router-dom";
import Header from "../components/Header";
import View_tag_form from "../components/View_tag_form";
import View_tag_style from "../styles/View_tag_style";

const View_tag = () => {
    const { tagId } = useParams();

    return (
        <div className="Pagina_view_tag">
            <View_tag_style />

            <Header />

            <main>
                <View_tag_form tagId={tagId}/>
            </main>
        </div>
    )
}

export default View_tag;