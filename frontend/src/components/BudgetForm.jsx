import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function BudgetForm(){
  const [limit, setLimit] = useState('')
  const [info, setInfo] = useState({month:'', limit:0, spent:0})
  const navigate = useNavigate()

  useEffect(()=> fetch(),[])

  function fetch(){ api.get('/budget').then(res=> setInfo(res.data)).catch(err=> console.error(err)) }

  function submit(e){
    e.preventDefault()
    const payload = { limitAmount: parseFloat(limit) }
    if(info.limit && info.limit > 0){
      api.put('/budget', payload).then(()=> navigate('/')).catch(err=> console.error(err))
    } else {
      api.post('/budget', payload).then(()=> navigate('/')).catch(err=> console.error(err))
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Set Monthly Budget</h2>
        <div className="small">Current month: {info.month || '—'}</div>
        <form onSubmit={submit} style={{marginTop:12}}>
          <div className="form-row">
            <label>Limit amount (₹)</label><br/>
            <input type="number" value={limit} onChange={e=> setLimit(e.target.value)} placeholder={info.limit || ''} required />
          </div>
          <div style={{display:'flex', gap:8}}>
            <button type="submit">Save</button>
            <button type="button" onClick={()=> navigate('/')}>Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}
