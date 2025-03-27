<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" arial-label="Formulario para criacao de uma nova tarefa">
        <input type="text" class="input" placeholder="Qual tarefa voce deseja iniciar?" v-model="descricao" />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  methods: {

  },
  setup(props, { emit }) {
    const store = useStore(key);

    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((p) => p.id == idProjeto.value);
      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: 'Ops!',
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoDeNotificacao,
        });
        return;
      }
      emit('aoSalvarTarefa',
        {
          descricao: descricao.value,
          duracaoEmSegundos: tempoDecorrido,
          projeto: projetos.value.find(proj => proj.id == idProjeto.value)
        });
      descricao.value = '';
    }

    return {
      projetos,
      store,
      descricao,
      idProjeto,
      finalizarTarefa
    }
  },
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg--primario);
}
</style>