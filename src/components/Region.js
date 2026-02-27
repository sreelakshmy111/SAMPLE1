import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Main from './Main'
import './Region.css'

const Region = () => {
  const navigate = useNavigate()

  // ✅ Backend base URL (from .env)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  // ================= STATES =================
  const [regionInput, setRegionInput] = useState({
    name: '',
    description: ''
  })

  const [enterpriseId, setEnterpriseId] = useState(null)
  const [enterpriseName, setEnterpriseName] = useState('')
  const [businessUnits, setBusinessUnits] = useState([])
  const [selectedBuId, setSelectedBuId] = useState('')

  const [errors, setErrors] = useState({
    name: false,
    description: false
  })

  const token = localStorage.getItem('token')

  // ================= GET ENTERPRISE + BUSINESS UNITS =================
  useEffect(() => {
    const enterpriseData = JSON.parse(
      localStorage.getItem('enterprisedata')
    )

    if (enterpriseData && enterpriseData.length > 0) {
      const eid = enterpriseData[0].eid
      const ename = enterpriseData[0].name

      setEnterpriseId(eid)
      setEnterpriseName(ename)

      axios
        .get(`${BASE_URL}/enterprises/${eid}/bussinessunits`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          const buList = Array.isArray(res.data)
            ? res.data
            : [res.data]
          setBusinessUnits(buList)
        })
        .catch((err) => {
          console.log('Business unit fetch error', err?.response?.data)
          alert('Error fetching business units')
        })
    }
  }, [BASE_URL, token])

  // ================= INPUT HANDLER =================
  const handleInput = (e) => {
    const { name, value } = e.target

    if (name === 'bussinessUnitId') {
      setSelectedBuId(value)
    } else {
      setRegionInput((prev) => ({
        ...prev,
        [name]: value
      }))
    }
  }

  // ================= VALIDATION =================
  const validate = () => {
    const newErrors = {
      name: !regionInput.name.trim(),
      description: !regionInput.description.trim()
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.description
  }

  // ================= SAVE REGION =================
  const saveRegion = async (e) => {
    e.preventDefault()

    if (!validate()) return

    if (!selectedBuId) {
      alert('Please select a Business Unit')
      return
    }

    try {
      await axios.post(
        `${BASE_URL}/enterprises/${enterpriseId}/bussinessunits/${selectedBuId}/regions`,
        regionInput,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Region created successfully ✅')

      // reset form
      setRegionInput({
        name: '',
        description: ''
      })
      setSelectedBuId('')
    } catch (err) {
      console.log('Region save error', err?.response?.data)
      alert('Error creating region')
    }
  }

  // ================= UI =================
  return (
    <div>
      <Main />

      <h2 className="region">REGION</h2>

      <form className="regionForm">
        <label className="enterprise-name">
          Enterprise: {enterpriseName}
        </label>

        <br /><br />

        <select
          name="bussinessUnitId"
          value={selectedBuId}
          onChange={handleInput}
          className="value-name"
        >
          <option value="">---- Select Business Unit ----</option>
          {businessUnits.map((bu) => (
            <option key={bu.buid} value={bu.buid}>
              {bu.name}
            </option>
          ))}
        </select>

        <br /><br />

        {errors.name && (
          <p className="error-text">Region name is required</p>
        )}
        <input
          type="text"
          name="name"
          value={regionInput.name}
          onChange={handleInput}
          className={`value-name ${errors.name ? 'error-border' : ''}`}
          placeholder="Enter region name"
        />

        <br /><br />

        {errors.description && (
          <p className="error-text">Description is required</p>
        )}
        <input
          type="text"
          name="description"
          value={regionInput.description}
          onChange={handleInput}
          className={`value-name ${errors.description ? 'error-border' : ''}`}
          placeholder="Enter description"
        />

        <br /><br />

        <button id="save" onClick={saveRegion}>
          Save
        </button>

        <button
          id="review"
          type="button"
          onClick={() => navigate('/region/review')}
        >
          Review
        </button>
      </form>
    </div>
  )
}

export default Region