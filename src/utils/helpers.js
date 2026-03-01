/**
 * General utility helpers
 */

export const noop = () => {};

/**
 * Normalize API list response: server may send { success, data: [] } or [] directly.
 * @param {*} res - Axios response (res.data) or the response body object
 * @returns {Array}
 */
export const getListFromResponse = (res) => {
  if (!res) return [];
  const data = res?.data ?? res;
  return Array.isArray(data) ? data : [];
};
