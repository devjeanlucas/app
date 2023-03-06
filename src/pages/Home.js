
import SectionExperience from "../layouts/sectionExperience"
import SectionMainHome from "../layouts/SectionMainHome"
import Favorites from "../layouts/Favoritos_list"
import SectionText from "../layouts/SectionText"
import Btn_Sacola from "../components/Btn_Sacola";
import Detaques from "../layouts/BoxDestaques";





export default function Expo () {

    



    return (
        <div>
            <SectionMainHome/>
            <Detaques/>
            <Favorites/>
            <SectionExperience/>
            <SectionText/>
            <Btn_Sacola/>
        </div>
    )
}