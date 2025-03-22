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
import { notificacaoMixin } from '@/mixins/notificar';
import { useStore } from '@/store/indexProjeto';
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo-mutacoes';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    mixins: [notificacaoMixin],
    mounted() {
        const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
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
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                });
            } else {
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto);
            }
            this.notificar(TipoDeNotificacao.SUCESSO, 'Novo projeto foi salvo', 'Projeto disponivel')
            this.nomeDoProjeto = '';
            this.$router.push('/projetos');
        },
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
});
</script>