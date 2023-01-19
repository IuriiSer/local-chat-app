import React, { useState, useMemo } from 'react';
import login from './login';
import Interfaces from '../../lib/interfaces';
const { user: UserInterface } = Interfaces;

const useUserService = () => {
	const [user, setUser] = useState<null>(null);

	return { login, user };
};

export default useUserService;
