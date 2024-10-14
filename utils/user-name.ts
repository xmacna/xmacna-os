import type { User } from '~~/types';

export function userName(user: Partial<User>): string {
	if (!user) {
		return 'Usuário Desconhecido' as string;
	}

	if (user.first_name && user.last_name) {
		return `${user.first_name} ${user.last_name}`;
	}

	if (user.first_name) {
		return user.first_name;
	}

	if (user.email) {
		return user.email;
	}

	return 'Usuário Desconhecido' as string;
}
