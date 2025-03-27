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
import { defineComponent } from 'vue';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo-acoes';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacaoMixin],
    mounted() {
        const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id);
        this.nomeDoProjeto = projeto?.nome || '';
    },
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
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
    setup() {
        const store = useStore();
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
});
</script>