import React, { createContext, useContext, useState } from 'react';

// Cria o contexto
const UserContext = createContext();

// Hook para acessar o contexto facilmente em qualquer componente
export const useUser = () => useContext(UserContext);

// Componente Provider para envolver a aplicação
export const UserProvider = ({ children }) => {
  // Estado para armazenar os dados do usuário
  const [user, setUser] = useState("wagner");

  // Função para atualizar os dados do usuário
  const updateUser = (newUser) => setUser(newUser);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
