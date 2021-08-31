<template>
  <div class="dashboard" >
    <AddProfileModal :value="showAddProfileModal" @input="(show) => showAddProfileModal = show" @save="saveProfile" />
    <div class="dashboard-header">
      <div class="left-header">
        <Button icon="add" @click="addProfileModal">Add a profile</Button>
      </div>
      <h2>{{ profiles.length }} Profile(s)</h2>
      <div class="right-header">
        <Input placeholder="Search a profile" v-model="filter" />
      </div>
    </div>
    <div class="message-header">
      You added {{ profileAddedByUser }} Profile(s). <span v-show="profileAddedByUser > 10 && profileAddedByUser % 10 === 0">Every day feels like i've died and gone the hell</span>
    </div>
    <div class="profile-list">
      <Card class="card-profile" v-for="profile in profiles" :key="profile.url">
        <div class="profile-name">{{ profile.name }}</div>
        <div class="profile-job">{{ profile.jobTitle }}</div>
        <div class="profile-pdf"><Button label="View PDF" @click="openPdf(profile.pdf)" /></div>
        <div class="profile-notes">Notes : {{ profile.notes }}</div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, computed } from 'vue'
import router from '../router'
import { ProfilesStore } from '../store/profiles.store'
import { ProfileI } from '@/store/profile.store'

export default defineComponent({
  name: 'Dashboard',
  components: {
    Button: defineAsyncComponent(() => import('../components/shared/Button.vue')),
    Input: defineAsyncComponent(() => import('../components/shared/Input.vue')),
    Card: defineAsyncComponent(() => import('../components/shared/Card.vue')),
    AddProfileModal: defineAsyncComponent(() => import('../components/home/AddProfileModal.vue')),
  },
  setup () {
    const profilesFetch = ProfilesStore.getInstance.getProfiles()
    const fetched = ref(false)
    const filter = ref('')
    const showAddProfileModal = ref(false)
    const profiles = computed(() => {
      if (profilesFetch.value) {
        return profilesFetch.value.filter((p: ProfileI): boolean => {
          // Usually filter is in the backend, but i just implement the mechanic, maybe a search by type is a better option here (depend of the UI/UX)
          return p.name.toLowerCase().includes(filter.value.toLowerCase()) || p.jobTitle.toLowerCase().includes(filter.value.toLowerCase()) || p.notes.toLowerCase().includes(filter.value.toLowerCase())
        })
      }
      return []
    })
    
    const addProfile = () => {
      router.push({ name: 'AddProfile' })
    }

    const saveProfile = async (profile: ProfileI) => {
      try {
        await ProfilesStore.getInstance.createProfile(profile)
        showAddProfileModal.value = false
        fetchProfiles()
      } catch (e) {

      }
    }

    const profileAddedByUser = computed(() => {
      let nb = profilesFetch.value.filter((p) => p.bonusToken === localStorage.bonusToken)
      return nb.length
    })

    const addProfileModal = () => {
      showAddProfileModal.value = true
    }

    const fetchProfiles = async () => {
      try {
        await ProfilesStore.getInstance.fetchProfiles()
      } catch (e) {
        console.error(e)
      }
    }

    const openPdf = (url: string) => {
      window.open(url, '_blank')
    }

    onMounted(async () => {
      fetchProfiles()
    })

    return {
      profileAddedByUser,
      openPdf,
      window,
      profiles,
      addProfileModal,
      saveProfile,
      showAddProfileModal,
      filter,
      profilesFetch,
      addProfile,
      fetched,
    }
  }
})
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: calc(100vh - 4rem);
  a {
    text-decoration: none;
    margin-right: 1rem;
  }
  .dashboard-header {
    padding: 0.6rem;
    min-height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .message-header {
    height: 1rem;
    padding: 0 1rem;
  }
  .profile-list {
    padding: 2rem 4rem;
    display: flex;
    flex-wrap: wrap;
    text-align: center;

    .card-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 20rem;
      margin: 1rem;
    }

    .profile-job {
      font-size: 110%;
      font-weight: 500;
      padding-bottom: 1rem;
    }
    .profile-name {
      font-size: 120%;
      font-weight: 700;
    }
    .profile-notes {
      margin-top: 1rem;
      padding:1rem;
      background: #e2e2e2;
      text-align: left;
      width: 100%;
    }
  }
}


</style>
