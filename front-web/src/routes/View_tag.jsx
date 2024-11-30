import { useParams } from "react-router-dom";
import Header from "../components/Header";
import "../styles/view_tag.css";
import View_tag_form from "../components/View_tag_form";

const View_tag = () => {
    const { tagId } = useParams();

    return (
        <div className="Pagina_view_tag">
            {/* style dessa bomba */}

            <Header />

            <View_tag_form tagId={tagId}/>
        </div>
    )
}

export default View_tag;