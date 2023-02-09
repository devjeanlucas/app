
import SectionExperience from "../layouts/sectionExperience"
import SectionMainHome from "../layouts/SectionMainHome"
import Favorites from "../layouts/Favoritos_list"
import SectionText from "../layouts/SectionText"

export default function Expo () {
    return (
        <div>
            <SectionMainHome/>
            <Favorites/>
            <SectionExperience/>
            <SectionText/>
        </div>
    )
}