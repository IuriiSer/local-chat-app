import { useState } from 'react';
import login from './login';

const useUserService = () => {
	const [user, setUser] = useState<null>(null);

	return { login, user}

};

export default useUserService;
