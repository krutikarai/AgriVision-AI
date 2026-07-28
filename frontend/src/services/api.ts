const BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://agrivision-backend-lhni.onrender.com/api/v1';

const getHeaders = (): Record<string, string> => {
  const userStr = localStorage.getItem('agri_user');
  if (!userStr) return {};
  
  // In a full production system, retrieve the JWT token.
  // For this hybrid flow, we'll retrieve the stored token or session.
  // We can also extract the token if saved, but we'll supply a mock Bearer token 
  // for the auth schema. FastAPI get_current_user expects a token.
  // Let's create a simulated token if not stored, or send the user id as token
  // so the backend can decode it. Wait, the backend security expects HS256 JWT token!
  // Our AuthContext login generates a JWT? No, in the mock AuthContext we saved a mock user.
  // Let's make sure that if the backend requires a JWT token, the frontend passes a valid JWT token
  // or we can handle it. Let's make sure the authorization header sends the token.
  // Actually, we can fetch the token from localStorage ('agri_token'). 
  const token = localStorage.getItem("agri_token");

if (!token) {
  throw new Error("Please login again");
}
  return {
    'Authorization': `Bearer ${token}`
  };
};

export const api = {
  async uploadScan(file: File | Blob, cropType: string) {
    const formData = new FormData();
    formData.append('crop_type', cropType);
    
    // Convert Blob (from camera capture) to a File if needed
    const fileToUpload = file instanceof File 
      ? file 
      : new File([file], `scan_${Date.now()}.png`, { type: 'image/png' });
      
    formData.append('image', fileToUpload);

    const response = await fetch(`${BASE_URL}/scans/upload`, {
      method: 'POST',
      headers: getHeaders(),
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || 'Failed to analyze crop image.');
    }

    return response.json();
  },

  async getHistory() {
    const response = await fetch(`${BASE_URL}/scans/`, {
      method: 'GET',
      headers: getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve history logs.');
    }

    return response.json();
  },

  async getScanById(id: number) {
    const response = await fetch(`${BASE_URL}/scans/${id}`, {
      method: 'GET',
      headers: getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve scan details.');
    }

    return response.json();
  }
};
