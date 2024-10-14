import type { assinatura } from '../bo/assinatura';
import type { User } from '../system';

export interface cliente {
	cpf: string;
	data_nascimento?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: string;
	sort?: number | null;
	status: string;
	stripe_cliente_id?: string | null;
	telefone?: string | null;
	user?: string | User | null;
	user_created?: string | User | null;
	user_updated?: string | User | null;
	assinatura?: string | assinatura | null;
}
