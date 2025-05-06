import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useEstablishmentsStore } from "../store/index"
import { Spin, Alert } from "antd"

export default function EstablishmentDetailContainer({ renderItem}) {
    const { id: establishmentId } = useParams()
    const currentEstablishment = useEstablishmentsStore(state => state.currentItem)
    const loading = useEstablishmentsStore(state => state.loading)
    const error = useEstablishmentsStore(state => state.error)  
    const getEstablishmentById = useEstablishmentsStore(state => state.getEstablishmentById)

    useEffect(() => {
       
        getEstablishmentById(establishmentId)
       
    }, [establishmentId])

    if (loading) return <Spin />
    if (error) return <Alert message="Error al cargar el establecimiento" type="error" />
    
 
    return (
        <div>
           {renderItem(currentEstablishment)}
        </div>
    )
    
}
