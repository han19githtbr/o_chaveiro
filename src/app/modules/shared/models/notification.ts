export interface Notification {
  id: number;                   // ID da notificação
  message: string;              // Mensagem completa recebida
  name: string;                 // Nome do cliente
  phone: string;                // Telefone do cliente
  endereco: string;             // Endereço do cliente
  imageUrl: string;             // URL da imagem associada
  status: string;               // Status da notificação (ex: 'novo')
  createdAt: string;            // Data de criação da notificação
  updatedAt: string;            // Data de atualização da notificação
  service: string;             // Serviços selecionados (opcional)
}



