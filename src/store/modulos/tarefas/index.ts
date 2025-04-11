import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  ALTERAR_TAREFA,
} from "@/store/tipo-acoes";
import {
  ADICIONA_TAREFA,
  ATUALIZA_TAREFA,
  DEFINIR_TAREFA,
  REMOVE_TAREFA,
} from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex((p) => p.id == tarefa.id);
      state.tarefas[indice] = tarefa;
    },
    [REMOVE_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((p) => p.id != id);
    },
    [DEFINIR_TAREFA](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = 'tarefas';
      if (filtro){
        url += '?descricao' + filtro;
      }
      http.get(url).then((res) => commit(DEFINIR_TAREFA, res.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("tarefas", tarefa)
        .then((res) => commit(ADICIONA_TAREFA, res.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ATUALIZA_TAREFA, tarefa));
    },
  },
};
