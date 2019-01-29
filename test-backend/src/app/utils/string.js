export const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1)

/**
 * Extract userName and mail part from email address
 * @param email
 * @returns {*|string[]}
 */
export const emailToParts = email => email.split('@')
