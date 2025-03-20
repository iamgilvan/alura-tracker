<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" arial-label="Formulario para criacao de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa voce deseja iniciar?"
                    v-model="descricao"
                />
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
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store/indexProjeto';
import { NOTIFICAR } from '@/store/tipo-mutacoes';
import { TipoDeNotificacao } from '@/interfaces/INotificacao';

export default defineComponent({
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricao: '',
      idProjeto: ''
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number) : void{
      const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto
      if(!projeto) {
          this.store.commit(NOTIFICAR, {
              titulo: 'Ops!',
              texto: "Selecione um projeto antes de finalizar a tarefa!",
              tipo: TipoDeNotificacao,
          });
          return;
      }
      this.$emit('aoSalvarTarefa', 
      {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido,
        projeto: this.projetos.find(proj => proj.id == this.idProjeto)
      });
      this.descricao = '';
    }
  },
  setup() {
      const store = useStore(key)
      return {
        projetos: computed(() => store.state.projetos),
        store
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