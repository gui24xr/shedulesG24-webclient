import { useParams } from "react-router-dom"
import { EstablishmentDetailContainer, EstablishmentDetail } from "../components/index.js"

export default function EstablishmentsDashboardIndex() {
    const { id: establishmentId } = useParams()
   

    return (
        <div>
            <h1>Establishments Dashboard index ID: {establishmentId}</h1>
           <EstablishmentDetailContainer
            renderItem={(establishment)=>(<EstablishmentDetail establishment={establishment}/>)}
           />
        </div>
    )
}
