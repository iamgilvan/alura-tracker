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
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacaoMixin],
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const { notificar } = useNotificador();

        const nomeDoProjeto = ref("");
        if (props.id) {
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
            nomeDoProjeto.value = projeto?.nome || '';
        }

        const salvar = () => {
            if (props.id) {
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(() => {
                    lidarComSucesso()
                });
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto)
                    .then(() => {
                        lidarComSucesso()
                    });
            }
        }

        const lidarComSucesso = () => {
            notificar(TipoDeNotificacao.SUCESSO, 'Novo projeto foi salvo', 'Projeto disponivel')
            nomeDoProjeto.value = '';
            router.push('/projetos');
        }

        return {
            nomeDoProjeto,
            salvar,
            lidarComSucesso
        }
    }
});
</script>