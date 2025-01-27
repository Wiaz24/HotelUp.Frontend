import { Menu, PublishMenu } from "../models/menuInterfaces";

const baseUrl = 'http://localhost:5006/api/kitchen';

export const getCookMenus = async (token: string): Promise<Menu[]> => {
  const url = `${baseUrl}/menu`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const menus = await response.json();
  console.log(menus);
  return menus;
};

export const publishCookMenu = async ({token, servingDate}: PublishMenu): Promise<any> => {
  const url = new URL(`${baseUrl}/menu/publish`);
  url.searchParams.append('ServingDate', servingDate);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      accept: '*/*',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Wystąpił błąd podczas wysyłania danych');
  }

  return null;
};