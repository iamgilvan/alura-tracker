<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
            Voce nao esta muito produtivo hoje :(
        </Box>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { ADICIONA_TAREFA } from '@/store/tipo-mutacoes';
import { useStore } from '@/store/indexTarefa';

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box,
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0;
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.store.commit(ADICIONA_TAREFA, tarefa);
        }
    },
    setup() {
      const store = useStore()
      return {
        store,
        tarefas: computed(() => store.state.tarefas),
      }
    }
});
</script>