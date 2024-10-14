import type { User } from '../system/index.ts';
import type { plano } from '../bo/plano.ts';
import type { cliente } from '../cliente/cliente.js';

export type assinatura = {
//   ContactsFK?: string | Contacts | null;
  cliente: string | cliente | null;
  data_expiracao?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  id: string;
  PlanoId?: string | plano | null;
  status: string;
  user_created?: string | User | null;
  user_updated?: string | User | null;
};
