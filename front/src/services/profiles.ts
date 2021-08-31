import http from "@/axios";
import { ProfileI } from '@/store/profile.store'

export function getProfile () {
}

export function getProfiles () {
  return http.get('/profiles')
}

export function createProfile (profile: ProfileI) {
  return http.post('/profiles', profile)
}

export function updateProfile () {
  // Update profile
}

export function uploadPdf (formData: FormData, onUploadProgress: any) {
  return http.post( '/profiles/upload-pdf',
    formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      onUploadProgress,
    }
  )
}