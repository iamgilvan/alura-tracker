<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <Box v-if="listaEstaVazia">
            Voce nao esta muito produtivo hoje :(
        </Box>
        <div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Editando uma tarefa</p>
                    <button @click="fecharModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="descricaoDaTarefa" class="label">
                            Descricao da Tarefa
                        </label>
                        <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoDaTarefa">
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button @click="alterarTarefa" class="button is-success">Salvar</button>
                        <button @click="fecharModal" class="button">Cancelar</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';
import { useStore } from '@/store';

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box,
    },
    data() {
        return {
            tarefaSelecionada: null as ITarefa | null
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionada = tarefa
        },
        fecharModal() {
            this.tarefaSelecionada = null;
        },
        alterarTarefa(){
            this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
                .then(() => this.fecharModal())
        }
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        return {
            store,
            tarefas: computed(() => store.state.tarefa.tarefas),
        }
    }
});
</script>