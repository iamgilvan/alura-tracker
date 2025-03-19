<template>
    <Box>
        <div class="columns">
            <div class="column is-6">
                {{tarefa.descricao || 'Tarefa sem descricao'}}
            </div>
            <div class="column ">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
            <div class="column">
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
import { useStore } from '@/store/indexTarefa';
import { REMOVE_TAREFA } from '@/store/tipo-mutacoes';

export default defineComponent({
    name: 'Tarefa',
    components: {
        Cronometro,
        Box,
    },
    methods: {
        excluir(id: string){
            this.store.commit(REMOVE_TAREFA, id);
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