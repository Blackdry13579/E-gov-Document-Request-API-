export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const validateTelephone = (tel) => /^[567]\d{7}$/.test(tel.replace(/\s/g, ''))
export const validatePassword = (pwd) => pwd && pwd.length >= 6
export const validateRequired = (val) => val !== undefined && val !== null && String(val).trim() !== ''

export const validateForm = (fields, rules) => {
  const errors = {}
  Object.keys(rules).forEach(field => {
    if (rules[field].required && !validateRequired(fields[field])) {
      errors[field] = rules[field].message || 'Champ obligatoire'
    } else if (fields[field]) {
      if (rules[field].type === 'email' && !validateEmail(fields[field])) {
        errors[field] = 'Email invalide'
      }
      if (rules[field].type === 'tel' && !validateTelephone(fields[field])) {
        errors[field] = 'Numéro de téléphone invalide (8 chiffres commençant par 5, 6 ou 7)'
      }
      if (rules[field].type === 'password' && !validatePassword(fields[field])) {
        errors[field] = 'Le mot de passe doit contenir au moins 6 caractères'
      }
    }
  })
  return { isValid: Object.keys(errors).length === 0, errors }
}
