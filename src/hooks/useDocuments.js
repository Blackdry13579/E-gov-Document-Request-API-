import { useState, useEffect } from 'react'
import { documentService } from '../services/documentService'

export const useDocuments = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const result = await documentService.getAllDocuments()
      if (result.success) setDocuments(result.data)
      else setError(result.error)
      setLoading(false)
    }
    fetch()
  }, [])

  return { documents, loading, error }
}
