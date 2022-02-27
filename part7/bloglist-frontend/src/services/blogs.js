import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: { Authorization: token },
  });
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

const comment = async (newObjet, text) => {
  const reponse = await axios.post(`${baseUrl}/${newObjet.id}/comments`, text, {
    headers: { Authorization: token },
  });
  return reponse.data;
};

export default { getAll, setToken, create, update, remove, comment };
