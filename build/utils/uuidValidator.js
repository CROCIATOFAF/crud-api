/**
 * Validates whether a given string is a valid UUID.
 *
 * @param {string} uuid The string to validate.
 * @returns {boolean} True if the string is a valid UUID, otherwise false.
 */
export const isValidUuid = (uuid) => {
    const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return regexExp.test(uuid);
};
