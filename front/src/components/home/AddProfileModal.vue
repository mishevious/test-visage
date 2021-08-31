<template>
  <Modal :value="value" @input="(v) => updateShow(v)" @after-close="resetForm()">
    <template v-slot:header>
      Add a profile
    </template>
    <template  v-slot:content>
      <div class="modal-profile-content">
        <div class="upload-pdf">
          <template v-if="step === 1">
            <label for="pdfFile" class="label-file">
              <template v-if="!pdf">Choose a CV (.pdf), max size is 5Mo</template>
              <template v-else>Change the pdf CV</template>
            </label>
            <input type="file" id="pdfFile" ref="pdfFile" @change="handleFileUpload()"/>
            <span class="upload-error-msg">{{ uploadErrorMsg }}</span>
            <Button v-show="pdf" label="Upload" @click="uploadFile()" />
          </template>
          <template v-if="step === 2">
            <div class="download-progress">
              <div class="progress-bar" :style="{ width: `${progress}%` }" />
            </div>
            {{ progress }}%
          </template>
          <template v-if="step === 3 && uploadedPdf.url">
            <a :href="uploadedPdf.url" target="_blank"><Button label="View PDF" /></a>
            <Button label="Change the PDF" @click="resetForm" />
          </template>
        </div>
        <div v-show="step > 1">
          <Input placeholder="Name : Required" v-model="state.name" />
          <Input placeholder="Job Title : Required" v-model="state.jobTitle" />
          <Input placeholder="Notes" v-model="state.notes" />
        </div>
      </div>
    </template>
    <template  v-slot:footer>
      <div class="modal-profile-footer">
        <Button  color="neutral" label="Annuler" @click="cancel()" />
        <Button label="Save" :disable="!validForm || step != 3" @click="save()" />
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import Modal from '@/components/shared/Modal.vue'
import Button from '@/components/shared/Button.vue'
import Input from '@/components/shared/Input.vue'
import { uploadPdf } from '@/services/profiles'
import { v4 as uuidv4 } from "uuid"


interface ProfileState {
  name: string;
  jobTitle: string;
  notes: string;
  bonusToken: string,
}

export default defineComponent({
  name: 'AddProfileModal',
  components: {
    Modal,
    Input,
    Button
  },
  emits: ['save', 'update:modelValue'],
  props: {
    value: Boolean
  },
  setup (props, { emit }) {
    if (!localStorage.bonusToken) localStorage.bonusToken = uuidv4()
    const state = reactive<ProfileState>({
      name: '',
      jobTitle: '',
      notes: '',
      bonusToken: localStorage.bonusToken,
    })

    const updateShow = (show: boolean) => {
      emit('update:modelValue', show)
    }

    const pdfFile = ref({
      files: []
    })

    const uploadErrorMsg = ref('')

    const step = ref(1);

    const pdf = ref('');

    const progress = ref(0);

    const uploadedPdf = ref({
      url: '',
      name: '',
    })

    const validForm = computed(() => {
      return state.name !== '' && state.jobTitle !== ''
    })

    const resetForm = () => {
      state.name = ''
      state.jobTitle = ''
      state.notes = ''
      pdf.value = ''
      step.value = 1
      uploadErrorMsg.value = ''
      progress.value = 0
      pdfFile.value = {
        files: []
      }
    }

    const cancel = () => {
      emit('update:modelValue', false)
    }

    const save = () => {
      if (validForm.value && uploadedPdf.value.url) {
        emit('save', { ...state, pdf: uploadedPdf.value.url })
      }
    }

    const handleFileUpload = () => {
      pdf.value = ''
      uploadErrorMsg.value = ''
      if (pdfFile.value?.files) {
        let tempFile: any = pdfFile.value.files[0]
        if (tempFile.type != 'application/pdf') {
          uploadErrorMsg.value = 'The CV file need to be a PDF'
        } else if (tempFile.size > 5000000) {
          uploadErrorMsg.value = `The PDF can't exceed 5Mo`
        } else {
          pdf.value = tempFile
        }
      }
    }

    const uploadProgress = (progressEvent: any) => {
      progress.value = Math.round((parseInt(progressEvent.loaded) / parseInt(progressEvent.total)) * 100)
    }

    const uploadFile = async () => {
      let formData = new FormData();

      formData.append('file', pdf.value);
      try {
        step.value = 2
        let res = await uploadPdf(formData, uploadProgress.bind(progress))
        uploadedPdf.value = {
          url: res.data.path,
          name: res.data.url,
        }
        step.value = 3
      } catch (e) {
        resetForm()
        uploadErrorMsg.value = 'An error occured. Retry or contact an administrator.'
      }
    }

    return {
      uploadedPdf,
      progress,
      uploadErrorMsg,
      pdf,
      uploadFile,
      handleFileUpload,
      pdfFile,
      step,
      cancel,
      save,
      state,
      validForm,
      resetForm,
      updateShow
    }
  }
})
</script>

<style lang="scss" scoped>

.modal-profile-content {
  width: 100%;
}

.modal-profile-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    margin-left: 1em;
  }
}

.upload-pdf {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    margin-right: 1rem;
  }


  .download-progress {
    width: 8rem;
    height: 1rem;
    border-radius: 8px;
    border: 1px solid $primary-text;
    margin: 1rem;
    .progress-bar {
      min-width:16px;
      height: 100%;
      border-radius: 8px;
      background: $primary-color;
    }
    
  }
  .upload-error-msg {
    color: $negative;
  }
  input {
    display: none;
  }
  .label-file {
    padding: 1rem;
    border: 1px dashed $primary-color;
    margin-right: 1rem;
    color: #3F3D56;
    cursor: pointer;
    &:hover {
      filter: brightness(120%);
      color: black;
    }
  }
}
</style>
