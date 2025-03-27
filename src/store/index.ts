import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ATUALIZA_TAREFA, DEFINIR_TAREFA, NOTIFICAR, REMOVE_TAREFA } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import http from "@/http"
import ITarefa from "@/interfaces/ITarefa";
import { EstadoProjeto, projeto } from "./modulos/projeto";

export interface Estado {
    tarefas: ITarefa[],
    notificacoes: INotificacao[],
    projeto: EstadoProjeto
}


export const key : InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto:  {
            projetos: []
        },
        tarefas: [],
        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state, notificacao:INotificacao){
            notificacao.id = new Date().getTime()
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(n => n.id != notificacao.id);
            }, 3000)
        },
        [ADICIONA_TAREFA] (state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
            const indice = state.tarefas.findIndex(p => p.id == tarefa.id)
            state.tarefas[indice] = tarefa
        },
        [REMOVE_TAREFA] (state, id: string) {
            state.tarefas = state.tarefas.filter(p => p.id != id)
        },
        [DEFINIR_TAREFA] (state, tarefas: ITarefa[]){
            state.tarefas = tarefas;
        },
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
            .then(res => commit(DEFINIR_TAREFA,res.data))
        },
        [CADASTRAR_TAREFA] ( {commit}, tarefa: ITarefa) {
            return http.post('tarefas', tarefa).then(res => commit(ADICIONA_TAREFA, res.data))
        },
        [ALTERAR_TAREFA] ( {commit}, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa).then(() => commit(ATUALIZA_TAREFA, tarefa))
        },
    }, modules: {
        projeto
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}