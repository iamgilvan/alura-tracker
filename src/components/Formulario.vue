<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" arial-label="Formulario para criacao de uma nova tarefa">
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa voce deseja iniciar?"
                    v-model="descricao"
                />
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
  name: 'Formulario',
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador,
  },
  data() {
    return {
      descricao: '',
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number) : void{
      this.$emit('aoSalvarTarefa', 
      {
        descricao: this.descricao,
        duracaoEmSegundos: tempoDecorrido
      });
      this.descricao = '';
    }
  }
});
</script>

<style>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg--primario);
}
</style>