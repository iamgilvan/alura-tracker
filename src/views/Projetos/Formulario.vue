<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nameDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
//import { notificacaoMixin } from '@/mixins/notificar';
import useNotificador from '@/hooks/notificador';
import { useStore } from '@/store';
import { defineComponent, ref } from 'vue';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacaoMixin],
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                }).then(() => {
                    this.lidarComSucesso()
                });
            } else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                .then(() => {
                    this.lidarComSucesso()
                });
            }
        },
        lidarComSucesso(){
            this.notificar(TipoDeNotificacao.SUCESSO, 'Novo projeto foi salvo', 'Projeto disponivel')
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        }
    },
    setup(props) {
        const store = useStore();
        const { notificar } = useNotificador();

        const nomeDoProjeto = ref("");
        if(props.id){
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }
        return {
            store,
            notificar,
            nomeDoProjeto
        }
    }
});
</script>