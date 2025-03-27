<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-3">
                {{tarefa.descricao || 'Tarefa sem descricao'}}
            </div>
            <div class="column is-3">
                {{tarefa.projeto?.nome || 'Projeto sem descricao'}}
            </div>
            <div class="column is-3">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column is-1">
                <button class="button ml-2 is-danger" @click="excluir(tarefa.id)" >
                    <span class="icon is-small">
                        <i class="fas fa-trash"></i>
                    </span>
                </button>
            </div>
        </div>
    </Box>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Cronometro from './Cronometro.vue';
import ITarefa from '@/interfaces/ITarefa';
import Box from './Box.vue';
import { REMOVE_TAREFA } from '@/store/tipo-mutacoes';
import { useStore } from '@/store';

export default defineComponent({
    name: 'Tarefa',
    components: {
        Cronometro,
        Box,
    },
    emits:['aoTarefaClicada'],
    methods: {
        excluir(id: string){
            this.store.commit(REMOVE_TAREFA, id);
        },
        tarefaClicada (): void {
            this.$emit('aoTarefaClicada', this.tarefa)
        }
    },
    props: {
        tarefa : {
            type: Object as PropType<ITarefa>, required: true
        }
    },
    setup() {
      const store = useStore()
      return {
        store
      }
    }
});
</script>

<style scoped>
.clicavel {
    cursor: pointer;
}
</style>