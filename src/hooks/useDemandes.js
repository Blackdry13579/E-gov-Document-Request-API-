import { useState, useEffect } from 'react'
import { demandeService } from '../services/demandeService'

export const useDemandes = (filters = {}) => {
  const [demandes, setDemandes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      const result = await demandeService.getMyDemandes(filters)
      if (result.success) {
        setDemandes(result.data)
        setTotalPages(result.totalPages || 1)
      } else {
        setError(result.error)
      }
      setLoading(false)
    }
    fetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.statut, filters.page])

  return { demandes, loading, error, totalPages }
}
