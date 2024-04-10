const apiUrl = "http://localhost:8000";

export const getStagesApi = async () => {
  const response = await fetch(`${apiUrl}/stages/`);
  return response.json();
};

export const getStageByIdApi = async (id) => {
  const response = await fetch(`${apiUrl}/stages/${id}/`);
  return response.json();
};

export const createStageApi = async (stage) => {
  const response = await fetch(`${apiUrl}/stages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stage),
  });
  return response.json();
};
