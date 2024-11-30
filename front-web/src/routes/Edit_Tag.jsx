import { useParams } from "react-router-dom";
import Edit_tag_form from "../components/Edit_tag_form";
import Header from "../components/Header";
import View_tag_style from "../styles/View_tag_style";

const Edit_tag = () => {
    const { tagId } = useParams();

    return(
        <div className="Pagina-edit-tag">
            <View_tag_style />

            <Header />            

            <main>
                <Edit_tag_form tagId={tagId} />
            </main>
        </div>
    )
}

export default Edit_tag;