import type { User } from '../system/index.js';
import type { assinatura } from './assinatura.ts';

export type pagamento = {
	AssinaturaFK?: string | assinatura | null;
	user_created?: string | User | null;
	date_created?: string | null;
	date_updated?: string | null;
	historico?: string | null;
	id: string;
	id_externo?: string | null;
	Metodo?: number | null;
	status: string;
	StatusPagamento?: number | null;
	valor?: number | null;
};
