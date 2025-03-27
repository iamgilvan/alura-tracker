import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoDeNotificacao, titulo: string, texto: string) {
      store.commit(NOTIFICAR, {
        titulo: titulo,
        texto: texto,
        tipo: tipo,
      });
    },
  },
};
