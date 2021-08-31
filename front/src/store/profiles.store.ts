import { getProfiles, createProfile } from '@/services/profiles'
import { ref, Ref } from 'vue'
import { ProfileI } from '@/store/profile.store'

export class ProfilesStore {
  private static instance: ProfilesStore;

  private profiles = ref<Array<ProfileI>>([])

  public static get getInstance (): ProfilesStore {
    if (!ProfilesStore.instance) {
      ProfilesStore.instance = new ProfilesStore()
    }

    return ProfilesStore.instance
  }

  getProfiles (): Ref<Array<ProfileI>> {
    return this.profiles
  }

  async fetchProfiles () {
    const response = await getProfiles()
    if (response?.data) {
      this.profiles.value = response.data
    }
  }

  async createProfile (profile: ProfileI) {
    const response = await createProfile(profile)
  }
}
