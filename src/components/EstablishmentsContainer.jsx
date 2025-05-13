import { useEffect } from "react"
import { useEstablishmentsStore } from "../store/index"
import { Spin, Alert} from "antd"
import { useNavigate } from "react-router-dom"

export default function EstablishmentsContainer({children}) {

    const loading = useEstablishmentsStore(state => state.loading)
    const error = useEstablishmentsStore(state => state.error)
    const items = useEstablishmentsStore(state => state.data.items)
    const getEstablishments = useEstablishmentsStore(state => state.getEstablishments)

    const navigate = useNavigate()

    useEffect(() => {
        getEstablishments()
    }, [])

    const handleRedirect = (item) => {
      navigate(`/establishments/${item.id}`)
    }

    if (loading) return <Spin/>
    if (error) return <Alert message="Error al cargar los establecimientos" type="error" />
    if (!items) return <Alert message="No hay establecimientos disponibles" type="info" />
    return children({
      items, 
      handlers: {handleRedirect}
    })
}
