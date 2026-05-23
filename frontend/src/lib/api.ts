const BASE = '/api/v1';

async function request(method: string, path: string, body?: unknown) {
  const opts: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' } as Record<string, string>,
    credentials: 'include',
  };
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('cl_token') : null;
  if (token) (opts.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  const data = await res.json();
  if (!res.ok) throw { status: res.status, ...data };
  return data;
}

export const api = {
  get: (path: string) => request('GET', path),
  post: (path: string, body?: unknown) => request('POST', path, body),
  put: (path: string, body?: unknown) => request('PUT', path, body),
  del: (path: string) => request('DELETE', path),
};
