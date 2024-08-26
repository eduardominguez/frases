const { createApp, ref, reactive } = Vue;

const app = createApp({
    setup() {
        const fraces = ref([
            { Fraces: '"La vida es lo que pasa mientras estás ocupado haciendo otros planes."', autor: 'John Lennon' },
            { Fraces: '"El éxito es la suma de pequeños esfuerzos repetidos día tras día."', autor: 'Robert Collier' },
            { Fraces: '"No cuentes los días, haz que los días cuenten."', autor: 'Muhammad Ali' },
            { Fraces: '"La imaginación es más importante que el conocimiento. El conocimiento es limitado, mientras que la imaginación no tiene límites."', autor: 'Albert Einstein' },
            { Fraces: '"La mejor forma de predecir el futuro es crearlo."', autor: 'Peter Drucker' }
        ]);

        const isModalOpen = ref(false);
        const isDeleteModalOpen = ref(false);
        const modalTitle = ref("");
        const currentFrase = reactive({ Fraces: '', autor: '' });
        const alertMessage = ref('');
        const alertType = ref('success');
        let editIndex = null;
        let deleteIndex = null;

        const openModal = (mode, index = null) => {
            if (mode === 'edit') {
                modalTitle.value = "Editar Frase";
                currentFrase.Fraces = fraces.value[index].Fraces;
                currentFrase.autor = fraces.value[index].autor;
                editIndex = index;
            } else {
                modalTitle.value = "Crear Nueva Frase";
                currentFrase.Fraces = '';
                currentFrase.autor = '';
                editIndex = null;
            }
            isModalOpen.value = true;
        };

        const closeModal = () => {
            isModalOpen.value = false;
        };

        const showAlert = (message, type) => {
            alertMessage.value = message;
            alertType.value = type;
            setTimeout(() => {
                alertMessage.value = '';
            }, 3000);
        };

        const saveFrase = () => {
            if (editIndex !== null) {
                fraces.value[editIndex] = { ...currentFrase };
                showAlert('Frase editada con éxito', 'success');
            } else {
                fraces.value.push({ ...currentFrase });
                showAlert('Frase agregada con éxito', 'success');
            }
            closeModal();
        };

        const editFrase = (index) => {
            openModal('edit', index);
        };

        const confirmDeleteFrase = (index) => {
            deleteIndex = index;
            isDeleteModalOpen.value = true;
        };

        const deleteFrase = () => {
            if (deleteIndex !== null) {
                fraces.value.splice(deleteIndex, 1);
                showAlert('Frase eliminada con éxito', 'danger');
                closeDeleteModal();
            }
        };

        const closeDeleteModal = () => {
            isDeleteModalOpen.value = false;
            deleteIndex = null;
        };

        return {
            fraces,
            isModalOpen,
            isDeleteModalOpen,
            modalTitle,
            currentFrase,
            alertMessage,
            alertType,
            openModal,
            closeModal,
            saveFrase,
            editFrase,
            confirmDeleteFrase,
            deleteFrase,
            closeDeleteModal
        };
    }
});

app.mount('#app');


